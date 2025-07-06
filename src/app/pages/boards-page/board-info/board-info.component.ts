import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Board } from '../../../shared/model/boards/board.model';
import { TuiButton, TuiDialogService, TuiIcon } from '@taiga-ui/core';
import { BoardService } from '../../../services/board-service/board.service';
import { BoardResponce } from '../../../shared/model/boards/board-responce.model';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { switchMap } from 'rxjs';

@Component({
   selector: 'board-info',
   imports: [TuiIcon, TuiButton],
   templateUrl: './board-info.component.html',
   styleUrl: './board-info.component.css'
})
export class BoardInfoComponent {
   private readonly boardService = inject(BoardService);
   private readonly dialogs = inject(TuiDialogService);

   board = input.required<Board>();

   @ViewChild("boardInput", { static: false })
   boardInput!: ElementRef;

   updateBoards = output<void>();

   protected isNameEdited: boolean = false;

   public startEdit() {
      this.isNameEdited = true;
      setTimeout(() => {
         this.boardInput.nativeElement.focus();
         console.log('focus!');
      });
   }

   protected cancelEdit() {
      this.isNameEdited = false;
   }

   protected editName() {
      const boardId: number = this.board().boardId || -1;
      const newBoardName: string = this.boardInput.nativeElement.value || '';
      console.log(`edit name: id = ${boardId}, name = ${newBoardName}`);
      if (boardId >= 0 && newBoardName.trim() != '') {
         this.boardService.renameBoard(boardId, newBoardName)
            .subscribe({
               next: (result: BoardResponce) => {
                  if (result.status == 'ok') {
                     this.updateBoards.emit();
                  } else {
                     // здесь будет вывод ошибок пользователю
                  }
               }
            })
      }
      this.isNameEdited = false;
   }

   protected confirmDeleteBoard() {
      this.dialogs
         .open<boolean>(TUI_CONFIRM, {
            label: 'Предупреждение',
            size: 's',
            data: {
               content: 'Вы уверены, что хотите удалить компанию? Это действие необратимо',
               yes: 'Да',
               no: 'Нет',
            },
         })
         .subscribe(response => {
            if (response) {
               this.deleteBoard();
            }
         })
   }

   private deleteBoard() {
      const boardId: number = this.board().boardId || -1;
      if (boardId >= 0) {
         this.boardService.deleteBoard(boardId)
            .subscribe({
               next: (result: string) => {
                  if (result == 'ok') {
                     this.updateBoards.emit();
                  }
               }
            })
      }
   }
}
