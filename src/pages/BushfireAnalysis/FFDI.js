

/**
     * return forecasted bushfire ratings based on climate input
     * @param   {number} temp               Temperature value of date X
     * @param   {object} climate            props with key value {Humidity,Windspeed}
     * @param   {number} climate.humidity   Humidity value of date X
     * @param   {number} climate.windspeed  Windspeed value of date X
     * @return  {number}                    Forecasted Bushfire Rating
     */  

    export const FFDI = (temp, climate, droughtFactor) => {
        let defaultHumidity = 40;
        let defaultWindspeed = 40;
        let constant = -0.45;
        let drought = 0.987 * Math.log(parseInt(droughtFactor ? droughtFactor : 0));
        let humidity = climate ? 0.0345 * climate['humidity'] : 0.0345 * (parseInt(defaultHumidity));
        let temperature = 0.0338 * (temp);
        let windspeed = climate ? 0.0234 * climate['windspeed'] : 0.0234 * (parseInt(defaultWindspeed));
        let exponential = (constant + drought - humidity + temperature + windspeed)
        let ratings = 2 * Math.exp(exponential)
        
        
        if (ratings<1){
          return 1
        }
        else if (ratings>150) {
          return 150
        }
        else{
          return Math.floor(ratings * 100) / 100
        }
      }