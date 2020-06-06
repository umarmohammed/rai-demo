import { Component } from '@angular/core';
import { ShellService } from './shell.service';

@Component({
  selector: 'rai-shell',
  template: ` <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button class="nav-menu" (click)="opened = !opened">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button routerLink="/home">Robustness Demo</a>
        <div class="spacer"></div>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>vertical_align_bottom</mat-icon>Download Model
          </button>
          <button mat-menu-item>
            <mat-icon>file_copy</mat-icon>Export Report
          </button>
          <button mat-menu-item>
            <mat-icon>cloud_cirlce</mat-icon>Generate API
          </button>
        </mat-menu>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" [opened]="opened">
        <rai-options></rai-options>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>`,
  styleUrls: ['shell.component.scss'],
})
export class ShellComponent {
  opened = true;
  groupNames$ = this.shellService.groupNames$;

  constructor(private shellService: ShellService) {}
}
