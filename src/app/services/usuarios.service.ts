import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public httpOptions:any = {}; 

  constructor( 
              private http: HttpClient,
              private router: Router
     ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
    }


  /**
   * Método POST de servicio para crear usuarios
   */
   public crearUsuarioServices = ( formData: any ) =>{  
    return this.http.post(`${BASE_URL}/insertUsuario`, formData, this.httpOptions).pipe( tap( resp => resp ) );
  }


  /**
   * Método GET para obtener todos los usuarios
   */
  public obtenerUsuariosService = () =>{
    return this.http.get(`${BASE_URL}/usuarios`, this.httpOptions).pipe( map( resp => resp))
  }


  /**
   * Método DELETE para eliminar un usuario por ID
   */
  public deleteUsuarioService = (id:any) =>{
    return this.http.delete(`${BASE_URL}/deleteUser/${id}`, this.httpOptions).pipe( tap( resp => resp ));
  }


  /**
   * Método PUT para ctualizar usuario por id
   */
  public putUsuarioService = (formData:any) =>{
    return this.http.put(`${BASE_URL}/updateUsuario`, formData, this.httpOptions ).pipe( tap( resp => resp ))
  } 

}
