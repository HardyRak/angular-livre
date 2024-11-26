import { Component } from '@angular/core';
import { ConnectDataService } from '../services/connect-data.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { DetailsComponent } from '../details/details.component';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,PaginationComponent,DetailsComponent,FilterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  books: any[] = [];
  detailsBooks : any;
  constructor(private dataService : ConnectDataService,private router: Router,private localStorage : LocalStorageServiceService){}
  
  ngOnInit() {
    let pageList = this.localStorage.getItem('pageList');
    if (!pageList || isNaN(Number(pageList))) {
      pageList = '1'; 
      this.localStorage.setItem('pageList', pageList);
    }

    const currentPage = Number.parseInt(pageList, 10);
  
    this.dataService.getBooks(currentPage).subscribe((data) => {
      this.books = data.books;
      if (data.totalPages) {
        this.localStorage.setItem('maxPage', data.totalPages.toString());
      }
    }, (error) => {
      console.log('Erreur lors de la recuperation des données');
    });
  }

  showDetails(idBook : string){
    this.dataService.getBookById(idBook).subscribe((data) => {
      this.detailsBooks=data;
    });
  }

  paginateList(data : any){
    this.books = data.books;
  }

  deleteBooks(_id : string){
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce livre ?");
    if(confirmation){
      this.dataService.deleteBook(_id).subscribe({
        next : (data) => {
          alert('Suppression avec succés');
          window.location.reload();
        },error : (err) => {
          alert('Erreur de suppression');
        },
      });
    }
  }

  sortTable(order : string ,orderType :string ){
    let pageList = this.localStorage.getItem('pageList');
    if (!pageList || isNaN(Number(pageList))) {
      pageList = '1'; 
      this.localStorage.setItem('pageList', pageList);
    }

    const currentPage = Number.parseInt(pageList, 10);
    localStorage.setItem("currentOrder",order);
    localStorage.setItem("currentOrderType",orderType);
    this.dataService.getBooksWithOrder(currentPage,this.localStorage.getItem('currentOrder')?? 'id' ,
                                       this.localStorage.getItem('currentOrderType')?? '1').subscribe((data) => {
      this.books = data.books;
      if (data.totalPages) {
        this.localStorage.setItem('maxPage', data.totalPages.toString());
      }
    }, (error) => {
      console.log('Erreur lors de la recuperation des données');
    });
  }

}