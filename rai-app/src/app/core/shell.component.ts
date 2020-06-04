import { Component } from '@angular/core';

@Component({
  selector: 'rai-shell',
  template: ` <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button class="nav-menu">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button routerLink="/home">Robustness Demo</a>
        <a mat-button routerLinkActive="active" routerLink="/options"
          >Options</a
        >

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
    <router-outlet></router-outlet>`,
  styleUrls: ['shell.component.scss'],
})
export class ShellComponent {}
