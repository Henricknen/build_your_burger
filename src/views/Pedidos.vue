<template>
  <div class = "main-container">
    <h1>Gerenciador de pedidos:</h1>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
  components: { Dashboard },
  name: "Pedidos",
  components: {
    Dashboard
  }
}
</script>

