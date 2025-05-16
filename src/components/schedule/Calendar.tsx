import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { appointments, doctors, patients } from '../../data/mockData';
import { Appointment } from '../../types';

const Calendar: React.FC = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDate] = useState(new Date('2025-01-06')); // Starting from first Monday in January 2025
  
  // Generate days for the current week
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };
  
  const weekDates = generateWeekDays();
  
  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(app => app.date === dateString);
  };
  
  // Time slots for the schedule (1 hour intervals from 8:00 to 19:00)
  const timeSlots = [];
  for (let hour = 8; hour < 19; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    timeSlots.push(`${formattedHour}:00`);
  }
  
  // Get appointment details
  const getAppointmentDetails = (appointment: Appointment) => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return {
      patientName: patient ? patient.name : 'Unknown Patient',
      doctorName: doctor ? doctor.name : 'Unknown Doctor',
      doctorSpecialization: doctor ? doctor.specialization : 'Unknown'
    };
  };
  
  return (
    <Card title="Weekly Schedule">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h4 className="text-lg font-semibold mx-4">
            {`${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
          </h4>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          New Appointment
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Day headers */}
          <div className="grid grid-cols-8 gap-2 border-b pb-2 mb-3">
            <div className="col-span-1"></div>
            {weekDates.map((date, index) => (
              <div key={index} className="col-span-1 text-center">
                <p className="font-medium text-gray-800">{weekDays[index]}</p>
                <p className="text-sm text-gray-500">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
          
          {/* Time slots with appointments */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <div 
              key={timeSlot} 
              className={`grid grid-cols-8 gap-2 py-2 ${timeIndex % 2 === 0 ? 'bg-gray-50' : ''}`}
            >
              <div className="col-span-1 pr-4 text-right self-start mt-1 font-medium text-gray-600">
                {timeSlot}
              </div>
              
              {weekDates.map((date, dateIndex) => {
                const dateAppointments = getAppointmentsForDate(date);
                const appointmentsAtTime = dateAppointments.filter(app => {
                  const [hour] = timeSlot.split(':');
                  const [appHour] = app.time.split(':');
                  return hour === appHour;
                });
                
                return (
                  <div key={dateIndex} className="col-span-1 min-h-16 relative">
                    {appointmentsAtTime.length > 0 ? (
                      appointmentsAtTime.map((appointment, appIndex) => {
                        const { patientName, doctorName } = getAppointmentDetails(appointment);
                        
                        return (
                          <div 
                            key={appIndex}
                            className="absolute inset-0 m-1 p-2 rounded-md bg-[#4A90E2]/10 border border-[#4A90E2]/30 hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <p className="font-medium text-sm text-[#0A2463] truncate">
                              {patientName}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {appointment.time} | {doctorName}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full w-full border border-dashed border-gray-200 rounded-md"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Calendar;