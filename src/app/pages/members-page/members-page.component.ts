import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';
import { BoardMemberService } from '../../services/board-member-service/board-member.service';
import { TuiTable } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-members-page',
  imports: [MainMenuComponent, RouterLink, TuiIcon, TuiButton, TuiTable, TuiScrollbar],
  templateUrl: './members-page.component.html',
  styleUrl: './members-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersPageComponent implements OnInit {
   private readonly activateRoute = inject(ActivatedRoute);
   private readonly boardMemberService = inject(BoardMemberService);

   protected boardId: number = -1;
   protected boardMembers = this.boardMemberService.boardMembers;

   protected readonly columns = ['publicName', 'email', 'action1', 'action2'];

   ngOnInit() {
      this.activateRoute.params.subscribe(params => {
         this.boardId = params["board-id"];
         this.boardMemberService.updateBoardMembers(this.boardId);
      });
   }
}
