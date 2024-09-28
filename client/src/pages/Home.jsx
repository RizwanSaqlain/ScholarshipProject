import React from 'react'


import FamilyDetails from '../components/Details/FamilyDetails'
import AddressDetails from '../components/Details/AddressDetails'
import Attachments from '../components/Details/Attachments'
import PersonalDetails from '../components/Details/PersonalDetails'



const Home = () => {
  return (
    <div>
      
    <PersonalDetails/>
    <FamilyDetails/>
    <AddressDetails/>
    <Attachments/>

    </div>
  )
}

export default Home
