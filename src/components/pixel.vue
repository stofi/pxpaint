<template>
  <div class="pointer-events-none" :style="style" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.color
      }
    }
  }
}
</script>
