<template>
  <div style="max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Загрузка новой гитары</h2>
    <form @submit.prevent="uploadGuitar">
      <div style="margin-bottom: 15px;">
        <label for="model">Модель:</label>
        <input id="model" v-model="form.model" type="text" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="price">Цена:</label>
        <input id="price" v-model="form.price" type="number" required style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <div style="margin-bottom: 15px;">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="form.description" required style="width: 100%; padding: 8px; margin-top: 5px;"></textarea>
      </div>
      <div style="margin-bottom: 15px;">
        <label for="images">Картинки:</label>
        <input id="images" type="file" multiple @change="handleFileUpload" style="width: 100%; padding: 8px; margin-top: 5px;" />
      </div>
      <button type="submit" style="width: 100%; padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 4px;">
        Загрузить
      </button>
    </form>
    <p v-if="successMessage" style="color: green; margin-top: 15px;">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red; margin-top: 15px;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        model: '',
        price: null,
        description: '',
        guitar_images: [], // Обновлено поле name
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleFileUpload(event) {
      const files = event.target.files;
      this.form.guitar_images = []; // Обновляем поле guitar_images

      for (const file of files) {
        try {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64String = e.target.result.split(',')[1]; // Убираем "data:image/jpeg;base64,"
            this.form.guitar_images.push(base64String); // Обновляем поле guitar_images
            console.log(base64String);
          };
          reader.readAsDataURL(file);
        } catch (err) {
          console.error('Ошибка обработки файла:', err);
          this.errorMessage = 'Ошибка обработки файлов. Попробуйте снова.';
        }
      }
    },
    async uploadGuitar() {
      try {
        const token = localStorage.getItem('token');

        // Отправка данных на сервер
        await axios.post('http://localhost:8080/api/v1/secured/guitar/upload', {
          model: this.form.model,
          price: this.form.price,
          description: this.form.description,
          guitar_images: this.form.guitar_images, // Используем guitar_images вместо guitarImages
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        this.successMessage = 'Гитара успешно загружена!';
        this.errorMessage = '';
        this.form = { model: '', price: null, description: '', guitar_images: [] }; // Обновляем поле
      } catch (error) {
        console.error('Ошибка запроса:', error);
        this.successMessage = '';
        this.errorMessage = 'Ошибка при загрузке гитары. Попробуйте снова.';
      }
    },
  },
};
</script>
