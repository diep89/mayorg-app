import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreguntaPage } from './pregunta.page';
import { EvalPreguntaComponent } from './eval-pregunta/eval-pregunta.component';
import { ReportarComponent } from './eval-pregunta/reportar/reportar.component';

const routes: Routes = [
  {
    path: '',
    component: PreguntaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreguntaPage, EvalPreguntaComponent, ReportarComponent],
  entryComponents: [EvalPreguntaComponent, ReportarComponent]
})
export class PreguntaPageModule {}
