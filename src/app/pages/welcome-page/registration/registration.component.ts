import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { DialogAuthorizationService } from '../dialog-authorization/dialog-authorization.service';

@Component({
  selector: 'app-registration',
  imports: [TuiButton, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: '../authorization/authorization.component.css'
})
export class RegistrationComponent {
   private readonly authService = inject(AuthorizationService);
   private readonly dialogAuthService = inject(DialogAuthorizationService);
   private readonly router = inject(Router);
   readonly context = injectContext<TuiDialogContext<void,void>>();

   private readonly errors: Record<string, string> = {
      '400': 'Ошибка: некорректные данные',
      '409': 'Ошибка: такой email уже зарегистрирован',
      '500': 'Ошибка сервера. Проверьте интернет-соединение',
   }

   authForm: FormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      publicName: new FormControl('', Validators.required)
   })
   authError: boolean = false;

   constructor() { }

   protected showAuthDialog():void {
      this.context.completeWith();
      this.dialogAuthService.showAuthDialog();
   }

   protected onSubmit():void {
      this.authService.register(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value, this.authForm.controls['publicName'].value
      ).subscribe({
         next: (resultCode: number) => {
            if (resultCode == 200) {
               this.authError = false;
               this.router.navigate(['/boards']);
               this.context.completeWith();
            } else {
               this.authError = true;
               let errorMessage: HTMLElement | null = document.getElementById('error');
               if (errorMessage) {
                  var errorText: string | undefined = this.errors[resultCode];
                  if (!errorText) {
                     errorText = 'Неизвестная ошибка';
                  }
                  errorMessage.textContent = errorText;
               }            
               console.log('regError!');
            }
         }
      });
   }

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }
}

