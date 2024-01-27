import React from "react"
import { Link } from "react-router-dom";

function Banner(props) {

    const banner_image = {
        background: `url(${props.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor : 'white'
    }
    
    return (
        <div className="md:h-[90vh] " style={banner_image}>
            <div className={`md:h-[90vh] h-[30vh] bg-black bg-opacity-50 flex items-center px-[3.5%] ${ props.right ? 'justify-end' : '' }`}>
                <div>
                    <p className="text-white md:text-2xl text-xs w-[80%]">
                        {props.paragraph}
                    </p>
                    <h1 className="text-white md:text-6xl font-bold">{props.heading}</h1>
                    <Link to={props.linkTo}><button className="text-white bg-[#4caf50] hover:bg-[#2c6b2e] shadow-xl font-medium rounded-sm md:rounded-md text-xs md:text-sm md:px-5 md:py-2.5 me-2 mb-2 mt-3 px-2 py-1">{props.button}</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Banner;
