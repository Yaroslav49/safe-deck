import { Board } from "../../pages/shared/model/board.model";

export interface BoardResponce {
   status: string;
   board?: Board;
   error?: string;
}