import { z } from 'zod';

export const KnightWeapons = z.object({
  name: z.string(),
  mod: z.number(),
  attr: z.string(),
  equipped: z.boolean(),
});

export const KnightAttributes = z.object({
  strength: z.number(),
  dextenrity: z.number(),
  constitution: z.number(),
  intelligence: z.number(),
  wisdom: z.number(),
  charisma: z.number(),
});

export const Knight = z.object({
  name: z.string(),
  nickname: z.string(),
  birthday: z.string(),
  heroe: z.boolean().default(false),
  weapons: z.array(KnightWeapons),
  attributes: KnightAttributes,
  keyAttribute: z.string(),
});

type Knight = z.infer<typeof Knight>;

export default Knight;
