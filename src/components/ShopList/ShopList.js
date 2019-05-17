import React, { Component } from 'react';
import './ShopList.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class ShopList extends React.Component {

  state = {
    shops: []
  };

  onCurrentLocationHandler = () => {
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
        <Button variant="contained" color="primary" id="text-button" onClick={() => this.onCurrentLocationHandler()}>
          現在地を取得する
        </Button>
        <div id="view">
          {
            // console.log(this.state.shops)
            this.state.shops.map((shop, index) => {
              // console.log(shop);
              return (
                  <div key={index}>
                    <Card class="card">
                      <a href={shop.url} target="_blank">
                        <CardActionArea class="card-area">
                          <CardMedia class="card-media">
                            <img src={shop.image_url.shop_image1} class="shop-image" alt=""/>
                          </CardMedia>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              <ul>
                                <li>{shop.name}</li>
                                <li>TEL:{shop.tel}</li>
                                <li>{shop.address}</li>
                              </ul>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </a>
                    </Card>
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