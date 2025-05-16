export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  medicalHistory: string[];
  upcomingAppointments: Appointment[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contactNumber: string;
  email: string;
  availability: {
    [day: string]: { start: string; end: string }[];
  };
  patients: string[]; // Patient IDs
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
}

export interface GraphNode {
  id: string;
  connections: string[];
}

// Double Linked List Node
export interface DLLNode<T> {
  data: T;
  prev: DLLNode<T> | null;
  next: DLLNode<T> | null;
}