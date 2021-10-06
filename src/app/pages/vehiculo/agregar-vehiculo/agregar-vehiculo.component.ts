import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  //Vehform: FormGroup;
  Vehform = this.fb.group({
    placa: ['', Validators.required],
    modelo: [0, Validators.required],
    marca: ['', Validators.required],
    tipoVehiuclo: ['', Validators.required],
    capacidad: ['', Validators.required]
  });

  
  // id para la comprobación
  private idV: number;
  // bool para comprobar si es edición o guardado 
  private edicion: boolean;

  // inyectamos el servicio
  constructor(private serviceAgregarVehiculo: VehiculoService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  iniciarVacio(){
    this.Vehform = new FormGroup({
      'placa': new FormControl('', [Validators.required]),
      'modelo': new FormControl(0, [Validators.required]),
      'marca': new FormControl('', [Validators.required]),
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      'capacidad': new FormControl('', [Validators.required]),
    });
  }

  cargarData(){
    this.serviceAgregarVehiculo.listarIdVehiculo(this.idV).subscribe(data => {

    });
  }

  guardar(){
    let vehiculo = new Vehiculo();
    vehiculo.placa = this.Vehform.value['placa'];
    vehiculo.modelo = this.Vehform.value['modelo'] + '';
    vehiculo.marca = this.Vehform.value['marca'];
    vehiculo.tipoVehiuclo = this.Vehform.value['tipoVehiuclo'];
    vehiculo.capacidad = this.Vehform.value['capacidad'];

    // metodo de guardar
    this.serviceAgregarVehiculo.guardarVehi(vehiculo).subscribe(() => {
      this.Vehform.reset();
      this.router.navigate(['/vehiculo']);
    });

  }

}
