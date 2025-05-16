import React from 'react';
import { Phone, Mail, ClipboardEdit, Trash2, Calendar, Clock, Users } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Doctor } from '../../types';
import { patients } from '../../data/mockData';

interface DoctorDetailProps {
  doctor: Doctor;
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor }) => {
  const doctorPatients = patients.filter(patient => doctor.patients.includes(patient.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Doctor Info Card */}
      <Card className="lg:col-span-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
            <span className="text-gray-500 text-sm">{doctor.specialization}</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-[#4A90E2] hover:bg-gray-100 rounded">
              <ClipboardEdit size={18} />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 -mx-6 px-6 pt-4 pb-2">
          <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <Phone size={16} />
              </span>
              <div>
                <p className="text-gray-800">{doctor.contactNumber}</p>
                <p className="text-xs text-gray-500">Phone</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-gray-800">{doctor.email}</p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 -mx-6 px-6 pt-4 pb-2 mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Weekly Schedule</h4>
          <div className="space-y-3">
            {Object.entries(doctor.availability).map(([day, slots]) => (
              <div key={day} className="border-b border-gray-100 pb-2">
                <p className="font-medium text-gray-700 mb-1">{day}</p>
                {slots.length > 0 ? (
                  <div className="space-y-1">
                    {slots.map((slot, index) => (
                      <div key={index} className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Not available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Patients */}
      <div className="lg:col-span-2 space-y-6">
        <Card title="Assigned Patients">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctorPatients.map(patient => (
              <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-medium text-gray-800">{patient.name}</h5>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <p>{patient.gender}, {patient.age} years</p>
                  <p>{patient.contactNumber}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {patient.medicalHistory.slice(0, 2).map((condition, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {condition}
                    </span>
                  ))}
                  {patient.medicalHistory.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      +{patient.medicalHistory.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">Showing {doctorPatients.length} patients</p>
            <Button 
              variant="outline"
              size="sm"
              icon={<Users size={16} />}
            >
              Assign New Patient
            </Button>
          </div>
        </Card>

        <Card title="Appointment Calendar">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <button className="p-1 rounded hover:bg-gray-200">
                <Calendar size={18} className="text-gray-500" />
              </button>
              <h5 className="font-medium text-gray-700">January 2025</h5>
              <div className="flex space-x-1">
                <button className="px-2 py-1 rounded text-sm hover:bg-gray-200 text-gray-700">Today</button>
                <button className="px-2 py-1 rounded text-sm hover:bg-gray-200 text-gray-700">Week</button>
                <button className="px-2 py-1 rounded text-sm bg-[#4A90E2] text-white">Month</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="bg-gray-50 text-center py-2 text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                <div key={date} className="bg-white min-h-24 p-2 hover:bg-blue-50 transition-colors">
                  <div className="text-right mb-2">
                    <span className={`text-sm ${date === 6 ? 'bg-[#4A90E2] text-white rounded-full px-2 py-0.5' : 'text-gray-500'}`}>
                      {date}
                    </span>
                  </div>
                  {date === 6 && (
                    <div className="bg-blue-100 border-l-4 border-[#4A90E2] text-xs p-1 rounded-r">
                      <p className="font-medium">10:00 - John Smith</p>
                      <p className="text-gray-500">Checkup</p>
                    </div>
                  )}
                  {date === 7 && (
                    <div className="bg-blue-100 border-l-4 border-[#4A90E2] text-xs p-1 rounded-r">
                      <p className="font-medium">11:00 - Michael Brown</p>
                      <p className="text-gray-500">Follow-up</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDetail;