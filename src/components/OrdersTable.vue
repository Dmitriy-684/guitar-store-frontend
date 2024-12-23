<template>
  <div class="orders-container">
    <h2 class="orders-title">Текущие заказы</h2>
    <button class="btn filter-btn" @click="toggleFilter">
      {{ showPendingOnly ? "Показать все заказы" : "Показать только ожидающие" }}
    </button>
    <div class="table-wrapper">
      <table class="orders-table">
        <thead>
        <tr>
          <th>Телефон</th>
          <th>Полное имя</th>
          <th>Модель гитары</th>
          <th>Цена</th>
          <th>Статус</th>
          <th>Обновлено</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in filteredOrders" :key="order.updatedAt">
          <td>{{ order.userPhone }}</td>
          <td>{{ order.userFullName }}</td>
          <td>{{ order.guitarModel }}</td>
          <td>{{ order.guitarPrice }} ₽</td>
          <td>{{ order.status }}</td>
          <td>{{ order.updatedAt }}</td>
          <td>
            <div v-if="order.status === 'PENDING'" class="actions">
              <button
                  class="btn cancel-btn"
                  @click="changeOrderStatus(order.order_id, 'CANCELLED')"
              >
                ✖
              </button>
              <button
                  class="btn confirm-btn"
                  @click="changeOrderStatus(order.order_id, 'CONFIRMED')"
              >
                ✔
              </button>
            </div>
            <div v-else class="no-actions">
              Нет доступных действий
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-if="!filteredOrders.length" class="no-orders">
      Заказов пока нет.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      showPendingOnly: false,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/v1/secured/order/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.orders = response.data.orders || [];
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
    }
  },
  computed: {
    formattedOrders() {
      return this.orders.map((order) => ({
        order_id: order.order_id, // Сохраняем формат с нижним подчёркиванием
        userPhone: order.user_phone,
        userFullName: order.user_full_name,
        guitarModel: order.guitar_model,
        guitarPrice: order.guitar_price,
        status: order.status,
        updatedAt: this.formatDate(order.updated_at),
      }));
    },
    filteredOrders() {
      return this.showPendingOnly
          ? this.formattedOrders.filter((order) => order.status === "PENDING")
          : this.formattedOrders;
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU");
    },
    async changeOrderStatus(order_id, status) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
            "http://localhost:8080/api/v1/secured/order/change/status",
            { order_id, status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        this.orders = this.orders.map((order) =>
            order.order_id === order_id ? { ...order, status } : order
        );
      } catch (error) {
        console.error("Ошибка при обновлении статуса заказа:", error);
      }
    },
    toggleFilter() {
      this.showPendingOnly = !this.showPendingOnly;
    },
  },
};
</script>

<style scoped>
.orders-container {
  max-width: 1000px;
  margin: 50px auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.orders-title {
  color: #6f42c1;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: bold;
}

.table-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.orders-table {
  width: 80%;
  border-collapse: collapse;
  text-align: left;
  background-color: #ffffff;
}

.orders-table th,
.orders-table td {
  border: 1px solid #ddd;
  padding: 10px;
  color: #000000; /* Устанавливаем текст черным */
}

.orders-table th {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  gap: 10px;
}

.no-actions {
  color: gray;
  text-align: center;
}

.no-orders {
  margin-top: 20px;
  color: red;
  text-align: center;
  font-size: 1.2em;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-btn {
  background-color: #28a745;
  color: white;
  margin-bottom: 20px;
}

.filter-btn:hover {
  background-color: #218838;
}

.back-btn {
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
}

.back-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.cancel-btn:hover {
  background-color: #c82333;
}

.confirm-btn {
  background-color: #28a745;
  color: white;
}

.confirm-btn:hover {
  background-color: #218838;
}
</style>
