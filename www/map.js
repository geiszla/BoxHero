function initMap () {
  var uluru = {lat: 53.4808, lng: -2.2426};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
  });
  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    radius: Math.sqrt(50) * 10
  });
  var circle2 = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    radius: Math.sqrt(50) * 100
  });
  var marker = new google.maps.Marker({
    position: {lat: 53.4808, lng: -2.2426},
    icon: 'images/icon2.png',
    map: map,
    title: 'Box Name'
  });
  var marker2 = new google.maps.Marker({
    position: {lat: 53.4790, lng: -2.2000},
    icon: 'images/icon2.png',
    map: map,
    title: 'Box Name'
  });
  var contentString = 'Hello World';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function () {
    map.setZoom(13);
    map.setCenter(marker.getPosition());
    $('#myModal').modal('toggle');
  });
  marker2.addListener('click', function () {
    map.setZoom(13);
    map.setCenter(marker2.getPosition());
    infowindow.open(map, marker2);
  });
  circle.bindTo('center', marker, 'position');
  circle2.bindTo('center', marker2, 'position');
}

function init () {
  google.maps.event.addDomListener(window, 'load', initMap);
}
