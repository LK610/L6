require([
    "esri/layers/FeatureLayer", 
    "esri/symbols/SimpleFillSymbol", 
    "esri/renderers/SimpleRenderer", 
    "esri/tasks/Locator",
    "esri/widgets/Search",
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
  

    // ** County Symbology ** //
    const cnty_sym = new SimpleFillSymbol({
        outline: {
            color: "lightgray",
            width: 0.5
        } // Close outline
    }) // Close SimpleFillSymbol

    const Pct_Mill = '($feature["MILLENN_CY"] / $feature["TOTPOP_FY"])*100'

    const cnty_Renderer = new SimpleRenderer({
        valueExpression: Pct_Mill,
        symbol: cnty_sym,
        label: "Millenials as % of Population",

        visualVariables: [{
            type: "color",
            //field: "Pct_Mill",
            legendOptions: {
                title: "Millenials as % of Population"
            },
            stops: [{
                value: 30,
                color: "#2c7fb8",
                label: "< 30"
            },{
                value: 15,
                color: "#7fcdbb",
                label: "15"        
            },{
                value: 0,
                color: "#edf8b1",
                label: "> 0"
            }] // Close variable stops
        }] // Close visualVariables
    }); // Close SimpleRenderer

    // ** Popup Template ** //
    const template = {
        title: "{NAME}, {ST_ABBREV}",
        content: "{MILLENN_CY} out of {TOTPOP_FY} total residents"
    } // Close template

    // ** Create the FeatureLayer ** //
    const counties = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/AGOL_Base_2018_Final/FeatureServer/2",
      //sublayers: [{ id: 2 }],
      outFields: ["ST_ABBREV", "NAME", "TOTPOP_FY", "MILLENN_CY"],
      renderer: cnty_Renderer,
      popupTemplate: template
    }); // Close counties FeatureLayer

    // // ** Add user interactivity ** //
    // const searchWidget = new Search({
    //     view: view,
    //     allPlaceholder: "Search for a state",
    //     sources: [{
    //       layer: counties,
    //       searchFields: ["ST_ABBREV"],
    //       exactMatch: true,
    //       outFields: ["ST_ABBREV", "NAME", "TOTPOP_FY", "MILLENN_CY"],
    //       name: "States",
    //       placeholder: "example: PA",
    //     }], // Close sources
    //     includeDefaultSources: false
    //   }); // Close search widget
      
    // view.ui.add(searchWidget, {
    //     position: "top-right"
    // }); // Close the search widget add
  
    // ** Define the Map and View ** //
    const map = new Map({
      basemap: "gray-vector",//"arcgis-modern-antique",
    }); // Map
  
   // map.layers.add(counties)
  
    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 2,
      center: [-95, 40] // longitude, latitude
    }); // MapView
  
  }); // close the require statement