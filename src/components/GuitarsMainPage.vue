<template>
  <div style="padding: 20px;">
    <header style="margin-bottom: 20px;">
      <h1 style="font-family: Arial, sans-serif; font-size: 24px;">Прекрасные Гитары</h1>
    </header>
    <div v-if="errorMessage" style="color: red; margin-bottom: 20px;">{{ errorMessage }}</div>
    <div v-if="guitars.length" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
      <div
          v-for="guitar in guitars"
          :key="guitar.guitar_id"
          style="border: 1px solid #ccc; border-radius: 8px; padding: 10px; text-align: center; cursor: pointer;"
          @click="selectGuitar(guitar.guitar_id)">
        <img
            v-if="guitar.images && guitar.images.length"
            :src="`data:image/jpeg;base64,${guitar.images[0]}`"
            alt="Гитара"
            style="width: 100%; height: 250px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;" />
        <div v-else style="width: 100%; height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
          <span style="color: #888;">Нет изображения</span>
        </div>
        <h3 style="color: #b700ff; font-size: 18px;">{{ guitar.model }}</h3>
        <p style="color: #ffffff;">Цена: {{ guitar.price }} ₽</p>
      </div>
    </div>
    <p v-else>Гитары не найдены.</p>

    <!-- Модальное окно для заказа -->
    <OrderGuitarModal
        v-if="selectedGuitarId"
        :guitarId="selectedGuitarId"
        @close="selectedGuitarId = null" />
  </div>
</template>

<script>
import axios from 'axios';
import OrderGuitarModal from './OrderGuitarModal.vue';

export default {
  components: { OrderGuitarModal },
  data() {
    return {
      guitars: [],
      errorMessage: '',
      selectedGuitarId: null, // ID выбранной гитары
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/secured/guitar/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.guitars = response.data.guitars || [];
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в систему.';
        this.$router.push({ name: 'SigninForm' });
      } else {
        this.errorMessage = 'Произошла ошибка при загрузке данных. Попробуйте снова позже.';
      }
    }
  },
  methods: {
    selectGuitar(guitarId) {
      this.selectedGuitarId = guitarId; // Устанавливаем ID выбранной гитары
    },
  },
};
</script>
