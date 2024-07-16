import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UseSelectedSnapDisplayType = {
  selectedSnap: number
  snapCount: number
}
type UseSelectedSnapDisplayType2 = {
  selectedSnap: number
  snapCount: number
}

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount
  }
}

type PropType = {
  selectedSnap: number
  snapCount: number
}

export const SelectedSnapDisplay: React.FC<PropType> = (props) => {
  const { selectedSnap, snapCount } = props

  return (
    <div className="embla__selected-snap-display">
      {selectedSnap + 1} / {snapCount}
    </div>
  )
}

// export const useSelectedSnapDisplay2 = (
//   emblaApi2: EmblaCarouselType | undefined
// ): UseSelectedSnapDisplayType2 => {
//   const [selectedSnap2, setSelectedSnap2] = useState(0)
//   const [snapCount2, setSnapCount2] = useState(0)

//   const updateScrollSnapState2 = useCallback((emblaApi2: EmblaCarouselType) => {
//     setSnapCount2(emblaApi2.scrollSnapList().length)
//     setSelectedSnap2(emblaApi2.selectedScrollSnap())
//   }, [])

//   useEffect(() => {
//     if (!emblaApi2) return

//     updateScrollSnapState2(emblaApi2)
//     emblaApi2.on('select', updateScrollSnapState2)
//     emblaApi2.on('reInit', updateScrollSnapState2)
//   }, [emblaApi2, updateScrollSnapState2])

//   return {
//     selectedSnap2,
//     snapCount2
//   }
// }