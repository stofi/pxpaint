<template>
  <div class="p-4 rounded bg-white w-full">
    <pre v-for="{ x, y, color } in pixelCodes" :key="`pxcode${x}${y}`">{{
      `(${x}, ${y}) ${color}`
    }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    pixelCodes: {
      type: Array,
      default: () => []
    }
  }
}
</script>
