import UnspalshAPI, { getCityImage } from '../services/unsplashAPI';

export default class UnsplashAPIController {
  static async getCityImage(cities) {
    console.log('inside controller');
    console.log('getting image for cities:', cities);
    //   for (let city of cities) {
    //     console.log(' city:', city);
    //     const response = await getCityImage(city);
    //     return response;
    //   }
    // }
    const response = await UnspalshAPI.getCityImage(cities[0]);
    console.log("response: from api ->", response);
    return response;
  }
}