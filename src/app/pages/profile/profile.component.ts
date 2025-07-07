import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [MainMenuComponent, TuiAvatar, TuiButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
   private readonly authService = inject(AuthorizationService);
   private readonly router = inject(Router);
   
   protected userName: string = "Ярослав Зверев";
   private colors: string[] = ["#5B7AE5", "#E6B05C", "#D6BD2D"];

   protected getAvatarText(): string {
      return this.userName[0].toUpperCase();
   }

   protected getAvatarColor(): string {
      return this.colors[this.userName.charCodeAt(0) % this.colors.length];
   }

   protected logout() {
      this.authService.logout();
      this.router.navigate(['']);
   }
}
