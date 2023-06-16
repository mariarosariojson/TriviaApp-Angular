import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaResultsComponent } from './trivia-results/trivia-results.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { TriviaRulesComponent } from './trivia-rules/trivia-rules.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'rules', component: TriviaRulesComponent },
  { path: 'game', component: TriviaGameComponent },
  { path: 'results', component: TriviaResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
