<template>
  <div>
    <Header />
    <div class="register-container">
      <div class="register-form-wrapper">
        <h2 class="text-center">Đăng Ký Thành Viên</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Họ và Tên</label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="Nhập họ tên" required />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" @input="checkEmail" placeholder="Nhập địa chỉ email" required />
            <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Số Điện Thoại</label>
            <input type="tel" class="form-control" id="phone" v-model="phone" placeholder="Nhập số điện thoại" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật Khẩu</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Nhập mật khẩu" required />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác Nhận Mật Khẩu</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" placeholder="Xác nhận mật khẩu" required />
            <div v-if="passwordMismatch" class="text-danger">Mật khẩu không khớp!</div>
          </div>

          <div class="d-flex justify-content-center w-100 mt-3">
            <button type="submit" class="btn btn-primary">Đăng Ký</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  components: { Header, Footer },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      emailError: "",
      passwordMismatch: false,
      debounceTimer: null,
    };
  },
  watch: {
    password() {
      this.passwordMismatch = this.password !== this.confirmPassword;
    },
    confirmPassword() {
      this.passwordMismatch = this.password !== this.confirmPassword;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.passwordMismatch || this.emailError) return;
      
      Swal.fire({
        title: "Đang xử lý...",
        text: "Vui lòng chờ giây lát",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); },
      });

      try {
        const response = await fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
          }),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công!",
            text: "Bạn sẽ được chuyển đến trang đăng nhập.",
            timer: 3000,
            showConfirmButton: false,
          });
          setTimeout(() => { this.$router.push("/login"); }, 3000);
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: errorData.error || "Có lỗi xảy ra khi đăng ký!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi kết nối!",
          text: "Vui lòng thử lại sau!",
        });
      }
    },

    checkEmail() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(async () => {
        if (!this.email.trim()) {
          this.emailError = "Email không được để trống.";
          return;
        }
        try {
          const response = await fetch(`http://localhost:5000/api/user/check-email?email=${this.email.trim()}`);
          const result = await response.json();
          this.emailError = result.exists ? "Email đã tồn tại." : "";
        } catch (error) {
          this.emailError = "Lỗi kết nối đến máy chủ.";
        }
      }, 500);
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(https://getwallpapers.com/wallpaper/full/7/2/1/81767.jpg);
  background-size: cover;
  background-position: center;
}
.register-form-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
}
.text-danger { font-size: 14px; }
</style>