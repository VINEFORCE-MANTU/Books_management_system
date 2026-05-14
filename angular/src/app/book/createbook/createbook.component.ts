import {
  Component,
  Injector,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  CreateBookDto,
  BookDto,
  BookdtoServiceModuleServiceProxy
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';

import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';

import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';

import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  selector: 'app-createbook',

  templateUrl: './createbook.component.html',

  styleUrl: './createbook.component.css',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe
  ]
})
export class CreatebookComponent extends AppComponentBase {

  saving = false;

  // form model
  book: BookDto = new BookDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _bookService: BookdtoServiceModuleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  save(): void {

    this.saving = true;

    const input = new CreateBookDto();

    input.init(this.book);

    this._bookService.create(input).subscribe(
      () => {

        this.notify.info(this.l('SavedSuccessfully'));

        this.bsModalRef.hide();

        this.onSave.emit();
      },
      () => {

        this.saving = false;

        this.cd.detectChanges();
      }
    );
  }
}