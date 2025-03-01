<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand fw-bold fs-4" href="#">
        🎬 MovieTickets
      </a>

      <!-- Button toggle cho mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Danh sách menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#">Trang chủ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Phim</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Lịch chiếu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Đặt vé</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Liên hệ</a>
          </li>
        </ul>

        <!-- Nút Đăng nhập -->
        <a href="#" class="btn btn-warning ms-3 fw-bold">Đăng nhập</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.nav-link {
  font-size: 1rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #ffc107 !important;
}

/* Fix navbar at the top */
.navbar {
  z-index: 1000; /* Ensure it's on top of other content */
}
</style>
