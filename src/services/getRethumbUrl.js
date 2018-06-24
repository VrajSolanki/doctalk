import {THUMB_URL_CUSTOM} from 'store/static'

export const getRethumbUrl = (width, height, imageUrl, widthScaleFactor, heightScaleFactor,fitIn=false) => {

  const finalWidth = Math.round(widthScaleFactor*width)
  const finalHeight = Math.round(heightScaleFactor*height)  
  if(fitIn){
    return `${THUMB_URL_CUSTOM}fit-in/${finalWidth}x${finalHeight}/${imageUrl}`  
  }
  else{
    return `${THUMB_URL_CUSTOM}${finalWidth}x${finalHeight}/${imageUrl}`
  }

};
