import { Patient, Doctor, Appointment, TreeNode, GraphNode, DLLNode } from '../types';

// Generate 15 patients
export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    contactNumber: '555-123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, Anytown, USA',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    upcomingAppointments: []
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    contactNumber: '555-234-5678',
    email: 'sarah.j@email.com',
    address: '456 Oak Ave, Somecity, USA',
    medicalHistory: ['Asthma'],
    upcomingAppointments: []
  },
  {
    id: 'P003',
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    contactNumber: '555-345-6789',
    email: 'michael.b@email.com',
    address: '789 Pine St, Otherville, USA',
    medicalHistory: ['Heart Disease', 'High Cholesterol'],
    upcomingAppointments: []
  },
  {
    id: 'P004',
    name: 'Emily Davis',
    age: 27,
    gender: 'Female',
    contactNumber: '555-456-7890',
    email: 'emily.d@email.com',
    address: '321 Elm St, Newtown, USA',
    medicalHistory: ['Allergies'],
    upcomingAppointments: []
  },
  {
    id: 'P005',
    name: 'Robert Wilson',
    age: 62,
    gender: 'Male',
    contactNumber: '555-567-8901',
    email: 'robert.w@email.com',
    address: '654 Maple Dr, Oldcity, USA',
    medicalHistory: ['Arthritis', 'Glaucoma'],
    upcomingAppointments: []
  },
  {
    id: 'P006',
    name: 'Jennifer Garcia',
    age: 41,
    gender: 'Female',
    contactNumber: '555-678-9012',
    email: 'jennifer.g@email.com',
    address: '987 Cedar Ln, Bigcity, USA',
    medicalHistory: ['Migraines'],
    upcomingAppointments: []
  },
  {
    id: 'P007',
    name: 'David Martinez',
    age: 39,
    gender: 'Male',
    contactNumber: '555-789-0123',
    email: 'david.m@email.com',
    address: '159 Birch St, Smalltown, USA',
    medicalHistory: ['GERD'],
    upcomingAppointments: []
  },
  {
    id: 'P008',
    name: 'Lisa Anderson',
    age: 53,
    gender: 'Female',
    contactNumber: '555-890-1234',
    email: 'lisa.a@email.com',
    address: '753 Walnut Ave, Countryside, USA',
    medicalHistory: ['Hypothyroidism'],
    upcomingAppointments: []
  },
  {
    id: 'P009',
    name: 'James Taylor',
    age: 35,
    gender: 'Male',
    contactNumber: '555-901-2345',
    email: 'james.t@email.com',
    address: '246 Spruce Dr, Metropolis, USA',
    medicalHistory: ['Depression', 'Anxiety'],
    upcomingAppointments: []
  },
  {
    id: 'P010',
    name: 'Patricia Harris',
    age: 48,
    gender: 'Female',
    contactNumber: '555-012-3456',
    email: 'patricia.h@email.com',
    address: '135 Aspen Ct, Suburbia, USA',
    medicalHistory: ['Fibromyalgia'],
    upcomingAppointments: []
  },
  {
    id: 'P011',
    name: 'Richard Lewis',
    age: 67,
    gender: 'Male',
    contactNumber: '555-123-4567',
    email: 'richard.l@email.com',
    address: '864 Willow St, Downtown, USA',
    medicalHistory: ['COPD', 'Emphysema'],
    upcomingAppointments: []
  },
  {
    id: 'P012',
    name: 'Susan Walker',
    age: 29,
    gender: 'Female',
    contactNumber: '555-234-5678',
    email: 'susan.w@email.com',
    address: '975 Hickory Ln, Uptown, USA',
    medicalHistory: ['Eczema'],
    upcomingAppointments: []
  },
  {
    id: 'P013',
    name: 'Thomas Clark',
    age: 55,
    gender: 'Male',
    contactNumber: '555-345-6789',
    email: 'thomas.c@email.com',
    address: '624 Sycamore Ave, Riverside, USA',
    medicalHistory: ['Type 1 Diabetes'],
    upcomingAppointments: []
  },
  {
    id: 'P014',
    name: 'Mary Rodriguez',
    age: 42,
    gender: 'Female',
    contactNumber: '555-456-7890',
    email: 'mary.r@email.com',
    address: '513 Poplar Dr, Lakeside, USA',
    medicalHistory: ['Rheumatoid Arthritis'],
    upcomingAppointments: []
  },
  {
    id: 'P015',
    name: 'Charles Hill',
    age: 71,
    gender: 'Male',
    contactNumber: '555-567-8901',
    email: 'charles.h@email.com',
    address: '428 Cherry St, Mountainview, USA',
    medicalHistory: ['Parkinson\'s Disease', 'Osteoporosis'],
    upcomingAppointments: []
  }
];

