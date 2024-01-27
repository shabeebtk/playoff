import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AllGames from "../../components/user/AllGames";

function AllGamesPage() {
    return (
        <>
            <Navbar page='play' />
            <AllGames/>
        </> 
    )
}

export default AllGamesPage;