import axios from 'axios';
import { ACCESS_KEY } from "../config/unsplashApiConfig";
const UnsplashAPI = {
  getCityImage: async (city) => {
    console.log("encoded uri : ", encodeURI(city));
    const url = `https://api.unsplash.com/search/photos?query=${encodeURI(city)}&client_id=${ACCESS_KEY}&page=1&per_page=10`;
    try {
    const imageData = [];
     await axios({
        method: "GET",
        url: url,
      }).then((response) => {
        // console.log("Response: ", response);
        console.log("Getting Image Data ...")
        for(images of response.data.results){
          var imgUrl = images.urls.regular;
          var imgDescription = images.description;
          var userName = images.user.name;
          imageData.push({imgUrl, imgDescription, userName});
          // console.log("Image Data: ", imageData);
        }
      });
      return imageData;
    } catch (error) {
      console.log(error);
    }
  },


};

export default UnsplashAPI;