import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'rai-instances-container',
  template: `<div>
    <p>{{ type }}</p>
    <div>Lime Analysis</div>
    <rai-instances-grid></rai-instances-grid>
  </div>`,
})
export class InstancesContainerComponent {
  @Input() type: string;
}
