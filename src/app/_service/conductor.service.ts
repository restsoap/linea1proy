import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Conductor } from './../_model/Conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private url: string = `${environment.HOST}/usuarios`;

  constructor(
    private http: HttpClient
  ) { }

  listarPaginado(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageablePorRol/4/${page}/${size}`);
  }

  listarPorId(idConductor: number) {
    return this.http.get<Conductor>(`${this.url}/listar/${idConductor}`);
  }
}
