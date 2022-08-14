import React, { useState, useEffect } from 'react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Radio } from '@mui/material'
import { images } from '../../../../helpers/carouselData'
import './ImageCarousel.css'

let intervalId = 0
const ImageCarousel = () => {
  const [currentImg, setCurrentImg] = useState(0)

  const handleForwards = () => {
    if (currentImg < images.length - 1) {
      setCurrentImg(currentImg + 1)
    } else {
      setCurrentImg(0)
    }
  }

  const handleBackwards = () => {
    if (currentImg > 0) {
      setCurrentImg(currentImg - 1)
    } else {
      setCurrentImg(images.length - 1)
    }
  }

  clearInterval(intervalId)
  // changes the carousel to move every 10s
  intervalId = setInterval(() => {
    handleForwards()
  }, 10000)

  useEffect(() => () => {
    clearInterval(intervalId)
  }, [])

  return (
    <div className="carousel">
      <div className="carouselInner" style={{ backgroundImage: `url(${images[currentImg].img})` }}>
        <div className="left" role="button" tabIndex={0} onKeyDown={handleBackwards} onClick={handleBackwards}>
          <ArrowBackIos />
        </div>
        <div className="center">
          <div>
            <Radio
              checked={currentImg === 0}
              onChange={() => setCurrentImg(0)}
              value={0}
              inputProps={{ 'aria-label': 0 }}
            />
            <Radio
              checked={currentImg === 1}
              onChange={() => setCurrentImg(1)}
              value={1}
              inputProps={{ 'aria-label': 1 }}
            />
            <Radio
              checked={currentImg === 2}
              onChange={() => setCurrentImg(2)}
              value={0}
              inputProps={{ 'aria-label': 2 }}
            />
            <Radio
              checked={currentImg === 3}
              onChange={() => setCurrentImg(3)}
              value={1}
              inputProps={{ 'aria-label': 3 }}
            />
          </div>
        </div>
        <div className="right" role="button" tabIndex={0} onKeyDown={handleForwards} onClick={handleForwards}>
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
