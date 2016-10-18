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
                         },
                        //  "onMapReady.addPolylines": {
                        //      funcName: "{mapWithLocationIndex}.addPolylines"
                        //  },
                         "onMapReady.addMapMarkers": {
                             funcName: "{mapWithLocationIndex}.addMapMarkers",
                             priority: "last"
                         }
                     }
                 }
             }
         },
         invokers: {
             "initializeLocationIndex": {
                 funcName: "fluid.leaflet.mapWithLocationIndex.initializeLocationIndex",
                 args: "{that}"
             },
             "addMapMarkers": {
                 funcName: "fluid.leaflet.mapWithLocationIndex.addMapMarkers",
                 args: "{that}"
             },
             "addPolylines": {
                 funcName: "fluid.leaflet.mapWithLocationIndex.addPolylines",
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
                    that.leafletMap.panTo(L.latLng(locationData.latitude, locationData.longitude), {animate: true, duration: 2});
                    e.preventDefault();
                });

             locationItem.appendTo(locationList).each(function (i, e) {
                 var itemId = fluid.allocateSimpleId(e);
                 locationData.domID = itemId;
             });
         });
     };

     fluid.leaflet.mapWithLocationIndex.addMapMarkers = function (that) {
         fluid.each(that.model.locations, function (locationData, locationName) {

             var marker = L.circle(L.latLng(locationData.latitude, locationData.longitude), 10);

             marker.bindPopup(fluid.stringTemplate("<h1>%locationName</h1>", {locationName: locationName}));

             marker.addTo(that.leafletMap.map);
         });
     };

     fluid.leaflet.mapWithLocationIndex.addPolylines = function (that) {
         var locationArray = fluid.hashToArray(that.model.locations, "locationName");

         var latLongs = fluid.transform(locationArray, function (location) {
             return L.latLng(location.latitude, location.longitude);
         });

         var polyline = L.polyline(latLongs.sort()).addTo(that.leafletMap.map);

     };

    /********************
     * Map *
     ********************/

     fluid.defaults("fluid.leaflet.map", {
            gradeNames: ["fluid.viewComponent"],
            mapPanelOptions: {
                height: "500px",
                width: "500px",
                initialZoom: 16,
                initialLongitude: 43.6534,
                initialLatitude: -79.3841
            },
            tileOptions: {
                url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB",
                maxZoom: 21
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
