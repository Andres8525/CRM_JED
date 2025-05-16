import React from 'react';
import Card from '../common/Card';
import { DLLNode, Appointment } from '../../types';
import { patients, doctors } from '../../data/mockData';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface LinkedListViewProps {
  head: DLLNode<Appointment>;
}

const LinkedListView: React.FC<LinkedListViewProps> = ({ head }) => {
  const appointmentNodes: DLLNode<Appointment>[] = [];
  let current: DLLNode<Appointment> | null = head;
  
  // Convert the linked list to an array for rendering
  while (current) {
    appointmentNodes.push(current);
    current = current.next;
  }
  
  return (
    <Card title="Appointment History (Doubly Linked List)">
      <div className="overflow-x-auto">
        <div className="flex flex-col space-y-4">
          {appointmentNodes.map((node, index) => {
            const appointment = node.data;
            const patient = patients.find(p => p.id === appointment.patientId);
            const doctor = doctors.find(d => d.id === appointment.doctorId);
            
            return (
              <div key={index} className="relative">
                {/* Node connections visualization */}
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                  {node.prev && <ArrowLeft size={16} className="text-gray-400" />}
                </div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                  {node.next && <ArrowRight size={16} className="text-gray-400" />}
                </div>
                
                {/* Node content */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-[#4A90E2] transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-[#4A90E2] mr-2" />
                        <h5 className="font-semibold text-gray-800">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })} | {appointment.time}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">ID: {appointment.id}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {appointment.status}
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Patient</p>
                      <p className="text-sm font-medium">{patient?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Doctor</p>
                      <p className="text-sm font-medium">{doctor?.name || 'Unknown'}</p>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Notes</p>
                      <p className="text-sm mt-1">{appointment.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-400 flex justify-between">
                    <div>
                      {node.prev ? 'Previous: ' + node.prev.data.id : 'Head Node'}
                    </div>
                    <div>
                      {node.next ? 'Next: ' + node.next.data.id : 'Tail Node'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default LinkedListView;