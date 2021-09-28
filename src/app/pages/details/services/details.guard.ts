import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable()
export class DetailsGuard implements CanActivate{

  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(route.queryParams.lat && route.queryParams.lon){
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}
