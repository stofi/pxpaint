<template>
  <div id="app" class="bg-gray-100 h-screen w-screen container p-4">
    <display :width="20" :offset-x="offsetX" :offset-y="offsetY" />
    <div class="text-gray-900 text-xl leading-relaxed">
      Origin
    </div>
    <div class="flex mt-2">
      <label
        class="flex w-1/2 justify-between mr-2 bg-gray-300 py-2 px-3 rounded items-center"
      >
        x:
        <input
          class="rounded-sm w-1/2 ml-2 flex-1 mr-1"
          type="number"
          v-model.number="offsetY"
        />
        <button @click="offsetY++" class="rounded bg-gray-600  h-5 w-5 mr-1">
          ➕
        </button>
        <button @click="offsetY--" class="rounded bg-gray-600  h-5 w-5">
          ➖
        </button>
      </label>
      <label
        class="flex w-1/2 justify-between ml-2 bg-gray-300 py-2 px-3 rounded items-center"
      >
        y:
        <input
          class="rounded-sm w-1/2 ml-2 flex-1 mr-1"
          type="number"
          v-model.number="offsetX"
        />
        <button @click="offsetX++" class="rounded bg-gray-600  h-5 w-5 mr-1">
          ➕
        </button>
        <button @click="offsetX--" class="rounded bg-gray-600  h-5 w-5">
          ➖
        </button>
      </label>
    </div>
  </div>
</template>

<script>
import display from "./components/display";

export default {
  name: "app",
  components: {
    display
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0
    };
  }
};
</script>
