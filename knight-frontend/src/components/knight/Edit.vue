<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">
          View All Knights
        </button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Knight</h2>
      <form id="edit-knight-form" @submit.prevent="editKnight">
        <div class="form-group col-md-12">
          <label for="nickname"> Nickname </label>
          <input
            type="text"
            id="nickname"
            v-model="knight.nickname"
            name="nickname"
            class="form-control"
            placeholder="Enter Nickname"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit Knight</button>
        </div>
      </form>
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
    editKnight() {
      let knightData = {
        name: this.knight.name,
        nickname: this.knight.nickname,
      };

      axios
        .put(`${server.baseURL}/knight/edit?knightID=${this.id}`, knightData)
        .then(() => {
          router.push({ name: "home" });
        });
    },
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
