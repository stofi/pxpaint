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
        <canvas ref="canvas" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      keys: [],
      dirty: false,
      toChange: [],
      toDelete: [],
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
    this.sizeCanvas()
    this.clear()
    window.addEventListener('mousemove', this.moveHandler)
    requestAnimationFrame(this.draw)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.moveHandler)
  },
  watch: {
    width() {
      this.clear()
    },
    pixels(n, o) {
      const newpx = Object.keys(n)
      const oldpx = [...this.keys]

      this.toDelete = oldpx.filter(px => newpx.indexOf(px) === -1)
      this.toChange = newpx.filter(px => {
        if (!n[px].state) {
          this.toDelete.push(px)
          return false
        }
        if (oldpx.indexOf(px) === -1) return true
        return n[px].color !== o[px].color
      })
      this.keys = newpx.filter(px => n[px].state)
      this.dirty = true
    }
  },
  computed: {
    range() {
      return Array(this.width).fill(null)
    },
    canvas() {
      return this.$refs.canvas
    },
    context() {
      return this.canvas.getContext('2d')
    },
    height() {
      return this.width
    }
  },
  methods: {
    draw() {
      if (this.dirty) {
        this.toDelete.forEach(key => {
          const [x, y] = key.split(',')
          this.drawPixel({
            x,
            y,
            color: '',
            state: false
          })
        })
        this.toChange.forEach(key => {
          this.drawPixel(this.pixels[key])
        })
      }
      requestAnimationFrame(this.draw)
      this.dirty = false
    },
    sizeCanvas() {
      this.canvas.style.width = '100%'
      this.canvas.style.height = '100%'
      let width = this.canvas.offsetWidth * 2
      let height = this.canvas.offsetHeight * 2

      const pxwidth = Math.ceil(width / this.width) * this.width
      const pxheight = Math.ceil(height / this.height) * this.height

      this.canvas.width = pxwidth
      this.canvas.height = pxheight
    },
    drawPixel({ color, x, y, state }) {
      this.context.save()
      {
        const pxwidth = this.canvas.width / this.width
        const pxheight = this.canvas.height / this.height
        const x0 = x * pxwidth
        const y0 = y * pxheight
        this.context.fillStyle = state ? color : 'white'
        this.context.fillRect(x0, y0, pxwidth, pxheight)
      }
      this.context.restore()
    },
    clear() {
      this.context.save()
      {
        this.context.fillStyle = 'white'
        this.context.fillRect(0, 0, this.canvas.height, this.canvas.width)
      }
      this.context.restore()
    },
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
