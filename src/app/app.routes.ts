import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';

export const routes: Routes = [
   {path: 'boards', component: BoardsPageComponent},
   {path: '**', component: WelcomePageComponent},
];
