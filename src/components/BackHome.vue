<script>
export default {
  name: 'BackHome',
  
}
</script>

<template>
  <a href="/"><button><img src="https://cdn-icons-png.flaticon.com/128/1040/1040993.png" alt="image" loading="lazy"></button></a>
</template>

<style lang="scss" scoped>
button{
  width: 55px;
  height: 55px;
  border-radius: 15px 15px 0 0 ;
  padding: 9px;
  position: absolute;
  bottom: 0px;
  right: 30px;
  border: none;
  z-index: 9;
  background: cornflowerblue;
  transition: 0.3s;
  &:hover{
    background: #fff;
    border: 3px solid cornflowerblue;
  }
  img{
    object-fit: contain;
  }
}
</style>