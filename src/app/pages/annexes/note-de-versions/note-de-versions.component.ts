import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { catchError, of} from 'rxjs';
import { GitHubRelease, ReleaseService } from "src/app/services/githubreleases.service";
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-note-de-versions',
    imports: [DatePipe, MarkdownComponent],
    templateUrl: './note-de-versions.component.html',
    styleUrl: './note-de-versions.component.css'
})
export class NoteDeVersionsComponent{
    private releaseService = inject(ReleaseService);

    readonly pageSize = 10;
    readonly releases = toSignal(this.releaseService.getAllReleases());
    readonly currentPageIndex = signal(1);

    readonly totalPages = computed( () =>
        Math.max(1, Math.ceil((this.releases()?.length ?? 0)/ this.pageSize ))
    );

    readonly pagedReleases = computed(() => {
        const start = (this.currentPageIndex() - 1) * this.pageSize;
        return this.releases()?.slice(start, start + this.pageSize) ?? [];
    });
    
    readonly pages = computed (() => {
        const total = this.totalPages();
        const currentPageIndex = this.currentPageIndex();
        const pages: (number | null)[] = [];
        for (let p = 1; p <= total; p++) {
            if (p === 1 || p === total || Math.abs(p - currentPageIndex) <= 1) {
                pages.push(p);
            }
            else if (pages.at(-1) !== null){
                pages.push(null);
            }
        }
        return pages;
    });

    goTo(page: number, event: Event): void {
        event.preventDefault();
        if (page < 1 || page > this.totalPages() || page === this.currentPageIndex()) return;
        this.currentPageIndex.set(page);
        document.getElementById('releases-title')?.scrollIntoView({ behavior: 'smooth'});
    }

    releases$ = inject(ReleaseService)
        .getAllReleases()
        .pipe(catchError(() => of([] as GitHubRelease[])));
}