import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  

  constructor(private authService: AuthService, 
              private router: Router ) {}
  
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean  {


      console.log('PASANDO POR EL GUARD - CANLOAD');

      
    return true;
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


      console.log('PASANDO POR EL GUARD - CANACTIVATE');

      if ( this.authService.estaAutenticado() ) {
        return true;
      } else {
        this.router.navigate(['/home']);
        Swal.fire('Autorización', 'No estás autorizado para entrar aquí', 'warning');
        return false;
      }

  }
  
}
