import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { SearchFilmsComponent } from './pages/search-films/search-films.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { FilmInfoComponent } from './pages/film-info/film-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SearchFilmsComponent,
    FilmInfoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
