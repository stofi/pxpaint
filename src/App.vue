<template>
  <div id="app" class="bg-gray-100 h-screen w-screen p-4 flex justify-around">
    <div class="container flex flex-col md:flex-row">
      <div class="md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <display :pixels="pixels" @update="update" />
      </div>
      <div class="md:w-1/2 flex flex-col">
        <div class="rounded mb-4 p-4 bg-gray-300">
          <div class="text-gray-900 text-xl leading-relaxed">
            Origin
          </div>
          <div class="flex mt-2">
            <number-input class="mr-2" title="x:" v-model="offsetX" />
            <number-input title="y:" v-model="offsetY" />
          </div>
        </div>
        <px-output :pixel-codes="pixelCodes" />
      </div>
    </div>
  </div>
</template>

<script>
import display from "./components/display";
import numberInput from "./components/numberInput";
import pxOutput from "./components/output";

export default {
  name: "app",
  components: {
    display,
    numberInput,
    pxOutput
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      pixels: [[]],
      width: 20
    };
  },
  computed: {
    pixelCodes() {
      let codes = [];
      this.pixels.forEach((row, y) =>
        row.forEach((pixel, x) => {
          if (pixel.state) {
            codes.push({
              x: this.offsetX + x,
              y: this.offsetY + y,
              color: "#000000"
            });
          }
        })
      );
      return codes;
    }
  },
  mounted() {
    this.pixels = this.getPixels();
  },
  methods: {
    getPixels(pxFn = this.empty) {
      return Array(this.width)
        .fill(null)
        .map(() =>
          Array(this.width)
            .fill(null)
            .map(pxFn)
        );
    },
    randomPixels() {
      return this.getPixels(() => this.cointoss());
    },
    empty() {
      return { state: false };
    },
    cointoss(odds = 0.5) {
      return {
        state: Math.random() > odds
      };
    },
    update({ x, y }) {
      if (x > this.width || y > this.width) return;
      let copy = this.pixels.slice();
      copy[y][x] = { state: !copy[y][x].state };
      this.pixels = copy;
    }
  }
};
</script>
