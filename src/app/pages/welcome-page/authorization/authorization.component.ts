import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { Router } from '@angular/router';
import { DialogAuthorizationService } from '../dialog-authorization/dialog-authorization.service';

@Component({
  selector: 'app-authorization',
  imports: [TuiButton, ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
   private readonly authService = inject(AuthorizationService);
   private readonly dialogAuthService = inject(DialogAuthorizationService);
   private readonly router = inject(Router);
   readonly context = injectContext<TuiDialogContext<void,void>>();

   protected authForm: FormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   })

   protected error = signal<string>('');

   protected showRegistrationDialog():void {
      this.context.completeWith();
      this.dialogAuthService.showRegisterDialog();
   }

   protected onSubmit():void {
      this.authService.login(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value
      ).subscribe(
         (result: boolean) => {
            if (result) {
               this.error.set('');
               this.router.navigate(['/boards']);
               this.context.completeWith();
            } else {
               this.error.set('Ошибка: аккаунт с таким логином и паролем не найден');
            }
         }
      );
   }
}
