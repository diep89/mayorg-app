import { Injectable } from '@angular/core';
import { Pregunta } from './pregunta.model';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private urlObtener = 'http://192.168.0.150/MayorG1/Modelo/Jugador_modelo.php';
  private urlComprobar =
    'http://192.168.0.150/MayorG1/Modelo/Almacenar_historial.php';
  private _pregunta = new BehaviorSubject<Pregunta>(
    new Pregunta('', null, 1, 1, '', '', 1, ['', '', '', ''], '')
  );
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) {}

  obtenerPregunta() {
    this.http
      .get<any>(this.urlObtener)
      .pipe(
        map(resData => {
          console.log(resData);
          return resData;
        }),
        delay(1500)
      )
      .subscribe(transformedData => this._pregunta.next(transformedData));
  }

  get pregunta() {
    return this._pregunta.asObservable();
  }

  enviarDatos(datos) {
    return this.http.post(this.urlComprobar, datos, this.httpOptions);
  }

  // Para que, cuando la app esté cargando una nueva pregunta
  // no se vea la preg anterior atrás del cuadrito de cargando,
  // emito una pregunta vacía momentánea.
  clearPregunta() {
    const preg = new Pregunta('', null, 1, 1, '', '', 1, ['', '', '', ''], '');
    this._pregunta.next(preg);
  }
}
