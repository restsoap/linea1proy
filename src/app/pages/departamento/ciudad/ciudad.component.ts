import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  displayedCityColumns: string[] = ['codigo', 'nombre'];

  dataSourceCiudad = new MatTableDataSource<Ciudad>();

  @ViewChild('cityPaginator') citiyPaginator: MatPaginator;

  constructor(private departamentoService: DepartamentoService,
    private router: Router,
    private route : ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      let idDepartamento = params['idDep']
      this.departamentoService.listarCiudadPorDepartamento(idDepartamento).subscribe((data) => {
        this.dataSourceCiudad = new MatTableDataSource(data);
        this.dataSourceCiudad.paginator = this.citiyPaginator;
      });
    });
    
  }

}


