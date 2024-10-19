import {Injectable} from '@angular/core';
import {env} from "../../env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Motorcycle} from "../../interfaces/Motorcycle";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchMotorcycleService {
  private apiUrl = 'https://api.api-ninjas.com/v1/motorcycles/';
  private apiKey = env.apiKey;

  constructor(private http: HttpClient) {
  }

  // Method to search for motorcycles using manufacturer and model
  searchMotorcycles(make: string, model: string | undefined, year: string | undefined): Observable<any[]> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'X-api-key': this.apiKey
      }
    );

    let url = `${this.apiUrl}?make=${make}`;
    if (model !== undefined) {
      url += `&model=${model}`;
      if (year !== undefined) {
        url += `&year=${year}`;
      }
    }

    return this.http.get<Motorcycle[]>(url, {headers: headers}).pipe(
      catchError(error => {
        console.error("API Error", error);
        throw new Error("API Error: ", error);
      })
    )
  }
}
