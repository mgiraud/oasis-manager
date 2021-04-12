<template>
  <node-view-wrapper :style="{ display: nodeDisplay }">
    <div
      ref="img-container"
      class="img-container"
      :class="{'is-active': isActive}"
      draggable="true"
      contenteditable="false"
      data-drag-handle
      :style="{width: node.attrs.width}"
    >
      <img :src="node.attrs.src" :alt="node.attrs.title" style="width: 100%;" @click="isActive = !isActive">
      <span v-show="isActive" class="handle" @mousedown.prevent="handleMouseDown($event)" />
    </div>
  </node-view-wrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { NodeViewWrapper, Node } from '@tiptap/vue-2'

@Component({
  components: {
    NodeViewWrapper
  }
})
export default class ResizableImageNode extends Vue {
  @Prop({ type: Object, required: true }) readonly node !: Node
  @Prop({ type: Object, required: true }) readonly extension !: Node
  @Prop({ type: Function, required: true }) readonly updateAttributes!: (attributes: {width: string}) => void
  isActive = false

  get nodeDisplay () {
    if (this.extension.options.inline) {
      return 'inline-block'
    }

    return 'block'
  }

  handleMouseDown (e: MouseEvent) {
    const startX = e.pageX
    const startY = e.pageY

    const outer = this.$refs['img-container']

    // @ts-ignore
    const startWidth = parseFloat(this.node.attrs.width.match(/(.+)px/)[1])
    const startPosX = e.x

    const onMouseMove = (e: MouseEvent) => {
      const diffInPx = startPosX - e.pageX
      const width = `${startWidth - diffInPx}px`
      this.updateAttributes({
        width
      })
    }
    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
}
</script>

<style lang ="scss">

.img-container {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.img-container.is-active {
  border: 1px dashed gray;
}

.handle {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border: 3px solid black;
  border-top: none;
  border-left: none;
  cursor: nwse-resize;
}
</style>
