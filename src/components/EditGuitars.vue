<template>
  <div class="edit-guitars">
    <button class="btn back-btn" @click="$emit('back')">Назад</button>
    <h2>Редактировать гитары</h2>
    <div class="selector">
      <label for="guitar-selector">Выберите гитару:</label>
      <select id="guitar-selector" v-model="selectedGuitarId" @change="loadGuitarData">
        <option v-for="guitar in guitars" :key="guitar.guitar_id" :value="guitar.guitar_id">
          {{ guitar.model }}
        </option>
      </select>
    </div>
    <div v-if="selectedGuitar" class="form">
      <label>Модель:</label>
      <input v-model="formData.model" type="text" />

      <label>Цена:</label>
      <input v-model="formData.price" type="number" />

      <label>Описание:</label>
      <textarea v-model="formData.description"></textarea>

      <label>Изображения:</label>
      <input type="file" multiple @change="handleFileUpload" />

      <button class="btn save-btn" @click="saveChanges">Сохранить изменения</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      guitars: [],
      selectedGuitarId: null,
      selectedGuitar: null,
      formData: {
        model: "",
        price: null,
        description: "",
        images: [], // массив для хранения base64 изображений
      },
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/secured/guitar/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.guitars = response.data.guitars || [];
    } catch (error) {
      console.error("Ошибка при загрузке списка гитар:", error);
    }
  },
  methods: {
    loadGuitarData() {
      this.selectedGuitar = this.guitars.find(
          (guitar) => guitar.guitar_id === this.selectedGuitarId
      );
      if (this.selectedGuitar) {
        this.formData = {
          model: this.selectedGuitar.model,
          price: this.selectedGuitar.price,
          description: this.selectedGuitar.description,
          images: [], // очищаем старые изображения
        };
      }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.formData.images = []; // Обновляем массив images для хранения base64 изображений

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result.split(",")[1]; // Убираем 'data:image/jpeg;base64,'
          this.formData.images.push(base64String); // Добавляем base64 изображения
        };
        reader.readAsDataURL(file);
      });
    },
    async saveChanges() {
      try {
        const token = localStorage.getItem("token");

        // Создание FormData для отправки данных и файлов
        const formData = new FormData();
        formData.append("guitar_id", this.selectedGuitarId);
        formData.append("model", this.formData.model);
        formData.append("price", this.formData.price);
        formData.append("description", this.formData.description);

        this.formData.images.forEach((image, index) => {
          formData.append(`guitar_images[${index}]`, image); // добавляем изображения
        });

        const response = await axios.post(
            "http://localhost:8080/api/v1/secured/guitar/update",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // для правильной отправки файлов
              },
            }
        );

        alert("Изменения успешно сохранены!");
        this.$emit("back"); // Возвращаемся на панель менеджера
      } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
      }
    },
  },
};
</script>

<style scoped>
.edit-guitars {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}

.selector {
  margin-bottom: 20px;
}

.form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input,
textarea,
select {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #218838;
}

.back-btn {
  background-color: #007bff;
  color: white;
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #0056b3;
}
</style>
