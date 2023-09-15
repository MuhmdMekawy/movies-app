<script>
import axios from 'axios'
import BackHome from '../components/BackHome.vue'
export default {
    name: 'DetailedMovie',
    data() {
        return {
            MovieData: []
        };
    },
    computed: {
        getMovieId() {
            return this.$route.params.id;
        }
    },
    methods: {
        async fetchData() {
            await axios.get('https://advanced-movie-search.p.rapidapi.com/movies/getdetails', {
                params: { movie_id: this.getMovieId },
                headers: {
                    'X-RapidAPI-Key': 'bf736c96cemsh65cd5b8678a7252p1251e7jsn83c9ef881654',
                    'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
                }
            }).then((res) => {
                return this.MovieData.push(res.data);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    },
    created() {
        return this.fetchData();
    },
    components: { BackHome }
}
</script>

<template>
  {{ console.log(MovieData) }}
  <div class="movie" v-for="item in MovieData" :key="item?.id">
    <div class="background-image"><img :src="item?.backdrop_path" alt="image" loading="lazy"></div>
    <div class="container">
      <div class="content">
        <div class="text">
          <h2><span>{{ item.title }}</span> <span class="badge bg-success" v-for="lang in item.spoken_languages" key="lang.name">{{ lang.english_name }}</span></h2>
          
          <h3>Status : <span>{{ item.status }}</span></h3>
          <h4>Tagline : <span>{{ item.tagline }}</span></h4>
          <p>overview : <span>{{ item.overview }}</span></p>
          <ul>
            <li>Genres :</li>
            <li v-for="genre in item.genres" :key="genre.id">{{ genre.name }}</li>
          </ul>
          <h5>To move to the Movie Homepage just <a :href="item.homepage">Click here</a></h5>
          <ul>
            <li>Production Countries:</li>
            <li v-for="country in item.production_countries" :key="country.name">{{ country.name }}</li>
          </ul>
          <h6>Production Companies:</h6>
          <ol>
            <li v-for="company in item.production_companies" :key="company.id"> <div class="logo"><img :src="company.logo_path" :alt="company.name + ' image'" loading="lazy"></div> <h6>{{ company.name }}</h6> <p>Origin Country : {{ company.origin_country }}</p> </li><hr> 
          </ol>
        </div>
        <div class="movie-poster">
          <img :src="item.poster_path" :alt="item.title" loading="lazy">
        </div>
      </div>
    </div>
  </div>
  <BackHome class="specialBtn"/>
</template>

<style lang="scss" scoped>
.movie{
  position: relative;
  .background-image{
    height: 400px;
    overflow: hidden;
    img{
      object-fit: cover;
      object-position: center;
    }
  }
  .content{
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    align-items: flex-start;
    .movie-poster{
      margin-top: -180px;
      border-radius: 8px;
      overflow: hidden;
      position: sticky;
      top: 0;
    }
    .text{
      padding: 50px 0;
      h2{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 40px;
        margin-bottom: 30px;
        text-transform: uppercase;
        span:nth-child(1){
          font-family: 'Black Ops One', cursive;
        }
        .badge{
          font-size: 20px;
        }
      }
      h3{
        font-size: 20px;
        margin-bottom: 30px;
        span{
          color: #FF6000;
        }
      }
      h4{
        font-size: 18px;
        margin-bottom: 0px;
        span{
          color: #FF6000;
        }
      }
      p{
        font-size: 20px;
        margin: 30px 0;
        // color: #FF6000;
        @media (max-width : 500px){
            font-size: 14px;
          }
        span{
          color: #89375F;
          font-weight: 700;
        }
      }
      ul{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        @media (max-width : 500px){
          flex-direction: column;
          align-items: flex-start;
          li:not(:nth-child(1)){
            width: 150px;
            text-align: center;
          }
        }
        li:not(:nth-child(1)){
          padding: 5px 15px;
          background: #FF6000;
          color: #fff;
          border-radius: 5px;
        }
      }
      h5{
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 30px;
        a{
          color: #FF6000;
          font-weight: 700;
          transition: 0.3s;
          &:hover{
            text-decoration: underline;
          }
        }
        +ul{
          @media (max-width : 767px){
            flex-direction: column;
            align-items: flex-start;
            li{
              width: fit-content !important;
            }
          }
        }
        +h6{
          font-size: 30px;
          font-weight: 500;
          margin-bottom: 20px;          
        }
      }
      ol{
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: flex-start;
        li{
          margin-top: 15px;
          text-align: center;
          border: 1px solid #89375F;
          padding: 15px 5px;
          min-width: 300px;
          img{
            max-width: 200px;
            margin-bottom: 20px;
          }
          h6{
            margin: 20px 0;
            font-size: 18px;
            font-weight: 500;
            color: #FF6000;
          }
          p{
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
    @media (max-width : 991px){
      display: flex;
      flex-direction: column-reverse;
      gap: 30px;
      .movie-poster{
        position: initial !important;
        max-width: 400px;
      }
    }
  }
}
.specialBtn{
  position: fixed;
  right: 20px;
  bottom: 0px;
  button{
    border-radius: 50% !important;
    background-color: #89375F !important;
  }
}
</style>