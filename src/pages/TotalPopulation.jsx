import React from 'react';
import Navbar from '../components/Navbar';
import TotalListIOfPopulation from '../components/TotalListIOfPopulation';

function TotalPopulation() {
  // Sample data - in a real application, this would come from an API or context
  const samplePopulationData = [
    {
      name: "Dela Cruz, Juan",
      birthdate: "11/06/1993",
      age: 31,
      gender: "Male",
      healthCondition: "None",
      barangay: "Caculajan",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juana",
      birthdate: "06/27/2000",
      age: 25,
      gender: "Female",
      healthCondition: "PWD",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juan",
      birthdate: "09/15/1998",
      age: 26,
      gender: "Male",
      healthCondition: "Asthma",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juana",
      birthdate: "12/08/1995",
      age: 29,
      gender: "Female",
      healthCondition: "Diabetes",
      barangay: "Caculajan",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juan",
      birthdate: "10/10/2001",
      age: 23,
      gender: "Male",
      healthCondition: "Arthritis",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juana",
      birthdate: "08/10/1999",
      age: 25,
      gender: "Female",
      healthCondition: "None",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juan",
      birthdate: "05/21/2002",
      age: 23,
      gender: "Male",
      healthCondition: "Arthritis",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juana",
      birthdate: "07/19/1997",
      age: 27,
      gender: "Female",
      healthCondition: "None",
      barangay: "Caculajan",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juan",
      birthdate: "04/23/1998",
      age: 25,
      gender: "Male",
      healthCondition: "PWD",
      barangay: "Caculajan",
      onViewProfile: (person) => console.log("View profile of", person.name)
    },
    {
      name: "Dela Cruz, Juana",
      birthdate: "07/29/1996",
      age: 27,
      gender: "Female",
      healthCondition: "Diabetes",
      barangay: "San Jose Anyao",
      onViewProfile: (person) => console.log("View profile of", person.name)
    }
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <TotalListIOfPopulation populationData={samplePopulationData} />
      </div>
    </div>
  );
}

export default TotalPopulation;
