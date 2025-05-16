import React from 'react';
import Stats from '../components/dashboard/Stats';
import RecentAppointments from '../components/dashboard/RecentAppointments';
import DoctorAvailability from '../components/dashboard/DoctorAvailability';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Stats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAppointments />
        <DoctorAvailability />
      </div>
    </div>
  );
};

export default Dashboard;