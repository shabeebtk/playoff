import { useSelector } from "react-redux";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import { MdEditSquare } from "react-icons/md";
import EditProfileModal from "../popup_modal/EditProfileModal";

function UserProfile() {

    const user = useSelector(state => state.userAuth.user)

    return (
        <>
            <div className="relative flex justify-center items-center pb-5 h-[15rem]">
                {/* edit user  */}
                <div className="absolute top-1 right-2"><EditProfileModal username={user.player_username} /></div>

                {/* display user  */}
                <div className="flex flex-col items-center gap-2">
                    {
                        user.profile_img ? <img style={{ objectFit: "cover" }} className="bg-cover rounded-full h-[150px] w-[150px]" src={`${ImageUrl}${user.profile_img}`} alt="no profile" />
                            :
                            <img style={{ objectFit: "cover" }} className="rounded-full h-[150px] w-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU" alt="" />
                    }
                    <div className="flex justify-center items-center gap-2">
                        <h2 className="text-xl font-bold">{user.player_username}</h2>
                        <button disabled className="px-2 text-xs py-2 text-white bg-[#4caf50]">{user.skill_level}</button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default UserProfile;