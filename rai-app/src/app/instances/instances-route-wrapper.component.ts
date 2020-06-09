import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rai-instances-route-wrapper',
  template: `<rai-instances-container
    [type]="type$ | async"
  ></rai-instances-container>`,
})
export class InstancesRouteWrapperComponent {
  type$ = this.route.url.pipe(map((url) => url[0].path));

  constructor(private route: ActivatedRoute) {}
}
