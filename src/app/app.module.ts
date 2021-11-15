import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
// ReactiveFormsModule sirve para enviar los parametros
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from './pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { ErrorAComponent } from './pages/error-a/error-a.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AgregarConductorComponent } from './pages/conductor/agregar-conductor/agregar-conductor.component';
import { HhomeComponent } from './pages/hhome/hhome.component';
import { AsociaciondialogoComponent } from './pages/vehiculo/asociaciondialogo/asociaciondialogo.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN);
  // si existe, se devuelve el token, sino existe devuelve vacio
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepartamentoComponent,
    CiudadComponent,
    VehiculoComponent,
    AgregarVehiculoComponent,
    NotFoundComponent,
    NotOkComponent,
    ErrorAComponent,
    NotAllowedComponent,
    UsuarioComponent,
    ConductorComponent,
    AgregarConductorComponent,
    HhomeComponent,
    AsociaciondialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['159.223.107.103:8080'],
        disallowedRoutes: ['http://159.223.107.103:8080/movitapp-backend/oauth/token'],
      },
    }),
  ],
  entryComponents: [
    AsociaciondialogoComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
