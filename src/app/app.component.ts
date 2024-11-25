import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterOutlet],
  template: `
    <main>
      <section class="content">
        <router-outlet/>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}