import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  //listamos los vehiculos
  listarVehiculo(page: number, size: number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

}
