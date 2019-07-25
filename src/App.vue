<template>
  <div
    id="app"
    class="bg-gray-100 h-screen w-screen p-4 flex justify-around overflow-x-auto"
  >
    <div class="container flex flex-col md:flex-row">
      <div class="md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <display :width="this.width" :pixels="pixels" @update="update" />
      </div>
      <div class="md:w-1/2 flex flex-col">
        <div class="rounded mb-4 p-4 bg-gray-300">
          <div class="text-gray-900 text-xl leading-relaxed">
            Origin
          </div>
          <div class="flex mt-2">
            <number-input class="mr-2" title="x:" v-model="origin.x" />
            <number-input title="y:" v-model="origin.y" />
          </div>
        </div>
        <div class="rounded mb-4 p-4 bg-gray-300">
          <div class="text-gray-900 text-xl leading-relaxed">
            Offset
          </div>
          <div class="flex mt-2">
            <number-input class="mr-2" title="x:" v-model="offset.x" />
            <number-input title="y:" v-model="offset.y" />
          </div>
        </div>
        <div class="rounded mb-4 p-4 bg-gray-300 flex">
          <number-input
            class="mr-2 flex-shrink-0"
            title="w:"
            v-model="width"
            :initial="20"
          />
          <color-picker v-model="color" />
        </div>
        <px-output :pixel-codes="codes" />
      </div>
    </div>
  </div>
</template>

<script>
import display from "./components/display";
import numberInput from "./components/numberInput";
import pxOutput from "./components/output";
import colorPicker from "./components/colorPicker";

export default {
  name: "app",
  components: {
    display,
    numberInput,
    pxOutput,
    colorPicker
  },
  data() {
    return {
      offset: {
        x: 0,
        y: 0
      },
      origin: {
        x: 0,
        y: 0
      },
      width: 20,
      pixels: {},
      codes: [],
      color: "#ffffff"
    };
  },
  watch: {
    origin: {
      handler() {
        this.refresh();
      },
      deep: true
    },
    offset: {
      handler() {
        this.refresh();
      },
      deep: true
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.pixels = this.getPixels();
      this.codes = this.getCodes();
    },
    getCodes() {
      let codes = [];
      Object.keys(this.$store.state.pixels).forEach(key => {
        let px = this.$store.state.pixels[key];
        if (!px.state) return;
        codes.push({
          x: px.x + this.offset.x,
          y: px.y + this.offset.y,
          color: "#000000"
        });
      });
      return codes;
    },
    getPixels() {
      let translatedPixels = {};
      this.getEmptyMatrix().forEach((row, y) =>
        row.forEach((pixel, x) => {
          let stored = this.$store.getters.getPixel({
            x: x + this.origin.x,
            y: y + this.origin.y
          });
          if (!stored) return;
          translatedPixels[`${x},${y}`] = stored;
        })
      );
      return translatedPixels;
    },
    getEmptyMatrix() {
      return Array(this.width)
        .fill(null)
        .map(() => Array(this.width).fill(null));
    },
    update({ x, y }, stroke = false) {
      let state = this.pixels[`${x},${y}`]
        ? !this.pixels[`${x},${y}`].state
        : true;
      state = stroke ? true : state;
      this.$store.commit("setPixel", {
        x: x + this.origin.x,
        y: y + this.origin.y,
        state,
        color: this.color
      });
      this.refresh();
    }
  }
};
</script>
