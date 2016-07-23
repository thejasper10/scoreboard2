import {Page, NavController} from 'ionic-angular';
import {ScorebService, Game} from '../../providers/scoreb-service/scoreb-service';
import {GameDetailPage} from '../game-detail/game-detail';

@Page({
  providers: [ScorebService],
  templateUrl: 'build/pages/games/games.html'
})

export class GamesPage {
  games: Game[];
  loading = false;

  constructor(private nav: NavController, private service: ScorebService) {
    this.games = [];
  }

  openGame(event, game) {
    this.nav.push(GameDetailPage, { game: game })
  }

  removeGame() {
    alert("remove");
  }

  addGame() {
    this.nav.push(GameDetailPage, { game: {} });
  }

  ionViewWillEnter() {
    this.loading = true;
    this.service.getGames().then(
      (data) => {
        this.games = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            this.games.push(data.res.rows[i]);
          }
        }
        this.loading = false;
      }
    );
  }
}
