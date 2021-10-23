import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              public fb: FormBuilder) { }

  // variables de usuario
  usuario: string = '';
  contrasena: string = '';

  modelIsvalid: boolean = false;
  modelIsValid: boolean = false;

  valida(usu: string){
    this.modelIsvalid = !!usu && usu.length > 3 
  }

  validapass(cotra: string){
    this.modelIsValid = !!cotra && cotra.length > 3
  }

  ngOnInit(): void {
  }

  

  login() {
    //'admin'    '123456'
    this.loginService.login(this.usuario, this.contrasena).subscribe(data => {
      // console.log(data);
      // se almacenan los datos en el navegador con:
      // localStorage

      /*const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(data.access_token);
      console.log(decodedToken);*/

      // Para almacenar en la memoria del navegador
      sessionStorage.setItem(environment.TOKEN, data.access_token);
    });
  }



}
