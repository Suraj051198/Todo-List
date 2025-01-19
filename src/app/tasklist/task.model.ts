export interface Task {
    id: number;
    description: string;
    assignedTo: string;
    status: string; // e.g., "Pending", "In Progress", "Completed"
    dueDate: Date; // Use string or Date object
    priority: string; // e.g., "Low", "Medium", "High"
    completed: boolean;
  }
  