import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

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

   constructor() { }

   protected onSubmit():void {
      // здесь будет магия
   }
}
