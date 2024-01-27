import { Routes, Route } from 'react-router-dom'
import HomePage from '../../pages/user/homePage'
import RegisterPage from '../../pages/user/RegisterPage'
import ConfirmEmailPage from '../../pages/user/confirmEmailPage'
import LoginPage from '../../pages/user/LoginPage'
import AllVenuesPage from '../../pages/user/AllVenuesPage'
import ForgotPasswordPage from '../../pages/user/ForgotPasswordPage'
import VenueDetailsPage from '../../pages/user/VenueDetailsPage'
import VenueBookingRequestedPage from '../../pages/user/VenueBookingRequestedPage'
import UserProfilePage from '../../pages/user/UserProfilePage'
import UserBookingPage from '../../pages/user/UserBookingsPage'
import RazorpayPage from '../../components/user/RazorpayPage'
import UserProtectedRouter from './UserProtectedRouter'
import UserPersonalDetails from '../../pages/user/UserPersonalDetailsPage'
import AllGamesPage from '../../pages/user/AllGamesPage'
import GameDetailsPage from '../../pages/user/GameDetailsPage'
import UserGamesPage from '../../pages/user/UserGamesPage'

function UserRouter(){
    return(
        <Routes>
          {/* user personal  */}
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/confirm_email' element={<ConfirmEmailPage/>}></Route>
          <Route path='/personal/details' element={<UserProtectedRouter element={UserPersonalDetails}/>}></Route>
          <Route path='/profile' element={<UserProtectedRouter element={UserProfilePage}/>}></Route>

          {/* venues and bookings  */}
          <Route path='/venues' element={<AllVenuesPage/>}></Route>
          <Route path='/forgot_password' element={<ForgotPasswordPage/>}></Route>
          <Route path='/venue_details' element={<VenueDetailsPage/>}></Route>
          <Route path='/booking_requested' element={<VenueBookingRequestedPage/>}></Route>
          <Route path='/bookings' element={<UserProtectedRouter element={UserBookingPage}/>}></Route>
          <Route path='/payment' element={<RazorpayPage/>}></Route>

          {/* player games  */}
          <Route path='/games' element={<AllGamesPage/>}></Route>
          <Route path='/game/details' element={<GameDetailsPage/>}></Route>
          <Route path='/profile/your_games' element={<UserProtectedRouter element={UserGamesPage}/>}></Route>

        </Routes>
    ) 
}

export default UserRouter;