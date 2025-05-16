import React from 'react';
import Card from '../common/Card';
import { GraphNode } from '../../types';
import { patients, doctors } from '../../data/mockData';

interface GraphViewProps {
  graphData: GraphNode[];
}

const GraphView: React.FC<GraphViewProps> = ({ graphData }) => {
  return (
    <Card title="Doctor-Patient Relationships (Graph Structure)">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {graphData.map((node) => {
          // Get doctor information
          const doctor = doctors.find(d => d.id === node.id);
          if (!doctor) return null;
          
          // Get patient information for each connection
          const connectedPatients = node.connections.map(patientId => 
            patients.find(p => p.id === patientId)
          ).filter(p => p !== undefined);
          
          return (
            <div 
              key={node.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-[#0A2463] mb-2">{doctor.name}</h4>
              <p className="text-sm text-gray-600 mb-3">
                {doctor.specialization} | {connectedPatients.length} patients
              </p>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Connected Patients:</h5>
                {connectedPatients.map((patient, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="text-sm font-medium">{patient?.name}</p>
                      <p className="text-xs text-gray-500">
                        {patient?.gender}, {patient?.age} years
                      </p>
                    </div>
                    <div className="bg-blue-100 rounded-full px-2 py-1 text-xs text-blue-800">
                      {patient?.medicalHistory[0] || 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default GraphView;