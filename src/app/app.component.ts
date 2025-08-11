import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbbottAppJsonSenderComponent } from './component/abbott-app-json-sender/abbott-app-json-sender.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AbbottAppJsonSenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-app';
}
