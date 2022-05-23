import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertarUsuarioComponent } from './pages/insertar-usuario/insertar-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: '', component: InsertarUsuarioComponent },
  { path: 'insertar-usuario', component: InsertarUsuarioComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: '', redirectTo: 'insertar-usuario', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
