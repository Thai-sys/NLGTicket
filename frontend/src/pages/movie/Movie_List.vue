<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="text-center"></h2>

      <div class="menu-wrapper">
        <div class="dropdown-menu">
          <button
            :class="{ active: filterType === 'all' }"
            @click="filterMovies('all')"
          >
            Tất Cả
          </button>
          <button
            :class="{ active: filterType === 'now_showing' }"
            @click="filterMovies('now_showing')"
          >
            Phim Đang Chiếu
          </button>
          <button
            :class="{ active: filterType === 'coming_soon' }"
            @click="filterMovies('coming_soon')"
          >
            Phim Sắp Chiếu
          </button>
        </div>
      </div>

      <div class="movie-grid">
        <div class="movie" v-for="movie in displayedMovies" :key="movie.id">
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
              🎫 Đặt Vé
            </button>
            <button class="btn btn-detail" @click="viewDetails(movie.movie_id)">
              ℹ️ Chi Tiết
            </button>
          </div>
        </div>
      </div>

      <button v-if="canLoadMore" class="btn-load-more" @click="loadMoreMovies">
        Xem Thêm
      </button>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  name: "Movie_List",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      movies: [],
      filterType: "all",
      visibleCount: 10,
    };
  },
  computed: {
    filteredMovies() {
      const today = new Date().toISOString().split("T")[0];
      return this.movies.filter((movie) => {
        if (this.filterType === "all") return true;
        return this.filterType === "now_showing"
          ? movie.release_date <= today
          : movie.release_date > today;
      });
    },
    displayedMovies() {
      return this.filteredMovies.slice(0, this.visibleCount);
    },
    canLoadMore() {
      return this.visibleCount < this.filteredMovies.length;
    },
  },
  mounted() {
    fetch("http://localhost:5000/api/movie/get_list")
      .then((response) => response.json())
      .then((data) => {
        this.movies = data;
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      });
  },
  methods: {
    getPoster(poster) {
      return new URL(`../../assets/poster/${poster}`, import.meta.url).href;
    },
    bookTicket(movieId) {
      alert(`Đặt vé cho phim ID: ${movieId}`);
    },
    viewDetails(movieId) {
      this.$router.push({ path: `/movie-details/${movieId}` });
    },
    filterMovies(type) {
      this.filterType = type;
      this.visibleCount = 5;
    },
    loadMoreMovies() {
      this.visibleCount += 5;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  background-color: rgb(252, 215, 192);
  padding: 20px;
}
.text-center {
  text-align: center;
  margin-bottom: 20px;
}
.menu-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.dropdown-menu {
  display: flex;
  gap: 10px;
  padding: 10px;
}
.dropdown-menu button {
  flex: 1;
  padding: 10px 15px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.3s;
}
.dropdown-menu button:hover,
.dropdown-menu button.active {
  background: #ff5500;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  justify-content: center;
}
.movie {
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 5px;
}
.btn-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}
.btn {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.btn-book {
  background: #c53030;
  color: white;
  border: none;
}
.btn-detail {
  background: #484747;
  color: white;
  border: none;
}
.btn-book:hover {
  background: #7a0000;
}
.btn-detail:hover {
  background: #000000;
}
.btn-load-more {
  display: block;
  margin: 20px auto;
  padding: 10px 15px;
  background: #c45316;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-load-more:hover {
  background: #d75509;
}
</style>