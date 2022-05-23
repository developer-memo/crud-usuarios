import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  public formEditarUsuario:any = FormGroup;

  public usuarios: any[] = [];

  constructor(
              private fb: FormBuilder,
              private usuariosSrv: UsuariosService
  ) { }

  ngOnInit(): void {

    this.formInit()

    this.getUsuarios()
  }



  /**
   * Obtiene todos los usuarios
   */
  public getUsuarios = () =>{
    this.usuariosSrv.obtenerUsuariosService().subscribe( (resp:any) =>{

      this.usuarios = resp.usuarios;

    }, err =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 3000);
      
    })
  } 


  public editarUsuario = () =>{
    this.usuariosSrv.putUsuarioService(this.formEditarUsuario.value).subscribe( (resp:any) =>{
      Swal.fire('Bien!', resp.msg, 'success');
      setTimeout(() => { window.location.reload(); }, 2000);
      
    }, err =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 3000);
    })

  }

  /**
   * Método para eliminar usuarios por id
   */
  public eliminarUsuario = (id:any) =>{
    Swal.fire({
      title: '¿Desea eliminar el usuario de la lista?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuariosSrv.deleteUsuarioService(id).subscribe( (resp:any) =>{
          Swal.fire('Bien!', resp.msg, 'success');
          this.usuarios = this.usuarios.filter( (mr:any) => mr.id != id);
          
        }, (err:any) =>{
          Swal.fire('Error', err.error.msg, 'error');
        });
        setTimeout(() => { Swal.close() }, 2000);
      }
    });
  }



  public formInit = () =>{
    this.formEditarUsuario = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', [Validators.required]],
      comentario: ['', [Validators.required, Validators.minLength(3)]],
    })
  }


  public openModal = (user:any) =>{
    this.formEditarUsuario = this.fb.group({
      id: [user.id],
      nombre: [user.nombre, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.email, Validators.minLength(3)]],
      telefono: [user.telefono, [Validators.required, Validators.minLength(3)]],
      direccion: [user.direccion, [Validators.required, Validators.minLength(3)]],
      genero: [user.genero, [Validators.required]],
      comentario: [user.comentario, [Validators.required, Validators.minLength(3)]],
    })
  }

}
