import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flacProgressBar: boolean = true;

  constructor(
    public loaderService: LoaderService,
    private barraDeProgresoService: BarraDeProgresoService
  ){}

  ngOnInit(): void {
    this.barraDeProgresoService.progressBarReactiva.subscribe(data => {
      // this.flacProgressBar = data;
      this.flacProgressBar = !this.flacProgressBar;
    })
  }

}
