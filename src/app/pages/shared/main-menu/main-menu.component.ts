import { Component, inject } from '@angular/core';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import { Board } from '../../../shared/model/boards/board.model';
import { BoardService } from '../../../services/board-service/board.service';
import { RouterLink } from '@angular/router';
import { ColorService } from '../../../services/color-service/color.service';

@Component({
  selector: 'main-menu',
  imports: [TuiAvatar, TuiIcon, TuiButton, TuiScrollbar, RouterLink],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
   private readonly boardService = inject(BoardService);
   private readonly colorService = inject(ColorService);
   
   protected userName: string = "Ярослав Зверев";
   protected boards: Board[] = [];

   constructor() {
      this.updateBoards();
   }

   protected getAvatarText(): string {
      return this.userName[0].toUpperCase();
   }

   protected getAvatarColor(): string {
      return this.colorService.getAccentColor(this.userName.charCodeAt(0));
   }

   public updateBoards() {
      this.boardService.getUserBoards().subscribe({
         next: (boards: Board[]) => {
            this.boards = boards;
         }
      })
   }
}
