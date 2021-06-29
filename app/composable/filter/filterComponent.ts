import { ref } from '@nuxtjs/composition-api'

const filterComponent = {
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  setup (props: any[]) {
    const item = ref(props.values)

    return {
      item
    }
  }
}

export default filterComponent
