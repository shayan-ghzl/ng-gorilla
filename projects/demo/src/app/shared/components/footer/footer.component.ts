import { Component } from '@angular/core';
import { VERSION } from 'ng-gorilla/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isNextVersion = false;
  version = VERSION.full;
  year = new Date().getFullYear();
}
