import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { RESTUser, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tituloBotonLogin = 'Login';

  usuario: Usuario = {
    nombre: '',
    email: ''
  };

  token = '';

  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.cargarStorage();
      this.isAutenticated();
    }


  public get tituloBotonLogin(): string {
    return this._tituloBotonLogin;
  }



  login ( email: string , password: string ): Observable<boolean>{

    const url = `${BASE_URL}/login`;

    return this.http.post<RESTUser>( url , { email,password }, 
            { headers: this.httpHeaders })
    .pipe(
      map( resp => {

        console.log('Respuesta en el map: ', resp);
        this.usuario.email = resp.usuario?.email;
        this.usuario.nombre = resp.usuario.nombre;
        this._tituloBotonLogin = `Salir ${this.usuario.nombre }`;
        this.token = resp.token;
        this.guardarStorage();
        return  (true);
      }),
      catchError ( error => {

        return of( false );
      }),

    );


  }

  
  guardarStorage() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('usuario', JSON.stringify(this.usuario) );
  }



  isAutenticated(): boolean  {

    if ( this.token.length > 5 && this.estaAutenticado() ) {
      return true;
    } else {
      this.logout();
      // this.router.navigate(['/home']);
      return false;
    }
 }

 logout() {
   this.borrarStorage();
   this._tituloBotonLogin = 'Login';
 }

 cargarStorage() {

  console.log('Cargando del storage');
  if ( localStorage.getItem('token')) {
    this.token = localStorage.getItem('token')!;
    this.usuario = JSON.parse( localStorage.getItem('usuario')!);
    this._tituloBotonLogin = `Salir ( ${this.usuario.nombre} )`;
  };

}

borrarStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  this.token = '';
  this.usuario.nombre = '';
  this.usuario.email = '';
}

 
obtenerDatosToken(): any {

  if (this.token.length > 5) {
     return JSON.parse(atob(this.token.split('.')[1]));
  }
  return null;
}



estaAutenticado() {

  const payload: any = this.obtenerDatosToken();

  if ( payload != null && payload.usuario.nombre.length > 3 && payload.usuario.nombre === this.usuario.nombre ) {

    console.log( payload );
    if ( this.isTokenExpirado( payload.exp )) {
      return false;
    }

    return true;

  } else {
    return false;
  }
}

isTokenExpirado(exp: number ): boolean {

  const now = new Date().getTime() / 1000;
  

  console.log( 'Fecha actual: ', new Date(now * 1000));
  console.log ( exp );
  console.log( 'Fecha caduda: ', new Date(exp * 1000));

  if (exp < now) {
    return true;
  }
  return false;

}






}
