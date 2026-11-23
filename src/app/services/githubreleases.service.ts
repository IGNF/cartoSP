import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";

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

    getAllReleaseNames(): Observable<GitHubRelease[]> {
        return this.http.get<GitHubRelease[]>(this.releasesUrl);
    }
}