import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MainMenuComponent } from "../shared/main-menu/main-menu.component";
import { Board } from '../../shared/model/board.model';
import { BoardInfoComponent } from './board-info/board-info.component';
import { BoardService } from '../../services/board-service/board.service';
import { TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { BoardResponce } from '../../shared/model/board-responce.model';

@Component({
  selector: 'boards-page',
  imports: [MainMenuComponent, BoardInfoComponent, TuiIcon, TuiScrollbar],
  templateUrl: './boards-page.component.html',
  styleUrl: './boards-page.component.css'
})
export class BoardsPageComponent {
   private readonly boardService = inject(BoardService);
   
   protected boards: Board[] = [];

   @ViewChild(MainMenuComponent, {static: false})
   protected mainMenuComponent!: MainMenuComponent;

   @ViewChildren(BoardInfoComponent)
   protected boardsElements!: QueryList<BoardInfoComponent>;

   constructor() {
      this.updateBoards();
   }

   protected createBoard() {
      const boardName: string = `Компания ${this.boards.length + 1}`;
      this.boardService.createBoard(boardName).subscribe({
         next: (result: BoardResponce) => {
            console.log(result);
            // обновляем boards с сервера каждый чих, потому что у доски может быть много редакторов
            this.updateBoards();
            this.mainMenuComponent?.updateBoards();
            // выделяем созданный board для редактирования
            if (result.status == 'ok') {
               console.log('status == ok');
               setTimeout(() => {
                  var elem = this.boardsElements.find(
                     boardsElement => boardsElement.board()?.boardId == result?.board?.boardId
                  );
                  console.log('elem = ');
                  console.log(elem);
                  elem?.startEdit();
               }, 100);
            }
            
         }
      })
   }

   protected updateBoardsAnywhere() {
      this.updateBoards();
      this.mainMenuComponent?.updateBoards();
   }

   private updateBoards() {
      this.boardService.getUserBoards().subscribe({
         next: (boards: Board[]) => {
            this.boards = boards;
         }
      })
   }
}
