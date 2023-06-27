import React from 'react';
import ShimmerImg from "./ShimmerImg.jpeg";


const Shimmer = () => {
  return (
    <>
    <div className='img-container'>
    <img src={ShimmerImg} className="img-shimmer" alt="Shimmer Image"/>
    </div>
    </>
  )
}

export default Shimmer;