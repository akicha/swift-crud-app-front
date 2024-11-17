import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,
    NgbModule, CommonModule],
})
export class AppComponent {
  title = 'swift-crud-app-front';
}

