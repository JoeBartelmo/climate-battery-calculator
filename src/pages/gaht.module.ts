import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from '../app/material-module';
import { GahtCalculatorComponent } from './calculator/calculator.component';
import { MathServiceImpl } from 'src/lib/mathjax/MathJaxService';
import { MathDirective } from 'src/lib/mathjax/MathDirective';

@NgModule({
  declarations: [
    GahtCalculatorComponent,
    MathDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  exports: [GahtCalculatorComponent],
  providers: [MathServiceImpl]
})
export class GahtModule { }
