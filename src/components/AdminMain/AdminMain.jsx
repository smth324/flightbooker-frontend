import React, { useLayoutEffect, useEffect } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import routesReducer, { initializeRoutes } from '../../reducers/routesReducer'
import placesReducer, { initializePlaces } from '../../reducers/placesReducer'
import planeModelsReducer, { initializePlaneModels } from '../../reducers/planeModelsReducer'
import flightReducer, { initializeFlights } from '../../reducers/flightReducer'
import planesReducer, { initializePlanes } from '../../reducers/planesReducer'
import bookingReducer, { initializeBookings } from '../../reducers/bookingsReducer'
import { initializeAdmin } from '../../reducers/adminReducer'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import LoginForm from './LoginForm'
import RoutesPage from './RoutesPage'
import PlanesPage from './PlanesPage'
import PlacesPage from './PlacesPage'
import PlaneModelsPage from './PlaneModelsPage'
import SinglePlaneModelsPage from './SinglePlaneModelsPage'
import FlightsPage from './FlightsPage'
import BookingsPage from './BookingsPage'
import store from '../../store'
import customersReducer, { initializeCustomers } from '../../reducers/customersReducer'
import CustomersPage from './CustomersPage'
import SingleBookingPage from './SingleBookingPage'
import FlightMapPage from './FlightMapPage'
import './AdminMain.css'
import PromotionsPage from './PromotionsPage'
import promotionsReducer, { initializePromotions } from '../../reducers/promotionsReducer'

const Admin = () => {
  const routes = useSelector((state) => state.routes)
  const places = useSelector((state) => state.places)
  const planeModels = useSelector((state) => state.planeModels)
  const planes = useSelector((state) => state.planes)
  const flights = useSelector((state) => state.flights)
  const bookings = useSelector((state) => state.bookings)
  const customers = useSelector((state) => state.customers)
  const promotions = useSelector((state) => state.promotions)

  const dispatch = useDispatch()

  const routematch = useMatch('/admin/routes/:id')
  const planeModelMatch = useMatch('/admin/planeModels/:id')
  const bookingMatch = useMatch('/admin/bookings/:id')

  const routeToView = routematch
    ? routes.find((x) => x.id === parseInt(routematch.params.id, 10))
    : null

  const planeModelToView = planeModelMatch
    ? planeModels.find((x) => x.id === parseInt(planeModelMatch.params.id, 10))
    : null

  const bookingToView = bookingMatch
    ? bookings.find((x) => x.id === parseInt(bookingMatch.params.id, 10))
    : null

  useEffect(() => {
    dispatch(initializeRoutes())
    dispatch(initializePlaces())
    dispatch(initializePlaneModels())
    dispatch(initializePlanes())
    dispatch(initializeFlights())
    dispatch(initializeBookings())
    dispatch(initializeCustomers())
    dispatch(initializePromotions())
  }, [])
  return (
    <div className="admin-app">
      <AdminSidebar />
      <section className="admin-app-main" draggable={false}>
        <AdminHeader />
        <Routes>
          <Route path="/routes/:id" element={<div>{routeToView ? routeToView.id : null}</div>} />
          <Route path="/planeModels/:id" element={<SinglePlaneModelsPage planeModel={planeModelToView} />} />
          <Route path="/bookings/:id" element={<SingleBookingPage booking={bookingToView} />} />
          <Route path="/routes" element={<RoutesPage routes={routes} places={places} />} />
          <Route path="/planes" element={<PlanesPage planes={planes} planeModels={planeModels} />} />
          <Route path="/places" element={<PlacesPage places={places} />} />
          <Route path="/planeModels" element={<PlaneModelsPage planeModels={planeModels} />} />
          <Route path="/flights" element={<FlightsPage flights={flights} routes={routes} planes={planes} />} />
          <Route path="/bookings" element={<BookingsPage bookings={bookings} flights={flights} />} />
          <Route path="/customers" element={<CustomersPage customers={customers} />} />
          <Route path="/promotions" element={<PromotionsPage promotions={promotions} />} />
          <Route path="/flightmap" element={<FlightMapPage flights={flights} />} />
        </Routes>
      </section>
    </div>
  )
}

const AdminMain = () => {
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.admin)

  useLayoutEffect(() => {
    store.injectReducer('flights', flightReducer)
    store.injectReducer('routes', routesReducer)
    store.injectReducer('planes', planesReducer)
    store.injectReducer('places', placesReducer)
    store.injectReducer('planeModels', planeModelsReducer)
    store.injectReducer('bookings', bookingReducer)
    store.injectReducer('customers', customersReducer)
    store.injectReducer('promotions', promotionsReducer)
    dispatch(initializeAdmin())
  }, [])

  return (
    <div className="checklogin" style={{ display: 'none' }}>
      {admin === null
        ? <LoginForm />
        : <Admin /> }
    </div>
  )
}

export default AdminMain
