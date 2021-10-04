import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../_service/departamento.service'

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  //Inyecciones de dependencias o libreias
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    //Iniciar Variables
    //Llamar metodos
    //Logica Inicial
  }



}
