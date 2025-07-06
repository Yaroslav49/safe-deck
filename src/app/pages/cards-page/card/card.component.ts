import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Card } from '../../../shared/model/cards/card.model';
import { TuiButton, TuiDialogService, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { ColorService } from '../../../services/color-service/color.service';
import { CardService } from '../../../services/card-service/card.service';
import { CardResponce } from '../../../shared/model/cards/card-responce.model';
import { CardMenuComponent } from './card-menu/card-menu.component';
import { UniversalResponce } from '../../../shared/model/universal-responce.model';
import { TUI_CONFIRM } from '@taiga-ui/kit';

@Component({
  selector: 'card',
  imports: [TuiButton, CardMenuComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
   private readonly colorService = inject(ColorService);
   private readonly cardService = inject(CardService);
   private readonly dialogs = inject(TuiDialogService);

   card = input.required<Card>();
   boardId = input.required<number>();
   updateCards = output<void>();

   @ViewChild("nameInput", { static: false })
   nameInput!: ElementRef;
   @ViewChild("descriptionInput", { static: false })
   descriptionInput!: ElementRef;

   protected isNameEdited: boolean = false;
   protected isDescriptionEdited: boolean = false;

   protected selectMenuOption(numberOption: number) {
      const menuOptions = [this.startEditName, this.startEditDescription, this.confirmDeleteСard];
      menuOptions[numberOption].call(this);
   }

   protected startEditName() {
      this.isNameEdited = true;
      setTimeout(() => {
         this.nameInput.nativeElement.focus();
      });
   }
   
   protected cancelEdit() {
      this.isNameEdited = false;
   }

   protected editName() {
      const cardId: number = this.card().cardId || -1;
      const newCardName: string = this.nameInput.nativeElement.value || '';
      if (cardId >= 0 && newCardName.trim() != '') {
         this.cardService.renameCard(this.boardId(), cardId, newCardName)
            .subscribe({
               next: (result: CardResponce) => {
                  if (result.status == 'ok') {
                     this.updateCards.emit();
                  } else {
                     // здесь может быть вывод ошибок пользователю
                  }
               }
            })
      }
      this.isNameEdited = false;
   }

   protected startEditDescription() {
      this.isDescriptionEdited = true;
      setTimeout(() => {
         this.descriptionInput.nativeElement.focus();
      });
   }
   
   protected cancelEditDescription() {
      this.isDescriptionEdited = false;
   }

   protected editDescription() {
      const cardId: number = this.card().cardId || -1;
      const newCardDescription: string = this.descriptionInput.nativeElement.value || '';
      if (cardId >= 0 && newCardDescription.trim() != '') {
         this.cardService.changeDescriptionCard(this.boardId(), cardId, newCardDescription)
            .subscribe({
               next: (result: CardResponce) => {
                  if (result.status == 'ok') {
                     this.updateCards.emit();
                  } else {
                     // здесь может быть вывод ошибок пользователю
                  }
               }
            })
      }
      this.isDescriptionEdited = false;
   }

   protected confirmDeleteСard() {
      this.dialogs
         .open<boolean>(TUI_CONFIRM, {
            label: 'Предупреждение',
            size: 's',
            data: {
               content: 'Вы уверены, что хотите удалить карточку? Это действие необратимо',
               yes: 'Да',
               no: 'Нет',
            },
         })
         .subscribe(response => {
            if (response) {
               this.deleteCard();
            }
         })
   }

   protected deleteCard() {
      const cardId: number = this.card().cardId || -1;
      if (cardId >= 0) {
         this.cardService.deleteCard(this.boardId(), cardId)
            .subscribe({
               next: (result: UniversalResponce) => {
                  if (result.status == 'ok') {
                     this.updateCards.emit();
                  } else {
                     // здесь может быть вывод ошибок пользователю
                  }
               }
            })
      }
   }

   protected getBorderCard():string {
      return '6px solid' + this.colorService.getAccentColor(this.card().cardId);
   }

   protected getBackgroundColor():string {
      return this.colorService.getBackgroundColor(this.card().cardId);
   }
}
