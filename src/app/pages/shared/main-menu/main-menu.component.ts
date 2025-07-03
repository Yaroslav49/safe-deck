import { Component, inject } from '@angular/core';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import { Board } from '../../../shared/model/board.model';
import { BoardService } from '../../../services/board-service/board.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'main-menu',
  imports: [TuiAvatar, TuiIcon, TuiButton, TuiScrollbar, RouterLink],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
   private readonly boardService = inject(BoardService);
   
   protected userName: string = "Ярослав Зверев";
   protected boards: Board[] = [];

   private colors: string[] = ["#5B7AE5", "#E6B05C", "#D6BD2D"];

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
