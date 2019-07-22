<template>
  <div class="flex flex-col md:flex-row">
    <div class="Display relative w-100">
      <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
        <div class="flex flex-1" v-for="(row, x) in pixels" :key="'row' + x">
          <pixel
            @px-click="update({ x, y })"
            class="flex-1"
            v-for="(pixel, y) in row"
            :key="'px' + y + '' + x"
            :color="pixel.state ? 'black' : 'white'"
          />
        </div>
      </div>
    </div>
    <div class="p-4">
      <pre v-for="{ x, y } in pixelCodes" :key="`pxcode${x}${y}`">{{
        `(${20 + x}, ${96 + y}) #000000`
      }}</pre>
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
    width: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      pixels: [[]]
    };
  },
  mounted() {
    this.pixels = this.getPixels();
  },
  computed: {
    pixelCodes() {
      let codes = [];
      this.pixels.forEach((row, x) =>
        row.forEach((pixel, y) => {
          if (pixel.state) {
            codes.push({ x, y });
          }
        })
      );

      return codes;
    }
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
      let copy = this.pixels.slice();
      copy[x][y] = { state: true };

      this.pixels = copy;
    }
  }
};
</script>
<style scoped>
.Display {
  padding-bottom: 100%;
}
</style>
