import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SecureData } from "../../shared/model/secure/secure-data.model";

@Injectable({ providedIn: 'root' })
export class SecureDataService {
   private readonly http = inject(HttpClient);
   
   public getSecureData(cardId: number): Observable<SecureData> {
      return this.http.get(`http://localhost:8080/secure-data/${cardId}`).pipe(map((data: any) => data));
   }
}