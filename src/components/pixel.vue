<template>
  <div
    @click="$emit('px-click')"
    @mouseenter="$emit('px-hover')"
    :style="style"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.color
      };
    }
  }
};
</script>
