import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conductor } from 'src/app/_model/Conductor';
import { ConductorService } from 'src/app/_service/conductor.service';
import { BarraDeProgresoService } from '../../_service/barra-de-progreso.service';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  suscripcion: Subscription;

  displayedColumns: string[] = ['nombre', 'apellido', 'documento', 'nick', 'direccion', 'celular', 'correo', 'ciudad', 'acciones'];
  dataSourceConductor = new MatTableDataSource<Conductor>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private conductorService: ConductorService,
    public route: ActivatedRoute,
    public barradeProgresoService: BarraDeProgresoService
  ) { }

  ngOnInit(): void {
    this.listarPaginado();
    this.suscripcion = this.conductorService.refreshCond$.subscribe(() => {
      this.listarPaginado();
    }) 
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado() {
    this.barradeProgresoService.progressBarReactiva.next(false);
    this.conductorService.listarPaginado(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceConductor = new MatTableDataSource(data.content);
      this.dataSourceConductor.sort = this.sort;
      this.cantidad = data.totalElements;
      this.barradeProgresoService.progressBarReactiva.next(true);
    });
  }

  applyFilter(filterValue: String) {
    this.dataSourceConductor.filter = filterValue.trim().toLowerCase();
  }

}
