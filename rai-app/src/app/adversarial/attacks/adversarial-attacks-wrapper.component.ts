import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rai-adversarial-attacks-wrapper',
  template: `<div>{{ type$ | async }}</div>`,
})
export class AdversarialAttacksWrapperComponent {
  type$ = this.route.url.pipe(map((url) => url[0].path));

  constructor(private route: ActivatedRoute) {}
}
