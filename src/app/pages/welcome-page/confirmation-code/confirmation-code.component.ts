import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'confirmation-code',
  imports: [TuiButton, ReactiveFormsModule],
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['../../../shared/styles/auth.styles.css', './confirmation-code.component.css']
})
export class ConfirmationCodeComponent {
   readonly context = injectContext<TuiDialogContext<string,void>>();

   protected confirmationCodeForm: FormGroup = new FormGroup({
      code: new FormControl('', [Validators.required]),
   })

   protected sendCode() {
      this.context.completeWith(this.confirmationCodeForm.controls['code'].value);
   }

   protected cancel() {
      this.context.completeWith('');
   }
}
