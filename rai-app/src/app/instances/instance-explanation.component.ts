import { Component, Input } from '@angular/core';
import { Instance } from '../core/models/instance';

@Component({
  selector: 'rai-instance-explanation',
  template: `<div>{{ instance.predictProbablities | json }}</div>`,
})
export class InstanceExplanationComponent {
  @Input() instance: Instance;
}
