import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  cargando = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  isEmailValido() {

    return this.miFormulario?.controls['email']?.invalid && 
          this.miFormulario?.controls['email']?.touched;

  }

  entrar( miFormulario: NgForm ) {

    this.cargando = true;

    console.log( miFormulario );

    // el formulario es válido
    const email = this.miFormulario.controls['email'].value;
    const password = this.miFormulario.controls['password'].value;

    // console.log( email, password );

    this.authService.login(email, password).subscribe( resp => {

      console.log( resp );


      this.cargando = false;

    });



    // llamar al servico de auth,


  


  }

}
