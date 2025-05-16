import React from 'react';
import PatientsList from '../components/patients/PatientsList';
import PatientDetail from '../components/patients/PatientDetail';
import { patients } from '../data/mockData';

const Patients: React.FC = () => {
  // In a real application, you would use state or a router to determine which patient to show
  // For demonstration, we'll show the first patient's details
  const selectedPatient = patients[0];

  return (
    <div className="space-y-6">
      <PatientsList />
      <PatientDetail patient={selectedPatient} />
    </div>
  );
};

export default Patients;