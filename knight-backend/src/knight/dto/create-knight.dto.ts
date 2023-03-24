export class CreateKnightDTO {
  readonly name: string;
  readonly nickname: string;
  readonly birthday: string;
  readonly heroe: boolean;
  readonly weapons: KnightWeaponsDTO[];
  readonly attributes: KnightAttributesDTO;
  readonly keyAttribute: string;
}

export type KnightWeaponsDTO = {
  readonly name: string;
  readonly mod: number;
  readonly attr: string;
  readonly equipped: boolean;
};

export type KnightAttributesDTO = {
  readonly strength: number;
  readonly dextenrity: number;
  readonly constitution: number;
  readonly intelligence: number;
  readonly wisdom: number;
  readonly charisma: number;
};
