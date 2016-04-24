var fluid_2_0_0 = fluid_2_0_0 || {};

(function ($, fluid) {
    "use strict";

    /********************
     * Textfield Slider *
     ********************/

    fluid.defaults("fluid.leaflet", {
            gradeNames: ["fluid.viewComponent"],
            mapPanelOptions: {
                height: "500px",
                width: "500px",
                initialZoom: 13,
                initialLongitude: 43.6532,
                initialLatitude: -79.3832
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
                    funcName: "fluid.leaflet.initializeMapPanel",
                    args: ["{that}"]
                }
            },
            listeners: {
                "onCreate.initializeMapPanel": {
                    funcName: "{that}.initializeMapPanel"
                }
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

    fluid.leaflet.initializeMapPanel = function (that) {
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
    };

})(jQuery, fluid_2_0_0);
