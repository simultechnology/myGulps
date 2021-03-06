var currentFloor = '2015RASP1', lavatories = [], stairs = [];

var floorMappingInfo = {
  "1" : "NAVI1T1",
  "-1" : "NAVI1TB1",
  "-2" : "NAVI1TB2",
};

var map = new L.Map('map', {
  center: new L.LatLng(35.682000, 139.764300), zoom: 18});
var googleLayer = new L.Google('ROADMAP');
map.addLayer(googleLayer);
googleLayer.setOpacity(1);

var layer = L.tileLayer(
  "http://navi-sv.koseidosokui.tokyo:10085/con00-cgi/getRaster/1.0.0/" + currentFloor + "/default/EPSG3857/{z}/{y}/{x}.png"
);
map.addLayer(layer);
layer.setOpacity(0);
$('.leaflet-google-layer').css('opacity', 0);

$('#btn-container .btn').on('click', function() {
  var value = $(this).attr('value');
  currentFloor = value;
  if (layer) {
    map.removeLayer(layer);
  }
  if (value === '2015RASP1') {
    layer.setOpacity(0);
    $('.leaflet-google-layer').css('opacity', 0);

  } else if (value !== 'BLACK') {
    $('.leaflet-google-layer').css('opacity', 0.3);
    layer = L.tileLayer(
      "http://navi-sv.koseidosokui.tokyo:10085/con00-cgi/getRaster/1.0.0/" + value + "/default/EPSG3857/{z}/{y}/{x}.png"
    );
    map.addLayer(layer);
  } else {
    $('.leaflet-google-layer').css('opacity', 1);
  }

  addPoiToMap('data/lavatory.csv');

});

addPoiToMap('data/lavatory.csv');

var LavatoryIcon = L.Icon.extend({
  options: {
    iconUrl: 'img/lavatory.jpg',
    iconSize:     [30, 30]
  }
});

function addPoiToMap(url) {

  for (var i = 0; i < lavatories.length; i++) {
    map.removeLayer(lavatories[i]);
  }

  $.get(url)
    .then(function(data) {
      var json = JSON.parse(data);
      for (var i = 0; i < json.length; i++) {
        if (floorMappingInfo[json[i][2]] === currentFloor ||
          (currentFloor === '2015RASP1' && json[i][2] === -1) ||
          (currentFloor === 'BLACK' && json[i][2] === -1)) {

          var lMarker = L.marker([json[i][1], json[i][0]], {icon: new LavatoryIcon()});
          lMarker.addTo(map);
          lavatories.push(lMarker);
        }
      }
    });
}

function getSquareLatLngs(yIdx, xIdx, squareSize) {
  var latLng = map.containerPointToLatLng(L.point(xIdx * squareSize, yIdx * squareSize));
  var latLng1 = map.containerPointToLatLng(L.point((xIdx + 1) * squareSize, yIdx * squareSize));
  var latLng2 = map.containerPointToLatLng(L.point((xIdx + 1) * squareSize, (yIdx + 1) * squareSize));
  var latLng3 = map.containerPointToLatLng(L.point(xIdx * squareSize, (yIdx + 1) * squareSize));

  return [latLng, latLng1, latLng2, latLng3];
}

var routes = [
  [35.68204539751113, 139.76252496242523],
  [35.682036682838145, 139.76260006427765],
  [35.68204104017475, 139.76268589496613],
  [35.6820236108269, 139.76276636123657],
  [35.68203232550131, 139.76285219192505],
  [35.68203232550131, 139.76293802261353],
  [35.68202796816422, 139.76301312446594],
  [35.6820236108269, 139.76310431957242],
  [35.682036682838145, 139.76317942142487],
  [35.68203232550131, 139.76325452327728],
  [35.68203232550131, 139.76333498954773],
  [35.6820236108269, 139.7634261846542],
  [35.6820236108269, 139.76348519325256],
  [35.6819713227605, 139.76348519325256],
  [35.68189289059663, 139.76348519325256],
  [35.68182317305289, 139.76349592208862],
  [35.68182317305289, 139.763565659523],
  [35.68182317305289, 139.76365685462952],
  [35.681831887749205, 139.763748049736],
  [35.681831887749205, 139.76382315158844],
  [35.68182317305289, 139.76389825344086],
  [35.68182317305289, 139.7639787197113],
  [35.68182317305289, 139.76406991481778],
  [35.68182317305289, 139.76414501667023],
  [35.68182317305289, 139.76422011852264],
  [35.68182317305289, 139.7643005847931],
  [35.68182753040115, 139.76438641548157],
  [35.68182753040115, 139.76447761058807],
  [35.68182753040115, 139.7646278142929],
  [35.68182753040115, 139.76468682289124],
  [35.68182753040115, 139.76478338241577],
  [35.68177524220625, 139.76478338241577],
  [35.68170552455972, 139.76478338241577],
  [35.68164452156904, 139.76477801799774],
  [35.681579161170134, 139.76477801799774],
  [35.681518158082845, 139.76477801799774],
  [35.68144408284272, 139.76476728916168],
  [35.68137872227962, 139.76475656032562],
  [35.68131336166298, 139.7647726535797],
  [35.68125235837247, 139.76477801799774],
  [35.68119135503534, 139.76478338241577],
  [35.681112922104745, 139.76478338241577],
  [35.68105191866101, 139.76478338241577],
  [35.68099527256434, 139.76478338241577],
  [35.680925554236296, 139.7647726535797],
  [35.68086019324845, 139.7647726535797],
  [35.6807904748024, 139.7647726535797],
  [35.68078175999235, 139.7648799419403],
  [35.680773045181354, 139.7649550437927],
  [35.6807251137039, 139.7649550437927],
  [35.68067718219762, 139.7649550437927],
  [35.680603106176775, 139.7649550437927],
  [35.680472383619275, 139.76494431495667],
  [35.68040702226019, 139.76494431495667],
  [35.68034601827675, 139.76494431495667],
  [35.68027629938143, 139.76494431495667],
  [35.682036682838145, 139.76478338241577],
  [35.682093328195485, 139.7647941112518],
  [35.68214561618194, 139.7647941112518],
  [35.68222840542378, 139.7647941112518],
  [35.682293765290844, 139.7647887468338],
  [35.68236783974212, 139.76477801799774],
  [35.68243319949497, 139.76477801799774],
  [35.68242448486435, 139.76486384868622],
  [35.68242448486435, 139.76494431495667],
  [35.68248548725871, 139.76494431495667],
  [35.68254213229741, 139.76494431495667],
  [35.682620563823086, 139.7649496793747],
  [35.68267285146403, 139.7649496793747],
  [35.68275564015876, 139.76493895053864],
  [35.68275128286119, 139.76501405239105],
  [35.68275999745611, 139.76512670516968],
  [35.682764354753225, 139.76526081562042],
  [35.682764354753225, 139.76536810398102],
  [35.682764354753225, 139.76542174816132],
  [35.68275128286119, 139.76582407951355],
  [35.68273385366847, 139.765904545784],
  [35.68273385366847, 139.76600646972656],
  [35.68273385366847, 139.76608157157898],
  [35.68273385366847, 139.76616740226746],
  [35.68267285146403, 139.76616740226746],
  [35.682616206518134, 139.76616740226746],
  [35.68255520422372, 139.76616740226746],
  [35.68248984457082, 139.76616740226746],
  [35.682415770232794, 139.76616203784943],
  [35.68235476778513, 139.76616203784943],
  [35.682350410465666, 139.76622104644775],
  [35.682346053145956, 139.7663176059723],
  [35.682337338505825, 139.76641416549683],
  [35.681844959791846, 139.76454198360443],
  [35.68054645976149, 139.76494431495667],
  [35.68191031997303, 139.7647726535797],
  [35.68196696542008, 139.76477801799774],
  [35.68275999745611, 139.76517498493195],
  [35.68275128286119, 139.76551830768582],
  [35.68275564015876, 139.7655826807022],
  [35.68275128286119, 139.76566314697266],
  [35.68275128286119, 139.76573824882507],
  [35.68273385366847, 139.76508378982544],
  [35.682799213121484, 139.76531982421872],
  [35.6827294963697, 139.76541101932526],
  [35.682332981185375, 139.7663712501526],
  [35.68274692556336, 139.76531982421872]
];

var polylines = [];

function drawLines(map) {

  for (var i = 0; i < polylines.length; i++) {
    map.removeLayer(polylines[i]);
  }

  var squareSize = 25;

  var horizontalCounts = window.innerWidth / squareSize;
  var verticalCounts = window.innerHeight / squareSize;
  for (var i = 0; i <= horizontalCounts; i++) {
    for (var j = 0; j <= verticalCounts; j++) {
      var squareLatLngs = getSquareLatLngs(j, i, squareSize);
      var polyline = L.polyline(squareLatLngs, {
        color: '#333', weight: 1, opacity: 0.8
      }).addTo(map);

      for (var l = 0; l < routes.length; l++) {
        var isContain = polyline.getBounds().contains(routes[l]);
        if (isContain) {
          polyline.setStyle({
            color: 'black', weight: 1, fill: true, fillOpacity: 0.8, fillColor: '#ff8c00'
          });
          break;
        }
      }
      polylines.push(polyline);
    }
  }
}

drawLines(map);

var timer = false;
$(window).resize(function() {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    console.log('resized');
    drawLines(map);
  }, 200);
});

map.on('click', function(e) {
  console.log("[" + e.latlng.lat + ", " + e.latlng.lng + "],");
});

map.on('moveend', function() {

  setTimeout(function () {
    drawLines(map);
  }, 0);
});

