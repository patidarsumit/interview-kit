import {Component, signal} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sortable-skills',
  standalone: true,
  imports: [DragDropModule],
  template: `
    <section cdkDropList (cdkDropListDropped)="drop($event)">
      @for (skill of skills(); track skill) {
        <button cdkDrag type="button">{{ skill }}</button>
      }
    </section>
  `,
})
export class SortableSkillsComponent {
  readonly skills = signal(['Angular', 'RxJS', 'Signals', 'Testing']);

  drop(event: CdkDragDrop<string[]>) {
    this.skills.update((items) => {
      const next = [...items];
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }
}

