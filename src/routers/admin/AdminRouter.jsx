import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import AdminHomePage from '../../pages/admin/AdminHomePage';
import ManageUsersPage from '../../pages/admin/ManageUsersPage';
import VenueRequestPage from '../../pages/admin/VenueRequestPage';
import ViewVenueRequest from '../../pages/admin/manage_venue_requests/ViewVenueRequest';
import ManageVenues from '../../pages/admin/ManageVenues';


function AdminRouter() {

  return (
    <Routes>
      <Route path='/' element={<AdminHomePage />}></Route>
      <Route path='/login' element={<AdminLoginPage />}></Route>
      <Route path='/users' element={<ManageUsersPage />}></Route>
      <Route path='/venue_requests' element={<VenueRequestPage />}></Route>
      <Route path='/view_venue_request' element={<ViewVenueRequest />}></Route>
      <Route path='/venues' element={<ManageVenues />}></Route>
    </Routes>
  )
}

export default AdminRouter;