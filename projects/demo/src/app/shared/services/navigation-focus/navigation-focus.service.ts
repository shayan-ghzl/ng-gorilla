import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {

  readonly navigationEndEvents = this.router.events.pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd));
  readonly softNavigations = this.navigationEndEvents.pipe(skip(1));

  constructor(private router: Router) { }
}
