import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavigationFocusService } from './shared/services/navigation-focus/navigation-focus.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    navigationFocusService: NavigationFocusService,
  ) {
    this.subscriptions.add(
      navigationFocusService.navigationEndEvents
        .subscribe(() => {
          resetScrollPosition();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.mat-drawer-content');
    console.log(sidenavContent);
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}