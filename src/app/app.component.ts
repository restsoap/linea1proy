import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from './loader/loader.service';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flacProgressBar: boolean = true;

  isLoggedIn$: Observable<boolean>;

  constructor(
    public loaderService: LoaderService,
    private barraDeProgresoService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService
  ){}

  ngOnInit(): void {
    this.barraDeProgresoService.progressBarReactiva.subscribe(data => {
      // this.flacProgressBar = data;
      this.flacProgressBar = !this.flacProgressBar;
      this.isLoggedIn$ = this.logService.isLoggedIn;
    });
  }


  onLogout() {
    this.logService.cerrarSesion();
  }

}
