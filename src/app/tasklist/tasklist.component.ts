import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;
  confirmedTaskId: number | null = null;
  
  newTask: Omit<Task, 'id'> = this.initializeNewTask();
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  initializeNewTask(): Omit<Task, 'id'> {
    return {
      assignedTo: '',
      status: 'Pending',
      dueDate: new Date(),
      priority: 'Medium',
      completed: false,
      description: ''
    };
  }

  openModal(task: Task | null = null): void {
    this.editingTask = task;
    this.newTask = task ? { ...task } : this.initializeNewTask();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingTask = null;
  }

  confirmDelete(taskId: number): void {
    this.confirmedTaskId = taskId;
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.confirmedTaskId = null;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.refreshTasks();
    this.closeConfirmModal();
  }

  saveTask(): void {
    if (this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.newTask,
        id: this.editingTask.id
      };
      this.taskService.updateTask(updatedTask);
    } else {
      const newTaskWithId: Task = {
        ...this.newTask,
        id: this.generateUniqueId() // Generate a unique ID for new tasks
      };
      this.taskService.addTask(newTaskWithId);
    }
    this.refreshTasks();
    this.closeModal();
  }

  generateUniqueId(): number {
    const existingIds = this.tasks.map(task => task.id);
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  }

  refreshTasks(): void {
    this.tasks = this.taskService.getTasks();
  }
}