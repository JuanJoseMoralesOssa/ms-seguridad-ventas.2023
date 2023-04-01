import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const fetch = require("node-fetch");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  EnviarNotificacion(datos: any, url: string) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // con esto se arregla el problema del self signed SLL certificate
    fetch(url, {
      method: 'post',
      body: JSON.stringify(datos),
      headers: {'Content-Type': 'application/json'},
    });
  }
}
