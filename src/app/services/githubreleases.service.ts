import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap} from "rxjs";

export interface GitHubRelease {
    tag_name: string;
    name: string | null;
    published_at: string;
    body: string | null;
}

@Injectable({ 
    providedIn: 'root'
})
export class ReleaseService {
    private http = inject(HttpClient);
    private releasesUrl = 'https://api.github.com/repos/IGNF/cartoSP/releases';
    private cacheKey = 'cartosp.releases';
    private ttl= 60 * 60 * 1000;

    getAllReleases(): Observable<GitHubRelease[]> {
        const cached = this.readCache();
        if (cached) return of(cached);

        return this.http.get<GitHubRelease[]>(this.releasesUrl).pipe(
            tap((releases) => this.writeCache(releases))
        );
    }

    private readCache(): GitHubRelease[] | null {
        try {
            const raw = localStorage.getItem(this.cacheKey);
            if (!raw) return null;
            const { date, data } = JSON.parse(raw);
            return Date.now() - date < this.ttl ? data : null;
        } catch {
            return null;
        }
    }

    private writeCache(data: GitHubRelease[]): void {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify({ date: Date.now(), data}));
        } catch { 
            console.log("Erreur pendant l'écriture du cache.") 
        }
    }

}