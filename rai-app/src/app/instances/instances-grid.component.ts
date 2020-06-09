import { Component, Input } from '@angular/core';

@Component({
  selector: 'rai-instances-grid',
  template: `
    <div>instances grid</div>
    <div>{{ columnNames | json }}</div>
    <div>{{ instances | json }}</div>
  `,
})
export class InstancesGridComponent {
  @Input() columnNames: string[];
  @Input() instances: any[];
}
