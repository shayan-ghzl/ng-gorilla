import { Component, HostBinding } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    FooterComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
