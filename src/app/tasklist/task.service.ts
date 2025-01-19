import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';

  getTasks(): Task[] {
    if (typeof window !== 'undefined') { // Check if we are in a browser
      const tasks = localStorage.getItem(this.tasksKey);
      return tasks ? JSON.parse(tasks) : [];
    }
    return []; // Return empty array if not in a browser
  }

  addTask(task: Task): void {
    if (typeof window !== 'undefined') {
      const tasks = this.getTasks();
      tasks.push(task);
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }

  updateTask(updatedTask: Task): void {
    if (typeof window !== 'undefined') {
      const tasks = this.getTasks().map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }

  deleteTask(id: number): void {
    if (typeof window !== 'undefined') {
      const tasks = this.getTasks().filter(task => task.id !== id);
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }
}