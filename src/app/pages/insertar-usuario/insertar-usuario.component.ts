import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-usuario',
  templateUrl: './insertar-usuario.component.html',
  styleUrls: ['./insertar-usuario.component.scss']
})
export class InsertarUsuarioComponent implements OnInit {

  public formInsertarUsuarios:any = FormGroup;

  constructor(
              private fb: FormBuilder,
              private route: Router,
              private usuariosSrv: UsuariosService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }


  public formInit = () =>{
    this.formInsertarUsuarios = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', [Validators.required]],
      comentario: ['', [Validators.required, Validators.minLength(3)]],
    })
  }


  public insertarUsuario = () =>{
    this.usuariosSrv.crearUsuarioServices(this.formInsertarUsuarios.value).subscribe( resp =>{
      this.route.navigate(['/lista-usuarios']);
      
    }, err =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 3000);
      
    })
    
  }

}
