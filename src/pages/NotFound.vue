<script>
import BackHome from '../components/BackHome.vue';

export default {
    name: 'NotFound',
    components: { BackHome }
}
</script>

<template>
  <div class="image">
    <img src="https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg" alt="image" loading="lazy">
  </div>
  <BackHome />
</template>

<style lang="scss" scoped>
.image{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  img{
    object-fit: contain;
  }
}
</style>