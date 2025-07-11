import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteGuardAuth } from './guard-functions/route-guard-auth.function';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

export const routes: Routes = [
   {path: 'boards', component: BoardsPageComponent, canActivate: [RouteGuardAuth]},
   {path: 'roles/:board-id', component: RolesPageComponent, canActivate: [RouteGuardAuth]},
   {path: 'cards/:board-id', component: CardsPageComponent, canActivate: [RouteGuardAuth]},
   {path: 'card/:board-id/:card-id', component: CardPageComponent, canActivate: [RouteGuardAuth]},
   {path: 'profile', component: ProfileComponent, canActivate: [RouteGuardAuth]},
   {path: '**', component: WelcomePageComponent},
];
