import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('detailsAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.9)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [animate('300ms ease-in')]),
    ]),
  ],
})
export class DetailsComponent {
  @Input() books: any = null;
  closeDetails() {
    this.books = null;
  }
  formatDate(date  : string){
    return new Date(date).toLocaleDateString('fr-FR')
  }
}