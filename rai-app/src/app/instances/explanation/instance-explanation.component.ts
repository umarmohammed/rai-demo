import { Component, Input } from '@angular/core';
import { Instance } from '../../core/models/instance';

@Component({
  selector: 'rai-instance-explanation',
  template: `<div class="flex-container">
    <rai-instance-probabilities
      [probabilities]="instance.predictProbablities"
    ></rai-instance-probabilities>
    <rai-instance-lime-chart
      [explanation]="instance.explanation"
    ></rai-instance-lime-chart>
  </div>`,
  styleUrls: ['instance-explanation.component.scss'],
})
export class InstanceExplanationComponent {
  @Input() instance: Instance;
}
