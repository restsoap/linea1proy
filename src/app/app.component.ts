import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './_service/login.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagprogressbar: boolean = false;
  public flagToolbar: boolean = true;
  isLoggedIn$: Observable<boolean>;
  public flaguser: boolean = true;
  public flagadmin: boolean = true;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  

  constructor(
    private barraService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService,
    private loginService: LoginService,
    private idle: Idle,
    public Keepalive: Keepalive,
    private router: Router,
    private snackBar: MatSnackBar,


  ) {

    

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'La sesion ya no está inactiva.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {

      this.idleState = 'Desconectado!';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['']);
      this.openSnackBar('Sesion terminada  por favor haga el login nuevamente.');
      this.logService.cerrarSesion();



    });

    console.log('entro aca');

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'Tu\'estado es inactivo!'
      console.log(this.idleState);
      
      // this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Te detendrás en:' + countdown + ':Segundos!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    Keepalive.interval(15);

    Keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.loginService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {

        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();

      }
    });

    // this.reset();
  }
  reset() {

    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }


  ngOnInit(): void {



    if (this.loginService.estaLogueado() == true) {
      this.flagToolbar = false;
    } else {
      this.flagToolbar = true;
    }

 
    this.loginService.usuarioReactivo.subscribe(data => {
      this.flaguser = data;

    });

    this.loginService.administradorReactivo.subscribe(data => {
      this.flagadmin = data;

    });



    this.loginService.toolbarReactiva.subscribe(data => {
      this.flagToolbar = data;

      //let cont = false;
      //do {


      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);
      console.log('token:=' + token);
      if (!helper.isTokenExpired(token)) {
        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];
        console.log(rol);
        if (rol == 'Conductor') {
          this.flagadmin = true;
          this.flaguser = false;
          console.log('hola' + rol);
        } else {
          this.flagadmin = false;
          this.flaguser = true;
          console.log('chao' + rol);
        }
        // cont= true;
      } else {
        console.log('no hay token');
      }

    });



    this.barraService.progressBarReactiva.subscribe(data => {
      this.flagprogressbar = data;
      //this.flagprogressbar = !this.flagprogressbar;
      this.isLoggedIn$ = this.logService.isLoggedIn;
    });

  }
  onLogout() {
    
    this.logService.cerrarSesion();

  }

  public refresh(): void { window.location.reload(); }

  private openSnackBar(mensaje: string) {

    this.snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    });
  }


}