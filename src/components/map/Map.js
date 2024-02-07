import React from 'react'
import Search from 'components/map/Search'
import KakaoMap from 'components/map/KakaoMap'

const Map = () => {
  return (
    <div>
      <KakaoMap/>
      <Search/>
    </div>
  )
}

export default Map