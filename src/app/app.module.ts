import { MapaProvider } from './../providers/mapaProvider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  declarations: [AppComponent, InicioComponent, MapaComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MapaProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
