import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../_model/Departamento';
import { Ciudad } from '../_model/Ciudad';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url: string = `${environment.HOST}/departamentos`;

  constructor(private http: HttpClient) { }

  public listar() {
    // return this.http.post<Departamento[]>(`${this.url}/listar`);
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }

   /* Enviar token - No optimo
    public listar() {
        return this.http.get<Departamento[]>(`${this.url}/listar`, {
          headers: new HttpHeaders().set('Authorization',
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibWl0b3Jlc291cmNla
          WQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjo
          xNjM0NjU4NDI2LCJhdXRob3JpdGllcyI6WyJBZG1pbmlzdHJhZG9yIl0sImp0aSI6IjQ4OTUzNW
          I2LTA0YzktNDE2OS1iYzQzLWJlMzA4YmU2N2UzOCIsImNsaWVudF9pZCI6Im1pdG9tZWRpYXBwIn0.IxmoNdqDialAv8JsueA-OmcawlFcIADmtQBUS1gkw88')
          headers: new HttpHeaders().set('Authorization', sessionStorage.getItem(environment.TOKEN))
        });
    }
  */

  public listarCiudadPorDepartamento(idDepartamento: number){
    return this.http.get<Ciudad[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDepartamento}`);
  }

}
