<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "custom-button",
};
</script>

<style scoped>
button {
  width: 100%;
  height: 49px;
  background-color: #0066ff;
  border-radius: 37px;
  color: white;
  border: 0;
  font-size: 16px;
  transition: all .3s;
  box-shadow: 0px 4px 16px rgba(0, 102, 255, 0.42);
}
button:disabled {
  background: rgba(50, 50, 50, 0.7);
  box-shadow: 0px 4px 16px rgba(50, 50, 50, 0.42);
}
</style>
