import {OnInit} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {ScorebService, Match, Game, Player, Point} from '../../providers/scoreb-service/scoreb-service';

@Page({
    templateUrl: `build/pages/match-detail/match-detail.html`
})

export class MatchDetailPage {
    loading = false;
    match: Match;

    constructor(private nav: NavController, private navParams: NavParams, private service: ScorebService) {
        this.match = navParams.get("match");
    }

    ngOnInit() {
        this.loading = true;
        var giocoLoaded = false;
        var giocatoriLoaded = false;

        this.service.getGame(this.match.game_id).then(  //carico il gioco
            risg => {
                if (risg.res.rows.length > 0) {
                    this.match.game = risg.res.rows[0];
                }
                giocoLoaded = true;
                if (giocatoriLoaded == true && giocoLoaded == true) {
                    this.loading = false;
                    console.log(this.match);
                }
            }
        );
        this.service.getPlayers(this.match.id).then(    //carico i giocatori
            rispl => {
                var rowsPlayers = rispl.res.rows;
                this.match.players = [];
                if (rowsPlayers.length > 0) {
                    for (var i = 0; i < rowsPlayers.length; i++) {
                        this.match.players.push(rowsPlayers[i]);
                        this.match.players[i].points = [];

                        var count = 0;
                        this.service.getPoints(rowsPlayers[i].id).then( //carico i punti
                            rispo => {
                                var rowsPoints = rispo.res.rows;
                                if (rowsPoints.length > 0) {
                                    for (var j = 0; j < rowsPoints.length; j++) {
                                        this.match.players[i].points.push(rowsPoints[j]);
                                    }
                                }
                                count++;
                                if (count == this.match.players.length) {
                                    giocatoriLoaded = true;
                                    if (giocatoriLoaded == true && giocoLoaded == true) {
                                        this.loading = false;
                                        console.log(this.match);
                                    }
                                }
                            }
                        );
                    }
                }
            },
            err => console.error(err)
        );
    }
}