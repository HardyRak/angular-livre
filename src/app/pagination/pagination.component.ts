import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectDataService } from '../services/connect-data.service';
import { FormsModule, Validators } from '@angular/forms';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {
  constructor(private fetchData : ConnectDataService,private localStorage : LocalStorageServiceService){}
  @Output() booksPaginate = new EventEmitter<any[]>();
  currentPage: string | null = '1';
  totalPage : string = '' ;
  ngOnInit(){
    this.currentPage = this.localStorage.getItem('pageList') || '1';
    this.totalPage = this.localStorage.getItem('maxPage') || '1';
  }

  fetch(page : number){
    this.fetchData.getBooks(page).subscribe({
      next : (data) => {
        this.booksPaginate.emit(data);
      },
    });
  }

  nextPage(){
    let page=Number.parseInt(''+this.localStorage.getItem('pageList'));
    let totalPages=Number.parseInt(''+this.localStorage.getItem('maxPage'));
    console.log(totalPages,page);
    if(page<totalPages){
      page++;
      this.fetch(page);
      this.localStorage.setItem('pageList',`${page}`);
      this.currentPage = `${page}`;
    }
  }

  precPage(){
    let page=Number.parseInt(''+this.localStorage.getItem('pageList'));
    if(page>1){
      page--;
      this.fetch(page);
      this.localStorage.setItem('pageList',`${page}`);
      this.currentPage = `${page}`;
    }
  }

  onInputChange(){
    let page=Number.parseInt(this.currentPage+'');
    let totalPages=Number.parseInt(''+this.localStorage.getItem('maxPage'));
    if(page<1 || isNaN(page) ){
      page=1;
    }else if(page>totalPages){
      page=totalPages;
    }
    this.fetch(page);
    this.localStorage.setItem('pageList',`${page}`);
    this.currentPage = `${page}`;
  }
}
