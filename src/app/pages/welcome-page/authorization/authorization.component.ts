import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [TuiButton, ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
   authForm: FormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   })
   authError: boolean = false;

   readonly context = injectContext<TuiDialogContext<void,void>>();

   private authService = inject(AuthorizationService);
   private router = inject(Router);

   constructor() { }

   protected onSubmit():void {
      this.authService.login(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value
      ).subscribe({
         next: (result: boolean) => {
            if (result) {
               this.authError = false;
               this.router.navigate(['/boards']);
               this.context.completeWith();
            } else {
               this.authError = true;
               let errorMessage: HTMLElement | null = document.getElementById('error');
               if (errorMessage) {
                  errorMessage.textContent = 'Ошибка: аккаунт с таким логином и паролем не найден';
               }            
               console.log('authError!');
            }
         }
      });
   }

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }
}
