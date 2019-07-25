<template>
  <div
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    @mouseleave="mousedown = false"
    class="flex flex-col"
  >
    <div class="Display relative w-100">
      <div
        class="p-4 rounded bg-gray-300 absolute top-0 bottom-0 left-0 right-0 flex flex-col"
      >
        <div class="flex flex-1" v-for="(_, y) in range" :key="'row' + y">
          <pixel
            @px-click="$emit('update', { x, y })"
            @px-hover="hoverHandler($event, { x, y })"
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
import pixel from "./pixel.vue";

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
      mousedown: false
    };
  },
  computed: {
    range() {
      return Array(this.width).fill(null);
    }
  },
  methods: {
    hoverHandler(e, { x, y }) {
      if (this.mousedown) {
        this.$emit("update", { x, y }, true);
      }
    },
    getColor({ x, y }) {
      const state = this.pixels[`${x},${y}`]
        ? this.pixels[`${x},${y}`].state
        : false;
      return state ? this.pixels[`${x},${y}`].color : "white";
    }
  }
};
</script>
<style scoped>
.Display {
  padding-bottom: 100%;
}
</style>
