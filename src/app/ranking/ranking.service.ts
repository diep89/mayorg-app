import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstadisticasJugador } from './estadisticasJugador.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private est = new EstadisticasJugador('', '', '', '');
  private _estadisticas = new BehaviorSubject<EstadisticasJugador>(this.est);
  private estadisticasUrl =
    'http://192.168.0.150/MayorG1/Modelo/verRanking.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  constructor(private http: HttpClient) {}

  obtenerEstadisticas() {
    this.http
      .get<any>(this.estadisticasUrl, this.httpOptions)
      .pipe(
        // map(resData => {
        //   // console.log(resData);
        //   return resData;
        // }),
        delay(1500)
      )
      .subscribe(x => {
        // console.log(x);
        this._estadisticas.next(x);
      });
  }

  get estadisticas() {
    return this._estadisticas.asObservable();
  }
}
