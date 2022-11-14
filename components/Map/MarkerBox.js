import * as ReactLeaflet from 'react-leaflet'
import Icon from './Icon'
import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'

const { Marker, Popup } = ReactLeaflet

const MarkerBox = ({position, busId, date, type}) => {  

  const icon = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon type={type}/>)    
  })

  const parseDate = (date) => {
    return ((Date.now() - Date.parse(date)) / 1000).toFixed(0)
  }

  return(
    <>
    { parseDate(date) < 1000 &&
      <Marker position={position} icon={icon}>
        <Popup>
          <p className='font-semibold text-sm'>
            <span className='text-xs font-normal'>vehicle number</span> {busId}
          </p>
          <p className='text-xs'>
            {parseDate(date)}s ago
          </p>
        </Popup>
      </Marker>
    }
    </>
  )
}

export default MarkerBox