import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';

import {
  GFI_FEATURE_COUNT,
  GFI_INFO_FORMAT,
  IGNORED_LAYERS,
  INVALID_GFI_RESPONSE_MARKERS,
  LayerFieldConfig,
  LayerLike,
  LayerProperties,
  MARKER_HEIGHT_PX,
  MARKER_OFFSET,
  MARKER_WIDTH_PX,
  SELECTED_FIELDS_BY_LAYER,
  VisibleWmsLayer,
} from './getfeatureinfo.config';

export interface LayerProperty {
  key: string;
  value: string;
}

export interface LayerResult {
  name: string;
  properties: LayerProperty[];
  loading: boolean;
  excluded: boolean;
}

@Component({
  selector: 'app-getfeatureinfo',
  imports: [CommonModule],
  templateUrl: './getfeatureinfo.component.html',
  styleUrl: './getfeatureinfo.component.css',
})
export class GetfeatureinfoComponent implements OnInit, OnDestroy {
  @Input() map!: OlMap;

  visible = false;
  layerResults: LayerResult[] = [];
  hasVisibleResultsState = false;
  hasPendingResultsState = false;
  readonly ignoredLayers = IGNORED_LAYERS;
  private readonly ignoredLayerNames = new Set(this.ignoredLayers.map((layerName) => this.normalizeLayerName(layerName)));
  private readonly selectedFieldsByLayerNormalized = new Map<string, LayerFieldConfig[]>(
    Array.from(SELECTED_FIELDS_BY_LAYER.entries()).map(([layerName, fields]) => [
      this.normalizeLayerName(layerName),
      fields,
    ])
  );

