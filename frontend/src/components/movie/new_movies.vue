<template>
  <div class="container">
    <h2 class="text-center">Phim Đang Chiếu</h2>

    <div class="movie-list">
      <button class="nav-btn left" @click="prevMovies" v-if="currentIndex > 0">
        ❮
      </button>

      <div class="movie-wrapper">
        <div class="movie-container" :style="movieSlideStyle">
          <div class="movie" v-for="movie in movies" :key="movie.id">
            <div class="poster-wrapper">
              <img
                :src="getPoster(movie.poster)"
                class="poster"
                alt="Movie Poster"
              />
              <div class="movie-title">{{ movie.title }}</div>
            </div>
            <div class="btn-group">
              <button class="btn btn-book" @click="bookTicket(movie.id)">
                🎫 Đặt Vé Ngay
              </button>
              <button class="btn btn-detail" @click="viewDetails(movie.movie_id)">
                ℹ️
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="nav-btn right"
        @click="nextMovies"
        v-if="currentIndex < maxIndex"
      >
        ❯
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      currentIndex: 0,
      itemsPerPage: 5,
      transitionSpeed: 600,
    };
  },
  computed: {
    maxIndex() {
      return Math.max(0, this.movies.length - this.itemsPerPage);
    },
    movieSlideStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 210}px)`,
        transition: `transform ${this.transitionSpeed}ms ease-in-out`,
      };
    },
  },
  mounted() {
    fetch("http://localhost:5000/api/movie/get_list")
      .then((response) => response.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD
        this.movies = data.filter((movie) => movie.release_date <= today);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      });
  },
  methods: {
    getPoster(poster) {
      return new URL(`../../assets/poster/${poster}`, import.meta.url).href;
    },
    nextMovies() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
      }
      console.log(this.currentIndex);
    },
    prevMovies() {
      if (this.currentIndex >= 0) {
        this.currentIndex--;
      }
    },
    bookTicket(movieId) {
      alert(`Đặt vé cho phim ID: ${movieId}`);
    },
    viewDetails(movieId) {
      this.$router.push({ path: `/movie-details/${movieId}` });
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  background-color: rgb(252, 215, 192);
}
.movie-list {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.movie-wrapper {
  width: 100%;
  overflow: hidden;
}
.movie-container {
  display: flex;
  gap: 10px;
  transition: transform 0.5s ease-in-out;
}
.movie {
  text-align: center;
  width: 200px;
  flex-shrink: 0;
}
.poster-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
.poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}
.movie-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}
.poster-wrapper:hover .movie-title {
  transform: translateY(0);
}
.btn-group {
  margin-top: 2px;
  display: flex;
  gap: 5px;
  justify-content: center;
}

.btn {
  display: inline-block;
  width: 100px;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-book {
  background: linear-gradient(45deg, #ca1010, #c53030);
  color: white;
  border: none;
}

.btn-book:hover {
  background: linear-gradient(45deg, #890101, #7a0000);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(255, 123, 0, 0.5);
}

.btn-detail {
  background: linear-gradient(45deg, #484747, #000000);
  color: white;
  border: none;
}

.btn-detail:hover {
  background: linear-gradient(45deg, #0b2135, #000000);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 168, 255, 0.5);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(94, 94, 94, 0.7);
  color: white;
  border: none;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 50%;
  transition: 0.3s;
}
.nav-btn.left {
  left: 10px;
  z-index: 1000;
}
.nav-btn.right {
  right: 5px;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: black;
}
</style>
