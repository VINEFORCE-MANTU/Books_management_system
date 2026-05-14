import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  BookDto,
  BookdtoServiceModuleServiceProxy,
  UpdateBookDto
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';

import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  selector: 'app-editbook',

  templateUrl: './editbook.component.html',

  styleUrl: './editbook.component.css',

  standalone: true,

  imports: [
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe,
  ],
})
export class EditbookComponent
  extends AppComponentBase
  implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  saving = false;

  id!: number;

  book: BookDto = new BookDto();

  constructor(
    injector: Injector,
    private _bookService: BookdtoServiceModuleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

    this._bookService.get(this.id).subscribe(result => {

      this.book = result;

      this.cd.detectChanges();
    });
  }

  save(): void {

    this.saving = true;

    const input = new UpdateBookDto();

    input.init(this.book);

    this._bookService.update(input).subscribe(
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