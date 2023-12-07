import { Component } from '@angular/core';
import { VersionPickerComponent } from '../version-picker/version-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SECTIONS } from '../../services/documentation-items/documentation-items';
import { NgFor } from '@angular/common';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    VersionPickerComponent,
    ThemePickerComponent,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNextVersion = false;

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

}
