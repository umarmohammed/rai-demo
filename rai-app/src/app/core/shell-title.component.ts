import { Input, Component } from '@angular/core';

@Component({
  selector: 'rai-shell-title',
  template: `
    <p class="mat-h2 title-text" *ngIf="groupNames">
      <span>Unpriveleged Group:</span>
      {{ groupNames[0] }} /
      <span>Priveleged Group:</span>
      {{ groupNames[1] }}
    </p>
  `,
  styles: [
    `
      .title-text {
        margin: auto;
      }
    `,
  ],
})
export class ShellTitleComponent {
  @Input() groupNames: [string, string];
}
