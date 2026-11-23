import { Component, inject } from "@angular/core";
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, of} from 'rxjs';
import { GitHubRelease, ReleaseService } from "src/app/services/githubreleases.service";
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-note-de-versions',
    imports: [AsyncPipe, DatePipe, MarkdownComponent],
    templateUrl: './note-de-versions.component.html',
    styleUrl: './note-de-versions.component.css'
})
export class NoteDeVersionsComponent{
    releases$ = inject(ReleaseService)
        .getAllReleases()
        .pipe(catchError(() => of([] as GitHubRelease[])));
}