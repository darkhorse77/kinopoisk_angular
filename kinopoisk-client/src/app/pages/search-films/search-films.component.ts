import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../omdb.service';
import { Film, FilmShort } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-films',
  templateUrl: './search-films.component.html',
  styleUrls: ['./search-films.component.css']
})
export class SearchFilmsComponent {

  films: FilmShort[];
  searchString: string;
  searchFailed = false;

  constructor(private service: OmdbService, private router: Router) { }

  search(): void {
    this.service.Search(this.searchString, '0').subscribe(res => {
      if (res.Search) {
        this.searchFailed = false;
        this.films = res.Search;
        this.service.Search(this.searchString, '1').subscribe(res => {
          res.Search.forEach(f => {
            this.films.push(f);
          });
        });
      };
      if(res.Error) {
        this.films = [];
        this.searchFailed = true;
      }
    });
  }

  searchTypehead() {
    return (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        tap(x => {this.searchFailed = false;}),
        distinctUntilChanged(),
        switchMap(term => term.length < 5 ? [] :
          this.service.Search(term).pipe(
            tap(),
            catchError(() => {
              return of([]);
            }),
          )
        ),
        map(x => {     
          return x.Search;
        }
        )
      );
  }

  selectedItem(event) {
    this.searchString = event.item.Title;
    event.preventDefault();
    this.router.navigateByUrl('films/' + event.item.imdbID);
  }
}
