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

    const params = { keyid: process.env.REACT_APP_API_KEY,
                     category_l: "RSFST09000",
                     address: "東京都",
                     until_morning: 1,
                     hit_per_page: 10
                   };
    axios.get(process.env.REACT_APP_API_URL, {params})
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
        <header>
          <h1>ぐる飲み！</h1>
          <h3>〜現在地から朝まで飲めるお店を探そう！〜</h3>
          <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">
            <img src="https://api.gnavi.co.jp/api/img/credit/api_265_65.gif"
                 width="265"
                 height="65"
                 border="0"
                 alt="グルメ情報検索サイト　ぐるなび"
            />
          </a>
        </header>
        <ShopList pancakes={this.state.pancakes} lat={this.state.lat} long={this.state.long}/>
      </div>
    );
  }
}
export default App;
