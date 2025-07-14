import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { BoardMember } from "../../shared/model/board-members/board-member.model";
import { catchError, map, Observable, of } from "rxjs";
import { RoleCard } from "../../shared/model/roles/role.model";
import { BoardMemberResponce } from "../../shared/model/board-members/member-responce.model";

@Injectable({ providedIn: 'root' })
export class BoardMemberService {
   private readonly http = inject(HttpClient);

   private membersSignal = signal<BoardMember[]>([]);

   public updateBoardMembers(boardId: number) {
      this.getBoardMembers(boardId).subscribe(
         boardMembers => this.membersSignal.set(boardMembers)
      )
   }

   public addBoardMember(boardId: number, email: string, roles: RoleCard[]): Observable<BoardMemberResponce> {
      return this.http.post<any>(`http://localhost:8080/board-members/${boardId}`, {email, roles})
      .pipe(
         map(
            boardMember => {
               return {status: 'ok', boardMember};
            }
         ),
         catchError(
            error => {
               return of({status: 'error', error: error.status});
            }
         )
      )
   }

   public get boardMembers() {
      return this.membersSignal;
   }

   private getBoardMembers(boardId: number): Observable<BoardMember[]>  {
      return this.http.get<BoardMember[]>(`http://localhost:8080/board-members/${boardId}`);
   }
}