// Generate 5 doctors
export const doctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Elizabeth White',
    specialization: 'Cardiology',
    contactNumber: '555-111-2222',
    email: 'dr.white@hospital.com',
    availability: {
      'Monday': [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '17:00' }],
      'Tuesday': [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '17:00' }],
      'Wednesday': [{ start: '09:00', end: '12:00' }],
      'Thursday': [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '17:00' }],
      'Friday': [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '16:00' }]
    },
    patients: ['P001', 'P003', 'P005', 'P011']
  },
  {
    id: 'D002',
    name: 'Dr. Samuel Green',
    specialization: 'Neurology',
    contactNumber: '555-222-3333',
    email: 'dr.green@hospital.com',
    availability: {
      'Monday': [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '18:00' }],
      'Tuesday': [{ start: '08:00', end: '12:00' }],
      'Wednesday': [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '18:00' }],
      'Thursday': [{ start: '10:00', end: '14:00' }],
      'Friday': [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }]
    },
    patients: ['P006', 'P009', 'P014']
  },
  {
    id: 'D003',
    name: 'Dr. Rachel Brown',
    specialization: 'Pediatrics',
    contactNumber: '555-333-4444',
    email: 'dr.brown@hospital.com',
    availability: {
      'Monday': [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '16:00' }],
      'Tuesday': [{ start: '13:00', end: '18:00' }],
      'Wednesday': [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '16:00' }],
      'Thursday': [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '16:00' }],
      'Friday': [{ start: '13:00', end: '18:00' }]
    },
    patients: ['P004', 'P012']
  },
  {
    id: 'D004',
    name: 'Dr. William Johnson',
    specialization: 'Orthopedics',
    contactNumber: '555-444-5555',
    email: 'dr.johnson@hospital.com',
    availability: {
      'Monday': [{ start: '09:00', end: '13:00' }],
      'Tuesday': [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      'Wednesday': [{ start: '14:00', end: '18:00' }],
      'Thursday': [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      'Friday': [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }]
    },
    patients: ['P005', 'P008', 'P010', 'P014']
  },
  {
    id: 'D005',
    name: 'Dr. Jessica Lee',
    specialization: 'Internal Medicine',
    contactNumber: '555-555-6666',
    email: 'dr.lee@hospital.com',
    availability: {
      'Monday': [{ start: '08:00', end: '14:00' }],
      'Tuesday': [{ start: '14:00', end: '19:00' }],
      'Wednesday': [{ start: '08:00', end: '14:00' }],
      'Thursday': [{ start: '14:00', end: '19:00' }],
      'Friday': [{ start: '08:00', end: '14:00' }]
    },
    patients: ['P002', 'P007', 'P013', 'P015']
  }
];

// Generate appointments
export const appointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2025-01-06', // Monday
    time: '10:00',
    status: 'scheduled'
  },
  {
    id: 'A002',
    patientId: 'P003',
    doctorId: 'D001',
    date: '2025-01-07', // Tuesday
    time: '11:00',
    status: 'scheduled'
  },
  {
    id: 'A003',
    patientId: 'P006',
    doctorId: 'D002',
    date: '2025-01-06', // Monday
    time: '11:30',
    status: 'scheduled'
  },
  {
    id: 'A004',
    patientId: 'P004',
    doctorId: 'D003',
    date: '2025-01-08', // Wednesday
    time: '09:00',
    status: 'scheduled'
  },
  {
    id: 'A005',
    patientId: 'P008',
    doctorId: 'D004',
    date: '2025-01-09', // Thursday
    time: '10:30',
    status: 'scheduled'
  },
  {
    id: 'A006',
    patientId: 'P015',
    doctorId: 'D005',
    date: '2025-01-10', // Friday
    time: '09:30',
    status: 'scheduled'
  },
  {
    id: 'A007',
    patientId: 'P005',
    doctorId: 'D001',
    date: '2025-01-06', // Monday
    time: '14:30',
    status: 'scheduled'
  },
  {
    id: 'A008',
    patientId: 'P002',
    doctorId: 'D005',
    date: '2025-01-08', // Wednesday
    time: '11:00',
    status: 'scheduled'
  }
];

