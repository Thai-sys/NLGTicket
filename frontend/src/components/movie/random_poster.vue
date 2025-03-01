<template>
  <div class="modal fade show d-block" v-if="isVisible">
    
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content position-relative">
        <div>
          <button
          class="btn-close position-absolute top-0 end-0 m-3"
          @click="closeModal"
        ></button>
        <img :src="posterSrc" class="img-fluid rounded img" alt="Movie Poster" />
        </div>
        <div class="text-center mt-3">
          <button
            class="btn btn-warning btn-lg fw-bold px-4 py-2"
            @click="bookTicket"
          >
            ĐẶT VÉ NGAY
          </button>
        </div>
      </div>
    </div>
    
  </div>
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
      posterSrc: "",
      movies: [], 
    };
  },
  mounted() {
    // Gọi API để lấy danh sách phim
    fetch("http://localhost:5000/api/movie/get_list")
      .then((response) => response.json())
      .then((data) => {
        this.movies = data; // Lưu danh sách phim vào data
        this.setRandomPoster(); // Gọi hàm để chọn poster ngẫu nhiên
        
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      });
     console.log(this.response)
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    bookTicket() {
      alert("Chức năng đặt vé đang phát triển!");
    },
    setRandomPoster() {
      if (this.movies.length > 0) {
        const randomMovie = this.movies[Math.floor(Math.random() * this.movies.length)];
        this.posterSrc = new URL(`../../assets/poster/${randomMovie.poster}`, import.meta.url).href;
        console.log(this.posterSrc)
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  background: transparent;
  border: none;
}
.btn-warning {
  font-size: 1.2rem;
  border-radius: 30px;
}
.img {
  width: 85%;
  height: 500px; 
  object-fit: cover;
  border-radius: 10px;
}

</style>
