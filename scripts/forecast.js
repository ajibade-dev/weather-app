class Forecast{
  constructor(){
    this.key = '0VGRAL38y8iTAkHyjEU40GSBEINOT9Xk';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city){
    const cityWay = await this.getCity(city);
    const weather = await this.getWeather(cityWay.Key); 

    return{
     cityWay,
     weather
    };
  } 
  async getCity(city){
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
 
     return data[0];
  } 
  async getWeather(id){
const query = `${id}?apikey=${this.key}`;

const response = await fetch(this.weatherURI + query);
const data = await response.json();

return data[0];
  }
}




