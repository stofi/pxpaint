<template>
  <div
    @mousedown="this.downHandler"
    @mouseup="this.upHandler"
    @mouseleave="mousedown = false"
    class="flex flex-col"
  >
    <div class="Display relative w-100">
      <div
        ref="display"
        class="Display__Canvas p-4 rounded bg-gray-300 absolute top-0 bottom-0 left-0 right-0 flex flex-col"
      >
        <div class="flex flex-1" v-for="(_, y) in range" :key="'row' + y">
          <pixel
            class="flex-1"
            v-for="(_, x) in range"
            :key="'px:' + x + ',' + y"
            :color="getColor({ x, y })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pixel from './pixel.vue'

export default {
  components: {
    pixel
  },
  props: {
    pixels: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      mousedown: false,
      lastpos: {
        x: -1,
        y: -1
      },
      downpos: {
        x: -1,
        y: -1
      }
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.moveHandler)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.moveHandler)
  },
  computed: {
    range() {
      return Array(this.width).fill(null)
    }
  },
  methods: {
    getXY({ x, y }) {
      const padding = 16
      let {
        top,
        left,
        width,
        height
      } = this.$refs.display.getBoundingClientRect()

      left += padding
      top += padding
      width -= 2 * padding
      height -= 2 * padding
      x -= left
      y -= top
      x /= width
      y /= height
      return { x, y }
    },
    downHandler({ clientX, clientY }) {
      this.mousedown = true
      const { x, y } = this.getXY({ x: clientX, y: clientY })

      if (x > 0 && x < 1 && y > 0 && y < 1) {
        const indexX = Math.floor(x * this.width)
        const indexY = Math.floor(y * this.width)

        if (this.downpos.x !== indexX || this.downpos.y !== indexY) {
          this.downpos.x = indexX
          this.downpos.y = indexY
        }
      }
    },
    upHandler({ clientX, clientY }) {
      this.mousedown = false
      const { x, y } = this.getXY({ x: clientX, y: clientY })

      if (x > 0 && x < 1 && y > 0 && y < 1) {
        const indexX = Math.floor(x * this.width)
        const indexY = Math.floor(y * this.width)

        if (this.downpos.x === indexX || this.downpos.y === indexY) {
          this.$emit('update', { x: indexX, y: indexY })
        }
      }
    },
    moveHandler({ clientX, clientY }) {
      const { x, y } = this.getXY({ x: clientX, y: clientY })

      if (x > 0 && x < 1 && y > 0 && y < 1 && this.mousedown) {
        const indexX = Math.floor(x * this.width)
        const indexY = Math.floor(y * this.width)

        if (this.lastpos.x !== indexX || this.lastpos.y !== indexY) {
          this.$emit('update', { x: indexX, y: indexY }, true)
          this.lastpos.x = indexX
          this.lastpos.y = indexY
        }
      }
    },
    hoverHandler(e, { x, y }) {
      if (this.mousedown) {
        this.$emit('update', { x, y }, true)
      }
    },
    getColor({ x, y }) {
      const state = this.pixels[`${x},${y}`]
        ? this.pixels[`${x},${y}`].state
        : false
      return state ? this.pixels[`${x},${y}`].color : 'white'
    }
  }
}
</script>
<style scoped>
.Display {
  padding-bottom: 100%;
}
.Display__Canvas {
  cursor: crosshair;
}
</style>
