import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes)
