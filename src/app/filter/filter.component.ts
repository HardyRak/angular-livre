import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  animations: [
    trigger('filterAnimation', [
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
export class FilterComponent {
  @Output() booksPaginate = new EventEmitter<any[]>();
  showFilter=false;
  showfilter(){
    this.showFilter=true;
  }

  closeFilter(){
    this.showFilter=false;
  }

}