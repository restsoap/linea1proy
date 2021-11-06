import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css'],
})
export class CiudadComponent implements OnInit {

  displayedCityColumns: string[] = ['idCiudad', 'nombre'];

  dataSourceCiudad = new MatTableDataSource<Ciudad>();

  @ViewChild('cityPaginator') citiyPaginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private departamentoService: DepartamentoService,
              private router: Router,
              public route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let idDepartamento = params['idDep'];
      this.departamentoService.listarCiudadPorDepartamento(idDepartamento).subscribe((data) => {
        this.dataSourceCiudad = new MatTableDataSource(data);
        this.dataSourceCiudad.paginator = this.citiyPaginator;
        this.dataSourceCiudad.sort = this.sort;
      });
    });
  }

  // metodo para aplicar el filtro a un data table
  applyFilter(filterValue: string) {
    this.dataSourceCiudad.filter = filterValue.trim().toLocaleLowerCase();
  }
}


