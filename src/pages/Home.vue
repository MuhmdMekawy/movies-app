<script>
import HomeSlider from '../components/HomeSlider.vue';
import Loading from '../components/Loading.vue';
import axios from 'axios'
export default {
  name: 'Home',
  components: { HomeSlider , Loading },
  data() {
    return {
      genres: null,
      loading : false,
    }
  },
  methods: {
    async fetchData() {
      return this.loading =true,
      await axios.get("https://advanced-movie-search.p.rapidapi.com/genre/movie/list", {
        headers: {
          'X-RapidAPI-Key': 'bf736c96cemsh65cd5b8678a7252p1251e7jsn83c9ef881654',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      }).then((res) => {
        return this.loading = false , this.genres = res.data.genres
      }).catch(error => {
        console.log(error.message)
      })
    }
  },
  created() {
    return this.fetchData()
  }
}
</script>

<template>
  <Loading  v-if="loading === true"/>
  <HomeSlider v-if="loading === false"/>
  <div class="home" v-if="loading === false">
    <div class="container">
      <h2>Categories</h2>
      <div class="content">
        <RouterLink :to="'/genre/'+item.name+'/'+item.id" class="cont" v-for="item in genres" :key="item.id">
          <h4>{{item.name}}</h4>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home{
  padding: 20px 0;
  @media (max-width : 991px) {
    padding: 0;
  }
  h2{
    font-size: 40px;
    font-weight: 600;
    margin: 40px 0;
    @media (max-width : 991px) {
      margin: 30px 0 20px;
    }
  }
  .content{
    display: grid;
    grid-template-columns: repeat( 4 , 1fr);
    gap: 30px;
    align-items: center;
    @media (max-width : 1200px) {
      grid-template-columns: repeat(3 , 1fr);
      gap: 20px;
    }
    @media (max-width : 991px) {
      grid-template-columns: repeat(2 , 1fr);
    }
    @media (max-width : 400px) {
      grid-template-columns: repeat(1 , 1fr);
    }
    .cont{
      background: #252B48;
      color: #fff;
      text-align: center;
      padding: 50px 0;
      border-radius: 5px;
      position: relative;
      z-index: 3;
      overflow: hidden;
      font-family: 'Black Ops One', cursive;
      &::after{
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        width: 0%;
        height: 100%;
        background: #445069;
        z-index: -1;
        transition: 0.3s;
      }
      &::before{
        content: '';
        position: absolute;
        right: 50%;
        top: 0;
        width: 0%;
        height: 100%;
        background: #445069;
        z-index: -1;
        transition: 0.3s;
      }
      &:hover{
        &::after{
          left: 0;
          width: 50%;
        }
        &::before{
          right: 0;
          width: 50%;
        }
      }
    }
  }
}
</style>