import { Document } from 'mongoose';

export interface Knight extends Document {
  readonly name: string;
  readonly nickname: string;
  readonly birthday: string;
  readonly heroe: boolean;
  readonly weapons: KnightWeapons[];
  readonly attributes: KnightAttributes;
  readonly keyAttribute: string;
}

export type KnightWeapons = {
  readonly name: string;
  readonly mod: number;
  readonly attr: string;
  readonly equipped: boolean;
};

export type KnightAttributes = {
  readonly strength: number;
  readonly dextenrity: number;
  readonly constitution: number;
  readonly intelligence: number;
  readonly wisdom: number;
  readonly charisma: number;
};
