import { reactive, readonly, watch, ref, Ref, computed } from '@nuxtjs/composition-api'
import { set, get } from 'idb-keyval'
import { Context } from '@nuxt/types'
import { Route, RawLocation } from 'vue-router'
import { HydraGetRequestFilter, HydraMemberObject, HydraView } from '~/api/hydra'
import { FormErrors } from '~/api/repository'
import SubmissionError from '~/error/SubmissionError'

export interface UseContextReturn
  extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Context['from']>
  params: Ref<Route['params']>
}

export interface CrudState<U extends HydraMemberObject> {
  allIds: string[];
  byId: { [id: string]: U };
  created: U | null;
  deleted: U | null;
  error: string;
  isLoading: boolean;
  resetList: boolean;
  selectItems: U[] | null;
  totalItems: number;
  updated: U | null;
  view: HydraView | null;
  violations: FormErrors | null;
  activeSlug: string | null;
}

export abstract class Store<T extends Object> {
  public state: T
  protected storeName: string

  protected constructor (storeName: string) {
    const data = this.data()
    this.state = reactive(data) as T
    this.storeName = storeName
  }

  protected abstract data (): T

  public getState (): T {
    return readonly(this.state) as T
  }
}

export abstract class PersistentStore<T extends Object> extends Store<T> {
  private isInitialized = ref(false)

  constructor (readonly storeName: string) {
    super(storeName)
  }

  async init () {
    if (this.isInitialized) {
      const stateFromIndexedDB: string | undefined = await get(this.storeName)
      if (stateFromIndexedDB) {
        Object.assign(this.state, JSON.parse(stateFromIndexedDB))
      }
      watch(() => this.state, val => set(this.storeName, JSON.stringify(val)), { deep: true })

      this.isInitialized.value = true
    }
  }

  getIsInitialized (): Ref<boolean> {
    return this.isInitialized
  }
}

export abstract class PersistentApiStore<T, U extends HydraMemberObject> extends PersistentStore<CrudState<U> & T> {
  public abstract getListLocation (): RawLocation | null

  public abstract getAddLocation (): RawLocation | null

  public abstract getEditLocation (item: U): RawLocation | null

  public abstract listRole: string

  public abstract editRole: string

  public abstract deleteRole: string

  protected context!: UseContextReturn

  protected getAdditionalData (): Partial<T> {
    return {}
  }

  constructor (readonly storeName: string) {
    super(storeName)
  }

  public setContext (context: UseContextReturn) {
    this.context = context

    return this
  }

  protected data (): CrudState<U> {
    return {
      allIds: [],
      byId: {},
      created: null,
      deleted: null,
      error: '',
      isLoading: false,
      resetList: false,
      selectItems: null,
      totalItems: 0,
      updated: null,
      view: null,
      violations: null,
      activeSlug: null,
      ...this.getAdditionalData()
    }
  }

  find = (id: string | number) => {
    return this.state.byId[id] ?? null
  }

  public list = computed(() => {
    return this.state.allIds.map((id: string) => this.state.byId[id])
  })

  handleError (e: Error) {
    this.toggleLoading()

    if (e instanceof SubmissionError) {
      this.state.violations = e.errors
      this.state.error = e.errors._error

      return Promise.reject(e)
    }
    this.state.error = e.message

    return Promise.reject(e)
  }

  toggleLoading () {
    this.state.isLoading = !this.state.isLoading
  }

  setSelectItems (items: U[]) {
    this.state.selectItems = items
    this.state.error = ''
    this.state.isLoading = false
  }

  addItem (item: U) {
    this.state.byId[item['@id']] = item
    if (this.state.allIds.includes(item['@id'])) {
      return
    }
    this.state.allIds.push(item['@id'])
  }

  async fetchAll (params: HydraGetRequestFilter | Object = {}) {
    this.toggleLoading()
    try {
      const retrieved = await this.context.$getRepository(this.storeName).$findAll({ params })
      if (this.state.resetList) {
        this.resetList()
      }

      retrieved['hydra:member'].forEach((item: U) => {
        this.addItem(item)
      })

      this.state.totalItems = retrieved['hydra:totalItems']
      this.state.view = retrieved['hydra:view']
      this.toggleLoading()
    } catch (e) {
      await this.handleError(e)
    }
  }

  async create (values: Object) {
    if (!this.context.$getRepository(this.storeName)) {
      throw new Error(`Repository ${this.storeName} does not exist`)
    }

    this.state.error = ''
    this.state.violations = null
    this.toggleLoading()

    try {
      const item = await this.context.$getRepository(this.storeName).$create(values)
      this.toggleLoading()
      this.addItem(item)
      this.state.created = item
      return item
    } catch (e) {
      await this.handleError(e)
    }
  }

  async del (item: U) {
    if (!this.context.$getRepository(this.storeName)) {
      throw new Error(`Repository ${this.storeName} does not exist`)
    }

    this.toggleLoading()

    try {
      await this.context.$getRepository(this.storeName).$remove(item)
      this.toggleLoading()
      this.state.deleted = item
    } catch (e) {
      await this.handleError(e)
    }
  }

  async fetchSelectItems ({ params = { properties: ['@id', 'name'] } } = {}) {
    if (!this.context.$getRepository(this.storeName)) {
      throw new Error(`Repository ${this.storeName} does not exist`)
    }
    this.toggleLoading()

    try {
      const retrieved = await this.context.$getRepository(this.storeName).$findAll({ params })
      this.setSelectItems(retrieved['hydra:member'])
      return retrieved['hydra:member']
    } catch (e) {
      await this.handleError(e)
    }
  }

  async load (id: string): Promise<U | undefined> {
    if (!this.context.$getRepository(this.storeName)) {
      throw new Error(`Repository ${this.storeName} does not exist`)
    }

    this.toggleLoading()
    try {
      const item = await this.context.$getRepository(this.storeName).$find(id)
      this.toggleLoading()
      this.addItem(item)
      return item
    } catch (e) {
      await this.handleError(e)
    }
  }

  async update (item: T) {
    this.state.error = ''
    this.state.violations = null
    this.toggleLoading()

    try {
      const data = await this.context.$getRepository(this.storeName).$update(item)
      this.toggleLoading()
      this.state.updated = data
    } catch (e) {
      await this.handleError(e)
    }
  }

  prepareResetList () {
    this.state.resetList = true
  }

  resetList () {
    Object.assign(this.state, {
      allIds: [],
      byId: {},
      error: '',
      resetList: false
    })
  }

  resetCreate () {
    Object.assign(this.state, {
      isLoading: false,
      error: '',
      created: null,
      violations: null
    })
  }

  resetDelete () {
    Object.assign(this.state, {
      isLoading: false,
      error: '',
      deleted: null
    })
  }

  resetShow () {
    Object.assign(this.state, {
      error: '',
      isLoading: false
    })
  }

  resetUpdate () {
    Object.assign(this.state, {
      error: '',
      isLoading: false,
      updated: null,
      violations: null
    })
  }

  getCreateMessage (item: U) {
    return `${item['@id']} créé avec succès`
  }

  getUpdateMessage (item: U) {
    return `${item['@id']} mis à jour avec succès`
  }

  getDeleteMessage (item: U) {
    return `${item['@id']} supprimé avec succès`
  }

  getIdentifierFromUrlParam (param: string): string {
    return `/api/${this.storeName}/${decodeURIComponent(param)}`
  }

  public getEditFrontLocation (_: U): RawLocation {
    return { name: 'index' }
  }
}
