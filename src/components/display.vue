<template>
  <div class="flex flex-col">
    <div class="Display relative w-100">
      <div
        class="p-4 rounded bg-gray-300 absolute top-0 bottom-0 left-0 right-0 flex flex-col"
      >
        <div class="flex flex-1" v-for="(row, y) in pixels" :key="'row' + y">
          <pixel
            @px-click="$emit('update', { x, y })"
            class="flex-1"
            v-for="(pixel, x) in row"
            :key="'px:' + x + ',' + y"
            :color="pixel.state ? 'black' : 'white'"
            :x="x"
            :y="y"
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
      type: Array,
      default: () => [[]]
    }
  }
};
</script>
<style scoped>
.Display {
  padding-bottom: 100%;
}
</style>
