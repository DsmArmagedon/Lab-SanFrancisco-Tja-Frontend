import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { AuthenticationService } from '../../services/login/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;
  loadLogin: boolean;
  constructor(private loginService: LoginService,  private router: Router,private authenticationService: AuthenticationService) { 
    this.loadLogin = false;
  }
  ngOnInit() {
    this.formLogin = this.formGroupLogin();
  }
  formGroupLogin() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }
  
  get username() { return this.formLogin.get('username') };
  get password() { return this.formLogin.get('password') };
  validation(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
  resetForm():void {
    this.formLogin.reset();
  }

  getUserAuth():void {
    this.authenticationService.userAuth().subscribe(
      resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        this.getPrivilegesAuth();
      }
    );
  }
  getPrivilegesAuth():void {
    this.authenticationService.privilegesAuthHeaders().subscribe(
      resp => {
        localStorage.setItem('privileges', JSON.stringify(resp));
        this.router.navigate(['/dashboard']);
        Swal.fire({
          title:'Bienvenido al Sistema', 
          type:'success',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  saveForm():void {
    if(this.formLogin.valid) {
      this.loadLogin = true;
      this.loginService.login(this.formLogin.value.username,this.formLogin.value.password).subscribe(
        resp => {
          localStorage.setItem('token_type', resp.data.token_type);
          localStorage.setItem('access_token',resp.data.access_token);
          localStorage.setItem('expires_in', resp.data.expires_in);
          localStorage.setItem('control_token', btoa(resp.data.access_token));
          this.getUserAuth();
        },
        () => {
          this.password.reset();
          this.loadLogin = false;
          Swal.fire({
            title: 'Credenciales Inválidas',
            type: 'info'
          });
        }
      );
    }
  }
}
