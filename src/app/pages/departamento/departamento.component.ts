import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'ver'];

  dataSource = new MatTableDataSource<Departamento>();
  dataSourceCiudad = new MatTableDataSource<Ciudad>();

  @ViewChild('DepartmentPaginator') paginator: MatPaginator;
  @ViewChild('cityPaginator') citiyPaginator: MatPaginator;

  //para el ordenamiento
  @ViewChild(MatSort) sort: MatSort;

  flagCiudad = this.dataSourceCiudad.data.length > 0 ? true : false;

  constructor(private departamentoService: DepartamentoService,
    public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.departamentoService.listar().subscribe((data) => {
      /*data.forEach(element => {
            console.log(`Codigo: ${element.idDepartamento} - Nombre ${element.nombre}`);
        });*/
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //ocultar la tabla
  cambiarEstadoFlag(): void {
    this.flagCiudad = !this.flagCiudad;
  }

  //metodo para aplicar el filtro a un data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
