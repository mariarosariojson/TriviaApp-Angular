import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaResultsComponent } from './trivia-results/trivia-results.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { TriviaRulesComponent } from './trivia-rules/trivia-rules.component';

const routes: Routes = [
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
  { path: 'rules', component: TriviaRulesComponent },
  { path: 'game', component: TriviaGameComponent },
  { path: 'results', component: TriviaResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
