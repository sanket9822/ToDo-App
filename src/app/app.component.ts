import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

interface Task {
  title: string;
  description: string;
  image?: string;
  priority?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(public dialog: MatDialog) {}

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo.push(result);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      this.updateTaskStatus(item, event.container.id);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateTaskStatus(task: Task, containerId: string): void {
    switch (containerId) {
      case 'inProgress':
        this.inProgress.push(task);
        break;
      case 'done':
        this.done.push(task);
        break;
      default:
        break;
    }
  }
}
