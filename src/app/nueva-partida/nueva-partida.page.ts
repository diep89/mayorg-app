import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.page.html',
  styleUrls: ['./nueva-partida.page.scss']
})
export class NuevaPartidaPage implements OnInit {
  modoJuegoClasico = false;
  modoJuegoDuelo = false;
  toggleClasico = false;
  toggleDuelo = false;
  toggleAmigos = false;
  toggleAleatorio = false;
  statusClasico = 'Disable';
  statusDuelo = 'Disable';
  statusAmigos = 'Disable';
  statusAleatorio = 'Disable';

  constructor(private router: Router) {}

  ngOnInit() {}

  seleccionClasico() {
    this.modoJuegoClasico = true;
    this.modoJuegoDuelo = false;

    if (this.statusClasico === 'Disable') {
      this.toggleClasico = !this.toggleClasico;
      this.statusClasico = this.toggleClasico ? 'Enable' : 'Disable';
      if (this.statusDuelo === 'Enable') {
        this.statusDuelo = this.toggleClasico ? 'Disable' : 'Enable';
        this.toggleDuelo = !this.toggleDuelo;
      }
      if (this.toggleAmigos === true) {
        this.toggleAmigos = !this.toggleAmigos;
        this.statusAmigos = this.toggleAmigos ? 'Enable' : 'Disable';
      }
      if (this.toggleAleatorio === true) {
        this.toggleAleatorio = !this.toggleAleatorio;
        this.statusAleatorio = this.toggleAleatorio ? 'Enable' : 'Disable';
      }
    }
  }

  seleccionDuelo() {
    this.modoJuegoClasico = false;
    this.modoJuegoDuelo = true;

    if (this.statusDuelo === 'Disable') {
      this.toggleDuelo = !this.toggleDuelo;
      this.statusDuelo = this.toggleDuelo ? 'Enable' : 'Disable';
      if (this.statusClasico === 'Enable') {
        this.statusClasico = this.toggleDuelo ? 'Disable' : 'Enable';
        this.toggleClasico = !this.toggleClasico;
      }
    }
  }

  seleccionAmigos() {
    if (this.statusAmigos === 'Disable') {
      this.toggleAmigos = !this.toggleAmigos;
      this.statusAmigos = this.toggleAmigos ? 'Enable' : 'Disable';
      if (this.statusAleatorio === 'Enable') {
        this.statusAleatorio = this.toggleAmigos ? 'Disable' : 'Enable';
        this.toggleAleatorio = !this.toggleAleatorio;
      }
    }
  }

  seleccionAleatorio() {
    if (this.statusAleatorio === 'Disable') {
      this.toggleAleatorio = !this.toggleAleatorio;
      this.statusAleatorio = this.toggleAleatorio ? 'Enable' : 'Disable';
      if (this.statusAmigos === 'Enable') {
        this.statusAmigos = this.toggleAleatorio ? 'Disable' : 'Enable';
        this.toggleAmigos = !this.toggleAmigos;
      }
    }
  }

  // Modificar path con :preguntaId
  comenzarPartida() {
    this.router.navigateByUrl('/pregunta');
  }
}
