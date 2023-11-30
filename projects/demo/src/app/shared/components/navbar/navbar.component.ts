import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionPickerComponent } from '../version-picker/version-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    VersionPickerComponent,
    ThemePickerComponent,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isNextVersion = false;
}
