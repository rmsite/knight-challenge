import * as mongoose from 'mongoose';

export const KnightSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  birthday: String,
  heroe: Boolean,
  weapons: [
    {
      name: String,
      mod: Number,
      attr: String,
      equipped: Boolean,
    },
  ],
  attributes: {
    strength: Number,
    dextenrity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  keyAttribute: String,
});
