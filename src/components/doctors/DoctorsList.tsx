import React, { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import { doctors } from '../../data/mockData';
import { Doctor } from '../../types';

const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
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
      render: (name: string) => (
        <div className="font-medium text-gray-900">{name}</div>
      )
    },
    {
      header: 'Specialization',
      accessor: 'specialization',
      render: (specialization: string) => (
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
          {specialization}
        </span>
      )
    },
    {
      header: 'Contact',
      accessor: 'contactNumber',
      render: (phone: string, doctor: Doctor) => (
        <div>
          <div className="text-gray-900">{phone}</div>
          <div className="text-xs text-gray-500">{doctor.email}</div>
        </div>
      )
    },
    {
      header: 'Patients',
      accessor: 'patients',
      render: (patients: string[]) => (
        <div className="text-gray-900">{patients.length} assigned</div>
      )
    },
    {
      header: 'Weekly Hours',
      accessor: 'availability',
      render: (availability: any) => {
        // Calculate total weekly hours
        let totalMinutes = 0;
        
        Object.keys(availability).forEach(day => {
          availability[day].forEach((slot: { start: string; end: string }) => {
            const [startHour, startMinute] = slot.start.split(':').map(Number);
            const [endHour, endMinute] = slot.end.split(':').map(Number);
            
            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;
            
            totalMinutes += endTotalMinutes - startTotalMinutes;
          });
        });
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return (
          <div className="text-gray-900">
            {hours}h {minutes > 0 ? `${minutes}m` : ''}
          </div>
        );
      }
    }
  ];

  return (
    <Card title="Doctors">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
            placeholder="Search doctors..."
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
            Add Doctor
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredDoctors}
        onRowClick={(doctor) => console.log('Doctor clicked:', doctor)}
        emptyMessage={
          searchTerm 
            ? `No doctors found matching "${searchTerm}"` 
            : 'No doctors available'
        }
      />
    </Card>
  );
};

export default DoctorsList;