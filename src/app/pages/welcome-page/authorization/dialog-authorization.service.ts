import { Injectable } from "@angular/core";
import { tuiDialog } from "@taiga-ui/core";
import { AuthorizationComponent } from "./authorization.component";

@Injectable({ providedIn: 'root' })
export class DialogAuthorizationService {
   private readonly authDialog = tuiDialog(AuthorizationComponent, {
      dismissible: true,
      size: 's',
   });

   public constructor() { }

   public showAuthDialog(): void {
      this.authDialog().subscribe({
         next: (data) => {
            console.info(`Dialog emitted data = ${data}`);
         },
         complete: () => {
            console.info('Dialog closed');
         },
      });
   }

}