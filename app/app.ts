import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {ScorebService} from './providers/scoreb-service/scoreb-service';
import {MatchesPage} from './pages/matches/matches';
import {GamesPage} from './pages/games/games';


@Component({
  providers: [ScorebService],
  template: `
      <ion-menu [content]="content">
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
        <ion-content>
          <ion-list>
            <button ion-item (click)="openPage(matchesPage)">
              <ion-row>
                <ion-col width-10><ion-icon name="clipboard" class="col-md-2"></ion-icon></ion-col>
                <ion-col width-90>Partite</ion-col>
              </ion-row>
            </button>
            <button ion-item (click)="openPage(gamesPage)">
              <ion-row>
                <ion-col width-10><ion-icon name="settings"></ion-icon></ion-col>
                <ion-col width-90>Giochi</ion-col>
              </ion-row>
            </button>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-nav #content id="nav" [root]="rootPage"></ion-nav>
    `
})
export class MyApp {
  private rootPage: any = MatchesPage;
  private matchesPage = MatchesPage;
  private gamesPage = GamesPage;

  constructor(platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page){
    console.log(page);
    this.rootPage = page;
    this.menu.close(); 
  }
}

ionicBootstrap(MyApp);
