import React from "react";
import Footer from "../common/footer/Footer";
import ShopCard from "../user/ShopCard";
import TopHeader from "../user/TopHeader";
import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Heading from "../common/Heading";

const Home = () => {
  return (
    <>
      <TopHeader />
      <Hero />
      <Featured />
      <Heading title='Featured Shops' subtitle='Find All Shops Here...' />
      <ShopCard />
      <Awards />
      {/* <Location /> */}
      <Footer />
    </>
  );
};

export default Home;
