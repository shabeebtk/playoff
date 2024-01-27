import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import GameDetails from "../../components/user/gameDetails";

function GameDetailsPage() {
    return (
        <>
            <Navbar page='play' />
            <GameDetails/>
            {/* <Footer/> */}
        </> 
    )
}

export default GameDetailsPage;