import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, MainMenuComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

}
