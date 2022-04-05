require([
  "esri/layers/FeatureLayer", 
  "esri/symbols/SimpleFillSymbol", 
  "esri/renderers/SimpleRenderer", 
  "esri/Map", 
  "esri/views/MapView",
  "esri/widgets/Legend"
], (
  FeatureLayer, 
  SimpleFillSymbol, 
  SimpleRenderer, 
  Map, 
  MapView,
  Legend
  ) => {

  // ** Define the county layer ** //
  // ** Symbology ** //
  // const defaultSym = new SimpleFillSymbol({
  //   color: [0, 0, 0, 0.25],
  // }); // Close line_sym SimpleLineSymbol

  // county symbology
  // const cnty_Renderer = new SimpleRenderer({
  //   valueExpression: "Pct_Mill = ($feature.MILLENN_CY / $feature.TOTPOP_CY) * 100",
  //   symbol: defaultSym,
  //   label: "Millenials as % of Population",

  //   // visualVariables: [
  //   // {
  //   //   type: "color",
  //   //   field: "Pct_Mill",
  //   //   legendOptions: {
  //   //     title: "Millenials as % of Population"
  //   //   },
  //   //   stops: [
  //   //   {
  //   //     value: 100,
  //   //     color: "#fc8d59",
  //   //     label: "< 100"
  //   //   },
  //   //   {
  //   //     value: 50,
  //   //     color: "#ffffbf",
  //   //     label: "50"        
  //   //   },
  //   //   {
  //   //     value: 50,
  //   //     color: "#91cf60",
  //   //     label: "> 0"
  //   //   }] // Close variable stops
  //   // }] // Close visualVariables
  // }); // Close SimpleRenderer
  
  // const add_build_class = function(val, renderer, c) {
  //   var lbl, sym;
  //   if (val == val) {
  //     lbl = val;
  //     sym = new SimpleFillSymbol({
  //       color: c,
  //       outline: line_sym
  //     }); // Close sym SimpleFillSymbol
  //   } // Close IF Entertainment Buildings
  //   else {
  //     lbl = "Other"
  //     sym = new SimpleFillSymbol({
  //       color: [0, 0, 0, 0],
  //       outline: line_sym
  //     }) // Close sym SimpleFillSymbol
  //   } // Close ELSE

  //   renderer.addUniqueValueInfo({
  //     value: val,
  //     symbol: sym,
  //     label: lbl
  //   });// Close build_Renderer SimpleRenderer
  // } // Close add_build_class function

  // add_build_class("Entertainment Buildings", build_Renderer, [62, 117, 109, 1]);

  // ** Popup Template ** //
  const template = {
    title: "{NAME}, {ST_ABBREV}",
    content: "Content goes here"
  } // Close template

  // Feature Layer ** // 
  const county = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/AGOL_Base_2018_Final/FeatureServer",
    sublayers: [{ id: 2 }],
    //renderer: cnty_Renderer,
    outFields: ["ST_ABBREV", "NAME", "TOTPOP_FY", "MILLENN_CY"]
    //popupTemplate: template
  }); // Close building FeatureLayer
  

  // ** Define the Map and View ** //
  const map = new Map({
    basemap: "gray-vector",//"arcgis-modern-antique",
  }); // Map

  map.layers.add(county)

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 1,
    center: [-95, 40], // longitude, latitude
  }); // MapView

  // ** Define the Legend widget ** //
  // const legend = new Legend({
  //   view: view,
  //   layerInfos: [{
  //     layer: county,
  //     title: "Legend"
  //   }]
  // });

  // view.ui.add(legend, "bottom-left");  

}); // close the require statement