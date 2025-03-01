<template>
  <div>
   
    <div class="login-container">
      <div class="login-form-wrapper">
        <h2 class="text-center">Đăng Nhập</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Tên Người Dùng</label>
            <input type="text" class="form-control" id="username" v-model="username" placeholder="Nhập tên người dùng"
              required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật Khẩu</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Nhập mật khẩu"
              required />
          </div>

          <div class="d-flex justify-content-center w-100 mt-3">
            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
          </div>
          <div class="d-flex justify-content-center w-100 mt-3 text-white">
            Bạn chưa có tài khoản,
            <router-link class="text-decoration-none text-info mx-2" to="/DangKy">Đăng ký ngay</router-link>
          </div>
          <div v-if="loginError" class="text-danger">
            {{ loginError }}
          </div>

        </form>

      </div>
    </div>
   
  </div>
</template>

<script>

import axios from 'axios';

export default {
  components: {
    
  },
  data() {
    return {
      username: '',
      password: '',

      loginError: false,
      alreadyLoggedIn: false,
    };
  },
  created(){
    // Kiểm tra nếu có dữ liệu đăng nhập trong localStorage
    if (localStorage.getItem('username') && localStorage.getItem('user_id')) {
      this.alreadyLoggedIn = true;
    }
  },
  methods: {
    handleSubmit() {
      if (this.alreadyLoggedIn) {
        this.loginError = 'Bạn đã đăng nhập rồi';
        return; 
      }

      this.login();
    },

    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.username,
          password: this.password,

        });

        if (response.data.success) {
          // Lưu thông tin vào localStorage
          
          localStorage.setItem('username', this.username);
          localStorage.setItem('user_id', response.data.user_id);
          localStorage.setItem('avatar', response.data.avatar);
          localStorage.setItem('vai_tro', response.data.vai_tro); // Lưu vai trò vào localStorage
          
          const vai_tro = localStorage.getItem('vai_tro');

          if (vai_tro === 'admin') {
            this.$router.push('/Admin'); 
          } else {
            this.$router.push('/'); 
          }
        } else {
          this.loginError = response.data.message; 
        }
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        this.loginError = 'Tên đăng nhập hoặc mật khẩu không chính xác'; 
      }
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
