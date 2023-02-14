import React, { useCallback, useState } from 'react'
import { OffVolume, PauseVideo, PlayVideo } from '../../../Icons/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AppContext } from '../../../context/app.context'

export default function ButtonPlayVideo({ videoRef }) {
  const { isPlaying, setIsPlaying } = useContext(AppContext)
  console.log(10, isPlaying)

  const playVideo = () => {
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying((currentPlayStatus) => !currentPlayStatus)
  }
  return (
    <div className='h-[40px] w-[40px] bg-transparent'>
      <button onClick={playVideo}>
        {
          <FontAwesomeIcon
            style={{ width: '20px', height: '20px', color: '#fff' }}
            icon={isPlaying ? faPause : faPlay}
          />
        }
      </button>
    </div>
  )
}
