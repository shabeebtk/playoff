import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AlertModal from "../popup_modal/AlertModal";

function AllVenuesTable() {
    const [allVenues, setallVenues] = useState([])
    const navigate = useNavigate()
    const [veneuUpdated, setVenueUpdated] = useState(false)

    const updateUser = ()=>{
        setVenueUpdated(!veneuUpdated)
    }

    useEffect(() => {
        const jwttoken = Cookies.get('adminjwt')
        axios.get(`${BaseUrl}app_admin/venues`, {
            headers: {
                Authorization: `${jwttoken}`
            }
        })
            .then((response) => {
                setallVenues(response.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/admin/login')
            })
    }, [veneuUpdated])

    console.log(allVenues)
    return (
        <div className="relative overflow-x-auto sm:rounded-lg px-[3%] py-4">
            <table className="w-full text-sm text-left border rtl:text-right rounded-lg">
                <thead className="border">
                    <tr className="text-dark">
                        <th scope="col" className="px-6 py-3">
                            owner
                        </th>
                        <th scope="col" className="px-6 py-3">
                            venue name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            place
                        </th>
                        <th scope="col" className="px-6 py-3">
                            phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            block/unblock
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {allVenues.map((venue, index) => (
                        <tr key={venue.id} className="bg-white border-b ">
                            <td className="px-6 py-4">
                                {venue.owner_details.owner_email}
                            </td>
                            <td className="px-6 py-4">
                                {venue.venue_name}
                            </td>
                            <td className="px-6 py-4">
                                {venue.place},{venue.city}
                            </td>
                            <td className="px-6 py-4">
                                {venue.owner_details.owner_phone}
                            </td>
                            <td className="px-6 py-4">
                                <p className="cursor-pointer font-medium text-blue-600 hover:underline">
                                    block
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );
};


export default AllVenuesTable;