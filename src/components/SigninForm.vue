<template>
  <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Авторизация</h2>
    <form @submit.prevent="submitSignin">
      <div style="margin-bottom: 15px;">
        <label for="username">Логин:</label>
        <input id="username" v-model="form.username" type="text" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="password">Пароль:</label>
        <input id="password" v-model="form.password" type="password" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px;">
        Авторизоваться
      </button>
    </form>
    <p v-if="errorMessage" style="color: red; margin-top: 15px;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async submitSignin() {
      try {
        this.errorMessage = '';
        const response = await axios.post('http://localhost:8080/api/v1/auth/signin', this.form);
        const { token, role, user_id } = response.data;

        // Сохранение токена, роли и user_id в localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', user_id);


        // Перенаправление в зависимости от роли
        if (role === 'USER') {
          this.$router.push({name: 'GuitarsMainPage'});
        } else if (role === 'MANAGER') {
          this.$router.push({name: 'ManagerPanel'});
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Неверный логин или пароль';
        } else {
          this.errorMessage = 'Произошла ошибка при авторизации. Попробуйте снова.';
        }
      }
    },
  },
};
</script>

<style>
/* Стили можно добавить здесь */
</style>
