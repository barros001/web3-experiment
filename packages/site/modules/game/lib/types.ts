export type Character = {
  index: number;
  name: string;
  imageUri: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
  damageDealt?: number;
  owner: string;
};
