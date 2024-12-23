<template>
  <div class="welcome-container">
    <img src="../assets/images/background-image5.jpg" alt="Welcome Image" class="full-screen-image" />
    <div class="welcome-screen">
      <h1 class="title">Добро пожаловать в гитарный магазин</h1>
      <div class="buttons">
        <router-link to="/register">
          <button class="btn">Регистрация</button>
        </router-link>
        <router-link to="/login">
          <button class="btn">Авторизация</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 78vw; /* Весь экран ширины окна браузера */
  overflow: hidden; /* чтобы картинка не обрезалась */
}

.full-screen-image {
  width: 100%; /* растягиваем изображение по ширине экрана */
  height: 100%; /* растягиваем изображение по высоте экрана */
  object-fit: cover; /* чтобы картинка заполнила всю область полностью */
  position: absolute;
  z-index: -1; /* отправляем изображение на задний план */
}

.welcome-screen {
  position: relative; /* чтобы текст и кнопки отображались поверх изображения */
  z-index: 1; /* чтобы текст и кнопки отображались сверху */
  text-align: center;
  padding: 200px 10px 10px; /* добавляем отступы сверху */
}

.title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #ff00d5; /* Бирюзовый цвет для текста */
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #7300ff; /* Синий цвет для кнопок */
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #de02ff; /* Темно-синий цвет при наведении */
}
</style>
