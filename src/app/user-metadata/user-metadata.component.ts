import { Component, OnInit } from '@angular/core';
import { concatMap, tap, pluck } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-user-metadata',
  templateUrl: './user-metadata.component.html',
  styleUrls: ['./user-metadata.component.css']
})
export class UserMetadataComponent implements OnInit {

 public metadata = {};

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://dev-h2pj9e-7.us.auth0.com/api/v2/users/${user?.sub}`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = {meta}))
    )
    .subscribe();
  }

}
