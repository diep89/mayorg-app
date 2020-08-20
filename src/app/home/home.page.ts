import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Platform,
  AlertController,
  IonApp,
  NavController,
  IonRouterOutlet
} from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private router: Router) {}

  nuevaPartida() {
    this.router.navigateByUrl('/nuevaPartida');
  }
}
