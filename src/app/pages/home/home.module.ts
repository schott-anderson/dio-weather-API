import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from 'src/app/pages/home/containers/home/home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './state/home.effects';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('home',homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    ComponentsModule,   
  ],
  declarations: [
    HomePage,
    CurrentWeatherComponent,
  ],
})
export class HomeModule { }
