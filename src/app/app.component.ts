import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flacProgressBar: boolean = true;

  public flagToolbar: boolean = true;

  constructor(
    private barraDeProgresoService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService
  ){}

  ngOnInit(): void {

    if(this.logService.estaLogueado() == true){
      this.flagToolbar = false;
    }else{
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
