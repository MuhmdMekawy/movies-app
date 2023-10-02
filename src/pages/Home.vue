<script>
import { RouterLink } from 'vue-router';
import HomeSlider from '../components/HomeSlider.vue';
import Loading from '../components/Loading.vue';
import axios from 'axios'
export default {
  name: 'Home',
  components: { HomeSlider, Loading, RouterLink },
  data() {
    return {
      genres: null,
      loading: false,
      showOffcanvas: false,
      movieName: '',
      searchPageNumber : 1 ,
      searchResult: null,
      MoviesLoading : false
    }
  },
  computed: {
    RouteTo(routeId) {
      this.$route.push({ name: 'DetailedMovie', params: { id: routeId } })
      this.$nextTick(() => {
        window.location.reload()
      });
    }
  },
  methods: {
    async fetchSpecificMovie() {
      return this.MoviesLoading = true ,
      await axios.get('https://advanced-movie-search.p.rapidapi.com/search/movie', {
        params: {query: `${this.movieName}` , page : this.searchPageNumber},
        headers: {
    'X-RapidAPI-Key': '4ba37645e9msha7d66e7837b56b3p1572c4jsnb64c57e32452',
    'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
  }
      }).then((res) => {
        return this.MoviesLoading = false , this.searchResult = res.data.results
      })
    },
    async fetchData() {
      return this.loading =true,
      await axios.get("https://advanced-movie-search.p.rapidapi.com/genre/movie/list", {
        headers: {
    'X-RapidAPI-Key': '4ba37645e9msha7d66e7837b56b3p1572c4jsnb64c57e32452',
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
  <!-- {{ console.log(searchResult) }} -->
  <Loading  v-if="loading === true"/>
  <HomeSlider v-if="loading === false"/>
  <div class="container"  v-if="loading === false">
    <div class="input">
      <input type="text" placeholder="Looking for a specific Movie?" v-model="movieName">
      <button class="btn btn-primary" @click="fetchSpecificMovie" v-if="movieName.length !== 0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>

      <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasTopLabel">Search for <span>{{ movieName }}</span> Movie</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
        </div>
        <div class="offcanvas-body">
          <Loading v-if="MoviesLoading === true" />
          <div class="content" v-if="MoviesLoading === false">
            <RouterLink :to="'/movie/'+ item.id" @click="item.id" class="cont" v-for="item in searchResult" :key="item.id">
              <div class="image"><img :src="item.poster_path" alt="image" loading="lazy"></div>
              <h3>{{item.title}}</h3>
            </RouterLink>
          </div>
          <div class="pagination" v-if="MoviesLoading === false">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 1 ? ' active' : '')" @click="searchPageNumber=1 ; fetchSpecificMovie(1)">1</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 2 ? ' active' : '')" @click="searchPageNumber=2 ;  fetchSpecificMovie(2)">2</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 3 ? ' active' : '')"  @click="searchPageNumber=3 ; fetchSpecificMovie(3)">3</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 4 ? ' active' : '')"  @click="searchPageNumber=4 ; fetchSpecificMovie(4)">4</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 5 ? ' active' : '')"  @click="searchPageNumber=5 ; fetchSpecificMovie(5)">5</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 6 ? ' active' : '')"  @click="searchPageNumber=6 ; fetchSpecificMovie(6)">6</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 7 ? ' active' : '')"  @click="searchPageNumber=7 ; fetchSpecificMovie(7)">7</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 8 ? ' active' : '')"  @click="searchPageNumber=8 ; fetchSpecificMovie(8)">8</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 9 ? ' active' : '')"  @click="searchPageNumber=9 ; fetchSpecificMovie(9)">9</p></li>
                <li class="page-item"><p :class="'page-link'+ (searchPageNumber === 10 ? ' active' : '')"  @click="searchPageNumber=10 ; fetchSpecificMovie(10)">10</p></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.offcanvas-top{
  height: 100%;
  background: #252B48;
  color: #fff;
  .btn-close{
    background: #fff !important;
    padding: 4px 8px 12px;
  }
}
.offcanvas-title{
  span{
    color: orange;
    text-transform: uppercase;
  }
}
.offcanvas-body{
  .content{
    display: grid;
    grid-template-columns: repeat(4 ,1fr);
    gap: 30px;
    align-items: flex-start;
    @media (max-width : 991px) {
      grid-template-columns: repeat(3 , 1fr);
    }
    @media (max-width : 767px) {
      grid-template-columns: repeat(2 , 1fr);
    }
    @media (max-width : 550px) {
      .cont{
        .image{
          img{
            object-fit: cover !important;
          }
        }
      }
    }
    @media (max-width : 400px) {
      grid-template-columns: repeat(1 , 1fr);
      .cont{
        .image{
          img{
            object-fit: contain !important;
          }
        }
      }
    }
    .cont{
      text-align: center;
      .image{
        height: 300px;
        img{
          object-fit: contain;
        }
      }
      h3{
        font-size: 14px;
        margin: 10px 0;
        transition: 0.3s;
      }
      &:hover{
        h3{
          color: #E55604;
        }
      }
    }
  }
  .pagination{
    margin: 20px 0 0;
    justify-content: center !important;
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
.input{
  width: 100%;
  margin: 50px 0 30px;
  position: relative;
  input{
    width: 100%;
    padding: 10px 15px; 
    border-radius: 25px;
    outline: none;
    border: 1px solid #333;
  }
  .btn-primary{
    position: absolute;
    right: 8px;
    top: 6px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    border: 1px solid #333;
    background: #fff;
    transition: 0.3s;
    padding: 0 0 4px;
    color: black;
    &:hover{
      background: #252B48;
      color: #fff;
    }
  }
}
.home{
  padding: 20px 0;
  @media (max-width : 991px) {
    padding: 0;
  }
  h2{
    font-size: 40px;
    font-weight: 600;
    margin: 0px 0 40px;
    @media (max-width : 991px) {
      margin: 0px 0 20px;
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