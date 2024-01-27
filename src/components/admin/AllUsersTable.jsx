import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AlertModal from "../popup_modal/AlertModal";


function AllUsersTable() {

    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate()
    const [userUpdated, setUserUpdated] = useState(false)

    const updateUser = ()=>{
        setUserUpdated(!userUpdated)
    }

    useEffect(() => {
        const jwttoken = Cookies.get('adminjwt')
        axios.get(`${BaseUrl}app_admin/users`, {
            headers: {
                Authorization: `${jwttoken}`
            }
        })
            .then((response) => {
                setAllUsers(response.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/admin/login')
            })
    }, [userUpdated])

    return (
        <div className="relative overflow-x-auto sm:rounded-lg px-[3%] py-4">
            <table className="w-full text-sm text-left border rtl:text-right rounded-lg">
                <thead className="border">
                    <tr className="text-dark">
                        <th scope="col" className="px-6 py-3">
                            first name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            last name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
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

                    {allUsers.map((user, index) => (
                        <tr key={user.id} className="bg-white border-b ">
                            <td className="px-6 py-4">
                                {user.first_name}
                            </td>
                            <td className="px-6 py-4">
                                {user.last_name}
                            </td>
                            <td className="px-6 py-4">
                                {user.player_username}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.phone}
                            </td>
                            <td className="px-6 py-4">
                                <p className="cursor-pointer font-medium text-blue-600 hover:underline">
                                    <AlertModal btnText={ user.is_active ? 'block' : 'unblock' } user_id={user.id} updateUser={updateUser} active={user.is_active} />
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );
};


export default AllUsersTable;