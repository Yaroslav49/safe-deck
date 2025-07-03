import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteGuardAuth } from './guard-functions/route-guard-auth.function';

export const routes: Routes = [
   {path: 'boards', component: BoardsPageComponent, canActivate: [RouteGuardAuth]},
   {path: 'profile', component: ProfileComponent, canActivate: [RouteGuardAuth]},
   {path: '**', component: WelcomePageComponent},
];
