import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Board } from "../../shared/model/board.model";
import { map } from "rxjs/internal/operators/map";
import { catchError, Observable, of } from "rxjs";
import { BoardResponce } from "../../shared/model/board-responce.model";

@Injectable({ providedIn: 'root' })
export class BoardService {
   private readonly http = inject(HttpClient);

   public getUserBoards(): Observable<Board[]>  {
      return this.http.get("http://localhost:8080/boards").pipe(map((data: any) => data));
   }

   public createBoard(boardName: string): Observable<BoardResponce> {
      return this.http.post<any>("http://localhost:8080/boards", {boardName})
      .pipe(
         map(
            board => {
               return {status: 'ok', board: board};
            }
         ),
         catchError(
            error => {
               return of({status: 'error', error: `Ошибка ${error}!`});
            }
         )
      )
   }

   public deleteBoard(boardId: number): Observable<string> {
      return this.http.delete<any>(`http://localhost:8080/boards/${boardId}/delete`)
      .pipe(
         map(
            () => 'ok'
         ),
         catchError(
            error => {
               return of(`Ошибка ${error.status}!`)
            }
         )
      )
   }

   public renameBoard(boardId: number, newBoardName: string): Observable<BoardResponce> {
      return this.http.patch<any>(`http://localhost:8080/boards/${boardId}/rename`, {newBoardName})
      .pipe(
         map(
            board => {
               return {status: 'ok', board: board};
            }
         ),
         catchError(
            error => {
               return of({status: 'error', error: `Ошибка ${error}!`});
            }
         )
      )
   }
}