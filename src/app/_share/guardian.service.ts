import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(
    private logService: LoginService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.logService.estaLogueado() === true) {

      const helper = new JwtHelperService();
      // traemos el token
      let token = sessionStorage.getItem(environment.TOKEN);

      // expiración del token
      // const isExpired = helper.isTokenExpired(token);
      if (!helper.isTokenExpired(token)) {

        // token decodificado
        const decodedToken = helper.decodeToken(token);
        const rol: String = decodedToken.authorities[0];
        const url: String = state.url;

        // console.log(rol);
        // console.log(url);

        if (url.includes('departamento') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('vehiculo') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('conductor') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('home') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('usuario') && rol === 'Conductor') {
          return true;
        }
        else if (url.includes('home') && rol === 'Conductor') {
          return true;
        }
        else {
          this.logService.toolbarReactiva.next(false);
          this.router.navigate(['/nopermiso']);
          return false;
        }

      } else {
        // si ya expiro
        this.logService.cerrarSesion();
        return false;
      }

    } else {
      // this.logService.toolbarReactiva.next(false);
      this.router.navigate(['/nopermiso']);
      return false;
    }
  }
}
