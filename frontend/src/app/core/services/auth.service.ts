import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:3200/api/facebook/photos';
  private userNameUrl = 'https://localhost:3200/api/user-name'; // Añade la URL del endpoint para obtener el nombre del usuario

  constructor() { }

  getPhotos(): Observable<any> {
    return from(fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    ).pipe(
      catchError(this.handleError)
    );
  }

  getUserName(): Observable<{ name: string }> {
    return from(fetch(this.userNameUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = `Error desconocido`;
    }
    return throwError(errorMessage);
  }
}
