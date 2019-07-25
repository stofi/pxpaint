<template>
  <label
    class="flex w-1/2 justify-between bg-gray-200 py-2 px-3 rounded items-center"
  >
    Color:
    <input
      class="rounded-sm w-1/2 ml-2 flex-1 mr-1 bg-gray-200 text-right text-xl px-2"
      type="color"
      v-model="value"
    />
  </label>
</template>

<script>
export default {
  props: {
    initial: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: this.initial
    };
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
