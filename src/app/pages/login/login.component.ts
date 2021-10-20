import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.login('admin', '123456').subscribe(data => {
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
