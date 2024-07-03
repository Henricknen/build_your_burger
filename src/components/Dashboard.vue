<template>
  <div id = "burger-table" v-if = "burgers">
    <div>
      <div id = "burger-table-heading">
        <div class = "order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id = "burger-table-rows">
      <div class = "burger-table-row" v-for = "burger in burgers" :key = "burger.id"> 
        <div class="order-number">{{ !isNaN(parseInt(burger.id)) ? parseInt(burger.id) : '0' }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao   }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul v-for = "(opcional, index) in burger.opcionais" :key = "index">
            <li>{{ opcional }}</li>
          </ul> 
        </div>
        <div>
          <select name = "status" class = "status" @change = "updateBurger($event, burger.id)">
            <option :value = "s.tipo" v-for = "s in status" :key = "s.id" :selected = "burger.status  == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class = "delete-btn" @click = "deleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      ingredientes: {
        paes: [
          { id: 1, tipo: "Italiano Branco" },
          { id: 2, tipo: "3 Queijos" },
          { id: 3, tipo: "Parmesão e Orégano" },
          { id: 4, tipo: "Integral" }
        ],
        carnes: [
          { id: 1, tipo: "Maminha" },
          { id: 2, tipo: "Alcatra" },
          { id: 3, tipo: "Picanha" },
          { id: 4, tipo: "Veggie burger" }
        ]
      }
    };
  },
  methods: {
    async getPedidos() {
      try {
        const req = await fetch('http://localhost:3000/burgers');
        const data = await req.json();

        data.forEach(burger => {
          burger.pao = this.tipoPao(burger.pao);
          burger.carne = this.tipoCarne(burger.carne);
        });

        this.burgers = data;
        this.getStatus();
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    },
    async getStatus() {
      try {
        const req = await fetch('http://localhost:3000/status');
        const data = await req.json();
        this.status = data;
      } catch (error) {
        console.error('Erro ao buscar status:', error);
      }
    },
    async deleteBurger(id) {
      try {
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "DELETE"
        });
        const res = await req.json();
        this.getPedidos();
      } catch (error) {
        console.error('Erro ao excluir burger:', error);
      }
    },
    async updateBurger(event, id) {
      try {
        const option = event.target.value;
        const dataJson = JSON.stringify({ status: option });
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: dataJson
        });
        const res = await req.json();
        console.log(res);
      } catch (error) {
        console.error('Erro ao atualizar burger:', error);
      }
    }
  },
  computed: {
    tipoPao() {
      return (paoId) => {
        const pao = this.ingredientes.paes.find(p => p.id === paoId);
        return pao ? pao.tipo : "Pão não especificado";
      };
    },
    tipoCarne() {
      return (carneId) => {
        const carne = this.ingredientes.carnes.find(c => c.id === carneId);
        return carne ? carne.tipo : "Carne não especificada";
      };
    }
  },
  mounted() {
    this.getPedidos();
  }
};
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>