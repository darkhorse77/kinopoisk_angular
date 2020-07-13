import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../omdb.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Film, FilmShort } from 'src/app/models';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {
  private readonly _destroyed = new Subject<void>();

  private readonly storage: Storage;

  private filmId: string;
  public film: Film;

  constructor(private service: OmdbService, private route: ActivatedRoute) {
    this.storage = window.localStorage;
    route.params.pipe(takeUntil(this._destroyed))
      .subscribe(params => {
        this.filmId = params['id'];
        this.LoadData();
      });
  }

  ngOnInit(): void {

  }

  LoadData() {
    this.service.GetFilm(this.filmId).subscribe(res => {
      this.film = res;
      this.writeHistory();
    })
  }

  // todo вынести куда нибудь
  writeHistory() {
    //debugger
    let film = this.film; // todo привести всё к типу FilmShort
    // если история пустая, создаём массив и добавляем туда первую запись
    if (!this.storage.getItem('history')) {
      this.storage.setItem('history', JSON.stringify([film]));
    }
    // иначе берём массив из локалстореджа и добавляем последний фильм, если записей становится больше 10 то удаляем старое 
    else {
      let history = JSON.parse(this.storage.getItem('history'));
      // если фильм уже есть в истории, то не дублируем его а ставим на последнее место
      let exist = history.find(x => x.imdbID == film.imdbID);
      if (exist) {
        let index = -1;
        for (var i = 0; i < history.length; i++) {
          if (history[i].imdbID == exist.imdbID) {
            index = i;
            break;
          }
        }
        if(index != -1) {
          history.splice(index, 1);
        }
      }
      history.push(film);
      if (history.length > 10) {
        history.splice(0, history.length - 10);
      }
      this.storage.setItem('history', JSON.stringify(history));
      this.service.historyUpdated.next();
      //console.log(JSON.parse(this.storage.getItem('history')));
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
