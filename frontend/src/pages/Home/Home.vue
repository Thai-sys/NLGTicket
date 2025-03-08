<template>
  <div>
    <Header />
    <div class="home">
      <br />
      <Random v-if="!hasToken" />
      <main class="container">
        <Banner />
        <!-- <h1 class="text-3xl font-bold text-center mt-8">
        Chào mừng đến với Movie Tickets
      </h1>
      <p class="text-lg text-gray-600 text-center mt-4">
        Đặt vé xem phim dễ dàng, nhanh chóng!
      </p> -->
        <Movie />
        <Upcoming />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Random from "@/components/movie/random_poster.vue";
import Banner from "@/components/movie/banner.vue";
import Movie from "@/components/movie/new_movies.vue";
import Upcoming from "@/components/movie/upcoming_movies.vue";
import Cookies from "js-cookie";
export default {
  components: {
    Header,
    Footer,
    Random,
    Banner,
    Movie,
    Upcoming,
  },
  data() {
    return {
      hasToken: false, // Mặc định chưa có token
    };
  },
  mounted() {
    // Kiểm tra xem token có tồn tại không
    const token = Cookies.get("accessToken");
    if (token) {
      this.hasToken = true;
    }
  },
};
</script>

<style scoped>
.container {
  max-width: auto;
  margin: auto;
  padding: 20px;
}
.home {
  background-color: #000000;
  width: 100%;
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
