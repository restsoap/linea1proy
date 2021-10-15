import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css'],
})
export class AgregarVehiculoComponent implements OnInit {
  // variables para los select
  selected: string;
  selTipo: string;

  // cargar el select
  positions = [
    { value: 'Toyota' },
    { value: 'Chevrolet' },
    { value: 'Renault' },
    { value: 'Mazda' },
    { value: 'Mercedes' },
    { value: 'BMW' },
    { value: 'Alfa Romeo' },
    { value: 'Audi' },
    { value: 'Ferrari' },
    { value: 'Peugeot' },
    { value: 'Porsche' },
  ];

  // select de tipo de vehículo
  tipVeh = [
    { tipo: 'Carro' },
    { tipo: 'Camioneta' },
    { tipo: 'Deportivo' },
    { tipo: 'Campero' },
    { tipo: 'Furgon' }
  ];

  Vehform = this.fb.group({
    placa: ['', Validators.required],
    modelo: [null, Validators.required],
    marca: ['', Validators.required],
    tipoVehiuclo: ['', Validators.required],
    capacidad: ['', Validators.required],
  });

  // id para la comprobación
  private idV: number;
  // bool para comprobar si es edición o guardado
  private edicion: boolean;

  // inyectamos el servicio
  constructor(
    private serviceAgregarVehiculo: VehiculoService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private barraDeProgresoService: BarraDeProgresoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.barraDeProgresoService.progressBarReactiva.next(false);
      this.idV = params['idVehiculo'];
      // si llega el id edicion es verdadera
      this.edicion = params['idVehiculo'] != null;
      this.barraDeProgresoService.progressBarReactiva.next(true);
    });

    this.iniciarVacio();
    if (this.edicion === true) {
      this.cargarData();
    }
  }

  // resetear el formulario y validarlo
  iniciarVacio() {
    this.Vehform = new FormGroup({
      'placa': new FormControl('', [
        Validators.required,
        Validators.pattern(/[A-Z]{3}[-]\d{3}/)
      ]),
      'modelo': new FormControl(null, [
        Validators.required,
        Validators.min(1900),
        Validators.max(2022),
        Validators.pattern(/\d{4}/)
      ]),
      'marca': new FormControl('', [Validators.required]),
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      'capacidad': new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{1,5}[kK][gG]/)
      ])
    });
  }

  // cargar datos al formulario
  cargarData() {
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.serviceAgregarVehiculo.listarIdVehiculo(this.idV).subscribe((data) => {
      console.log(data);
      this.Vehform.get('placa').setValue(data.placa);
      this.Vehform.get('modelo').setValue(data.modelo);
      this.Vehform.get('marca').setValue(data.marca);
      this.Vehform.get('tipoVehiuclo').setValue(data.tipoVehiuclo);
      this.Vehform.get('capacidad').setValue(data.capacidad);
      this.barraDeProgresoService.progressBarReactiva.next(true);
    });
  }

  // tslint:disable-next-line: typedef
  guardar() {
    let vehiculo = new Vehiculo();
    vehiculo.placa = this.Vehform.value['placa'];
    vehiculo.modelo = this.Vehform.value['modelo'] + '';
    vehiculo.marca = this.Vehform.value['marca'];
    vehiculo.tipoVehiuclo = this.Vehform.value['tipoVehiuclo'];
    vehiculo.capacidad = this.Vehform.value['capacidad'];

    if (this.edicion === true) {
      vehiculo.idVehiculo = this.idV;
      this.serviceAgregarVehiculo.editar(vehiculo).subscribe(() => {
        this.barraDeProgresoService.progressBarReactiva.next(false);
        this.Vehform.reset();
        this.openSnackBarr('Editado correctamente');
        this.router.navigate(['/vehiculo']);
        this.barraDeProgresoService.progressBarReactiva.next(true);
      });
    } else {
      // metodo de guardar
      this.barraDeProgresoService.progressBarReactiva.next(false);
      this.serviceAgregarVehiculo.guardarVehi(vehiculo).subscribe(() => {
        this.Vehform.reset();
        this.openSnackBarr('Guardado correctamente');
        this.router.navigate(['/vehiculo']);
        this.barraDeProgresoService.progressBarReactiva.next(true);
      });
    }
  }

  // obtener los datos en el formulario
  get placa() {
    return this.Vehform.get('placa');
  }
  get modelo() {
    return this.Vehform.get('modelo');
  }
  get marca() {
    return this.Vehform.get('marca');
  }
  get tipoVehiculo() {
    return this.Vehform.get('tipoVehiuclo');
  }
  get capacidad() {
    return this.Vehform.get('capacidad');
  }

  openSnackBarr(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snak-correct']
    });
  }
}
