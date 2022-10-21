import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { ListadoColegiosComponent } from './colegios/pages/listado-colegios/listado-colegios.component';
import { ListadoClientesComponent } from './clientes/pages/listado-clientes/listado-clientes.component';



@NgModule({
  declarations: [
    ListadoColegiosComponent,
    ListadoClientesComponent
  ],
  imports: [
    CommonModule,
    GestionRoutingModule
  ]
})
export class GestionModule { }
