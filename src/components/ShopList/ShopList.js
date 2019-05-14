import React, { Component } from 'react';

class ShopList extends React.Component {

  state = {
    shops: []
  };

  onInputChangeHandler = () => {
    let list = [];
    const A = this.props.pancakes.map((pancake) => {
      const lat = this.props.lat;
      const long = this.props.long;
      const lat2 = pancake.latitude;
      const long2 = pancake.longitude;
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

      if(getDistance(lat,long,lat2,long2) < 5) {
        list.push(pancake);
      }
      this.setState({
        shops: list
      });
   })
  }

  render(){
    return(
      <div>
        <button id="text-button" onClick={() => this.onInputChangeHandler()}>現在地を取得する</button>
        <div id="view">
          {
            // console.log(this.state.shops)
            this.state.shops.map((shop, index) => {
              // console.log(shop);
              return (
                <div key={index}>
                  <li key={index}>{shop.name}</li>
                  <img src={shop.image_url.shop_image1} alt=""/>
                </div>
              )

            })
          }
        </div>
      </div>
    )
  };
}

export default ShopList;