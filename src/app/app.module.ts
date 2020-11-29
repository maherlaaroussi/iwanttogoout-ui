import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { from } from 'rxjs';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServerOfflineComponent } from './server-offline/server-offline.component';
import { GameComponent } from './game/game.component';
import { AuthComponent } from './auth/auth.component';
import { GameViewComponent } from './game-view/game-view.component';
import { RouterModule, Routes } from '@angular/router';

import { GameService } from './services/game.service';
import { ApiService } from './services/api.service';

const appRoutes: Routes = [
  { path: 'game', component: GameViewComponent},
  { path: 'start', component: WelcomeComponent},
  { path: 'offline', component: ServerOfflineComponent},
  { path: '', component: WelcomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WelcomeComponent,
    ServerOfflineComponent,
    GameComponent,
    AuthComponent,
    GameViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
