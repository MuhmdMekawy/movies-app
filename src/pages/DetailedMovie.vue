<script>
import axios from 'axios'
import BackHome from '../components/BackHome.vue'
export default {
    name: 'DetailedMovie',
    data() {
        return {
          MovieData: [],
          showPopup : false
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
    'X-RapidAPI-Key': '4ba37645e9msha7d66e7837b56b3p1572c4jsnb64c57e32452',
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
  <!-- {{ console.log(MovieData) }} -->
  <div class="movie-popup" v-if="showPopup === true">
    <div class="close-icon" @click="showPopup = false">X</div>
    <video src="https://cdn.pixabay.com/vimeo/842348732/starry-sky-169951.mp4?width=1280&hash=e5539835d59fc7ffab8d6b18b75eba9e3a1da3ec" controls autoplay loop></video>
  </div>
  <div class="movie" v-for="item in MovieData" :key="item?.id" :style="showPopup === true ? 'filter : blur(5px)' : ''">
    <div class="background-image"><img :src="item?.backdrop_path === null ? 'https://r4.wallpaperflare.com/wallpaper/196/131/596/star-wars-darth-vader-movies-anakin-skywalker-wallpaper-a980880d31aa8d1b76a738afc0c1967d.jpg' : item?.backdrop_path" alt="image" loading="lazy"></div>
    <div class="container">
      <div class="content">
        <div class="text">
          <h2><span>{{ item.title }}</span></h2>
          <div class="tabs"><span class="badge bg-success" v-for="lang in item.spoken_languages" key="lang.name">{{ lang.english_name }}</span></div>
          <h3>Status : <span>{{ item.status }}</span></h3>
          <h4 v-if="item.tagline.length !== 0">Tagline : <span>{{ item.tagline }}</span></h4>
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
            <!-- <div class="logo"><img :src="company.logo_path" :alt="company.name + ' image'" loading="lazy"></div>  -->
            <li v-for="company in item.production_companies" :key="company.id"> <h6>{{ company.name }}</h6> <p>Origin Country : {{ company.origin_country }}</p> </li><hr> 
          </ol>
        </div>
        <div class="movie-poster">
          <img :src="item.poster_path" :alt="item.title" loading="lazy">
          <div class="icon" @click="showPopup = true">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BackHome class="specialBtn"/>
</template>

<style lang="scss" scoped>
.movie-popup{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  max-width: 1200px;
  width: 100%;
  padding: 10px;
  .close-icon{
    position: absolute;
    top: 15px;
    right: 15px;
    background: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 9;
    &:hover{
      border: 1px solid #fff;
      background: transparent;
      color: #fff;
    }
  }
}
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
      // position: relative;
        .icon{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #4e30837d;
          color: #fff;
          // display: none;
          transition: 0.3s;
          &>span{
            padding: 15px;
            border: 1px solid;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50% , -50%);
            overflow: hidden;
            cursor: pointer;
            &:hover{
              background: #fff;
              color: #4e3083;
            }
          }
        }
        &:hover{
        .icon{
          display: initial;
        }
      }
    }
    .text{
      padding: 50px 0;
      @media (max-width : 500px){
        padding: 10px 0;
      }
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
        @media (max-width : 767px){
          font-size: 30px;
        }
        @media (max-width : 500px){
          font-size: 20px;
        }
        span:nth-child(1){
          font-family: 'Black Ops One', cursive;
        }
      }
      .tabs{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        @media (max-width : 400px){
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          .badge{
            width: 150px;
            text-align: center;
          }
        }
        .badge{
          font-size: 20px;
          margin: 0 5px;
        }
      }
      h3{
        font-size: 20px;
        margin-top: 20px;
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
        position: relative !important;
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