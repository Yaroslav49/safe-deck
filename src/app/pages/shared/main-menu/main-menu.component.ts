import { Component, inject } from '@angular/core';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import { Board } from '../model/board.model';
import { BoardService } from '../../../services/board-service/board.service';

@Component({
  selector: 'main-menu',
  imports: [TuiAvatar, TuiIcon, TuiButton, TuiScrollbar],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
   protected userName: string = "Ярослав Зверев";
   protected boards: Board[] = [
      {boardId: 1, boardName: "Компания 1"},
      {boardId: 2, boardName: "Компания 2"},
      {boardId: 3, boardName: "Компания 3 с длинным названием"},
   ];

   private colors: string[] = ["#5B7AE5", "#E6B05C", "#D6BD2D"];
   private boardService = inject(BoardService);

   constructor() {
      this.updateBoards();
   }

   protected getAvatarText(): string {
      return this.userName[0].toUpperCase();
   }

   protected getAvatarColor(): string {
      return this.colors[this.userName.charCodeAt(0) % this.colors.length];
   }

   public updateBoards() {
      this.boardService.getUserBoards().subscribe({
         next: (boards: Board[]) => {
            this.boards = boards;
         }
      })
   }
}
