import { Component, OnInit, Input } from '@angular/core';
import {
  AlertController,
  NavController,
  ModalController,
  LoadingController
} from '@ionic/angular';
import { Pregunta } from '../pregunta.model';
import { ReportarComponent } from './reportar/reportar.component';

@Component({
  selector: 'app-eval-pregunta',
  templateUrl: './eval-pregunta.component.html',
  styleUrls: ['./eval-pregunta.component.scss']
})
export class EvalPreguntaComponent implements OnInit {
  @Input() resultadoRespuesta: boolean;
  @Input() pregunta: Pregunta;
  @Input() timeout: boolean;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

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
              this.modalCtrl.dismiss();
              this.navCtrl.navigateBack('/home');
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  siguientePregunta() {
    // this.loadingCtrl
    //   .create({
    //     message: 'Cargando...'
    //   })
    //   .then(loadingEl => {
    //     loadingEl.present();
    //     setTimeout(() => {
    //       loadingEl.dismiss();
    //     }, 1500);
    //   });

    // Envío role: 'continuar' a pregunta.page.ts
    this.modalCtrl.dismiss(null, 'continuar');
    this.navCtrl.navigateForward('/pregunta');
  }

  reportarPregunta() {
    this.modalCtrl
      .create({
        component: ReportarComponent,
        componentProps: {},
        backdropDismiss: false
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }
}
