import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../pages/omdb.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  watchingHistory = [];

  constructor(private service: OmdbService) {
    this.watchingHistory = JSON.parse(window.localStorage.getItem('history')).reverse();
   }

  ngOnInit(): void {
    this.service.historyUpdated.subscribe(u => {
      this.watchingHistory = JSON.parse(window.localStorage.getItem('history')).reverse();
    })
  }

}
