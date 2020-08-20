import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.scss']
})
export class ReportarComponent implements OnInit {
  showSuccess = false;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  enviarReporte() {
    this.loadingCtrl
      .create({
        message: 'Enviando...'
      })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
        }, 2000);
      })
      .then(() => {
        this.showSuccess = true;
      });
  }

  cancelarReporte() {
    this.modalCtrl.dismiss();
  }

  continuarJuego() {
    this.modalCtrl.dismiss();
  }
}
