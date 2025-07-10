import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { UniversalResponce } from "../../shared/model/universal-responce.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {
   private readonly http = inject(HttpClient);
   private publicNameSignal = signal<string>('Аноним');

   public get publicName(): WritableSignal<string> {
      return this.publicNameSignal;
   }

   public updateProfile() {
      this.getPublicName().subscribe(
         (publicName: string) => this.publicNameSignal.set(publicName)
      )
   }

   public changePublicName(newPublicName: string): Observable<UniversalResponce> {
      return this.http.put<any>('http://localhost:8080/profile', {newPublicName})
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

   private getPublicName(): Observable<string> {
      return this.http.get('http://localhost:8080/profile').pipe(map((data:any) => data.publicName))
   }
}