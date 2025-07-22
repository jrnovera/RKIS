import React from 'react';
import TotalListIOfPopulation from './TotalListIOfPopulation';

function TotalListIOfPopulationExample() {
  // Sample data that matches the structure shown in the image
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
    }
  ];

  return (
    <div>
      {/* Pass the sample data as props to the TotalListIOfPopulation component */}
      <TotalListIOfPopulation populationData={samplePopulationData} />
    </div>
  );
}

export default TotalListIOfPopulationExample;
