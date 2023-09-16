<template>
  <Carousel class='slider' v-bind="settings" :breakpoints="breakpoints" :autoplay="1500" :wrap-around="true">
    <Slide class="slide" v-for="slide in slides" :key="slide">
      <img :src="slide.imgUrl" :alt="slide.alt">
      <!-- {{ console.log(slide.imgUrl) }} -->
      <div class="text">
        <h1>Movies App</h1>
        <p>Hope You Enjoy</p>
      </div>
    </Slide>

    <!-- <template #addons>
      <Navigation />
      <Pagination />
    </template> -->
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
  name: 'HomeSlider',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      slides: [
        {imgUrl : 'https://image.tmdb.org/t/p/original/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/9m161GawbY3cWxe6txd1NOHTjd0.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/2ii07lSwHarg0gWnJoCYL3Gyd1j.jpg' , alt : 'slide image'},
        {imgUrl : 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg' , alt : 'slide image'},
      ],
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: 'start',
        },
      },
      methods: {
        fetchData(){}
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.slider{
  .slide{
    position: relative;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #000000b8;
      z-index: 2;
    }
    .text{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50% , -50%);
      z-index: 3;
      color: white;
      font-family: 'Black Ops One', cursive;
      h1{
        font-size: 60px;
        font-weight: 600;
        margin-bottom: 8px;
        @media (max-width : 767px){
          font-size: 35px;
        }
        @media (max-width : 400px){
          font-size: 28px;
        }
      }
      p{
        margin-bottom: 0;
        font-size: 20px;
        font-weight: 400;
      }
    }
  }
}
</style>
