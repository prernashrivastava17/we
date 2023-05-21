import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import FeaturedCard from "../home/featured/FeaturedCard"
import TopHeader from "../user/TopHeader"
import Footer from "../common/footer/Footer"
import ShopCard from "../user/ShopCard"

const Services = () => {
  return (
    <>
    <TopHeader />
      <section className='services mb'>
        <Back name='Shops' title='Shops - All Shops' cover={img} />
        <div className='featured container'>
          {/* <FeaturedCard /> */}
        </div>
      </section>
      <ShopCard />
      <Footer />
    </>
  )
}

export default Services
