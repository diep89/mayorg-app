import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController
} from '@ionic/angular';

@Component({
  selector: 'app-colaborar',
  templateUrl: './colaborar.page.html',
  styleUrls: ['./colaborar.page.scss']
})
export class ColaborarPage implements OnInit {
  showSuccess = false;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  enviarSugerencia() {
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

  backHome() {
    this.navCtrl.navigateBack('/home');
  }
}
