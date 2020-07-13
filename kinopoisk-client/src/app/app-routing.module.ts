import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SearchFilmsComponent } from './pages/search-films/search-films.component';
import { FilmInfoComponent } from './pages/film-info/film-info.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'films', pathMatch: 'full'
      },
      {
        path: 'films',
        component: SearchFilmsComponent
      },
      {
        path: 'films/:id',
        component: FilmInfoComponent
      }
    ]
  }
]