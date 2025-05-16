import { TreeNode, GraphNode, DLLNode, Appointment } from '../types';

// Double Linked List implementation
export class DoublyLinkedList<T> {
  private head: DLLNode<T> | null = null;
  private tail: DLLNode<T> | null = null;
  private size: number = 0;

  constructor(initialNode?: DLLNode<T>) {
    if (initialNode) {
      this.head = initialNode;
      
      // Find the tail by traversing from head
      let current = initialNode;
      let count = 1;
      
      while (current.next) {
        current = current.next;
        count++;
      }
      
      this.tail = current;
      this.size = count;
    }
  }

  // Add to the end of the list
  append(data: T): void {
    const newNode: DLLNode<T> = { data, prev: null, next: null };
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Add to the beginning of the list
  prepend(data: T): void {
    const newNode: DLLNode<T> = { data, prev: null, next: null };
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
  }

  // Insert at a specific position
  insertAt(data: T, position: number): boolean {
    if (position < 0 || position > this.size) {
      return false;
    }

    if (position === 0) {
      this.prepend(data);
      return true;
    }

    if (position === this.size) {
      this.append(data);
      return true;
    }

    const newNode: DLLNode<T> = { data, prev: null, next: null };
    let current = this.head;
    let count = 0;

    while (current && count < position) {
      current = current.next;
      count++;
    }

    if (current && current.prev) {
      newNode.prev = current.prev;
      newNode.next = current;
      current.prev.next = newNode;
      current.prev = newNode;
      this.size++;
      return true;
    }

    return false;
  }

  // Remove a node at a specific position
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size || !this.head) {
      return null;
    }

    let current = this.head;

    if (position === 0) {
      this.head = current.next;
      
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      
      this.size--;
      return current.data;
    }

    if (position === this.size - 1 && this.tail) {
      current = this.tail;
      this.tail = current.prev;
      
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      
      this.size--;
      return current.data;
    }

    let count = 0;
    while (current && count < position) {
      current = current.next;
      count++;
    }

    if (current && current.prev && current.next) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      this.size--;
      return current.data;
    }

    return null;
  }

  // Get the size of the list
  getSize(): number {
    return this.size;
  }

  // Convert the list to an array
  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    
    return array;
  }

  // Search for an item (returns position or -1 if not found)
  search(callback: (data: T) => boolean): number {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (callback(current.data)) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
}

// Tree traversal methods
export class TreeOperations {
  // DFS traversal
  static dfs(node: TreeNode, callback: (node: TreeNode) => void): void {
    callback(node);
    
    for (const child of node.children) {
      this.dfs(child, callback);
    }
  }

  // BFS traversal
  static bfs(root: TreeNode, callback: (node: TreeNode) => void): void {
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      if (current) {
        callback(current);
        queue.push(...current.children);
      }
    }
  }

  // Find a node by id
  static findNodeById(root: TreeNode, id: string): TreeNode | null {
    if (root.id === id) {
      return root;
    }
    
    for (const child of root.children) {
      const found = this.findNodeById(child, id);
      if (found) {
        return found;
      }
    }
    
    return null;
  }

  // Add a child to a node by parent id
  static addChild(root: TreeNode, parentId: string, newChild: TreeNode): boolean {
    const parent = this.findNodeById(root, parentId);
    
    if (parent) {
      parent.children.push(newChild);
      return true;
    }
    
    return false;
  }
}

// Graph operations
export class GraphOperations {
  // Find a node by id
  static findNodeById(graph: GraphNode[], id: string): GraphNode | undefined {
    return graph.find(node => node.id === id);
  }

  // Add a new node to the graph
  static addNode(graph: GraphNode[], node: GraphNode): GraphNode[] {
    // Check if node already exists
    if (!this.findNodeById(graph, node.id)) {
      return [...graph, node];
    }
    return graph;
  }

  // Add a connection between two nodes
  static addConnection(graph: GraphNode[], fromId: string, toId: string): GraphNode[] {
    const newGraph = [...graph];
    const fromNode = this.findNodeById(newGraph, fromId);
    
    if (fromNode && !fromNode.connections.includes(toId)) {
      const index = newGraph.findIndex(node => node.id === fromId);
      newGraph[index] = {
        ...fromNode,
        connections: [...fromNode.connections, toId]
      };
    }
    
    return newGraph;
  }

  // Get all connections for a node
  static getConnections(graph: GraphNode[], id: string): string[] {
    const node = this.findNodeById(graph, id);
    return node ? node.connections : [];
  }

  // Check if two nodes are connected
  static areConnected(graph: GraphNode[], fromId: string, toId: string): boolean {
    const fromNode = this.findNodeById(graph, fromId);
    return fromNode ? fromNode.connections.includes(toId) : false;
  }
}

// Appointment History DLL specific operations
export class AppointmentHistory {
  private list: DoublyLinkedList<Appointment>;

  constructor(initialNode: DLLNode<Appointment> | undefined) {
    this.list = new DoublyLinkedList<Appointment>(initialNode);
  }

  // Add a new appointment to history
  addAppointment(appointment: Appointment): void {
    this.list.append(appointment);
  }

  // Get all appointments
  getAllAppointments(): Appointment[] {
    return this.list.toArray();
  }

  // Find appointment by id
  findAppointmentById(id: string): number {
    return this.list.search(appointment => appointment.id === id);
  }

  // Find appointments by patient id
  findAppointmentsByPatient(patientId: string): Appointment[] {
    return this.list.toArray().filter(appointment => appointment.patientId === patientId);
  }

  // Find appointments by doctor id
  findAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.list.toArray().filter(appointment => appointment.doctorId === doctorId);
  }
}