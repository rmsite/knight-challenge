<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create a Knight</h2>
      <form id="create-knight-form" @submit.prevent="createKnight">
        <div class="form-group col-md-12">
          <label for="name"> Name </label>
          <input
            type="text"
            id="name"
            v-model="name"
            name="name"
            class="form-control"
            placeholder="Enter name"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="nickname"> Nickname </label>
          <input
            type="text"
            id="nickname"
            v-model="nickname"
            name="nickname"
            class="form-control"
            placeholder="Enter nickname"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="birthday"> Birthday </label>
          <input
            type="date"
            id="birthday"
            v-model="birthday"
            name="birthday"
            class="form-control"
            placeholder="Enter birthday"
          />
        </div>
        <hr />
        Weapons
        <div class="card">
          <div class="card-body">
            <div v-for="(item, index) in weapons" :key="item">
              <h5>Weapom {{ index + 1 }}</h5>
              <div class="row">
                <div class="col-sm-3">
                  <label>Name</label>
                  <input type="text" class="form-control" v-model="item.name" />
                </div>
                <div class="col-sm-1">
                  <label>Mod</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="item.mod"
                  />
                </div>
                <div class="col-sm-3">
                  <select v-model="item.attr">
                    <option disabled value="">Key Attribute</option>
                    <option value="Strength">Strength</option>
                    <option value="Dexterity">Dexterity</option>
                    <option value="Constitution">Constitution</option>
                    <option value="Intelligence">Intelligence</option>
                    <option value="Wisdom">Wisdom</option>
                    <option value="Charisma">Charisma</option>
                  </select>
                </div>
                <div class="col-sm-2">
                  <input
                    type="checkbox"
                    id="equipped"
                    v-model="item.equipped"
                  />
                  <label for="equipped">Equipped</label>
                </div>
                <div class="col-sm-2 pt-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="removeRow(index)"
                  >
                    x</button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="addRow"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        Attributes

        <div class="card">
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-sm-3">
                  <label>Strength</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.strength"
                  />
                </div>
                <div class="col-sm-3">
                  <label>Dexterity</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.dextenrity"
                  />
                </div>
                <div class="col-sm-3">
                  <label>Constitution</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.constitution"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <label for="equipped">Intelligence</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.intelligence"
                  />
                </div>
                <div class="col-sm-3">
                  <label for="equipped">Wisdom</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.wisdom"
                  />
                </div>
                <div class="col-sm-3">
                  <label for="equipped">Charisma</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="attributes.charisma"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3">
            <select v-model="keyAttribute">
              <option disabled value="">Key Attribute</option>
              <option value="Strength">Strength</option>
              <option value="Dexterity">Dexterity</option>
              <option value="Constitution">Constitution</option>
              <option value="Intelligence">Intelligence</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Charisma">Charisma</option>
            </select>
          </div>
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Knight</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      nickname: "",
      birthday: "",
      heroe: "",
      weapons: [
        {
          name: "",
          mod: 0,
          attr: "",
          equipped: false,
        },
      ],
      attributes: {
        strength: "",
        dextenrity: "",
        constitution: "",
        intelligence: "",
        wisdom: "",
        charisma: "",
      },
      keyAttribute: "",
    };
  },
  created() {
    this.date_knighted = new Date().toLocaleDateString();
  },
  methods: {
    addRow() {
      this.weapons.push({ name: "", mod: 0 });
    },
    removeRow(index) {
      if (this.weapons.length > 1) {
        this.weapons.splice(index, 1);
      }
    },
    createKnight() {
      let knightData = {
        name: this.name,
        nickname: this.nickname,
        birthday: this.birthday,
        heroe: false,
        weapons: this.weapons,
        attributes: this.attributes,
        keyAttribute: this.keyAttribute,
      };
      this.__submitToServer(knightData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/knight/knights`, data).then(() => {
        router.push({ name: "home" });
      });
    },
  },
};
</script>
