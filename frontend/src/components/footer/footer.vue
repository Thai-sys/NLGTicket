<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <h5 class="footer-title">About Leviathan</h5>
          <p>
            Leviathan là nền tảng đặt vé xem phim trực tuyến, giúp bạn dễ dàng
            chọn suất chiếu, ghế ngồi và thanh toán nhanh chóng. Với giao diện
            thân thiện, cập nhật lịch chiếu liên tục và nhiều ưu đãi hấp dẫn,
            Leviathan mang đến trải nghiệm đặt vé tiện lợi và thú vị, giúp bạn
            tận hưởng những bộ phim bom tấn ngay tại rạp. 🍿
          </p>
        </div>

        <div class="col-md-3">
          <h5 class="footer-title">Quick Links</h5>
          <ul class="footer-links">
            <router-link to="/"><li>MovieTime</li></router-link>
            <router-link to="/PhimBomTan"><li>Blockbusters</li></router-link>
            <router-link to="/PhimHanhDong"><li>ActionMovies</li></router-link>
            <router-link to="/PhimVietNam"><li>Phim Việt Nam</li></router-link>
            <router-link to="/PhimKhoaHocVienTuong"
              ><li>ScienceFictionMovie</li></router-link
            >
          </ul>
        </div>

        <div class="col-md-3">
          <h5 class="footer-title">Help</h5>
          <ul class="footer-links">
            <router-link to="/Contact"
              ><li><a href="#">Contact Support</a></li></router-link
            >
          </ul>
        </div>

        <div class="col-md-3">
          <h5 class="footer-title">Follow Us</h5>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          Đăng ký thành viên bản tin của chúng tôi để nhận các cập nhật mới nhất, sản
          phẩm phát hành mới và nội dung độc quyền gửi đến hộp thư của bạn.
          <form class="subscribe-form">
            <router-link to="/DangKy"
              ><button class="btn-subscribe">Đăng Ký Ngay</button></router-link
            >
          </form>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          <p class="footer-bottom-text">
            &copy; 2024 MovieTime. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
      
      <script>
export default {
  name: "Footer",
};
</script>
      
      <style scoped>
.footer {
  background-color: #121212;
  color: #ffffff;
  padding: 50px 0;
  font-size: 16px;
    max-width: 100%;
  height: 500px;
}

.footer .container-fluid {
  max-width: 100%;
  margin: auto;
}

.footer-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #e50914; /* Màu đỏ nổi bật */
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.footer-title::before {
  content: "🎟️"; /* Icon vé xem phim */
  margin-right: 8px;
}

.footer p {
  font-size: 14px;
  color: #bbb;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a,
.footer-links router-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.footer-links a:hover {
  color: #e50914;
  transform: translateX(5px);
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  color: #ffffff;
  font-size: 22px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
  color: #f5c518; /* Màu vàng ánh sáng */
  transform: scale(1.2);
}

.subscribe-form {
  margin-top: 20px;
}

.btn-subscribe {
  background-color: #e50914;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-subscribe:hover {
  background-color: #b2070f;
  transform: translateY(-3px);
}

.footer-bottom-text {
  font-size: 14px;
  color: #888;
  margin-top: 20px;
  text-align: center;
}

/* Responsive cho màn hình nhỏ */
@media (max-width: 768px) {
  .footer .row {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
      