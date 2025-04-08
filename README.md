# 🐍 Game Rắn Săn Mồi – Frontend Project
<h2 align="center">
  📺 <a href="https://www.youtube.com/watch?v=hk8dAxKvGuM" target="_blank">Xem video demo trên <img src="https://img.shields.io/badge/YouTube-red?style=flat&logo=youtube&logoColor=white" alt="YouTube"> tại đây</a>
</h2>

**Môn học:** Lập trình Frontend  
**MSSV:** 21130447  
**Họ tên:** Võ Đức Minh  
**Đề tài:** Game Rắn Săn Mồi  

---

## 🎮 Mô tả cấp độ phát triển

### 🧩 Cấp độ 1: Core Gameplay
- Điều khiển rắn di chuyển trong không gian canvas.
- Khi rắn ăn mồi, kích thước sẽ tăng lên.
- Không gian giới hạn rắn trong một lưới cố định.

### 💥 Cấp độ 2: Phát hiện va chạm
- Kiểm tra va chạm giữa đầu rắn và biên canvas.
- Kết thúc trò chơi nếu xảy ra va chạm.

### 🌀 Cấp độ 3: Thức ăn động
- Thức ăn di chuyển ngẫu nhiên sau mỗi khoảng thời gian.
- Tăng độ khó cho người chơi.

### 🧱 Cấp độ 4 & 5: Chướng ngại vật
- Tạo ra các chướng ngại vật tĩnh xuất hiện ngẫu nhiên.
- Người chơi phải điều khiển rắn tránh va chạm với vật cản.

### 🤖 Cấp độ 6: Tích hợp AI đối thủ
- Sử dụng thuật toán **BFS (Breadth-First Search)** để điều khiển AI.
- AI cạnh tranh với người chơi trong việc thu thập thức ăn.

---

## 🏗️ Kiến trúc hệ thống

- **Hướng đối tượng**:
  - `Snake`: Quản lý rắn người chơi.
  - `Node`: Đại diện cho mỗi ô trong lưới canvas.
  - `SnakeAI`: Rắn do AI điều khiển sử dụng BFS để tìm đường.

---

## 💾 Lưu trữ dữ liệu

- Sử dụng **Local Storage** để lưu:
  - Tùy chọn tốc độ chơi
  - Cấp độ người chơi đạt được

---

## 🎨 Giao diện người dùng (UI)

- Thanh **Time Bar** hiển thị thời gian và tăng áp lực ở các cấp độ cao.
- Giao diện canvas đơn giản, rõ ràng, dễ thao tác.

---

## 🚀 Hướng dẫn chạy project

1. Clone repository:
   ```bash
   git clone https://github.com/ducminh1804/Snake-game-BFS
