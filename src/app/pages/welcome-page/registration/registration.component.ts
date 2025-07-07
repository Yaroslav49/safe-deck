import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  styleUrl: '../authorization/authorization.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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

   protected authForm: FormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      publicName: new FormControl('', Validators.required)
   })
   protected error = signal<string>('');

   protected showAuthDialog():void {
      this.context.completeWith();
      this.dialogAuthService.showAuthDialog();
   }

   protected onSubmit():void {
      this.authService.register(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value, this.authForm.controls['publicName'].value
      ).subscribe(
         (resultCode: number) => {
            if (resultCode == 200) {
               this.error.set('');
               this.router.navigate(['/boards']);
               this.context.completeWith();
            } else {
               var errorText: string | undefined = this.errors[resultCode];
               if (!errorText) {
                  errorText = 'Неизвестная ошибка';
               }
               this.error.set(errorText);
            }
         }
      );
   }

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }
}

