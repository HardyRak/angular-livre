import { Component } from '@angular/core';
import { ConnectDataService } from '../services/connect-data.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { DetailsComponent } from '../details/details.component';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,PaginationComponent,DetailsComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  books: any[] = [];
  detailsBooks : any;
  constructor(private fetchData : ConnectDataService,private router: Router,private localStorage : LocalStorageServiceService){}
  
  ngOnInit() {
    let pageList = this.localStorage.getItem('pageList');
    if (!pageList || isNaN(Number(pageList))) {
      pageList = '1'; 
      this.localStorage.setItem('pageList', pageList);
    }

    const currentPage = Number.parseInt(pageList, 10);
  
    this.fetchData.getBooks(currentPage).subscribe((data) => {
      this.books = data.books;
      if (data.totalPages) {
        this.localStorage.setItem('maxPage', data.totalPages.toString());
      }
    }, (error) => {
      alert('Erreur lors de la recuperation des données');
    });
  }

  showDetails(idBook : string){
    this.fetchData.getBookById(idBook).subscribe((data) => {
      this.detailsBooks=data;
    });
  }

  paginateList(data : any){
    this.books = data.books;
  }

  deleteBooks(_id : string){
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce livre ?");
    if(confirmation){
      this.fetchData.deleteBook(_id).subscribe({
        next : (data) => {
          alert('Suppression avec succés');
          window.location.reload();
        },error : (err) => {
          alert('Erreur de suppression');
        },
      });
    }
  }

}