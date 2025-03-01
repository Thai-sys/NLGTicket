<template>
   
  <div class="home">
   <Header />
   <br>
     <Random />
    <main class="container">
      <Banner />
      <h1 class="text-3xl font-bold text-center mt-8">Chào mừng đến với Movie Tickets</h1>
      <p class="text-lg text-gray-600 text-center mt-4">Đặt vé xem phim dễ dàng, nhanh chóng!</p>
    </main>
   <Footer />
  </div>
  
</template>

<script>
import Header from '@/components/header/header.vue';
import Footer from '@/components/footer/footer.vue';
import Random from '@/components/movie/random_poster.vue';
import Banner from '@/components/movie/banner.vue';
export default {
  components: {
    Header,
    Footer,
    Random,
    Banner,
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
