import { inject, Injectable } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({ providedIn: 'root' })
export class AlertService {
   private readonly alerts = inject(TuiAlertService);

   public showError(message: string): void {
      this.alerts
         .open(message, { label: 'Ошибка', appearance: 'negative' })
         .subscribe();
   }

   public showMessage(message: string): void {
      this.alerts
         .open(message, { appearance: 'positive' })
         .subscribe();
   }
}