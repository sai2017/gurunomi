import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    state = {
      pancakes: [],
      // 現在の緯度
      lat: null,
      // 現在の経度
      long: null
    }


  componentDidMount() {

    const params = { keyid: "222a7aadbbfa9f1a07b6c45cef4863b9",
                     category_l: "RSFST09000",
                     address: "東京都",
                     until_morning: 1,
                     hit_per_page: 100
                   };
    axios.get('https://api.gnavi.co.jp/RestSearchAPI/v3/', {params})
         .then(response => {
           this.setState({ pancakes: response.data.rest });
           console.log(this.state.pancakes);
         });
  }

  render() {

    const Pancakes = this.state.pancakes.map((pancake) => {
      const lat = this.state.lat;
      // console.log(this.state.lat);
      const long = this.state.long;
      // console.log(this.state.long);
      const lat2 = pancake.latitude;
      // console.log(pancake.latitude);
      const long2 = pancake.longitude;
      // console.log(pancake.longitude);
      function getDistance(lat, long, lat2, long2) {

           function radians(deg){
              return deg * Math.PI / 180;
           }

           return 6378.14 * Math.acos(Math.cos(radians(lat))*
            Math.cos(radians(lat2))*
            Math.cos(radians(long2)-radians(long))+
            Math.sin(radians(lat))*
            Math.sin(radians(lat2)));
      };

      // console.log(getDistance(lat,long,lat2,long2));

        // 現在地との距離が1km以下の店舗を表示
        if(getDistance(lat,long,lat2,long2) < 10) {
          return <li key={pancake.id}><img src={pancake.image_url.shop_image1} alt=""/>{pancake.latitude}, {pancake.longitude}{pancake.name}{getDistance(lat,long,lat2,long2)}</li>;
        }
    });

    navigator.geolocation.getCurrentPosition(
      pos => this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude}),
      err => console.log(err)
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>


          <p>{ Pancakes }</p>
          <div>Latitude: {this.state.lat}</div>
          <div>longitude: {this.state.long}</div>
        </header>
      </div>
    );
  }
}
export default App;
