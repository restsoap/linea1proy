import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variables de usuario
  usuario: FormControl = new FormControl('',
    [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7),
    Validators.pattern(/[a-zA-Z0-9]/)
    ]
  );

  contrasena: FormControl = new FormControl('',
    [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
    Validators.pattern(/[a-zA-Z0-9]/)
    ]
  );

  constructor(private loginService: LoginService,
              public fb: FormBuilder,
              private router: Router,
              public route : ActivatedRoute
              ) { }
  ngOnInit(): void {
  }

  // console.log(data);
  // se almacenan los datos en el navegador con:
  // localStorage

  /*const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(data.access_token);
  console.log(decodedToken);*/

  // Para almacenar en la memoria del navegador
  /*const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(data.access_token);
  console.log(decodedToken);*/

  login() {
    // 'admin'    '123456'
    this.loginService.login(this.usuario.value, this.contrasena.value).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN, data.access_token);
      this.router.navigate(['/vehiculo']);
    });

  }


  
}
