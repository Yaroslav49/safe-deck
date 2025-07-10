import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import { Board } from '../../../shared/model/boards/board.model';
import { BoardService } from '../../../services/board-service/board.service';
import { RouterLink } from '@angular/router';
import { ColorService } from '../../../services/color-service/color.service';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'main-menu',
  imports: [TuiAvatar, TuiIcon, TuiButton, TuiScrollbar, RouterLink],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {
   private readonly boardService = inject(BoardService);
   private readonly colorService = inject(ColorService);
   private readonly profileService = inject(ProfileService);
   
   protected userName = this.profileService.publicName;
   protected boards = this.boardService.getBoards();

   ngOnInit() {
      this.boardService.updateUserBoards();
      this.profileService.updateProfile();
   }

   protected getAvatarText(): string {
      return this.userName()[0].toUpperCase();
   }

   protected getAvatarColor(): string {
      return this.colorService.getAccentColor(this.userName().charCodeAt(0));
   }
}
