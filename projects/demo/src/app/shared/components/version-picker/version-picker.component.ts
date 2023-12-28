import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

interface VersionInfo {
  url: string;
  title: string;
}

@Component({
  selector: 'app-version-picker',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './version-picker.component.html',
  styleUrls: ['./version-picker.component.scss']
})
export class VersionPickerComponent {
  /** The currently running version of Material. */
  materialVersion = '2.0.0';
  /** The possible versions of the doc site. */
  docVersions: VersionInfo[] = [
    {
      "url": "https://shayan-ghzl.github.io/ng-gorilla/",
      "title": "1.0.0"
    },
    {
      "url": "https://shayan-ghzl.github.io/ng-gorilla/",
      "title": "1.0.1"
    },
    {
      "url": "https://shayan-ghzl.github.io/ng-gorilla/",
      "title": "2.0.0"
    },
  ];

}
