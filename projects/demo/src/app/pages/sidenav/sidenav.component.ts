import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { NavigationFocusService } from '../../shared/services/navigation-focus/navigation-focus.service';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FooterComponent,
    NavComponent,
    PageHeaderComponent,
    MatSidenavModule,
    RouterOutlet
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit, OnDestroy {
  // parameter scoped to this route
  @Input({required: true}) section: string;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  private subscriptions = new Subscription();
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  constructor(
    private navigationFocusService: NavigationFocusService,
    breakpoints: BreakpointObserver
  ) {
    this.isExtraScreenSmall =
      breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
        .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
    this.subscriptions.add(
      this.navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall))
        .subscribe((shouldCloseSideNav) => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        })
    );
  }

  toggleSidenav(): Promise<MatDrawerToggleResult> {
    return this.sidenav?.toggle();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
