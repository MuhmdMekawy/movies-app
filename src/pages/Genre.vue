<script>
import axios from 'axios'
import Loading from '../components/Loading.vue'
import BackHome from '../components/BackHome.vue'

export default {
  name: 'Genre',
  data() {
    return {
      activePagination : 1 ,
      movies: null,
      loading : false
    }
  },
  components:{Loading , BackHome},
  computed: {
    getGenreData() {
      return {
        genreId : this.$route.params.id ,
        genreName : this.$route.params.name
      } 
    }
  },
  methods: {
    async fetchData(pageNumber) {
      return this.loading=true,
      await axios.get('https://advanced-movie-search.p.rapidapi.com/discover/movie', {
        params: {
          with_genres: this.getGenreData.genreId,
          page: `${pageNumber}`
        },
        headers: {
          'X-RapidAPI-Key': 'bf736c96cemsh65cd5b8678a7252p1251e7jsn83c9ef881654',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      }).then((res) => {
        return this.loading=false, this.movies = res.data.results
      }).catch((error) => {
        console.log(error.message)
      })
    }
  },
  created() {
    return this.fetchData(1)
  }
}
</script>

<template>
  <!-- {{ console.log(movies) }} -->
  <Loading v-if="loading === true" />
  <div class="header-image" v-if="loading === false"><h2>{{getGenreData.genreName}} Movies</h2></div>
  <div class="genres" v-if="loading === false">
    <BackHome />
    <div class="container">
      <div class="content">
        <div class="cont" v-for="movie in movies" :key="movie.id">
          <div class="image"><img :src="movie.backdrop_path" :alt="movie.id" loading="lazy"></div>
          <div class="title"><h3>{{ movie.title }}</h3></div>
          <div class="badge bg-warning">{{ movie.vote_average }}</div>
        </div>
      </div>
      <div class="pagination">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item"><p :class="'page-link'+ (activePagination === 1 ? ' active' : '')" @click="activePagination=1 ; fetchData(1)">1</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 2 ? ' active' : '')" @click="activePagination=2 ;  fetchData(2)">2</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 3 ? ' active' : '')"  @click="activePagination=3 ; fetchData(3)">3</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 4 ? ' active' : '')"  @click="activePagination=4 ; fetchData(4)">4</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 5 ? ' active' : '')"  @click="activePagination=5 ; fetchData(5)">5</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 6 ? ' active' : '')"  @click="activePagination=6 ; fetchData(6)">6</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 7 ? ' active' : '')"  @click="activePagination=7 ; fetchData(7)">7</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 8 ? ' active' : '')"  @click="activePagination=8 ; fetchData(8)">8</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 9 ? ' active' : '')"  @click="activePagination=9 ; fetchData(9)">9</p></li>
            <li class="page-item"><p :class="'page-link'+ (activePagination === 10 ? ' active' : '')"  @click="activePagination=10 ; fetchData(10)">10</p></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <!-- {{ console.log(activePagination) }} -->
</template>

<style lang="scss" scoped>
.header-image{
  position: relative;
    background: #4b6e7f;
    padding: 20px 0;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
  h2{
    font-size: 50px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 0px;
    font-family: 'Black Ops One', cursive;
    @media (max-width : 767px) {
      font-size: 30px;
    }
  }
}
.genres{
  background: url('https://r4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-3be62c2d93012fc995842bf94d4cdc00.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  padding: 50px 0;
  position: relative;
  z-index: 3;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.315);
    z-index: -1;
  }
  .content{
    display: grid;
    grid-template-columns: repeat(4 , 1fr);
    gap: 20px;
    align-items: flex-start;
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
      background: #333;
      position: relative;
      // height: 250px;
      border-radius: 5px;
      overflow: hidden;
      &:hover{
        .title{
          height: 100%;
          top: 0;
        }
        .badge{
          display: none;
        }
      }
      .title{
        transition: 0.3s;
        // display: none;
        position: absolute;
        left: 0;
        top: -100%;
        width: 100%;
        height: 0;
        background: #ffffffc0;
        color: #333;
        text-align: center;
        z-index: 3;
        h3{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          font-size: 16px;
          margin-bottom: 0;
        }
      }
      .badge{
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 2;
      }
    }
  }
  .pagination{
    margin: 20px 0 0;
    justify-content: center;
    .page-item{
      .page-link{
        cursor: pointer;
        @media (max-width : 400px){
          padding: 10px;
        }
      }
    }
  }
}
</style>