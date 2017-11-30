var map, heatmap;
    
    function initMap() {
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
        zoom: 13,
        center: {lat: 51.5412, lng: 9.9158},
        mapTypeId: 'satellite'
      };
      
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
      });
                      
      // Display a map on the web page
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      map.setTilt(50);
          
      // Multiple markers location, latitude, and longitude
      var markers = [
        ['Bahnhof', 51.536739, 9.927696],
        ['Goldschmidtstraße', 51.556927, 9.945319],
        ['Greifswalder Weg', 51.522819, 9.937280],
        ['Universität', 51.540519 , 9.933807 ],
        ['Bürgerstraße', 51.529385  , 9.932802] ,
        ['Hainholzweg ', 51.533350  , 9.943784 ],
        ['Klinikum ', 51.550420 , 9.940986 ],
        ['Sternstraße ', 51.526128 , 9.941801 ],
        ['Bahnhof Nord', 51.536358  , 9.924367]
      ];
                          
      // Info window content
      var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Bahnhof</h3>' +
        '<p>Fahrzeuge: 31 <br>' +
        ' Aufträge: 8351 <br>' + 
        ' Anteil an Gesamtaufträgen: 40%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Goldschmidtstraße</h3>' +
        '<p>Fahrzeuge: 1 <br>' +
        ' Aufträge: 262 <br>' + 
        ' Anteil an Gesamtaufträgen: 1,3%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Greifswalder Weg</h3>' +
        '<p>Fahrzeuge: 1 <br>' +
        ' Aufträge: 77 <br>' + 
        ' Anteil an Gesamtaufträgen: 0,4%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Universität</h3>' +
        '<p>Fahrzeuge: 20 <br>' +
        ' Aufträge: 5452 <br>' + 
        ' Anteil an Gesamtaufträgen: 26,1%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Bürgerstraße</h3>' +
        '<p>Fahrzeuge: 9 <br>' +
        ' Aufträge: 2193 <br>' + 
        ' Anteil an Gesamtaufträgen: 10,5%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Hainholzweg</h3>' +
        '<p>Fahrzeuge: 10 <br>' +
        ' Aufträge: 2524 <br>' + 
        ' Anteil an Gesamtaufträgen: 12,1%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Klinikum</h3>' +
        '<p>Fahrzeuge: 7 <br>' +
        ' Aufträge: 1714 <br>' + 
        ' Anteil an Gesamtaufträgen: 8,2%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Sternstraße</h3>' +
        '<p>Fahrzeuge: 1 <br>' +
        ' Aufträge: 266 <br>' + 
        ' Anteil an Gesamtaufträgen: 1,3%</p>' + '</div>'],
          
        ['<div class="info_content">' +
        '<h3>Bahnhof Nord</h3>' +
        '<p>Fahrzeuge: 1 <br>' +
        ' Aufträge: 16 <br>' + 
        ' Anteil an Gesamtaufträgen: 0,1%</p>' + '</div>'],
      ];
          
      // Add multiple markers to map
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      
      // Place each marker on the map  
      for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: markers[i][0]
        });
          
        // Add info window to marker    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, marker);
          }
        })(marker, i));

        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
      }
  
      // Set zoom level
      var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
      });
    
    }

    function toggleHeatmap() {
      heatmap.setMap(map);
    }

    function changeGradient() {
      var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }

    function changeRadius() {
      heatmap.set('radius', heatmap.get('radius') ? null : 50);
    }

    function changeOpacity() {
      heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }

    // Heatmap data
    function getPoints() {
      return [
     {location: new google.maps.LatLng(51.536739, 9.927696), weight: 8351},
     {location: new google.maps.LatLng(51.556927 , 9.945319), weight: 262},
     {location: new google.maps.LatLng(51.522819 , 9.937280), weight: 77},
     {location: new google.maps.LatLng(51.540519, 9.933807), weight: 5452},
     {location: new google.maps.LatLng(51.529385 , 9.932802), weight: 2193},
     {location: new google.maps.LatLng(51.533350 , 9.943784), weight: 2524},
     {location: new google.maps.LatLng(51.550420, 9.940986), weight: 1714},
     {location: new google.maps.LatLng(51.526128, 9.941801), weight: 266},
     {location: new google.maps.LatLng(51.536358 , 9.924367), weight: 16},

      ];
    }
  // Load initialize function
  google.maps.event.addDomListener(window, 'load', initMap);