import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  public flacProgressBar: boolean = true;

  public flagToolbar: boolean = true;

  // para los botones
  public flagbtnDepar: boolean = true;

  public flagbtnvehi: boolean = true;

  public flagbtnusu: boolean = true;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private barraDeProgresoService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService,
    private router: Router,
    public idle: Idle,
    public Keepalive: Keepalive

  ) {

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {

      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['']);
      this.logService.cerrarSesion();

    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log(this.idleState);
      // this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    Keepalive.interval(15);

    Keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.logService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });

  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit(): void {

    if (this.logService.estaLogueado() === true) {
      // cambiar estado toolbar
      this.flagToolbar = false;

      const helper = new JwtHelperService();

      // traemos el token
      let token = sessionStorage.getItem(environment.TOKEN);

      // token decodificado
      const decodedToken = helper.decodeToken(token);
      const rol: String = decodedToken.authorities[0];

      console.log("rol " + rol);

      if (rol === "Administrador"){
        this.flagbtnDepar = false;
        this.flagbtnvehi = false;
      }else if (rol === "Conductor"){
        this.flagbtnusu = false;
      }
    } else {
      this.flagToolbar = true;
    }

    // para los botones
    this.logService.btnDepartReactiv.subscribe(data => {
      this.flagbtnDepar = data;
    });

    this.logService.btnVehiReactiv.subscribe(data => {
      this.flagbtnvehi = data;
    });

    this.logService.btnUsuReactiv.subscribe(data => {
      this.flagbtnusu = data;
    });

    // para el toolbar
    this.logService.toolbarReactiva.subscribe(data => {
      this.flagToolbar = data;
    });

    this.barraDeProgresoService.progressBarReactiva.subscribe(data => {
      this.flacProgressBar = data;
      // this.flacProgressBar = !this.flacProgressBar;
    });
  }

  onLogout() {
    this.logService.cerrarSesion();
  }

}
