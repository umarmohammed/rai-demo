import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAttackStateLoading } from 'src/app/model-state/reducers';

@Component({
  selector: 'rai-adversarial-attacks-wrapper',
  template: `<rai-adversarial-attacks-container
    [type]="type$ | async"
    [loading]="loading$ | async"
  ></rai-adversarial-attacks-container>`,
})
export class AdversarialAttacksWrapperComponent {
  type$ = this.route.url.pipe(map((url) => url[0].path));
  loading$ = this.store.select(selectAttackStateLoading);

  constructor(private route: ActivatedRoute, private store: Store) {}
}
