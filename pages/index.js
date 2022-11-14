import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import useSWR from 'swr'

const Map = dynamic(() => import('../components/Map/Map'), {
  ssr: false
})

const MarkerBox = dynamic(() => import('../components/Map/MarkerBox'), {
  ssr: false
})

const SelectStop = dynamic(() => import('../components/SelectStop/index'), {
  ssr: false
})

const fetcher = url => fetch(url).then(r => r.json())

const DEFAULT_CENTER = [52.204327, 20.880357]

export default function Home() {
  const [pickedLine, setPickedLine] = useState({type: 'bus', number: "177"})
  const { data, error } = useSWR(pickedLine ? '/api/get/position/'+pickedLine.type+'/'+pickedLine.number : null, fetcher)

  if(error) return "error"

  const handleSelect = selected => {
    setPickedLine(selected)
  }
  
  return (
    <div className="min-h-screen min-w-screen relative">
      <Head>
        <title>Warsaw Bus App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='absolute right-0 top-0 z-50 w-1/4 p-2'>
        <SelectStop handleSelect={handleSelect} pickedLine={pickedLine} />
      </div>

      <Map className="z-0 min-h-screen min-w-screen absolute top-0 left-0" center={DEFAULT_CENTER} zoom={12}>
        {
          data && data.result ? data.result.map(item => {
            return(
              <MarkerBox 
                key={item.VehicleNumber} 
                position={[item.Lat, item.Lon]} 
                busId={item.VehicleNumber}
                date={item.Time}
                type={pickedLine.type}
              />
            )
          }) : ""
        }
      </Map>
    </div>
  )
}
