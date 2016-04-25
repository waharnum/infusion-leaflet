var fluid_2_0_0 = fluid_2_0_0 || {};

(function ($, fluid) {
    "use strict";

    /********************
     * Map with location index *
     ********************/

     fluid.defaults("fluid.leaflet.mapWithLocationIndex", {
         gradeNames: ["fluid.viewComponent"],
         selectors: {
             locationIndex: ".mapController"
         },
         components: {
             leafletMap: {
                 type: "fluid.leaflet.map",
                 container: ".mapContainer",
                 options: {
                     listeners: {
                         "onMapReady.initializeLocationIndex": {
                             funcName: "{mapWithLocationIndex}.initializeLocationIndex"
                         }
                     }
                 }
             }
         },
         model: {
             locations: {
                 "Toronto": {
                     longitude: 43.6534,
                     latitude: -79.3841
                 },
                 "Etobicoke": {
                     longitude: 43.6438,
                     latitude: -79.5654
                 },
                 "East York": {
                     longitude: 43.6912,
                     latitude: -79.3283
                 },
                 "North York": {
                     longitude: 43.7673,
                     latitude: -79.4146
                 },
                 "York": {
                     longitude: 43.6899,
                     latitude: -79.4785                     
                 },
                 "Scarborough": {
                     longitude: 43.7730,
                     latitude: -79.2575
                 }
             }
         },
         invokers: {
             "initializeLocationIndex": {
                 funcName: "fluid.leaflet.mapWithLocationIndex.initializeLocationIndex",
                 args: "{that}"
             }
         }
     });

     fluid.leaflet.mapWithLocationIndex.initializeLocationIndex = function (that) {
         var indexContainer = that.locate("locationIndex");
         indexContainer.append("<ul>");

         var locationList = indexContainer.children("ul");

         fluid.each(that.model.locations, function (locationData, locationName) {

             var locationItem = $("<li><a href=\"#\">" + locationName + "</a></li>")
                .click(function (e) {
                    that.leafletMap.panTo([locationData.longitude, locationData.latitude], {animate: true, duration: 2});
                    e.preventDefault();
                });

             locationItem.appendTo(locationList);
         });

         // that.leafletMap.panTo([43.6438, -79.5654], {animate: true, duration: 2});
     };

    /********************
     * Map *
     ********************/

     fluid.defaults("fluid.leaflet.map", {
            gradeNames: ["fluid.viewComponent"],
            mapPanelOptions: {
                height: "500px",
                width: "500px",
                initialZoom: 13,
                initialLongitude: 43.6534,
                initialLatitude: -79.3841
            },
            tileOptions: {
                url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB",
                maxZoom: 18
            },
            selectors: {
                mapPanel: ".mapPanel"
            },
            invokers: {
                initializeMapPanel: {
                    funcName: "fluid.leaflet.map.initializeMapPanel",
                    args: ["{that}"]
                },
                panTo: {
                    this: "{that}.map",
                    "method": "panTo"
                }
            },
            listeners: {
                "onCreate.initializeMapPanel": {
                    funcName: "{that}.initializeMapPanel",
                    priority: "first"
                }//,
                // "onCreate.panMap": {
                //     funcName: "{that}.panTo",
                //     args: [[43.6438, -79.5654], {animate: true, duration: 2}]
                // }
            },
            events: {
                "onMapReady": null
            },
            modelListeners: {
            //     "value": [{
            //         listener: "{that}.setSliderValue",
            //         args: ["{change}.value"]
            //     }, {
            //         listener: "{that}.setSliderAria",
            //         args: ["{change}.value"]
            //     }]
            }
        });

    fluid.leaflet.map.initializeMapPanel = function (that) {
        var mapPanel = that.locate("mapPanel"),
            mapPanelOptions = that.options.mapPanelOptions,
            tileOptions = that.options.tileOptions;

        mapPanel.css({
            "height": mapPanelOptions.height,
            "width": mapPanelOptions.width,
        });

        var mapPanelId = fluid.allocateSimpleId(mapPanel);

        that.map = L.map(mapPanelId).setView([mapPanelOptions.initialLongitude, mapPanelOptions.initialLatitude], mapPanelOptions.initialZoom);

        that.tileLayer = L.tileLayer(tileOptions.url, {
            attribution: tileOptions.attribution,
            maxZoom: tileOptions.maxZoom,
            detectRetina:true
            }).addTo(that.map);

        that.events.onMapReady.fire();

    };

})(jQuery, fluid_2_0_0);
