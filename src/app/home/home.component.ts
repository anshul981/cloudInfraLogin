import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

declare var gapi: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
    public btnRender(): void {
        const options = {
          scope: 'profile email', 
          width: 250,
          height: 40,
          longtitle: true,
          theme: 'dark',
          onsuccess: (googleUser => {
            let profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            var img = profile.getImageUrl();
            document.getElementById('proflImage').innerHTML = '<img src="' +img+'"/>';
            document.getElementById('userEmail').innerHTML = profile.getEmail();
         // your-code-goes-here
           
          }),
          onfailure: ((error) => {
            console.log('failure', error);
          })
        };
        gapi.signin2.render('googleBtn', options);
        // this.returnUrl = '';
      }
      ngOnInit() {
        this.btnRender();
      }
}
