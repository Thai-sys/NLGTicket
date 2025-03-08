<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="title">Nội Dung Phim</h2>

      <div v-if="movie" class="movie-detail">
        <!-- Poster bên trái -->
        <div class="poster-container">
          <img
            :src="getPoster(movie.poster)"
            alt="Movie Poster"
            class="poster"
          />
        </div>

        <!-- Thông tin phim bên phải -->
        <div class="info-container">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <hr />
          <p class="release-date">
            <strong>Ngày phát hành:</strong> {{ movie.release_date }}
          </p>
          <p class="release-date">
            <strong>Đạo diễn:</strong> {{ movie.directors }}
          </p>
          <p class="release-date">
            <strong>Diễn viên:</strong> {{ movie.actors }}
          </p>

          <p class="genre"><strong>Thể loại:</strong> {{ movie.genre }}</p>
          <p class="release-date"><strong>Độ tuổi:</strong> {{ movie.age }}</p>
          <p class="duration">
            <strong>Thời lượng:</strong> {{ movie.duration }} phút
          </p>
          <hr />
          <div class="actions">
            <!-- Nút Xem Ngay mở modal -->
            <button class="watch-button" @click="showModal = true">
              Trailer
            </button>
            <!-- Nút Đặt Vé điều hướng -->
            <button class="ticket-button" @click="bookTicket">Đặt Vé</button>
          </div>
        </div>
      </div>
      <br /><br />
      <p v-if="movie" class="description">
        <strong></strong> {{ movie.description }}
      </p>
    </div>
    <Footer />

    <!-- Modal xem phim -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <iframe
          width="100%"
          height="400px"
          :src="getEmbedUrl(movie.video)"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      movie: null,
      showModal: false, // Trạng thái hiển thị modal
    };
  },
  mounted() {
    const movieId = this.$route.params.id;
    fetch(`http://localhost:5000/api/movie/get_movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        this.movie = {
          ...data,
          release_date: this.formatDate(data.release_date),
        };
      })
      .catch((error) => console.error("Lỗi khi lấy chi tiết phim:", error));
  },
  methods: {
    getPoster(poster) {
      return new URL(`../../assets/poster/${poster}`, import.meta.url).href;
    },
    formatDate(dateString) {
      if (!dateString) return "Không có dữ liệu";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    getEmbedUrl(videoUrl) {
      if (!videoUrl) return "";
      return videoUrl.replace("watch?v=", "embed/") + "?autoplay=1&mute=1";
    },
    bookTicket() {
      this.$router.push(`/booking/${this.movie.id}`);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f5deb3;
  color: #000;
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.movie-detail {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.info-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.poster-container {
  flex: 1;
  max-width: 300px;
}

.poster {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-title {
  font-size: 22px;
  font-weight: bold;
}

.release-date,
.genre,
.duration,
.description {
  font-size: 16px;
  margin: 5px 0;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.watch-button,
.ticket-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.watch-button {
  background-color: #ff4500;
  color: white;
}

.watch-button:hover {
  background-color: #cc3700;
}

.ticket-button {
  background-color: #28a745;
  color: white;
}

.ticket-button:hover {
  background-color: #218838;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgb(148, 28, 28);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.close:hover {
  color: red;
}
</style>
