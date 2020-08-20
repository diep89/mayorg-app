import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstadisticasJugador } from './estadisticasJugador.model';
import { RankingService } from './ranking.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss']
})
export class RankingPage implements OnInit, OnDestroy {
  isLoading: boolean;
  estadisticasJugador: EstadisticasJugador;
  private estadisticasSubs: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    this.llamarLoadingController();
    this.estadisticasSubs = this.rankingService.estadisticas.subscribe(
      (x: EstadisticasJugador) => {
        this.estadisticasJugador = x;
      }
    );
    this.rankingService.obtenerEstadisticas();
  }

  ionViewWillEnter() {
    this.rankingService.obtenerEstadisticas();
  }

  async llamarLoadingController() {
    const loadingEl = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    loadingEl.present();
    setTimeout(() => {
      this.isLoading = false;
      loadingEl.dismiss();
    }, 1500);
  }

  ngOnDestroy() {
    this.estadisticasSubs.unsubscribe();
  }
}
