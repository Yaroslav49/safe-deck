import { CredentialPair } from "../credential-pair.model";
import { RoleCard } from "../role.model";

export interface CreatingCard {
   cardName: string;
   cardDescription: string;
   roles: RoleCard[];
   secureData: CredentialPair[]
}