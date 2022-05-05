import { defineStore } from 'pinia'
import { CRUD_MODE, crudState } from '~/store/crud'
import { Page } from '~/store/page'
import { HydraMemberObject } from '~/types/hydra'
import { breadcrumbItem, MediaNodeItem } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'
import { MediaObject } from '~~/nuxt-v2/app/custom-store/MediaObjectStore'

interface NotificationState {
  show: boolean
  color: string
  text: string
  subText: string
  timeout: number
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => {
    return {
      show: false,
      color: 'error',
      text: 'An error occurred',
      subText: '',
      timeout: 10000
    }
  },
  actions: {
    setShow (show: boolean) {
      this.show = show
    },

    setColor (color: string) {
      this.color = color
    },

    setText (text: string) {
      this.text = text
    },

    setSubText (subText: string) {
      this.subText = subText
    },

    setTimeout (timeout: number) {
      this.timeout = timeout
    },

    cleanState () {
      const that = this
      setTimeout(() => {
        that.setShow(false)
      }, this.timeout)
    },

    showError (error: string) {
      this.showMessage(error, 'accent')
    },

    showMessage (message: string, color: string = 'success') {
      this.setShow(true)
      this.setColor(color)
      this.setText(message)
      this.cleanState()
    }
  },
})
