import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

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
      this.flagToolbar = false;
    } else {
      this.flagToolbar = true;
    }

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
