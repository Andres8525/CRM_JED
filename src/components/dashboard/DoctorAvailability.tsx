import React, { useState } from 'react';
import Card from '../common/Card';
import { doctors } from '../../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorAvailability: React.FC = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const nextDay = () => {
    const currentIndex = weekDays.indexOf(selectedDay);
    if (currentIndex < weekDays.length - 1) {
      setSelectedDay(weekDays[currentIndex + 1]);
    }
  };

  const prevDay = () => {
    const currentIndex = weekDays.indexOf(selectedDay);
    if (currentIndex > 0) {
      setSelectedDay(weekDays[currentIndex - 1]);
    }
  };

  // Time slots for the schedule (30 min intervals from 8:00 to 19:00)
  const timeSlots = [];
  for (let hour = 8; hour < 19; hour++) {
    timeSlots.push(`${hour}:00`);
    timeSlots.push(`${hour}:30`);
  }

  // Function to check if a doctor is available at a specific time
  const isDoctorAvailable = (doctorId: string, time: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor || !doctor.availability[selectedDay]) {
      return false;
    }

    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minute;

    return doctor.availability[selectedDay].some(slot => {
      const [startHour, startMinute] = slot.start.split(':').map(Number);
      const [endHour, endMinute] = slot.end.split(':').map(Number);
      
      const slotStartInMinutes = startHour * 60 + startMinute;
      const slotEndInMinutes = endHour * 60 + endMinute;
      
      return timeInMinutes >= slotStartInMinutes && timeInMinutes < slotEndInMinutes;
    });
  };

  return (
    <Card title="Doctor Availability" className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={prevDay}
          disabled={selectedDay === weekDays[0]}
        >
          <ChevronLeft size={20} className={selectedDay === weekDays[0] ? 'text-gray-300' : 'text-gray-600'} />
        </button>
        <h4 className="text-lg font-semibold text-gray-800">{selectedDay}</h4>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={nextDay}
          disabled={selectedDay === weekDays[weekDays.length - 1]}
        >
          <ChevronRight size={20} className={selectedDay === weekDays[weekDays.length - 1] ? 'text-gray-300' : 'text-gray-600'} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Time
              </th>
              {doctors.map(doctor => (
                <th key={doctor.id} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>{doctor.name.replace('Dr. ', '')}</div>
                  <div className="text-xs normal-case font-normal text-gray-400">{doctor.specialization}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {timeSlots.map((time, index) => (
              <tr key={time} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 text-sm text-gray-500 font-medium">
                  {time}
                </td>
                {doctors.map(doctor => (
                  <td key={`${doctor.id}-${time}`} className="px-4 py-2">
                    <div 
                      className={`h-4 w-full rounded ${
                        isDoctorAvailable(doctor.id, time) 
                          ? 'bg-green-100 border border-green-300' 
                          : 'bg-red-100 border border-red-300'
                      }`}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center text-sm">
        <div className="flex items-center mr-4">
          <div className="h-3 w-3 rounded bg-green-100 border border-green-300 mr-1"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded bg-red-100 border border-red-300 mr-1"></div>
          <span className="text-gray-600">Unavailable</span>
        </div>
      </div>
    </Card>
  );
};

export default DoctorAvailability;