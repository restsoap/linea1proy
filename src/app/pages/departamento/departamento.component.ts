import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { ActivatedRoute } from '@angular/router';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent implements OnInit {
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'ver'];

  dataSource = new MatTableDataSource<Departamento>();

  @ViewChild('DepartmentPaginator') paginator: MatPaginator;

  //para el ordenamiento
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private departamentoService: DepartamentoService,
    public route: ActivatedRoute,
    private barraDeProgresoService: BarraDeProgresoService
    ) {}

  async ngOnInit(): Promise<void> {
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.departamentoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.barraDeProgresoService.progressBarReactiva.next(true);
    });
  }

  // metodo para aplicar el filtro a un data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
