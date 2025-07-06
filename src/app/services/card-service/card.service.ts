import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { AccessibleCards } from "../../shared/model/cards/accessible-cards.model";
import { CardResponce } from "../../shared/model/cards/card-responce.model";
import { Card } from "../../shared/model/cards/card.model";
import { UniversalResponce } from "../../shared/model/universal-responce.model";

@Injectable({ providedIn: 'root' })
export class CardService {
   private readonly http = inject(HttpClient);

   public getAccessibleCards(boardId: number): Observable<AccessibleCards> {
      return this.http.get(`http://localhost:8080/cards/${boardId}`).pipe(map((data: any) => data));
   }

   public renameCard(boardId: number, cardId: number, newCardName: string): Observable<CardResponce> {
      return this.http.patch<any>(`http://localhost:8080/cards/rename/${boardId}/${cardId}`, {newCardName})
         .pipe(
            map(
               card => {
                  return {status: 'ok', card: card};
               }
            ),
            catchError(
               error => {
                  return of({status: 'error', error: `Ошибка ${error}!`});
               }
            )
         )
   }

   public changeDescriptionCard(boardId: number, cardId: number, newCardDescription: string): Observable<CardResponce> {
      return this.http.patch<any>(`http://localhost:8080/cards/change-description/${boardId}/${cardId}`, {newCardDescription})
         .pipe(
            map(
               card => {
                  return {status: 'ok', card: card};
               }
            ),
            catchError(
               error => {
                  return of({status: 'error', error: `Ошибка ${error}!`});
               }
            )
         )
   }

   public deleteCard(boardId: number, cardId: number): Observable<UniversalResponce> {
      return this.http.delete<any>(`http://localhost:8080/cards/${boardId}/${cardId}`)
         .pipe(
            map(
               () => {return {status: 'ok'}}
            ),
            catchError(
               error => {
                  return of({status: 'error', error: `Ошибка ${error}!`});
               }
            )
         )
   }
}