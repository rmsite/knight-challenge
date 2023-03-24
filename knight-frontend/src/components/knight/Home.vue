<template>
  <div>
    <div class="text-center">
      <h1>Knights Challenge</h1>

      <div v-if="knights.length === 0">
        <h2>No Knights found at the moment</h2>
      </div>
    </div>

    <div class="row">
      <table class="center">
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Atributo</th>
          <th>Ataque</th>
          <th>Exp</th>
          <th>Ações</th>
        </tr>
        <tr v-for="knight in knights" :key="knight._id">
          <td>{{ knight.heroe ? 'HEROE: ' : '' }}{{ knight.name }}</td>
          <td>{{ calculateAge(knight.birthday) }}</td>
          <td>{{ knight.weapons.length }}</td>
          <td>{{ knight.keyAttribute }}</td>
          <td>{{ attack(knight) }}</td>
          <td>{{ exp(attack(knight), calculateAge(knight.birthday )) }}</td>
          <td>
            <div class="btn-group" style="margin-bottom: 20px">
                <router-link
                  :to="{ name: 'Knight', params: { id: knight._id } }"
                  class="btn btn-sm btn-outline-secondary"
                  >View Knight
                </router-link>
                <router-link
                  :to="{ name: 'Edit', params: { id: knight._id } }"
                  class="btn btn-sm btn-outline-secondary"
                  >Edit Knight
                </router-link>
                <button
                  class="btn btn-sm btn-outline-secondary"
                  v-on:click="deleteKnight(knight._id)"
                >
                  Delete Knight
                </button>
              </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- <div class="row">
      <div class="col-md-4" v-for="knight in knights" :key="knight._id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h2 class="card-img-top">{{ knight.title }}</h2>
            <p class="card-text">{{ knight.body }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px">
                <router-link
                  :to="{ name: 'Knight', params: { id: knight._id } }"
                  class="btn btn-sm btn-outline-secondary"
                  >View Knight
                </router-link>
                <router-link
                  :to="{ name: 'Edit', params: { id: knight._id } }"
                  class="btn btn-sm btn-outline-secondary"
                  >Edit Knight
                </router-link>
                <button
                  class="btn btn-sm btn-outline-secondary"
                  v-on:click="deleteKnight(knight._id)"
                >
                  Delete Knight
                </button>
              </div>
            </div>

            <div class="card-footer">
              <small class="text-muted"
                >Name: {{ knight.name }} - {{ knight.nickname }} Age:
                {{ calculateAge(knight.birthday) }}</small
              ><br />
              <small class="text-muted">by: {{ knight.author }}</small>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      knights: [],
    };
  },
  created() {
    this.fetchKnights();
  },
  methods: {
    fetchKnights() {
      axios
        .get(`${server.baseURL}/knight/knights`)
        .then((data) => (this.knights = data.data));
    },
    deleteKnight(id) {
      axios
        .delete(`${server.baseURL}/knight/delete?knightID=${id}`)
        .then((data) => {
          window.location.reload();
        });
    },
    calculateAge: function (data) {
      let currentDate = new Date();
      let formatted = data.replace(/-/g, "/")
      let birthDate = new Date(formatted);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
    attack: function (knight) {
      let equipped = knight.weapons.filter(w => w.equipped)
      let sumMod = equipped
        .map(item => item.mod)
        .reduce((a, n) => a + n, 0);
      let keyAttr = knight.attributes[knight.keyAttribute]
      let attack = 10 + this.mod(keyAttr) + sumMod;
      return attack;
    },
    mod: function (value) {
      if (value <= 8) return -2
      if (value <= 10) return -1
      if (value <= 12) return 0
      if (value <= 15) return 1
      if (value <= 18) return 2
      return 3;
    },
    exp: function (attack, age) {
      if ((age -7) <= 0) return 0; 
      let exp = Math.floor((age -7) * Math.pow(attack, 1.45));
      return exp;
    }
  },
};
</script>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.center {
  margin-left: auto;
  margin-right: auto;
}
</style>