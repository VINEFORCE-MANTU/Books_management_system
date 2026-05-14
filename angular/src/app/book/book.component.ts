import {
  Component,
  Injector,
  ChangeDetectorRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Table, TableModule } from 'primeng/table';

import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';

import {
  Paginator,
  PaginatorModule
} from 'primeng/paginator';

import { FormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';

import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';

import { LocalizePipe } from '../../shared/pipes/localize.pipe';

import {
  BookDto,
  BookdtoServiceModuleServiceProxy
} from '../../shared/service-proxies/service-proxies';

import { EditbookComponent } from './editbook/editbook.component';

import { CreatebookComponent } from './createbook/createbook.component';

@Component({
  selector: 'app-book',

  templateUrl: './book.component.html',

  styleUrl: './book.component.css',

  animations: [appModuleAnimation()],

  standalone: true,

  imports: [
    FormsModule,
    TableModule,
    PrimeTemplate,
    NgIf,
    PaginatorModule,
    LocalizePipe
  ],
})
export class BookComponent
  extends PagedListingComponentBase<BookDto>
  implements OnInit {

  @ViewChild('dataTable', { static: true })
  dataTable!: Table;

  @ViewChild('paginator', { static: true })
  paginator!: Paginator;

  books: BookDto[] = [];

  keyword = '';

  primengTableHelper: any;

  constructor(
    injector: Injector,
    private _bookService: BookdtoServiceModuleServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  // ==============================
  // AUTO LOAD ALL BOOKS
  // ==============================

  ngOnInit(): void {

    this.getAllBooks();
  }

  // ==============================
  // RETRIEVE ALL BOOKS
  // ==============================

  getAllBooks(): void {

    this.primengTableHelper.showLoadingIndicator();

    this._bookService
      .getAll()
      .pipe(
        finalize(() => {
          this.primengTableHelper.hideLoadingIndicator();
        })
      )
      .subscribe((result) => {

        this.books = result;

        this.primengTableHelper.records = result;

        this.primengTableHelper.totalRecordsCount = result.length;

        console.log('Retrieved Books:', this.books);

        this.cd.detectChanges();
      });
  }

  // ==============================
  // TABLE LIST
  // ==============================

  list(event?: LazyLoadEvent): void {

    if (this.primengTableHelper.shouldResetPaging(event)) {

      this.paginator.changePage(0);

      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.getAllBooks();
  }

  // ==============================
  // CREATE BOOK
  // ==============================

  createBook(): void {

    const modalRef = this._modalService.show(
      CreatebookComponent,
      {
        class: 'modal-lg',
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllBooks();

      this.refresh();
    });
  }

  // ==============================
  // EDIT BOOK
  // ==============================

  editBook(book: BookDto): void {

    const modalRef = this._modalService.show(
      EditbookComponent,
      {
        class: 'modal-lg',

        initialState: {
          id: book.id,
        },
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllBooks();

      this.refresh();
    });
  }

  // ==============================
  // DELETE BOOK
  // ==============================

  delete(book: BookDto): void {

    abp.message.confirm(
      'BookDeleteWarningMessage',
      undefined,
      (result: boolean) => {

        if (result) {

          this._bookService.delete(book.id).subscribe(() => {

            abp.notify.success('SuccessfullyDeleted');

            this.getAllBooks();

            this.refresh();
          });
        }
      }
    );
  }
}