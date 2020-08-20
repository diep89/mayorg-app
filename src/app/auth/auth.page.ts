import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  backButtonSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Ingresando...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home');
        }, 2500);
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const usuario = form.value.usuario;
    const password = form.value.password;
    // Para chequear:
    console.log(usuario, password);
  }

  showAlertExit() {
    this.alertCtrl
      .create({
        message: '¿Está seguro que desea salir?',
        header: 'Salir de la app',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Salir',
            cssClass: 'danger',
            handler: () => {
              navigator['app'].exitApp();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  backButtonEvent() {
    this.backButtonSubs = this.platform.backButton.subscribe(async () => {
      this.showAlertExit();
    });
  }

  ionViewDidEnter() {
    this.backButtonEvent();
  }

  ionViewWillLeave() {
    this.backButtonSubs.unsubscribe();
  }
}
