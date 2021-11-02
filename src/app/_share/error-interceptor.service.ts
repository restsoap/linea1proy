import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from '../_service/barra-de-progreso.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private barraDeProgresoService: BarraDeProgresoService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        // si la petición genera un error
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            // se lanza un error
            throw new Error(event.body.errorMessage);
          }/*else{
            this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });
        }*/
        }
      })).pipe(catchError((err) => {

        this.barraDeProgresoService.progressBarReactiva.next(true);

        // aquí se ponen todos los filtros cuando ocurra un error
        console.log(err);
        if (err.status === 400 && err.error.error_description === "Bad credentials"){
          this.openSnackBar('Contraseña incorrecta');
          this.router.navigate(['/login']);
        }else if (err.status === 401 && err.error.error_description === "----Nick o password incorecto"){
          this.openSnackBar('Usuario incorrecto');
          this.router.navigate(['/login']);
        }else if (err.error.status === 400 && err.error.message === "----Placa ya se encuentra registrada.") {
          this.openSnackBar('Placa ya se encuentra registrada');
          // 404, 405 y 415 redirigir a una pagina que diga ha ocurrido un error, comuniquese con el administrador
        }else if (err.status == 401){
          this.router.navigate(['/nopermiso']);
        }
        else if (err.error.status === 404) {
          // this.openSnackBar(err.error.message);
          this.router.navigate(['/Errora']);
          // 405 y 415 no tienen que pasar
        } else if (err.error.status === 405) {
          this.router.navigate(['/Errora']);
          // this.openSnackBar(err.error.message);
        } else if (err.error.status === 415) {
          this.router.navigate(['/Errora']);
          // this.openSnackBar(err.error.message);
        } else if (err.error.status === 500) {
          this.router.navigate(['/Error']);
        }
        return EMPTY;
      }));
  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snack-error']
    });
  }
}
