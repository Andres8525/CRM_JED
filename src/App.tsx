import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Schedule from './pages/Schedule';
import DataStructures from './pages/DataStructures';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/data-structures" element={<DataStructures />} />
          <Route path="/reports" element={<DataStructures />} />
          <Route path="/settings" element={<div className="p-6 text-center text-gray-500">Settings page not implemented in demo</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;