  private contextMenuHandler!: (evt: Event) => void;
  private legendToggleHandler!: (evt: Event) => void;
  private markerOverlay!: Overlay;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.map) return;

    this.setupMarkerOverlay();
    this.bindLegendSync();

    this.contextMenuHandler = (evt: Event) => {
      evt.preventDefault();
      const mouseEvt = evt as MouseEvent;

      const pixel = this.map.getEventPixel(mouseEvt);
      const coordinate = this.map.getCoordinateFromPixel(pixel);
      const view = this.map.getView();
      const viewResolution = view.getResolution()!;
      const projection = view.getProjection();

      const wmsLayers = this.getVisibleWmsLayers();

      this.showMarker(coordinate);
      this.closeLegendPanel();

      this.visible = true;
      this.layerResults = wmsLayers.map(({ layer }) => ({
        name: this.getLayerTitle(layer),
        properties: [],
        loading: true,
        excluded: false,
      }));
      this.updateResultState();
      this.cdr.detectChanges();

      wmsLayers.forEach(({ source }, index) => {
        void this.loadLayerResult(source, index, coordinate, viewResolution, projection);
      });
    };

    this.map.getViewport().addEventListener('contextmenu', this.contextMenuHandler);
  }

  ngOnDestroy(): void {
    this.unbindListeners();
    this.teardownMarkerOverlay();
  }

  private setupMarkerOverlay(): void {
    const markerElement = document.createElement('img');
    markerElement.src = 'assets/images/mapmarker/pin-getfeatureinfo.svg';
    markerElement.alt = 'GetFeatureInfo marker';
    markerElement.style.width = MARKER_WIDTH_PX;
    markerElement.style.height = MARKER_HEIGHT_PX;
    markerElement.style.pointerEvents = 'none';

    this.markerOverlay = new Overlay({
      element: markerElement,
      positioning: 'bottom-center',
      offset: MARKER_OFFSET,
      stopEvent: false,
    });
    this.map.addOverlay(this.markerOverlay);
  }

  private teardownMarkerOverlay(): void {
    if (this.map && this.markerOverlay) {
      this.map.removeOverlay(this.markerOverlay);
    }
  }

  private bindLegendSync(): void {
    this.legendToggleHandler = (evt: Event) => {
      const target = evt.target as HTMLElement | null;
      const legendButton = target?.closest('.GPshowLegendsPicto') as HTMLButtonElement | null;

      if (!legendButton) {
        return;
      }

      // Let the legend control update aria-pressed first, then sync states.
      setTimeout(() => {
        const isLegendOpen = legendButton.getAttribute('aria-pressed') === 'true';
        if (isLegendOpen && this.visible) {
          this.close();
        }
      }, 0);
    };
    document.addEventListener('click', this.legendToggleHandler);
  }

  private unbindListeners(): void {
    if (this.contextMenuHandler && this.map) {
      this.map.getViewport().removeEventListener('contextmenu', this.contextMenuHandler);
    }

    if (this.legendToggleHandler) {
      document.removeEventListener('click', this.legendToggleHandler);
    }
  }

  close(): void {
    this.visible = false;
    this.hideMarker();
  }

  private getLayerTitle(layer: LayerLike): string {
    const src = layer.getSource?.();
    const props = layer.getProperties?.() ?? {};
    return (src as any)?._title
      || (src as any)?.name
      || props['title']
      || props['name']
      || layer.name
      || 'Couche WMS';
  }

  private isInvalidGetFeatureInfoResponse(text: string): boolean {
    const trimmed = text.trim();
    return !trimmed || INVALID_GFI_RESPONSE_MARKERS.some(marker => trimmed.includes(marker));
  }

  private shouldIgnoreLayer(layer: LayerLike): boolean {
    return this.getLayerIdentityCandidates(layer)
      .filter((v): v is string => typeof v === 'string' && v.length > 0)
      .map(v => this.normalizeLayerName(v))
      .some(candidate => this.isIgnoredLayerName(candidate));
  }

  private getLayerIdentityCandidates(layer: LayerLike): unknown[] {
    const source = layer.getSource?.();
    return [
      layer.name,
      (source as any)?.name,
      (source as any)?.getParams?.()?.LAYERS,
      layer.getProperties?.()?.['name'],
      layer.getProperties?.()?.['id'],
    ];
  }

  private isWmsSource(source: unknown): source is TileWMS | ImageWMS {
    return source instanceof TileWMS || source instanceof ImageWMS;
  }

  private normalizeLayerName(layerName: string): string {
    return layerName.split(':').pop()!.trim().toUpperCase();
  }

  private isIgnoredLayerName(layerName: string): boolean {
    return this.ignoredLayerNames.has(layerName) || this.ignoredLayerNames.has(layerName.split('__')[0]);
  }

  private getVisibleWmsLayers(): VisibleWmsLayer<TileWMS | ImageWMS>[] {
    return (this.map.getLayers().getArray() as LayerLike[]).flatMap(layer => {
      if (!layer.getVisible?.()) return [];
      const source = layer.getSource?.();
      if (!this.isWmsSource(source) || this.shouldIgnoreLayer(layer)) return [];
      return [{ layer, source }];
    });
  }

  private updateLayerResult(index: number, patch: Partial<LayerResult>): void {
    this.layerResults[index] = {
      ...this.layerResults[index],
      ...patch,
    };
    this.updateResultState();
    this.cdr.detectChanges();
  }

  private async loadLayerResult(
    source: TileWMS | ImageWMS,
    index: number,
    coordinate: number[],
    viewResolution: number,
    projection: any,
  ): Promise<void> {
    const url = source.getFeatureInfoUrl(coordinate, viewResolution, projection, {
      INFO_FORMAT: GFI_INFO_FORMAT,
      FEATURE_COUNT: GFI_FEATURE_COUNT,
    });

    if (!url) {
      this.excludeLayerResult(index);
      return;
    }

    try {
      const response = await fetch(url);
      const responseText = await response.text();

      if (this.isInvalidGetFeatureInfoResponse(responseText)) {
        this.excludeLayerResult(index);
        return;
      }

      const selectedFields = this.getSelectedFieldsForSource(source);
      const properties = this.extractSelectedProperties(responseText, selectedFields);

      if (!properties || properties.length === 0) {
        this.excludeLayerResult(index);
        return;
      }

      this.updateLayerResult(index, {
        properties,
        loading: false,
        excluded: false,
      });
    } catch {
      this.excludeLayerResult(index);
    }
  }

  private excludeLayerResult(index: number): void {
    this.updateLayerResult(index, { loading: false, excluded: true });
  }

  private getSelectedFieldsForSource(source: TileWMS | ImageWMS): LayerFieldConfig[] | null {
    const layersParam: unknown = source.getParams?.()?.LAYERS;
    if (typeof layersParam === 'string' && layersParam) {
      const firstLayer = layersParam.split(',')[0]?.trim();
      const fields = firstLayer ? this.getSelectedFieldsForLayerName(this.normalizeLayerName(firstLayer)) : null;
      if (fields) return fields;
    }

    const sourceName: unknown = (source as any).name;
    return typeof sourceName === 'string' && sourceName
      ? this.getSelectedFieldsForLayerName(this.normalizeLayerName(sourceName))
      : null;
  }

  private extractSelectedProperties(responseText: string, selectedFields: LayerFieldConfig[] | null): LayerProperty[] | null {
    if (!selectedFields?.length) return null;

    let data: { features?: Array<{ properties?: LayerProperties }> };
    try {
      data = JSON.parse(responseText);
    } catch {
      return null;
    }

    const features = Array.isArray(data?.features) ? data.features : [];
    if (!features.length) return null;

    const rows: LayerProperty[] = features.flatMap((feature: any) => {
      const props = feature?.properties ?? {};
      return selectedFields
        .filter(fieldCfg => this.hasDisplayValue(props[fieldCfg.field]))
        .map(fieldCfg => ({ key: fieldCfg.label, value: String(props[fieldCfg.field]) }));
    });

    return rows.length > 0 ? rows : null;
  }

  private hasDisplayValue(value: unknown): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  private getSelectedFieldsForLayerName(normalizedLayerName: string): LayerFieldConfig[] | null {
    if (!normalizedLayerName) return null;
    return this.selectedFieldsByLayerNormalized.get(normalizedLayerName)
      ?? this.selectedFieldsByLayerNormalized.get(normalizedLayerName.split('__')[0])
      ?? null;
  }

  private updateResultState(): void {
    this.hasVisibleResultsState = this.layerResults.some(r => !r.excluded);
    this.hasPendingResultsState = this.layerResults.some(r => r.loading);
  }

  private showMarker(coordinate: number[]): void {
    this.markerOverlay?.setPosition(coordinate);
  }

  private hideMarker(): void {
    this.markerOverlay?.setPosition(undefined);
  }

  private closeLegendPanel(): void {
    document.querySelector<HTMLButtonElement>('.GPshowLegendsPicto[aria-pressed="true"]')?.click();
  }
}
