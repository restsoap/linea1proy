import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from './pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { ErrorAComponent } from './pages/error-a/error-a.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GuardianService } from './_share/guardian.service';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'departamento', component: DepartamentoComponent, children : [
      {path:  'ciudad/:idDep', component: CiudadComponent, canActivate: [GuardianService]}
    ], canActivate: [GuardianService]
  },
  {path: 'vehiculo', component: VehiculoComponent, children: [
    {path: 'agregarvehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService] },
    {path: 'edicion/:idVehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService]}
  ], canActivate: [GuardianService]
  },
  // pagina no encontrada
  {path: 'login', component: LoginComponent},
  {path: 'usuario', component: UsuarioComponent, canActivate: [GuardianService]},
  {path: 'Errora', component: ErrorAComponent},
  {path: 'Error', component: NotOkComponent},
  {path: 'nopermiso', component: NotAllowedComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