// Create a department hierarchy using a Tree structure
export const departmentTree: TreeNode = {
  id: 'dept1',
  name: 'Hospital Departments',
  children: [
    {
      id: 'dept2',
      name: 'Medicine',
      children: [
        {
          id: 'dept3',
          name: 'Cardiology',
          children: []
        },
        {
          id: 'dept4',
          name: 'Neurology',
          children: []
        },
        {
          id: 'dept5',
          name: 'Internal Medicine',
          children: []
        }
      ]
    },
    {
      id: 'dept6',
      name: 'Surgery',
      children: [
        {
          id: 'dept7',
          name: 'Orthopedics',
          children: []
        },
        {
          id: 'dept8',
          name: 'General Surgery',
          children: []
        }
      ]
    },
    {
      id: 'dept9',
      name: 'Pediatrics',
      children: []
    }
  ]
};

// Create doctor-patient relationship graph
export const doctorPatientGraph: GraphNode[] = [
  { id: 'D001', connections: ['P001', 'P003', 'P005', 'P011'] },
  { id: 'D002', connections: ['P006', 'P009', 'P014'] },
  { id: 'D003', connections: ['P004', 'P012'] },
  { id: 'D004', connections: ['P005', 'P008', 'P010', 'P014'] },
  { id: 'D005', connections: ['P002', 'P007', 'P013', 'P015'] }
];

// Create a DLL for appointment history
export const createAppointmentHistoryDLL = () => {
  const head: DLLNode<Appointment> = {
    data: {
      id: 'AH001',
      patientId: 'P001',
      doctorId: 'D001',
      date: '2024-12-20',
      time: '10:00',
      status: 'completed',
      notes: 'Regular checkup, blood pressure normal'
    },
    prev: null,
    next: null
  };

  const node2: DLLNode<Appointment> = {
    data: {
      id: 'AH002',
      patientId: 'P003',
      doctorId: 'D001',
      date: '2024-12-22',
      time: '11:30',
      status: 'completed',
      notes: 'EKG performed, results within normal limits'
    },
    prev: head,
    next: null
  };

  const node3: DLLNode<Appointment> = {
    data: {
      id: 'AH003',
      patientId: 'P006',
      doctorId: 'D002',
      date: '2024-12-27',
      time: '14:00',
      status: 'completed',
      notes: 'Follow-up for migraine treatment'
    },
    prev: node2,
    next: null
  };

  const node4: DLLNode<Appointment> = {
    data: {
      id: 'AH004',
      patientId: 'P004',
      doctorId: 'D003',
      date: '2024-12-28',
      time: '09:15',
      status: 'completed',
      notes: 'Annual checkup, all tests normal'
    },
    prev: node3,
    next: null
  };

  const node5: DLLNode<Appointment> = {
    data: {
      id: 'AH005',
      patientId: 'P008',
      doctorId: 'D004',
      date: '2024-12-30',
      time: '10:45',
      status: 'completed',
      notes: 'Knee pain assessment, prescribed physical therapy'
    },
    prev: node4,
    next: null
  };

  // Link the nodes
  head.next = node2;
  node2.next = node3;
  node3.next = node4;
  node4.next = node5;

  return head;
};

// Initialize appointment history DLL
export const appointmentHistoryDLL = createAppointmentHistoryDLL();

// Populate patient's upcoming appointments
patients.forEach(patient => {
  patient.upcomingAppointments = appointments.filter(apt => apt.patientId === patient.id);
});