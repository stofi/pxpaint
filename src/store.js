import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pixels: {}
  },
  mutations: {
    setPixel(state, pixel) {
      Vue.set(state.pixels, `${pixel.x},${pixel.y}`, pixel)
    },
    deletePixel(state, pixel) {
      Vue.delete(state.pixels, `${pixel.x},${pixel.y}`)
    }
  },
  getters: {
    getPixel: state => ({ x, y }) => {
      return state.pixels[`${x},${y}`]
    }
  },
  actions: {}
})
