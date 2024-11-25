import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectDataService } from '../services/connect-data.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent {

  constructor(private postData : ConnectDataService,private router : Router, private localStorage : LocalStorageServiceService){}

  booksForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    auteur: new FormControl('', Validators.required),
    pages: new FormControl('', Validators.required),
    dateSortie  : new FormControl(null),
    images : new FormControl('', Validators.required)
  });

  selectedFile: File | null = null;
  imageBase64 : string | null = null ;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imageBase64 = reader.result as string;
          this.booksForm.patchValue({ images: this.imageBase64 });
        };
        reader.readAsDataURL(file);
      } else {
        this.booksForm.get('images')?.setErrors({ invalidType: true });
      }
    }
  }

  onSubmit(){
    if(this.booksForm.valid){
      const formData = {
        titre : this.booksForm.get('titre')?.value,
        auteur : this.booksForm.get('auteur')?.value,
        pages : this.booksForm.get('pages')?.value,
        dateSortie : this.booksForm.get('dateSortie')?.value,
        image : this.imageBase64
      }
      this.postData.saveBooks(formData).subscribe({
        next:(data) => {
          this.booksForm.reset();
          this.imageBase64='';
          alert('Ajout avec succés');
          this.localStorage.setItem('maxPage',data.totalPages);
          this.localStorage.setItem('pageList',data.totalPages);
          this.router.navigate(['/']);
        },
        error :(error) => {
          alert('Une erreur c\'est produite');
        },
      });
    }else{
      alert('Votre formulaire n\'est pas valide');
    }
  }
}