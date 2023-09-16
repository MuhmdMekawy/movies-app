<script>
export default {
  name : 'Loading'
}

</script>

<template>
  <div class="loading">
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #27005D;
  z-index: 99999;
}
.loader {
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    display: inline-block;
}
.loader::after,
.loader::before {
  content: '';  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  animation: animloader 2s ease-in-out infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0%, 100% {
    transform: scale(0);
    opacity: 1;
}
  50% {
    transform: scale(1);
    opacity: 0;
}
}

</style>