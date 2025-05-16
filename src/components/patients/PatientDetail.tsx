import React from 'react';
import { Calendar, Phone, Mail, MapPin, ClipboardEdit, Trash2, Plus, Clock, Activity } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Table from '../common/Table';
import { Patient, Appointment } from '../../types';

interface PatientDetailProps {
  patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient Info Card */}
      <Card className="lg:col-span-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
            <span className="text-gray-500 text-sm">ID: {patient.id}</span>
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
          <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <Calendar size={16} />
              </span>
              <div>
                <p className="text-gray-800">{patient.age} years old</p>
                <p className="text-xs text-gray-500">Age</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <Phone size={16} />
              </span>
              <div>
                <p className="text-gray-800">{patient.contactNumber}</p>
                <p className="text-xs text-gray-500">Phone</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-gray-800">{patient.email}</p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 text-gray-400 mt-0.5 mr-3">
                <MapPin size={16} />
              </span>
              <div>
                <p className="text-gray-800">{patient.address}</p>
                <p className="text-xs text-gray-500">Address</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 -mx-6 px-6 pt-4 pb-2 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Medical History</h4>
            <button className="p-1 text-[#4A90E2] hover:bg-blue-50 rounded">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {patient.medicalHistory.length > 0 ? (
              patient.medicalHistory.map((condition, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
                >
                  <span className="text-gray-800">{condition}</span>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No medical history recorded</p>
            )}
          </div>
        </div>
      </Card>

      {/* Appointments and Activity */}
      <div className="lg:col-span-2 space-y-6">
        <Card title="Upcoming Appointments">
          {patient.upcomingAppointments.length > 0 ? (
            <Table
              columns={[
                {
                  header: 'Date & Time',
                  accessor: 'date',
                  render: (date: string, row: Appointment) => (
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
                  header: 'Doctor',
                  accessor: 'doctorId',
                  render: (doctorId: string) => (
                    <div className="font-medium text-gray-900">
                      {doctorId.replace('D', 'Dr. #')}
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
                }
              ]}
              data={patient.upcomingAppointments}
            />
          ) : (
            <div className="text-center py-6">
              <Clock size={40} className="mx-auto mb-2 text-gray-300" />
              <p className="text-gray-500">No upcoming appointments</p>
              <Button variant="primary" className="mt-4">
                Schedule Appointment
              </Button>
            </div>
          )}
        </Card>

        <Card title="Patient Activity">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              <div className="relative pl-10">
                <div className="absolute left-0 p-1 bg-[#4A90E2] rounded-full">
                  <Activity size={16} className="text-white" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h5 className="font-medium text-gray-800">Checkup Completed</h5>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Dr. Elizabeth White completed a routine checkup. Blood pressure was normal at 120/80.</p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 p-1 bg-[#4A90E2] rounded-full">
                  <Activity size={16} className="text-white" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h5 className="font-medium text-gray-800">Prescription Updated</h5>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Dr. Jessica Lee updated the prescription for Lisinopril. Dosage increased from 10mg to 20mg.</p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 p-1 bg-[#4A90E2] rounded-full">
                  <Activity size={16} className="text-white" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h5 className="font-medium text-gray-800">Lab Results Received</h5>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Blood work results received. Cholesterol levels are within normal range.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetail;