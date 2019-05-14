import React from 'react';
import axios from 'axios';
import './App.css';
import ShopList from './components/ShopList/ShopList';
import Search from './components/Search/Search';

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
                     hit_per_page: 10
                   };
    axios.get('https://api.gnavi.co.jp/RestSearchAPI/v3/', {params})
         .then(response => {
           this.setState({ pancakes: response.data.rest });
           // console.log(this.state.pancakes);
         });
  }

  render() {

    navigator.geolocation.getCurrentPosition(
      pos => this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude}),
      err => console.log(err)
    );

    return (
      <div className="App">
        <ShopList pancakes={this.state.pancakes} lat={this.state.lat} long={this.state.long}/>
        <div>Latitude: {this.state.lat}</div>
        <div>longitude: {this.state.long}</div>
      </div>
    );
  }
}
export default App;
