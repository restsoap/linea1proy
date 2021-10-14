import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';

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

  //recibe el modelo vehiculo
  guardarVehi(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`, vehiculo);
  }

  listarIdVehiculo(idVehiculo: number){
    return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`);
  }

  editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }
}
