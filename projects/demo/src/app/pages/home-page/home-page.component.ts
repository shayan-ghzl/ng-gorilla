import { NgFor } from '@angular/common';
import { ANIMATION_MODULE_TYPE, Component, HostBinding, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CarouselComponent, CarouselItemDirective } from '../../shared/components/carousel/carousel.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ComponentPageTitle } from '../../shared/services/page-title/page-title';

const TOP_COMPONENTS = ['file-input'];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatDividerModule,
    MatIconModule,
    CarouselComponent,
    NgFor,
    CarouselItemDirective,
    MatCardModule,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  isNextVersion = false;

  @HostBinding('class.main-content') readonly mainContentClass = true;
  @HostBinding('class.animations-disabled') readonly animationsDisabled: boolean;


  constructor(
    public _componentPageTitle: ComponentPageTitle,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationsModule?: string) {
    this.animationsDisabled = animationsModule === 'NoopAnimations';
  }

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }

  getTopComponents(): string[] {
    return TOP_COMPONENTS;
  }
}
