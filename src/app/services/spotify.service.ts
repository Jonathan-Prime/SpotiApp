import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBIjooDywrXcz9RogweMYqAGdAgQ07tmvPM5NiyvV-s6MfO8f6fKi2PiRVfDJUBikS8ATq6jSiiKAqoZ_4'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => data['albums'].items));
    }
  getArtistas( termino: string ) {

    return this.getQuery(`search?query=${termino}&type=artist&offset=0&limit=15`)
      .pipe( map( data => data['artists'].items));
    }
  getArtista( id: string ) {

      return this.getQuery(`artists/${id}`);
      }
  getTopTracks( id: string ) {

      return this.getQuery(`artists/${id}/top-tracks?country=us`)
        .pipe(map(data => data['tracks']));
      }
}
