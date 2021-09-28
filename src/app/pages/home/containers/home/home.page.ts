import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Bookmark} from 'src/app/shared/models/bookmark.model';

import * as fromHomeActions from 'src/app/pages/home/state/home.actions';
import * as fromHomeSelectors from 'src/app/pages/home/state/home.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jv-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$:Observable<boolean>;
  searchControl: FormControl;
  text: string;
  private componemtDestroyed$ = new Subject();

  constructor( private store: Store ) { 
  }

  ngOnInit(){
    this.searchControl = new FormControl('', Validators.required); 

    this.store
      .pipe(
        select(fromHomeSelectors.selectCurrentWeather),
        takeUntil(this.componemtDestroyed$),
        )
      .subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));
  }

  ngOnDestroy(){
    this.componemtDestroyed$.next();
    this.componemtDestroyed$.unsubscribe();
  }

  doSearch(){
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({query}));
  }

  onToggleBookmark(){
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.contry = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;

  }

}
