import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Asociacion } from './../_model/Asociacion';
import { Vehiculo } from '../_model/Vehiculo';
import { Observable, pipe, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  private _refresh$ = new Subject<void>();

  get refresh(){
    return this._refresh$;
  }

  // listamos los vehiculos
  listarVehiculo(page: number, size: number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  // recibe el modelo vehiculo
  guardarVehi(vehiculo: Vehiculo){
    return this.http
    .post(`${this.url}/guardar`, vehiculo)
    .pipe(
      tap(() =>  {
        this._refresh$.next();
      })
    );
  }

  listarIdVehiculo(idVehiculo: number){
    return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`);
  }

  editar(vehiculo: Vehiculo){
    return this.http
    .put(`${this.url}/editar`, vehiculo)
    .pipe(
      tap(() =>  {
        this._refresh$.next();
      })
    );
  }

  asociarVehiculos(asociaciar: Asociacion) {​​
    return this.http.post(`${this.url}/asociarcondcutor/${asociaciar.idUsuario}/${asociaciar.idVehiculo}`, asociaciar);
  }​​

  desasociarVehiculo(desasociar: Asociacion){
    return this.http.post(`${this.url}/desasociarconductor/${desasociar.idUsuario}/${desasociar.idVehiculo}`, desasociar);
  }
}
