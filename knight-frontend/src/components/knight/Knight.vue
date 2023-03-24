<template>
  <div class="text-center">
    <div class="col-sm-12">
      <h4 style="margin-top: 30px">
        <small
          ><button class="btn btn-success" v-on:click="navigate()">
            View All Knights
          </button></small
        >
      </h4>
      <hr />
      <h2>{{ knight.heroe ? 'HEROE: ' : '' }}{{ knight.name }} - {{ knight.nickname }} - {{ knight.birthday }}</h2>
      <table class="center">
        <tr>
          <td>#</td>
          <td>Name</td>
          <td>Mod</td>
          <td>attr</td>
          <td>Equipped</td>
        </tr>
        <tr v-for="(item, index) in knight.weapons" :key="item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mod }}</td>
          <td>{{ item.attr }}</td>
          <td>{{ item.equipped ? 'yes' : 'no' }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { server } from "../../utils/helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      knight: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getKnight();
  },
  methods: {
    getKnight() {
      axios
        .get(`${server.baseURL}/knight/knight/${this.id}`)
        .then((data) => (this.knight = data.data));
    },
    navigate() {
      router.go(-1);
    },
  },
};
</script>
