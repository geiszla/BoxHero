import React, { Component } from 'react';
import { computed, observable } from 'mobx';

import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import sendQuery from '../graphql.js';

@observer
export default class Map extends Component {
  componentDidMount () {
    this.initMap();
  }

  initMap () {
    const uluru = {lat: 53.4808, lng: -2.2426};
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru
    });

    sendQuery(`
      getClosestOrDefaultBoxes (lattitude: 53.482465, longitude: -2.243325, limit: 10) {
        shortId,
        location {
          lattitude,
          longitude
        }
      }
      `, false, (data) => {
        const boxes = data.getClosestOrDefaultBoxes;
        this.props.updateBoxCache(boxes);

        boxes.forEach((box) => {
          this.addBoxToMap(map, box);
        });
      });
  }

  addBoxToMap (map, box) {
    const location = {
      lat: box.location.lattitude,
      lng: box.location.longitude
    };

    const marker = new google.maps.Marker({
      position: location,
      icon: 'images/icon2.png',
      map: map,
      title: 'Box Name'
    });

    const circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      radius: Math.sqrt(50) * 10
    });

    marker.addListener('click', () => {
      map.setZoom(15);
      map.setCenter(marker.getPosition());
      this.props.showBoxModal(box);
    });

    circle.bindTo('center', marker, 'position');
  }

  render () {
    return (
      <div className='container'>
        <div id='map' />
      </div>
    );
  }
}
