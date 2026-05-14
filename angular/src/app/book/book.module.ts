import { CommonModule } from "@angular/common";
import { SharedModule } from "primeng/api";
import { NgModule } from "@angular/core";

import { BookRoutingModule } from "./book-routing.module";

import { BookComponent } from "./book.component";

import { CreatebookComponent } from "./createbook/createbook.component";
import { EditRoleDialogComponent } from "../roles/edit-role/edit-role-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BookRoutingModule,

        // standalone components
        BookComponent,
        CreatebookComponent,
        EditRoleDialogComponent
    ],
})
export class BookModule {}