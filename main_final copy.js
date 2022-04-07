require([
    "esri/layers/FeatureLayer", 
    "esri/symbols/SimpleFillSymbol", 
    "esri/renderers/SimpleRenderer", 
    "esri/widgets/Search",
    "esri/Map", 
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/layers/GraphicsLayer",
    "esri/rest/support/Query",
  ], (
    FeatureLayer, 
    SimpleFillSymbol, 
    SimpleRenderer, 
    Search,
    Map, 
    MapView,
    Legend,
    GraphicsLayer,
    Query
    ) => {
  
    
    // ** Define the Map and View ** //
    const map = new Map({
        basemap: "gray-vector",
      }); // Map
    
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 3,
        center: [-95, 40] // longitude, latitude
    }); // MapView
      
    // ** County Symbology ** //
    const cnty_sym = new SimpleFillSymbol({
        outline: {
            color: "lightgray",
            width: 0.5
        } // Close outline
    }) // Close SimpleFillSymbol

    const Pct_Mill = 'Round(($feature["MILLENN_CY"] / $feature["TOTPOP_FY"])*100, 1)'

    const cnty_Renderer = new SimpleRenderer({
        symbol: cnty_sym,

        visualVariables: [{
            type: "color",
            valueExpression: Pct_Mill,
            legendOptions: {
                title: "Millenials as % of Population"
            },
            stops: [{
                value: 25,
                color: "#2c7fb8",
                label: "< 25"
            },{
                value: 21.5,
                color: "#7fcdbb",
                label: "21.5"        
            },{
                value: 15,
                color: "#edf8b1",
                label: "> 15"
            }] // Close variable stops
        }] // Close visualVariables
    }); // Close SimpleRenderer


    // ** Popup Template ** //
    const template = {
        title: "{NAME}, {ST_ABBREV}",
        content: '{MILLENN_CY} millennials out of {TOTPOP_FY} total residents'
    } // Close template


    // ** Create the FeatureLayers ** //
    const counties = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/AGOL_Base_2018_Final/FeatureServer/2",
      outFields: ["ST_ABBREV", "NAME", "TOTPOP_FY", "MILLENN_CY"],
      renderer: cnty_Renderer,
      popupTemplate: template
    }); // Close counties FeatureLayer

    map.layers.add(counties)

    const resultsLayer = new GraphicsLayer();


    // ** Define the Legend widget ** //
    const legend = new Legend({
      view: view,
      layerInfos: [{
      layer: counties,
      title: "Legend"
      }] // Close layerInfos
    });

    view.ui.add(legend, "bottom-right");


    // ** Add user interactivity ** //
    state = prompt("Type a state abbreviation: ", "PA")

    console.log(state)

    const searchWidget = new Search({
        view: view,
        allPlaceholder: "Search for a state",

        sources: [{
          layer: counties,
          searchFields: ["ST_ABBREV"],
          exactMatch: true,
          outFields: ["ST_ABBREV", "NAME", "TOTPOP_FY", "MILLENN_CY"],
          name: "States",
          placeholder: "example: PA",
          zoomScale: 7,
          popupEnabled: false,
          popupOpenOnSelect: false,
        }], // Close sources

        includeDefaultSources: false,

    }); // Close search widget
      
    view.ui.add(searchWidget, {
        position: "top-right"
    }); // Close the search widget add
  

    //** Get results ** //
    const stateQry = new Query({
        where: "ST_ABBREV = '" + state + "'",
        returnGeometry: true
    }); // Close stateQry
    

    counties.when(function() {
        return counties.queryFeatures(stateQry);
    }).then(displayResults);

    function displayResults() {
        resultsLayer.source = counties.queryFeatures(stateQry);
        map.add(resultsLayer);
    }; // Close display results
    
    //resultsLayer.addMany(cntyFeatures);}
    //view.goTo(resultsLayer.extent);}

}); // close the require statement