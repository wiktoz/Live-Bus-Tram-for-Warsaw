import { useEffect } from 'react'
import * as ReactLeaflet from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const MAP_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const MAP_ATTRIBUTION = '&copy; wiktoz, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const { MapContainer, TileLayer } = ReactLeaflet

const Map = ({ children, className, ...rest }) => {
  const position = [52.237049, 21.017532]
        
  return(
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="min-h-screen min-w-screen">
      <TileLayer
        url={MAP_URL}
        attribution={MAP_ATTRIBUTION}
      />
      {children}
    </MapContainer>
  )
}

export default Map;