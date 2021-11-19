import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { VehiculoService } from './../../_service/vehiculo.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsociaciondialogoComponent } from './asociaciondialogo/asociaciondialogo.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})

export class VehiculoComponent implements OnInit, OnDestroy {

  // creamos una suscripción
  suscripcion: Subscription;

  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'ver'];
  dataSource = new MatTableDataSource<Vehiculo>();
  @ViewChild(MatSort) sort: MatSort;

  // variables para el paginador
  cantidad: number;
  // desde la pagina 0
  pageIndex: number = 0;
  // tamaño paginador
  pageSize: number = 5;

  constructor(
    private serviceVehiculo: VehiculoService,
    public route: ActivatedRoute,
    private barraDeProgresoService: BarraDeProgresoService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.listarPaginado();
    this.suscripcion = this.serviceVehiculo.refresh.subscribe(() => {
      this.listarPaginado();
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    // para evitar el consumo de memoria
    // console.log("observable cerrado");
  }

  cambiarPagina(e: any) {
    // indice de pagina
    this.pageIndex = e.pageIndex;
    // tamaño de paginado
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado() {
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.serviceVehiculo.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
      this.barraDeProgresoService.progressBarReactiva.next(true);
    });
  }

  // metodo para aplicar el filtro a un data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  abrirDialogo(vehiculo: Vehiculo){
    const dialogRef = this.dialog.open(AsociaciondialogoComponent, {
      width: '450px',
      height: '450px',
      data: {placa: vehiculo.placa, idVehiculo: vehiculo.idVehiculo}
    });
  }

}
