<template>
  <div class="manager-panel">
    <h2>Панель управления менеджера</h2>
    <button class="btn upload-btn" @click="openUploadForm">Загрузить гитару</button>
    <button class="btn orders-btn" @click="openOrdersTable">Посмотреть заказы</button>
    <button class="btn edit-btn" @click="openEditGuitars">Редактировать гитары</button>

    <GuitarUploadForm v-if="showUploadForm" @back="resetView" />
    <OrdersTable v-if="showOrdersTable" @back="resetView" />
    <EditGuitars v-if="showEditGuitars" @back="resetView" />
  </div>
</template>

<script>
import GuitarUploadForm from './GuitarUploadPage.vue';
import OrdersTable from './OrdersTable.vue';
import EditGuitars from './EditGuitars.vue';

export default {
  components: {
    GuitarUploadForm,
    OrdersTable,
    EditGuitars,
  },
  data() {
    return {
      showUploadForm: false,
      showOrdersTable: false,
      showEditGuitars: false,
    };
  },
  methods: {
    openUploadForm() {
      this.resetView();
      this.showUploadForm = true;
    },
    openOrdersTable() {
      this.resetView();
      this.showOrdersTable = true;
    },
    openEditGuitars() {
      this.resetView();
      this.showEditGuitars = true;
    },
    resetView() {
      this.showUploadForm = false;
      this.showOrdersTable = false;
      this.showEditGuitars = false;
    },
  },
};
</script>

<style scoped>
.manager-panel {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.upload-btn {
  background-color: #007bff;
  color: white;
}

.orders-btn {
  background-color: #28a745;
  color: white;
}

.edit-btn {
  background-color: #6f42c1;
  color: white;
}
</style>
