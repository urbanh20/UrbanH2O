// get the viz.json url from the CartoDB Editor
// - click on visualize
// - create new visualization
// - make visualization public
// - click on publish
// - go to API tab

cartodb.createVis('map', 'https://zhik.cartodb.com/api/v2/viz/232679a0-f902-11e5-b8dd-0ecd1babdde5/viz.json')
    .done(function(vis, layers) {
        // layer 0 is the base layer, layer 1 is cartodb layer
        // when setInteraction is disabled featureOver is triggered
        layers[1].setInteraction(true);
        layers[1].on('featureOver', function(e, latlng, pos, data, layerNumber) {
            console.log(e, latlng, pos, data, layerNumber);
        });

        // you can get the native map to work with it
        var map = vis.getNativeMap();

        // now, perform any operations you need, e.g. assuming map is a L.Map object:
        // map.setZoom(3);
        // map.panTo([50.5, 30.5]);
    });
