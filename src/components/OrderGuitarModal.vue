<template>
  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
    <div style="background: white; padding: 20px; border-radius: 8px; width: 90%; max-width: 500px;">
      <button @click="$emit('close')" style="float: right; background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>

      <div v-if="!showConfirmation && guitar">
        <img
            v-if="guitar.images && guitar.images.length"
            :src="`data:image/jpeg;base64,${guitar.images[0]}`"
            alt="Гитара"
            style="width: 100%; height: 500px; border-bottom: 1px solid #eee; margin-bottom: 10px;" />
        <div v-else style="width: 100%; height: 100px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
          <span style="color: #888;">Нет изображения</span>
        </div>
        <h3 style="color: #181818; font-size: 20px;">{{ guitar.model }}</h3>
        <p style="color: #4600ff;">Цена: {{ guitar.price }} ₽</p>
        <p style="font-size: 14px; color: #000000;">{{ guitar.description }}</p>
        <button @click="showConfirmation = true" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px;">Оформить заказ</button>
      </div>

      <div v-else-if="showConfirmation">
        <p style="font-size: 16px; color: #000000; margin-bottom: 20px;">Вы действительно хотите подтвердить заказ?</p>
        <div style="display: flex; justify-content: space-around;">
          <button @click="confirmOrder" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px;">Да</button>
          <button @click="showConfirmation = false" style="padding: 10px 20px; background-color: #ccc; color: black; border: none; border-radius: 4px;">Нет</button>
        </div>
      </div>

      <div v-else>
        <p>Загрузка данных...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['guitarId'],
  data() {
    return {
      guitar: null, // Данные о выбранной гитаре
      showConfirmation: false, // Отображать подтверждающее окно
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/secured/guitar/${this.guitarId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.guitar = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных о гитаре:', error);
    }
  },
  methods: {
    async confirmOrder() {
      try {
        const userId = localStorage.getItem('userId'); // Получаем userId из локального хранилища
        await axios.post('http://localhost:8080/api/v1/secured/order/create', {
          guitar_id: this.guitarId,
          user_id: userId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Заказ успешно оформлен!');
        this.$emit('close'); // Закрываем модальное окно
      } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        alert('Не удалось оформить заказ. Попробуйте снова.');
      }
    },
  },
};
</script>
