import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ListadoClientesComponent } from './clientes/pages/listado-clientes/listado-clientes.component';
import { ListadoColegiosComponent } from './colegios/pages/listado-colegios/listado-colegios.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { 
        path: 'clientes',
        component: ListadoClientesComponent,
      },
      {
        path: 'colegios',
        component: ListadoColegiosComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: '**',
        redirectTo: 'clientes'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
