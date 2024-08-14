import React from 'react';

import AdminEventComponent from "./AdminEventComponent";
import AdminCharityComponent from "./AdminCharityComponent";
import AdminBookingComponent from "./AdminBookingComponent";
import AdminCommitteeComponent from "./AdminCommitteeComponent";
import AdminContactUsComponent from "./AdminContacUsComponent";
import AdminAboutUsComponent from "./AdminAboutUsComponent";
export default function AdminHome(){
return (
 <div>
      <section id="adminhero"><AdminComponent /></section>
      <section id="adminevent"><AdminEventComponent /></section>
      <section id="admincharity"><AdminCharityComponent /></section>
      <section id="adminbooking"><AdminBookingComponent /></section>
      <section id="admincommittee"><AdminCommitteeComponent /></section>
      <section id="admincontact"><AdminContactUsComponent /></section>
      <section id="adminabout"><AdminAboutUsComponent /></section>
     
  </div>
);
}