import React, { Component } from "react";
import "./App.css";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }

  componentDidMount() {
    const { zip, name } = this.props;
    const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=6d532ee533971e2453b7a114726bcc99`;
    fetch(URL)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        this.setState({ weatherData: json });
      });
  }
  render() {
    const { weatherData } = this.state;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather;
    console.log("weather", weather);
    const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png";
    return <h1>Посмотрим на погоду for в городе {this.props.name}</h1>;
  }
}

//not at all
class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </button>
        ))}
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} name={PLACES[activePlace].name} />
      </div>
    );
  }
}

export default App;
