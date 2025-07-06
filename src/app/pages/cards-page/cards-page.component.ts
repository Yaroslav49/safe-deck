import { Component, inject } from '@angular/core';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';
import { tuiDialog, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../shared/model/cards/card.model';
import { CardComponent } from './card/card.component';
import { CardService } from '../../services/card-service/card.service';
import { AccessibleCards } from '../../shared/model/cards/accessible-cards.model';
import { AccessLevel } from '../../shared/model/cards/access-level.enum';
import { FullCardComponent } from './card/full-card/full-card.component';

@Component({
  selector: 'cards-page',
  imports: [MainMenuComponent, TuiScrollbar, TuiIcon, CardComponent],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css'
})
export class CardsPageComponent {
   private readonly activateRoute = inject(ActivatedRoute);
   private readonly cardService = inject(CardService);
   private readonly subscription: Subscription;
   private readonly fullCardDialog = tuiDialog(FullCardComponent, {
      dismissible: true,
      size: 'm',
   });

   protected boardId: number = -1;
   protected accessLevel: AccessLevel = AccessLevel.GUEST;
   protected cards: Card[] = [
      {cardId: 0, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 1, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 2, cardName: "Mongo DB", cardDescription: "База данных для паролей"},
      {cardId: 3, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 4, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 5, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 6, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 7, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 8, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
      {cardId: 9, cardName: "Postgre SQL", cardDescription: "Основная база данных"},
   ];

   constructor() {
      this.subscription = this.activateRoute.params.subscribe(params => {
         this.boardId = params["board-id"];
         this.updateCards();
      });
   }

   protected updateCards() {
      if (this.boardId != -1) {
         this.cardService.getAccessibleCards(this.boardId).subscribe({
            next: (data: AccessibleCards) => {
               this.cards = data.accessibleCards;
               this.accessLevel = data.accessLevel;
            },
            error: (error: any) => {
               console.log(error);
               this.accessLevel = AccessLevel.GUEST;
            }
         })
      }  
   }
}