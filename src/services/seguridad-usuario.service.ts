import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales} from '../models';
import {UsuarioRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require("crypto-js/md5");

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(
    @repository(UsuarioRepository)
    public repositorioUsuario: UsuarioRepository,
  ) {}

  /**
   * Crear una clave aleatoria
   * @returns cadena aleatoria de 10 caracteres
   */
  crearClave(): string{
    let clave = generator.generate({
	    length: 10,
	    numbers: true
    });
    return clave;
  }

  /**
   * Cifrar una cadena con metodo md5
   * @param cadena texto a cifrar
   * @returns cadena cifrada con md5
   */
  cifrarTexto(cadena: string): string {
    let cadenaCifrada = MD5(cadena).toString();
    return cadenaCifrada;
  }

  /**
   * Cifrar una cadena con metodo md5
   * @param cadena texto a cifrar
   * @returns cadena cifrada con md5
   */
  async identificarUsuario(credenciales: Credenciales): Usuario | null {
    let usuario = await this.repositorioUsuario.find({
      where: {
        correo: credenciales.correo,
        clave: credenciales.clave,
      }
    });
  
  }

}
