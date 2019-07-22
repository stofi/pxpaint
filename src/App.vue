<template>
  <div id="app">
    <display :width="20" />
  </div>
</template>

<script>
import display from "./components/display";

export default {
  name: "app",
  components: {
    display
  }
};
</script>
