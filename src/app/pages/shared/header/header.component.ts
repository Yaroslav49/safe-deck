import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { DialogAuthorizationService } from '../../welcome-page/dialog-authorization/dialog-authorization.service';

@Component({
  selector: 'header',
  imports: [RouterLink, TuiButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   public constructor(protected dialogAuthService: DialogAuthorizationService) { }

   scrollToFunctions() {
      document.getElementById('functions')?.scrollIntoView({behavior: 'smooth'});
   }
}
