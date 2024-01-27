import { Routes, Route } from 'react-router-dom'
import OwnerHomePage from "../../pages/turf_owner/OwnerHomePage";
import OwnerLoginPage from "../../pages/turf_owner/OwnerLoginPage";
import OwnerRegisterPage from "../../pages/turf_owner/OwnerRegisterPage";
import OwnerDashboard from '../../pages/turf_owner/OnwerDashboard';
import OwnerConfirmEmailPage from '../../pages/turf_owner/OnwerConfirmEmailPage';
import AddVenuePage from '../../pages/turf_owner/AddVenuePage';
import VenuePendingPage from '../../pages/turf_owner/VenuePendingPage';
import BookingRequestPage from '../../pages/turf_owner/BookingRequestPage';
import BookingsPage from '../../pages/turf_owner/BookingsPage';
import OwnerProtectedRouter from './OwnerProtectedRouter';

function OwnerRouter(){
    return(
        <Routes>
          <Route path='/' element={<OwnerHomePage/>}></Route>
          <Route path='/login' element={<OwnerLoginPage/>}></Route>
          <Route path='/register' element={<OwnerRegisterPage/>}></Route>
          <Route path='/verify_email' element={<OwnerConfirmEmailPage/>}></Route>
          <Route path='/dashboard' element={<OwnerProtectedRouter element={OwnerDashboard} />}></Route>
          <Route path='/add_venue' element={<AddVenuePage/>}></Route>
          <Route path='/venue_requested' element={<VenuePendingPage/>}></Route>
          <Route path='/booking_requests' element={<BookingRequestPage/>}></Route>
          <Route path='/bookings' element={<BookingsPage/>}></Route>
        </Routes>
    )
}

export default OwnerRouter;