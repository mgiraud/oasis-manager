import { FormErrors } from '~/types/form'
import { HydraMemberObject, HydraView } from '~/types/hydra'

export enum CRUD_MODE {
  LIST = 'LIST',
  CREATION = 'CREATION',
  EDITION = 'EDITION',
  DELETION = 'DELETION',
  SELECTION = 'SELECTION'
}

export interface CrudState<U extends HydraMemberObject> {
  [CRUD_MODE.LIST]: {
    isLoading: boolean;
    allIds: string[];
    byId: { [id: string]: U };
    totalItems: number;
    error: string;
    resetList: boolean;
    view: HydraView | null;
  },
  [CRUD_MODE.CREATION]: {
    isLoading: boolean;
    created: U | null;
    violations: FormErrors | null;
    error: string;
  },
  [CRUD_MODE.EDITION]: {
    isLoading: boolean;
    edited: U | null;
    violations: FormErrors | null;
    error: string;
    activeSlug: string | null;
    retrieved: U
  },
  [CRUD_MODE.DELETION]: {
    deleted: U | null;
    isLoading: boolean;
    error: string;
  },
  [CRUD_MODE.SELECTION]: {
    selectItems: U[] | null;
    isLoading: boolean;
    error: string;
  }
}

export const crudState: CrudState<any> = {
  [CRUD_MODE.LIST]: {
    isLoading: false,
    allIds: [],
    byId: {},
    totalItems: 0,
    error: '',
    resetList: false,
    view: null,
  },
  [CRUD_MODE.CREATION]: {
    isLoading: false,
    created: null,
    violations: null,
    error: ''
  },
  [CRUD_MODE.EDITION]: {
    isLoading: false,
    edited: null,
    violations: null,
    error: '',
    activeSlug: null,
    retrieved: null
  },
  [CRUD_MODE.DELETION]: {
    deleted: null,
    isLoading: false,
    error: ''
  },
  [CRUD_MODE.SELECTION]: {
    selectItems: null,
    isLoading: false,
    error: ''
  }
}
