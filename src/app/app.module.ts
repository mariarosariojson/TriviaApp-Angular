import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaRulesComponent } from './trivia-rules/trivia-rules.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { TriviaResultsComponent } from './trivia-results/trivia-results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TriviaRulesComponent,
    TriviaGameComponent,
    TriviaResultsComponent,
    WelcomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
