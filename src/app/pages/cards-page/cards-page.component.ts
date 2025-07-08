import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';
import { tuiDialog, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Card } from '../../shared/model/cards/card.model';
import { CardComponent } from './card/card.component';
import { CardService } from '../../services/card-service/card.service';
import { AccessLevel } from '../../shared/model/cards/access-level.enum';

@Component({
  selector: 'cards-page',
  imports: [MainMenuComponent, TuiScrollbar, TuiIcon, CardComponent, RouterLink],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsPageComponent implements OnInit {
   private readonly activateRoute = inject(ActivatedRoute);
   private readonly cardService = inject(CardService);

   protected boardId: number = -1;

   protected get cards(): Card[] {
      return this.AccessibleCards().accessibleCards;
   }

   protected get accessLevel(): AccessLevel {
      return this.AccessibleCards().accessLevel;
   }

   private AccessibleCards = this.cardService.getAccessibleCardsSignal();

   ngOnInit() {
      this.activateRoute.params.subscribe(params => {
         this.boardId = params["board-id"];
         this.cardService.updateAccesibleCards(this.boardId);
      });
   }

}