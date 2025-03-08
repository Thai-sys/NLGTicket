<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow fixed-top">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand fw-bold fs-4"> 🎬 MovieTickets </router-link>
      
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
            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              Trang chủ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/movie" class="nav-link" :class="{ active: $route.path.startsWith('/movie') }">
              Phim
            </router-link>
          </li>
          <li class="nav-item">
            <router-link>
              <a class="nav-link" href="#">Lịch chiếu</a>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Đặt vé</a>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" :class="{ active: $route.path.startsWith('/contact') }"
              >Liên hệ
            </router-link>
          </li>
        </ul>

        <!-- Hiển thị icon user nếu đã đăng nhập, ngược lại hiển thị nút đăng nhập -->
        <div v-if="isLoading">
          <span class="text-white ms-3">Đang tải...</span>
        </div>
        <div v-else-if="user" class="ms-3 fw-bold d-flex align-items-center position-relative">
          <span class="text-white me-2">Xin chào, {{ user.name }}</span>
          <img :src="getAvatar(user.avatar)" class="user-avatar" @click="toggleDropdown" />

          <!-- Dropdown menu -->
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">Chỉnh sửa thông tin</router-link>
            <router-link to="/my-tickets" class="dropdown-item">Vé của tôi</router-link>
            <button @click="handleLogout" class="dropdown-item text-danger">Đăng xuất</button>
          </div>
        </div>
        <div v-else class="btn ms-3 fw-bold">
          <router-link class="text-dark" to="/login">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Header",
  data() {
    return {
      user: null,
      isLoading: true, // Trạng thái tải dữ liệu
      isDropdownOpen: false, // Kiểm soát menu dropdown
    };
  },
  methods: {
    getAvatar(avatar) {
      return new URL(`../../assets/avatar/${avatar}`, import.meta.url).href;
    },
    async fetchUser() {
      const token = Cookies.get("accessToken");

      if (!token) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.user = response.data;
        
      } catch (error) {
        console.error("Lỗi xác thực:", error);
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },

    handleLogout() {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      this.user = null;
      this.$router.push("/login");
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  mounted() {
    this.fetchUser();
  },
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

.navbar {
  height: 7vh;
  background-color: rgb(179, 16, 16);
  z-index: 1000;
}

.btn {
  background-color: aliceblue;
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 10px 15px;
  color: black;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f1f1f1;
}

.text-danger {
  color: red !important;
}
</style>
