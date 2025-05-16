import React from 'react';
import TreeView from '../components/datastructures/TreeView';
import GraphView from '../components/datastructures/GraphView';
import LinkedListView from '../components/datastructures/LinkedListView';
import { departmentTree, doctorPatientGraph, appointmentHistoryDLL } from '../data/mockData';

const DataStructures: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Data Structures Implementation</h2>
      
      <TreeView data={departmentTree} />
      <GraphView graphData={doctorPatientGraph} />
      <LinkedListView head={appointmentHistoryDLL} />
    </div>
  );
};

export default DataStructures;