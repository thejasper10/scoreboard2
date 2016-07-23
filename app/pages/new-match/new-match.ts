import {Page, NavController, Toast, ViewController} from 'ionic-angular';
import {ScorebService, Game, Match} from '../../providers/scoreb-service/scoreb-service';
import {Pipe} from '@angular/core';
import {ScorebLib} from '../../scoreb-lib';
import {MatchDetailPage} from '../match-detail/match-detail';

@Page({
    templateUrl: './build/pages/new-match/new-match.html',
    providers: [ScorebService]
})

export class NewMatchPage {
    games: Game[];
    game_id;
    players = [];
    loading = false;

    constructor(private nav: NavController, private service: ScorebService, private viewCtrl: ViewController) {

    }

    ionViewWillEnter() {
        this.loading = true;
        this.players.push({ name: "" });
        this.players.push({ name: "" });
        this.service.getGames().then(
            (data) => {
                this.games = [];
                if (data.res.rows.length > 0) {
                    for (var i = 0; i < data.res.rows.length; i++) {
                        var item = data.res.rows[i];
                        this.games.push(item);
                        if (i == 0) {
                            this.game_id = item.id;
                        }
                    }
                }
                this.loading = false;
            }
        );
    }

    addPlayer() {
        this.players.push({ name: "" });
    }

    onSubmit() {
        var temp = [];
        var nGiocatori = 0;
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].name.length > 0) {
                nGiocatori++;
                temp.push(this.players[i]);
            }
        }
        if (nGiocatori < 2) {
            let toast = Toast.create({
                message: "Ti piace vincere facile? Ci vogliono almeno due giocatori per una partita seria.",
                duration: 3000,
                position: "bottom"
            })

            this.nav.present(toast);
        }
        else {
            var match: Match = new Match();
            var game: Game;
            for(var i = 0; i < this.games.length; i++){
                if(this.games[i].id == this.game_id)
                    game = this.games[i];
            }
            match.game_id = this.game_id;
            match.date = ScorebLib.formatDateSQLite(new Date());

            this.service.addMatch(match).then(
                rism => {
                    var inseriti = 0;
                    match.id = rism.res.insertId;
                    for(var j = 0; j < this.players.length; j++){
                        this.service.addPlayer(match.id,this.players[j].name).then(
                            risp => {
                                inseriti++;
                                if(inseriti == this.players.length){
                                    this.nav.push(MatchDetailPage,{match: match}).then(
                                        () => this.nav.remove(this.viewCtrl.index)
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    }
}