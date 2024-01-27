import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../instance/endpoints/user/userEndpoints"
import toast from "react-hot-toast"
import ButtonLoader from "../loader/ButtonLoader"
import { userUpdate } from "../../redux/action/userAuthAction"
import { MdCancel } from "react-icons/md";
import ChangeEmailModal from "../popup_modal/ChangeEmailModal"
import ChangePasswordModal from "../popup_modal/ChangePasswordModal"
import userAxiosInstance from "../../instance/axios/UserAxiosInstance"

function UserPersonalDetails() {

    const user = useSelector(state => state.userAuth.user)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const successToast = (message) => toast.success(message)
    const errorToast = (message) => toast.error(message)
    const [btnLoader, setBtnLoader] = useState(false)
    const [refresh, setDefault] = useState(true)

    console.log(refresh)

    useEffect(() => {
        setEmail(user.email);
    }, [user])

    const handleEdit = () => {
        setBtnLoader(true)
        if (firstName == user.first_name && lastName == user.last_name && phone == user.phone) {
            successToast('no changes detected')
            setBtnLoader(false)
            return
        }
        userAxiosInstance.post('user/update', {
            first_name: firstName,
            last_name: lastName,
            phone: phone
        })
            .then((response) => {
                console.log(response)
                dispatch(userUpdate(response.data))
                successToast('user updated successfully')
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status == 409) {
                    errorToast('phone already exists')
                }
                else {
                    errorToast('failed to update the user')
                }
            })
            .finally(() => {
                setBtnLoader(false)
            })
    }

    const handleUserUpdate = () => {
        setDefault(!refresh)
    }

    return (
        <>
            <div className="h-screen flex justify-center pt-[15vh]">
                <div className="md:w-[70%] w-[95%] border p-4 ">
                    <div className="flex gap-5">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none appearance-none "
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                first name
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none appearance-none "
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                last name
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            disabled
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none appearance-none "
                            placeholder=" "
                        />

                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                        <div className="flex justify-end">
                            <ChangeEmailModal update={() => handleUserUpdate(!refresh)} />
                        </div>
                    </div>

                    <div className="relative z-1 w-full mb-5 group">
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none appearance-none "
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            phone
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            disabled
                            value={`*********`}
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none appearance-none "
                            placeholder=" "
                        />

                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            password
                        </label>
                        <div className="flex justify-end">
                            <ChangePasswordModal email={user.email} update={() => handleUserUpdate(!refresh)} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        {
                            btnLoader ? <button className="bg-[#4caf50] rounded-md px-16 py-4 text-center"><ButtonLoader /></button>
                                :

                                <button
                                    onClick={handleEdit}
                                    type="submit"
                                    className="text-white bg-[#4caf50] hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    save changes
                                </button>

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPersonalDetails