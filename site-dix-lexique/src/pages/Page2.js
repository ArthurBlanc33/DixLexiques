import React from "react";
import Navigation from "../components/Navigation/Navigation";
import './Page2.css'

import Footer from "../components/Footer/Footer";
import TheTest from "../components/TheTest/TheTest";
import MemoryLettersTest from "../components/MemoryTest/MemoryLettersTest";

function Page2(){

    const backTopPage = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return(
        <div>
            
            <Navigation> </Navigation>


            <TheTest></TheTest>

            <Footer></Footer>

        </div>
    )
}export default Page2;