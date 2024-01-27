import SideBar from "./SideBar";

function Dashboard() {
    return (
        <div className="px-[3%] mt-6 md:flex gap-5">

            <div className="flex items-start">
                <SideBar sidebar='dashboard' />
            </div>

            <div className="border w-full p-5">
                <h1>dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard;