import {NgComponentOutlet} from '@angular/common';
import {Component, Type, computed, input, signal} from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  template: `<section>Chart widget for {{ title() }}</section>`,
})
export class ChartWidgetComponent {
  readonly title = input.required<string>();
}

@Component({
  selector: 'app-table-widget',
  standalone: true,
  template: `<section>Table widget for {{ title() }}</section>`,
})
export class TableWidgetComponent {
  readonly title = input.required<string>();
}

type WidgetType = 'chart' | 'table';

const widgetRegistry: Record<WidgetType, Type<unknown>> = {
  chart: ChartWidgetComponent,
  table: TableWidgetComponent,
};

@Component({
  selector: 'app-dashboard-widget-host',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <button type="button" (click)="selectedType.set('chart')">Chart</button>
    <button type="button" (click)="selectedType.set('table')">Table</button>

    <ng-container
      *ngComponentOutlet="
        selectedComponent();
        inputs: selectedInputs()
      "
    />
  `,
})
export class DashboardWidgetHostComponent {
  readonly selectedType = signal<WidgetType>('chart');

  readonly selectedComponent = computed(() => {
    return widgetRegistry[this.selectedType()];
  });

  readonly selectedInputs = computed(() => ({
    title: this.selectedType() === 'chart' ? 'Revenue' : 'Users',
  }));
}
