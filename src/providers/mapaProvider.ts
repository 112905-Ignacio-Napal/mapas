import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MapaProvider {
  urlApi: string = environment.urlApiCoordendas;
  constructor(private http: HttpClient) {}

  getCoordenadas(): Observable<any> {
    return this.http.get(this.urlApi);
  }
}
