<template>
  <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Регистрация</h2>
    <form @submit.prevent="submitSignup">
      <div style="margin-bottom: 15px;">
        <label for="username">Логин:</label>
        <input id="username" v-model="form.username" type="text" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="password">Пароль:</label>
        <input id="password" v-model="form.password" type="password" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="phone">Телефон:</label>
        <input id="phone" v-model="form.phone" type="tel" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="full_name">Полное имя:</label>
        <input id="full_name" v-model="form.full_name" type="text" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px;">Зарегистрироваться</button>
    </form>
    <p v-if="errorMessage" style="color: red; margin-top: 15px;">{{ errorMessage }}</p>

    <!-- Modal for successful registration -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p style="color: green;">{{ successMessage }}</p>
        <button @click="redirectToWelcome">ОК</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const form = ref({
      username: '',
      password: '',
      phone: '',
      full_name: '',
    });
    const errorMessage = ref('');
    const successMessage = ref('');
    const showSuccessModal = ref(false);

    const submitSignup = async () => {
      try {
        errorMessage.value = '';
        successMessage.value = '';
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', form.value);
        successMessage.value = 'Регистрация прошла успешно!';
        showSuccessModal.value = true; // Show the modal
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = error.response.data;
        } else {
          errorMessage.value = 'Произошла ошибка при регистрации. Попробуйте снова.';
        }
      }
    };

    const closeModal = () => {
      showSuccessModal.value = false;
    };

    const redirectToWelcome = () => {
      showSuccessModal.value = false;
      // Redirect to WelcomeScreen
      window.location.href = '/'; // Change '/welcome' to your actual route name
    };

    return {
      form,
      errorMessage,
      successMessage,
      showSuccessModal,
      submitSignup,
      closeModal,
      redirectToWelcome,
    };
  },
};
</script>

<style>
.modal {
  display: block; /* Чтобы видимость открытого модального окна */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: #050505;
  margin: 15% auto;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
}

button {
  margin-top: 10px;
}
</style>
