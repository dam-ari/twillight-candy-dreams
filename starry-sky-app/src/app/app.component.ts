import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
import { ThemeService } from './theme.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SkyComponent } from './sky/sky.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    SettingsComponent,
    HomeComponent,
    SkyComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ThemeService]

})
export class AppComponent {
  title = 'starry-sky-app';
  constructor(public themeService: ThemeService) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
