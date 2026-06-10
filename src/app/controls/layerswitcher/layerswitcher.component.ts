import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { LayerSwitcher } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerswitcher',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
})
export class LayerswitcherComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const mapRef = this.map;

    // Controls top-left
    this.control = new LayerSwitcher({
      options: {
        position: "top-left",
        panel: true,
        counter: true,
        hiddenLayerCount: 3
      },
    });

    this.control.addEventListener("layerswitcher:add", function (e: any) {
      try {
        const pinnedLayersOrder = [
          "ADMIN_EXPRESS",
          "highlight",
          "IGNF_CARTO-SP_SERVICES-PUBLICS_:_metropole",
        ];

        const target = e?.target;
        if (!target?._layers) {
          return;
        }

        // Convert _layers to array if it's an object
        const layersArray = Array.isArray(target._layers) ? target._layers : Object.values(target._layers);
        const getLayerZIndex = (layerEntry: any): number => Number(layerEntry?.layer?.getZIndex?.() ?? 0);
        const getEntryName = (layerEntry: any): string => String(
          layerEntry?.name ?? layerEntry?.layer?.get?.("name") ?? layerEntry?.layer?.values_?.name ?? "",
        );
        const matchesLayerName = (layerEntry: any, expectedName: string): boolean => {
          const name = getEntryName(layerEntry);
          return name === expectedName || name.toLowerCase() === expectedName.toLowerCase();
        };
        const setLayerZIndex = (layerEntry: any, zIndex: number): void => {
          if (layerEntry?.layer?.setZIndex) {
            layerEntry.layer.setZIndex(zIndex);
          }
        };

        const pinnedLayerNames = new Set(pinnedLayersOrder);
        const adminExpressEntry = layersArray.find(
          (entry: any) => matchesLayerName(entry, "ADMIN_EXPRESS") && entry?.layer,
        );

        if (!adminExpressEntry) {
          return;
        }

        const adminExpressOriginalZIndex = getLayerZIndex(adminExpressEntry);

        // Rebuild pinned stack from ADMIN_EXPRESS original index.
        // This guarantees ADMIN_EXPRESS < highlight < IGNF in strict order.
        for (let idx = 0; idx < pinnedLayersOrder.length; idx++) {
          const layerName = pinnedLayersOrder[idx];
          const layerEntry = layersArray.find(
            (entry: any) => matchesLayerName(entry, layerName) && entry?.layer,
          );

          if (layerEntry) {
            setLayerZIndex(layerEntry, adminExpressOriginalZIndex + 1 + idx);
          }
        }

        // Try to detect the newly added layer from event payload first.
        const addedLayer = e?.layer ?? e?.detail?.layer;
        let newlyAddedLayerEntry = layersArray.find(
          (entry: any) => !pinnedLayerNames.has(getEntryName(entry)) && entry?.layer === addedLayer,
        );

        // Fallback: pick the highest non-pinned layer (usually the just-added one).
        if (!newlyAddedLayerEntry) {
          newlyAddedLayerEntry = layersArray
            .filter((entry: any) => !pinnedLayerNames.has(getEntryName(entry)) && entry?.layer)
            .sort((a: any, b: any) => getLayerZIndex(b) - getLayerZIndex(a))[0];
        }

        if (newlyAddedLayerEntry?.layer) {
          setLayerZIndex(newlyAddedLayerEntry, adminExpressOriginalZIndex);
        }

        target._lastZIndex = Math.max(
          ...layersArray.map((layerEntry: any) => getLayerZIndex(layerEntry)),
        );
        target._updateLayersOrder();
        mapRef.renderSync();
      } catch (err) {
        console.warn('LayerSwitcher: Error ordering layers', err);
      }
    });

    this.map.addControl(this.control);
  }
}
