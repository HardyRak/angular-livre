import { Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    { path: '', component: TableComponent,title : 'Page principale' },
    { path: 'ajout', component: AddBooksComponent,title : 'Page d\'ajout' },
];