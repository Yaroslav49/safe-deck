import { RoleCard } from "../role.model";

export interface Card {
   cardId: number;
   cardName: string;
   cardDescription: string;
   roles: RoleCard[]
}