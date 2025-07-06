import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'full-card',
  imports: [],
  templateUrl: './full-card.component.html',
  styleUrl: './full-card.component.css'
})
export class FullCardComponent {
   cardForm: FormGroup = new FormGroup({
      cardName: new FormControl('', Validators.required),
      cardDescription: new FormControl('', Validators.required)
   })

   readonly context = injectContext<TuiDialogContext<void,void>>();
}
