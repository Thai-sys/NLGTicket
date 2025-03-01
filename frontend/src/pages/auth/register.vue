<template>
  <div>
   
    <div class="register-container">
      <div class="register-form-wrapper">
        <h2 class="text-center">Đăng Ký Thành Viên</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Tên Người Dùng</label>
            <input type="text" class="form-control" id="username" v-model="username" @input="onUsernameInput"
              placeholder="Nhập tên người dùng" required />
            <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" @input="checkEmail"
              placeholder="Nhập địa chỉ email" required />
            <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật Khẩu</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Nhập mật khẩu"
              required />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác Nhận Mật Khẩu</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
              placeholder="Xác nhận mật khẩu" required />
            <div v-if="passwordMismatch" class="text-danger">Mật khẩu không khớp!</div>
          </div>

          <div class="mb-3">
            <label for="hoTen" class="form-label">Họ và Tên</label>
            <input type="text" class="form-control" id="hoTen" v-model="hoTen" placeholder="Nhập họ tên người dùng"
              required />
          </div>
          <div class="mb-3">
            <label for="sdt" class="form-label">Số Điện Thoại</label>
            <input type="text" class="form-control" id="sdt" v-model="sdt" @input="checkSdt"
              placeholder="Nhập số điện thoại" required />
            <div v-if="sdtError" class="text-danger">{{ sdtError }}</div>
          </div>
          <div class="d-flex justify-content-center w-100 mt-3">
            <button type="submit" class="btn btn-primary">Đăng Ký</button>
          </div>

          <div v-if="successMessage" class="text-success mt-3">{{ successMessage }}</div>
          <div v-if="generalError" class="text-danger mt-3">{{ generalError }}</div>
        </form>
      </div>
    </div>
  
  </div>
</template>

<script>
import debounce from "lodash.debounce";

    import axios from 'axios';
export default {
  components:{
   
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      hoTen: '',
      sdt: '',
      usernameError: '',
      emailError: '',
      passwordMismatch: false,
      successMessage: '',
      generalError: '',
    };
  },
  watch: {
    password() {
      this.checkPasswordMismatch();
    },
    confirmPassword() {
      this.checkPasswordMismatch();
    }
  },
  methods: {
    checkPasswordMismatch() {
      this.passwordMismatch = this.password !== this.confirmPassword;
    },
    
  checkSdt() {
    const sdtRegex = /^(0[3|5|7|8|9])[0-9]{8,10}$/;
    if (!sdtRegex.test(this.sdt)) {
      this.sdtError = 'Số điện thoại không hợp lệ. Vui lòng nhập lại.';
    } else {
      this.sdtError = '';
    }
  },
    async handleSubmit() {
      this.successMessage = '';
      this.generalError = '';

      if (!this.usernameError && !this.emailError && !this.passwordMismatch) {
        try {
          const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ten_dang_nhap: this.username,
              email: this.email,
              mat_khau: this.password,
              ho_ten: this.hoTen,
              sdt:this.sdt,
            }),
          });

          if (response.ok) {
            // Đăng ký thành công
            this.successMessage = "Đăng ký thành công!";
            this.username = this.email = this.password = this.confirmPassword = this.hoTen =this.sdt= '';
            this.$router.push('/DangNhap');
          } else {
            const errorData = await response.json();
            this.generalError = errorData.error || "Có lỗi xảy ra khi đăng ký!";
          }
        } catch (error) {
          console.error("Lỗi đăng ký:", error);
          this.generalError = "Đã có lỗi xảy ra. Vui lòng thử lại sau!";
        }
      }
    }
    ,
    async checkUsername(username) {
      if (!username) {
        this.usernameError = "Tên người dùng không được để trống.";
        return false;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/check-username?username=${username}`);
        const result = await response.json();

        if (result.exists) {
          this.usernameError = "Tên người dùng đã tồn tại.";
          return true; // Tên người dùng đã tồn tại
        } else {
          this.usernameError = '';
          return false; 
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra tên người dùng:", error);
        this.usernameError = "Lỗi kết nối đến máy chủ.";
        return false;
      }
    },

    async checkEmail() {
      const email = this.email;
      if (!email) {
        this.emailError = "Email không được để trống.";
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/check-email?email=${email}`);
        const result = await response.json();

        if (result.exists) {
          this.emailError = "Email đã tồn tại.";
        } else {
          this.emailError = '';
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra email:", error);
        this.emailError = "Lỗi kết nối đến máy chủ.";
      }
    },

    onUsernameInput: debounce(function (event) {
      const username = event.target.value;
      this.checkUsername(username);
    }, 1000)
  }
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
