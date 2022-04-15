import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DecimalPipe } from '@angular/common';

@NgModule({
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    IvyCarouselModule,
    MatExpansionModule,
  ],
  providers: [DecimalPipe],
  imports: [NgxSpinnerModule],
})
export class MaterialModule {}
