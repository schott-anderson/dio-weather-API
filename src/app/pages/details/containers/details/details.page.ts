import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state/app.reducer';
import * as fromDetailsAction from '../../state/details.actions'

@Component({
  selector: 'jv-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  constructor(private store: Store<AppState>) { 
     
  }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsAction.loadWeatherDetails());
  }

}
