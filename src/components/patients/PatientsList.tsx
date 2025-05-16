import React, { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import { patients } from '../../data/mockData';
import { Patient } from '../../types';

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-24'
    },
    {
      header: 'Name',
      accessor: 'name',
      render: (name: string, patient: Patient) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">
            {patient.gender}, {patient.age} years
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'contactNumber',
      render: (phone: string, patient: Patient) => (
        <div>
          <div className="text-gray-900">{phone}</div>
          <div className="text-xs text-gray-500">{patient.email}</div>
        </div>
      )
    },
    {
      header: 'Medical History',
      accessor: 'medicalHistory',
      render: (history: string[]) => (
        <div className="flex flex-wrap gap-1">
          {history.map((condition, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
            >
              {condition}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Appointments',
      accessor: 'upcomingAppointments',
      render: (appointments: any[]) => (
        <div>
          <span className="text-gray-900">{appointments.length} upcoming</span>
        </div>
      )
    }
  ];

  return (
    <Card title="Patients">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            icon={<Filter size={18} />}
          >
            Filter
          </Button>
          <Button 
            variant="primary" 
            icon={<UserPlus size={18} />}
          >
            Add Patient
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredPatients}
        onRowClick={(patient) => console.log('Patient clicked:', patient)}
        emptyMessage={
          searchTerm 
            ? `No patients found matching "${searchTerm}"` 
            : 'No patients available'
        }
      />
    </Card>
  );
};

export default PatientsList;