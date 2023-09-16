<script>
export default {
  name : 'NotFound'
}
</script>

<template>
  <div class="image">
    <img src="https://c4.wallpaperflare.com/wallpaper/1017/578/412/typography-1920x1080-error404-wallpaper-preview.jpg" alt="image" loading="lazy">
  </div>
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
  background: #191615;
  img{
    object-fit: contain;
  }
}
</style>