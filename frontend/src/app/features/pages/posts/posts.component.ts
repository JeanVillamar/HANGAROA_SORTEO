import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

interface Photo {
  id: string;
  images: { height: number; source: string; width: number }[];
}

interface FilteredPhoto {
  id: string;
  image: { height: number; source: string; width: number };
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  photos: FilteredPhoto[] = [];
  userName: string = 'Usuario';  // Valor por defecto

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.getPhotos().subscribe((response: { photos: { data: Photo[] } }) => {
      // Filtrar para obtener solo una imagen por cada 'id'
      this.photos = response.photos.data.map((photo: Photo) => {
        return {
          id: photo.id,
          image: photo.images[0] // Selecciona la primera imagen de cada conjunto
        };
      });
    });

    this.authService.getUserName().subscribe(response => {
      this.userName = response.name;
    });
  }

  loadImages(): void {

  }

  filterImages(event: any): void {
 
  }

  sortImages(event: any): void {

  }
}
// import { Component,OnInit } from '@angular/core';

// interface Image {
//     name: string;
//     src: string;
//   }

// @Component({
//   selector: 'app-posts',
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.css']
// })
// export class PostsComponent implements OnInit {
//     images: Image[] = [];
//     filteredImages: Image[] = [];
  
//     ngOnInit(): void {
//       this.loadImages();
//       this.filteredImages = this.images;
//     }
  
//     loadImages(): void {
//       const imageCount = 8; // Cambia esto al número de imágenes que tengas en la carpeta
//       for (let i = 1; i <= imageCount; i++) {
//         this.images.push({
//           name: `Post ${i}`,
//           src: `assets/images/posts/post${i}.jpg`
//         });
//       }
//     }
  
//     filterImages(event: any): void {
//     const filterCriteria = event.target.value;
//       if (filterCriteria === 'todos') {
//         this.filteredImages = this.images;
//       } else {
//         this.filteredImages = this.images;
//       }
//     }

//     sortImages(event: any): void {
//         const sortCriteria = event.target.value;
//         if (sortCriteria === 'recent') {
//           this.filteredImages = this.images.slice().reverse();
//         } else if (sortCriteria === 'oldest') {
//           this.filteredImages = this.images.slice();
//         } else if (sortCriteria === 'nameAsc') {
//           this.filteredImages = this.images.slice().sort((a, b) => a.name.localeCompare(b.name));
//         } else if (sortCriteria === 'nameDesc') {
//           this.filteredImages = this.images.slice().sort((a, b) => b.name.localeCompare(a.name));
//         }
//       }

//   }