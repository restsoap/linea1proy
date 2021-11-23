import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Conductor } from 'src/app/_model/Conductor';
import { Departamento } from 'src/app/_model/Departamento';
import { RolUsuario } from 'src/app/_model/RolUsuario';
import { TipoDocumento } from 'src/app/_model/TipoDocumento';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { ConductorService } from 'src/app/_service/conductor.service';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-agregar-conductor',
  templateUrl: './agregar-conductor.component.html',
  styleUrls: ['./agregar-conductor.component.css']
})
export class AgregarConductorComponent implements OnInit {

  formConductor: FormGroup;

  private id: number;
  private edicion: boolean;

  // Para listar los departamentos y ciudades
  selectedValue: any;
  dataSource: Departamento[];
  dataSourceCiudad: Ciudad[];


  idDepartamento: number;
  ciudad: Ciudad;

  constructor(
    private conductorService: ConductorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private departamentoService: DepartamentoService,
    private barraDeProgresoService: BarraDeProgresoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.iniciarformulario();
    if (this.edicion === true) {
      this.cargarDatos();
    }
    this.departamentoService.listar().subscribe(res => {
      this.dataSource = res;
    });
  }

  iniciarformulario() {
    this.formConductor = new FormGroup({
      'documento': new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]),
      'nombre': new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z ]{2,25}/)
      ]),
      'apellido': new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z ]{2,25}/)
      ]),
      'nick': new FormControl('', [
        Validators.required,
        Validators.pattern(/[A-Za-z0-9]/)
      ]),
      'clave': new FormControl('', [
        Validators.required,
        /*Minimo 8 caracteres
          Maximo 15
          Al menos una letra mayúscula
          Al menos una letra minucula
          Al menos un dígito
          No espacios en blanco
          Al menos 1 caracter especial*/
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)
      ]),
      'direccion': new FormControl('', [
        Validators.required,
        // Validators.pattern(/[A-Z]{3}[-]\d{3}/)
      ]),
      'celular': new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{7,10}/)
      ]),
      'celularAux': new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{7,10}/)
      ]),
      'correo': new FormControl('', [
        Validators.required,
        Validators.pattern(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm)
      ]),
      'ciudadReg': new FormControl('', [
        Validators.required
      ]),
    });
  }

  cargarDatos() {
    this.conductorService.listarPorId(this.id).subscribe(data => {
      this.formConductor.get('documento').setValue(data.documento);
      this.formConductor.get('nombre').setValue(data.nombre);
      this.formConductor.get('apellido').setValue(data.apellido);
      this.formConductor.get('nick').setValue(data.nick);
      this.formConductor.get('clave').setValue(data.correo);
      this.formConductor.get('direccion').setValue(data.direccion);
      this.formConductor.get('celular').setValue(data.celular);
      this.formConductor.get('celularAux').setValue(data.celularAux);
      this.formConductor.get('correo').setValue(data.correo);
      // this.formConductor.get('departamento').setValue(data.ciudad.departamento);
      this.formConductor.get('ciudadReg').setValue(data.ciudad);
    });
  }

  idDepar(event) {
    this.selectedValue = event.idDepartamento;
    this.departamentoService.listarCiudadPorDepartamento(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudad = data;
    });
  }

  guardar() {
    let conductor = new Conductor();
    conductor.documento = this.formConductor.value['documento'];
    conductor.nombre = this.formConductor.value['nombre'];
    conductor.apellido = this.formConductor.value['apellido'];
    conductor.nick = this.formConductor.value['nick'];
    conductor.clave = this.formConductor.value['clave'];
    conductor.direccion = this.formConductor.value['direccion'];
    conductor.celular = this.formConductor.value['celular'];
    conductor.celularAux = this.formConductor.value['celularAux'];
    conductor.correo = this.formConductor.value['correo'];
    let tipoDocumento = new TipoDocumento();
    conductor.tipoDocumento = tipoDocumento;
    let rolCond = new RolUsuario();
    conductor.rol = rolCond;
    conductor.ciudad = this.formConductor.value['ciudadReg'];

    if (this.edicion === true) {
      // console.log(conductor);
      conductor.idUsuario = this.id;
      this.conductorService.editar(conductor).subscribe(() => {
        this.openSnackBarr('Editado correctamente');
        this.formConductor.reset();
        this.router.navigate(['/conductor']);
      });
    } else {
      // console.log(conductor);
      this.conductorService.guardar(conductor).subscribe(() => {
        this.formConductor.reset();
        this.openSnackBarr('Guardado correctamente');
        this.router.navigate(['/conductor']);
      });
    }
  }

  get nombre() {
    return this.formConductor.get('nombre');
  }
  get apellido() {
    return this.formConductor.get('apellido');
  }
  get documento() {
    return this.formConductor.get('documento');
  }
  get nick() {
    return this.formConductor.get('nick');
  }
  get clave() {
    return this.formConductor.get('clave');
  }
  get direccion() {
    return this.formConductor.get('direccion');
  }
  get celular() {
    return this.formConductor.get('celular');
  }
  get celularAux() {
    return this.formConductor.get('celularAux');
  }
  get correo() {
    return this.formConductor.get('correo');
  }
  get ciudadReg() {
    return this.formConductor.get('ciudadReg');
  }
  get departamento() {
    return this.formConductor.get('departamento');
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
