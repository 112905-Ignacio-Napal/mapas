import { MapaProvider } from './../../providers/mapaProvider';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  private map?: H.Map;
  @ViewChild('map') mapDiv?: ElementRef;

  constructor(private mapaProvider: MapaProvider) {}

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: environment.apiKeyHereMaps,
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: 0, lng: 0 },
          zoom: 4,
        }
      );
      map.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev);
      });
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
      this.mapaProvider.getCoordenadas().subscribe((data) => {
        [...data?.listaMarcadores].forEach((c) => {
          this.map?.addObject(
            new H.map.Marker({
              lat: Number.parseFloat(c.latitud),
              lng: Number.parseFloat(c.longitud),
            })
          );
        });
      });
    }
  }

  public zoom = 2;
  public lat = 0;
  public lng = 0;

  private timeoutHandle: any;
  @Output() notify = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      if (this.map) {
        if (changes['zoom'] !== undefined) {
          this.map.setZoom(changes['zoom'].currentValue);
        }
        if (changes['lat'] !== undefined) {
          this.map.setCenter({
            lat: changes['lat'].currentValue,
            lng: this.lng,
          });
        }
        if (changes['lng'] !== undefined) {
          this.map.setCenter({
            lat: this.lat,
            lng: changes['lng'].currentValue,
          });
        }
      }
    }, 100);
  }
}
