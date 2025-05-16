import React from 'react';
import DoctorsList from '../components/doctors/DoctorsList';
import DoctorDetail from '../components/doctors/DoctorDetail';
import { doctors } from '../data/mockData';

const Doctors: React.FC = () => {
  // In a real application, you would use state or a router to determine which doctor to show
  // For demonstration, we'll show the first doctor's details
  const selectedDoctor = doctors[0];

  return (
    <div className="space-y-6">
      <DoctorsList />
      <DoctorDetail doctor={selectedDoctor} />
    </div>
  );
};

export default Doctors;