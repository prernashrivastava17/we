import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search For Your Best Experience ' subtitle='Find new & featured services located in your local city.' />

          <form className='flex'>
            {/* <div className='box'>
              <span>Location</span>
              <input type='text' placeholder='Enter Location' />
            </div>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Enter Area' />
            </div> */}
            <div className='box'>
              {/* <span>Category</span> */}
              <input type='text' placeholder='Search Shops Here...' />
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
