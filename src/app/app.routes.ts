import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteGuardAuth } from './guard-functions/route-guard-auth.function';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { MemberPageComponent } from './pages/member-page/member-page.component';
import { PasswordGeneratorComponent } from './pages/password-generator/password-generator.component';
import { LogsComponent } from './pages/logs/logs.component';
import { SendSecureViewComponent } from './pages/send-secure-view/send-secure-view.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
   {path: 'main', component: MainPageComponent, canActivate: [RouteGuardAuth], children: [
      {path: 'boards', component: BoardsPageComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'password-generator', component: PasswordGeneratorComponent},
      {path: 'cards/:board-id', component: CardsPageComponent},
      {path: 'card/:board-id/:card-id', component: CardPageComponent},
      {path: 'roles/:board-id', component: RolesPageComponent},
      {path: 'logs/:board-id', component: LogsComponent},
      {path: 'members/:board-id', component: MembersPageComponent},
      {path: 'member/:board-id/:member-id', component: MemberPageComponent},
   ]},
   {path: 'send-secure/:token', component: SendSecureViewComponent},
   {path: '**', component: WelcomePageComponent},
];
