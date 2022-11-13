import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';

const routes: Routes = [
  { path: '',component:CrudUsuariosComponent },
  { path: 'usuarios',component:CrudUsuariosComponent },
  { path: 'vehiculos',component:CrudVehiculosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
