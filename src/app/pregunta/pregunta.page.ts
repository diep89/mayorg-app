import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NavController,
  ModalController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PreguntaService } from './pregunta.service';
import { Pregunta } from './pregunta.model';
import { interval } from 'rxjs';
import { EvalPreguntaComponent } from './eval-pregunta/eval-pregunta.component';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss']
})
export class PreguntaPage implements OnInit, OnDestroy {
  private timerVar: Subscription;
  private timerValue: number;
  pregunta: Pregunta;
  private preguntaSubs: Subscription;
  private limiteContador = 20;
  private respuestaJugador: Boolean;
  private enviarDatosSubs: Subscription;

  constructor(
    private pregService: PreguntaService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.llamarLoadingController();
    this.preguntaSubs = this.pregService.pregunta.subscribe(
      (preg: Pregunta) => {
        this.pregunta = preg;
      }
    );
    this.pregService.obtenerPregunta();
    this.startTimer();
  }

  startTimer() {
    this.timerValue = 0;
    this.timerVar = interval(1000).subscribe(x => {
      // console.log(x);
      this.timerValue = x;

      if (x === this.limiteContador) {
        this.comprobarRespuesta(null, true);
      }
    });
  }

  getTimer() {
    return (this.timerValue * 100) / this.limiteContador / 100;
  }

  getColorProgressBar() {
    if (this.getTimer() * 100 < 70) {
      return 'success';
    } else {
      return 'danger';
    }
  }

  comprobarRespuesta(index: number, sinTiempo: boolean) {
    const datos: any = {
      id_pregunta: this.pregunta.id,
      respuesta: this.respuestaJugador
    };

    this.timerVar.unsubscribe();

    // Primer chequeo: Se quedó sin tiempo?
    if (sinTiempo) {
      datos.respuesta = false;
      this.enviarDatosSubs = this.pregService.enviarDatos(datos).subscribe();
      this.modalCtrl
        .create({
          component: EvalPreguntaComponent,
          componentProps: { resultadoRespuesta: false, timeout: true },
          backdropDismiss: false
        })
        .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultData => {
          if (resultData.role === 'continuar') {
            this.pregService.clearPregunta();
            this.pregService.obtenerPregunta();
            this.startTimer();
          }
        });
    } else if (this.pregunta.respuestaCorrecta === index) {
      // console.log('Correcta!');
      datos.respuesta = true;
      this.enviarDatosSubs = this.pregService.enviarDatos(datos).subscribe();
      this.modalCtrl
        .create({
          component: EvalPreguntaComponent,
          // Envío true si la respuesta fue correcta
          componentProps: { resultadoRespuesta: true, timeout: false },
          backdropDismiss: false
        })
        .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultData => {
          if (resultData.role === 'continuar') {
            this.pregService.clearPregunta();
            this.pregService.obtenerPregunta();
            this.startTimer();
          }
        });
    } else {
      // console.log('Incorrecta!');
      datos.respuesta = false;
      this.enviarDatosSubs = this.pregService.enviarDatos(datos).subscribe();
      this.modalCtrl
        .create({
          component: EvalPreguntaComponent,
          // Envío false si la respuesta fue incorrecta
          componentProps: {
            resultadoRespuesta: false,
            pregunta: this.pregunta,
            timeout: false
          },
          backdropDismiss: false
        })
        .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultData => {
          if (resultData.role === 'continuar') {
            this.pregService.clearPregunta();
            this.pregService.obtenerPregunta();
            this.startTimer();
          }
        });
    }
  }

  backHome() {
    this.alertCtrl
      .create({
        message: '¿Está seguro que desea salir?',
        header: 'Volver a inicio',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Salir',
            handler: () => {
              this.timerVar.unsubscribe();
              this.pregService.clearPregunta();
              this.navCtrl.navigateBack('/home');
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  async llamarLoadingController() {
    const loadingEl = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    loadingEl.present();
    setTimeout(() => {
      loadingEl.dismiss();
    }, 1500);
  }

  ngOnDestroy() {
    this.preguntaSubs.unsubscribe();
    this.enviarDatosSubs.unsubscribe();
  }
}
