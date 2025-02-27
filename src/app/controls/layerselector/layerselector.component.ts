import { Component, OnInit, Input, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import Control from 'ol/control/Control';
import { Layerselector } from "geopf-extensions-openlayers/src";

@Component({
  selector: 'app-layerselector',
  standalone: true,
  imports: [],
  template: '',
  styles: ['::ng-deep dialog[id^="GPcatalogPanel-"] { top: unset !important; bottom:3px!important; }'],
})
export class LayerselectorComponent implements OnInit {
  @Input() map!: Map;
  control!: Control;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var LayerSelectorList = [
      {layername : "PLAN.IGN", title : "Gris", layertype : "TMS", style : "gris", img: "assets/images/layerselector/Gris.png" },
      {layername : "ORTHOIMAGERY.ORTHOPHOTOS", title : "Aérienne", layertype : "WMS", style : null, img: "assets/images/layerselector/Aérienne.png" }, 
      {layername : "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", title : "Relief", layertype : "WMS", style : null, img: "assets/images/layerselector/Relief.png" }   
    ];

    this.control = new Layerselector({
      position: "bottom-left",
      panel: true,
      layerSelectorList : LayerSelectorList
    });

    this.map.addControl(this.control);
  }

}


//class LayerSelectorControl extends Control {
/**
 * @param {Object} [opt_options] Control options.
 */
// @ts-ignore
/*  constructor(opt_options) {
    const options = opt_options || {};

    // Button
    const button = document.createElement('button');
    button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "gpf-btn-icon-isocurve", "fr-btn", "fr-btn--tertiary", "gpf-btn--tertiary", "gpf-btn", "gpf-btn-icon");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("type", "button");
    button.removeAttribute("title");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-label", 'Sélectionner une couche');
    button.style.float = 'left';

    // tool element container
    const element = document.createElement('div');
    element.id = "GPLayerSelector";
    element.classList.add("GPwidget", "gpf-widget", "gpf-widget-button");
    element.classList.remove("ol-unselectable", "ol-control");
    element.style.inset = 'unset';
    element.style.position = 'unset';
    element.appendChild(button);

    // popup radio button
    const element2 = document.createElement('div');
    element2.id = "menu-layer-selector";
    element2.innerHTML = "voici mon message";
    element2.style.backgroundColor = 'white';
    element2.style.width = '150px';
    //element2.style.position = 'relative';
    //element2.style.left = '50px';
    //element2.style.bottom = '5px';
    //element2.style.visibility = 'hidden';
    element2.classList.add("GPpanel", "gpf-panel", "fr-modal");
    element.appendChild(element2);

    //element.append(button, element2)

    // set element to target
    if (options.position) {
      var id = "position-container-" + options.position;
      if (!document.getElementById(id)) {
        // Creation manuelle du container de position
        var div = document.createElement("div");
        div.id = id;
        div.classList.add("position");
        div.classList.add(id);
        element.appendChild(div);
      }
      // @ts-ignore
      options.target = document.getElementById(id)?.appendChild(element);
    }

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.showSelector.bind(this), false);
  }

  showSelector(e: any) {
    var status = (e.target.ariaPressed === "true");
    e.target.setAttribute("aria-pressed", !status);

    e.target.parentNode.querySelector('#menu-layer-selector').style.visibility = "visible";
    // @ts-ignore
    this.getMap().getView().setZoom(2);
    console.log(this.getMap()?.getAllLayers());
  }
}*/

// html
/*<div class="cc-selector">
  <input checked="checked" id="visa" type="radio" name="credit-card" value="visa" />
  <label class="drinkcard-cc visa" for="visa"></label>
  <input id="mastercard" type="radio" name="credit-card" value="mastercard" />
  <label class="drinkcard-cc mastercard"for="mastercard"></label>
</div>


// css    
.cc-selector input{
  margin:0;padding:0;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
}


.image1{background-image:url(http://i.imgur.com/lXzJ1eB.png);}
.image2{background-image:url(http://i.imgur.com/SJbRQF7.png);}

.cc-selector input:active +.drinkcard-cc{opacity: .9;}
.cc-selector input:checked +.drinkcard-cc{
    -webkit-filter: none;
       -moz-filter: none;
            filter: none;
}
.drinkcard-cc{
    cursor:pointer;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    width:100px;height:70px;
    -webkit-transition: all 100ms ease-in;
       -moz-transition: all 100ms ease-in;
            transition: all 100ms ease-in;
    -webkit-filter: brightness(1.8) grayscale(1) opacity(.7);
       -moz-filter: brightness(1.8) grayscale(1) opacity(.7);
            filter: brightness(1.8) grayscale(1) opacity(.7);
}
.drinkcard-cc:hover{
    -webkit-filter: brightness(1.2) grayscale(.5) opacity(.9);
       -moz-filter: brightness(1.2) grayscale(.5) opacity(.9);
            filter: brightness(1.2) grayscale(.5) opacity(.9);
}

// Extras 
a:visited{color:#888}
a{color:#444;text-decoration:none;}
p{margin-bottom:.3em;}
* { font-family:monospace; }
.cc-selector-2 input{ margin: 5px 0 0 12px; }
.cc-selector-2 label{ margin-left: 7px; }
span.cc{ color:#6d84b4 }*/