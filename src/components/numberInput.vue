<template>
  <label
    class="flex w-1/2 justify-between bg-gray-200 py-2 px-3 rounded items-center"
  >
    {{ title }}
    <input
      class="rounded-sm w-1/2 ml-2 flex-1 mr-1 bg-gray-200 text-right text-xl px-2"
      type="number"
      v-model.number="value"
    />
    <button @click="value++" class="rounded h-5 w-5 mr-1">
      ➕
    </button>
    <button @click="value--" class="rounded h-5 w-5">
      ➖
    </button>
  </label>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: 0
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
