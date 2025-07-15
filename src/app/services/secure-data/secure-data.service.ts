import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SecureData } from "../../shared/model/secure/secure-data.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SecureDataService {
   private readonly http = inject(HttpClient);
   private readonly apiUrl = environment.apiUrl;
   
   public getSecureData(cardId: number): Observable<SecureData> {
      return this.http.get<SecureData>(`${this.apiUrl}/secure-data/${cardId}`);
   }
}