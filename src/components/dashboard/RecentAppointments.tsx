import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import { appointments, patients, doctors } from '../../data/mockData';
import { Appointment } from '../../types';
import { Calendar, ChevronRight } from 'lucide-react';

const RecentAppointments: React.FC = () => {
  // Get the most recent appointments (limit to 5)
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get patient and doctor names for each appointment
  const appointmentsWithNames = recentAppointments.map(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return {
      ...appointment,
      patientName: patient ? patient.name : 'Unknown Patient',
      doctorName: doctor ? doctor.name : 'Unknown Doctor',
      doctorSpecialization: doctor ? doctor.specialization : 'Unknown'
    };
  });

  const columns = [
    {
      header: 'Date & Time',
      accessor: 'date',
      render: (date: string, row: Appointment & { time: string }) => (
        <div className="flex items-center">
          <span className="mr-2 text-[#4A90E2]"><Calendar size={16} /></span>
          <div>
            <div className="font-medium text-gray-900">
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-xs text-gray-500">{row.time}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Patient',
      accessor: 'patientName',
      render: (name: string) => (
        <div className="font-medium text-gray-900">{name}</div>
      )
    },
    {
      header: 'Doctor',
      accessor: 'doctorName',
      render: (name: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{row.doctorSpecialization}</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
          status === 'completed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    {
      header: '',
      accessor: 'id',
      render: () => (
        <ChevronRight size={16} className="text-gray-400" />
      ),
      className: 'w-10'
    }
  ];

  return (
    <Card title="Recent Appointments" className="mb-6">
      <Table
        columns={columns}
        data={appointmentsWithNames}
        onRowClick={(row) => console.log('Appointment clicked:', row)}
      />
      <div className="mt-4 text-right">
        <Button variant="outline" size="sm">
          View All Appointments
        </Button>
      </div>
    </Card>
  );
};

export default RecentAppointments;