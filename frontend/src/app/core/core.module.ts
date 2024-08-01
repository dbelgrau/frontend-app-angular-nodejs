import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    StartPageComponent,
    ModalComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalComponent
  ]
})
export class CoreModule { }
