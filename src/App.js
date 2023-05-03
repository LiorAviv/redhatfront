import './App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import 'leaflet.offline';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: [{ id: 1, lat: 31.4117, lon: 35.0818 }, { id: 2, lat: 31.2799, lon: 37.1297 }] };
    this.loadData = this.loadData.bind(this);
  }


  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 2000);
  }

  async loadData() {

    try {
      const res = await fetch('http://10.0.0.192:8000/getlocations');
      const locations = await res.json();
      this.setState({
        locations: locations.locations
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className="App">
        <div id="map-id">
          <MapContainer center={[31.4117, 35.0818]} zoom={15} maxZoom={30} id="map">
            <TileLayer
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"


            />
            {this.state.locations.map(mark => (
              <Marker key={mark.id} position={[mark.lat, mark.lon]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                <Popup>
                  lat: {mark.lat} <br /> lon: {mark.lon}
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>

      </div>

    )
  }
}

export default App;
