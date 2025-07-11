import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { RoleCard } from "../../shared/model/roles/role.model";
import { catchError, map, Observable, of } from "rxjs";
import { RoleResponce } from "../../shared/model/roles/role-responce.model";

@Injectable({ providedIn: 'root' })
export class RoleService {
   private readonly http = inject(HttpClient);
   private rolesSignal = signal<RoleCard[]>([]);

   public get boardRoles() {
      return this.rolesSignal;
   }

   public updateBoardRoles(boardId: number) {
      this.getBoardRoles(boardId).subscribe(
         roles => this.rolesSignal.set(roles)
      )
   }

   public createRole(boardId: number, roleName: string): Observable<RoleResponce> {
      return this.http.post<any>(`http://localhost:8080/roles/${boardId}`, {roleName})
      .pipe(
         map(
            role => {
               return {status: 'ok', role};
            }
         ),
         catchError(
            error => {
               return of({status: 'error', error: `Ошибка ${error}!`});
            }
         )
      )
   }

   public deleteRole(boardId: number, roleId: number): Observable<number> {
      return this.http.delete<any>(`http://localhost:8080/roles/${boardId}/${roleId}`)
      .pipe(
         map(
            () => 200
         ),
         catchError(
            responce => of(responce.status)
         )
      )
   }

   private getBoardRoles(boardId: number): Observable<RoleCard[]>  {
      return this.http.get(`http://localhost:8080/roles/${boardId}`)
      .pipe(
         map((data: any) => data)
      );
   }
}