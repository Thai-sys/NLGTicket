<template>
  <div>
    <Header />
    <div class="login-container">
      <div class="login-form-wrapper">
        <h2 class="text-center">Đăng Nhập</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Nhập email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật Khẩu</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div class="d-flex justify-content-center w-100 mt-3">
            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
          </div>
          <div class="d-flex justify-content-center w-100 mt-3 text-white">
            Bạn chưa có tài khoản,
            <router-link
              class="text-decoration-none text-info mx-2"
              to="/register"
              >Đăng ký ngay</router-link
            >
          </div>
          <div v-if="loginError" class="text-danger">
            {{ loginError }}
          </div>
        </form>
        <div v-if="isLoggedIn" class="alert alert-warning text-center">
          Bạn đã đăng nhập, vui lòng đăng xuất để đăng nhập tài khoản khác.
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Cookies from "js-cookie";
export default {
  components: { Header, Footer },
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      isLoggedIn: false,
    };
  },

  methods: {
    async handleSubmit() {
      if (this.isLoggedIn) {
        this.loginError =
          "Bạn đã đăng nhập, vui lòng đăng xuất để đăng nhập tài khoản khác.";
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        );

        this.$router.push("/");
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        this.loginError = "Email hoặc mật khẩu không đúng";
      }
    },
  },
  created() {
    // Kiểm tra nếu có accessToken trong cookies
    if (Cookies.get("accessToken")) {
      this.isLoggedIn = true;
    }
  },
};
</script>



<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(https://getwallpapers.com/wallpaper/full/7/2/1/81767.jpg);
  background-size: cover;
  background-position: center;
}

.login-form-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #fff;
  margin-bottom: 20px;
}

.form-label {
  color: #fff;
}

.form-control {
  border-radius: 8px;
}

.btn-primary {
  border-radius: 8px;
}

.text-danger {
  font-size: 14px;
}
</style>
