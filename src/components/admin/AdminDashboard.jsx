import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import adminAxiosInstance from "../../instance/axios/adminAxiosInstance";
import { getDashboardDetails } from "../../instance/endpoints/admin/adminEndpoints";
import { TbSoccerField } from "react-icons/tb";
import { HiBookOpen } from "react-icons/hi2";
import { BiRupee } from "react-icons/bi";


function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null)

    useEffect(() => {
        adminAxiosInstance.get(getDashboardDetails)
            .then((response) => {
                console.log(response.data)
                setDashboard(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div classNameName="px-[3%]">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-10 px-[3%] gap-4">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <FaUsers size={25} />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{dashboard && dashboard.total_users}</span>
                        <span className="block text-gray-500">active users</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <TbSoccerField size={25} />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{dashboard && dashboard.total_venues}</span>
                        <span className="block text-gray-500">total venues</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <HiBookOpen size={25} />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{dashboard && dashboard.total_bookings}</span>
                        <span className="block text-gray-500">total bookings</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <BiRupee size={25} />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">₹{dashboard && dashboard.total_earnings}</span>
                        <span className="block text-gray-500">total earnings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;