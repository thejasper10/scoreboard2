import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

export class Game {
  id: number;
  name: string;
  type: string;
  target: number;
  final_event: string;
}

export class Match {
  id: number;
  game_id: number;
  date: string;
  game: Game;
  players: Player[];
}

export class Player {
  id: number;
  match_id: number;
  player: string;
  points: Point[];
}

export class Point {
  id: number;
  player_id: number;
  point: number;
}

/*
  Generated class for the ScorebService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ScorebService {
  data: any;
  storage: Storage;

  constructor(private http: Http) {
    this.storage = new Storage(SqlStorage);
    //CREATE GAMES
    this.storage.query('CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, target INTEGER, final_event TEXT)');
    //CREATE MATCHES
    this.storage.query('CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY AUTOINCREMENT, game_id INTEGER, date TEXT)');
    //CREATE PLAYERS
    this.storage.query('CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, match_id INTEGER, player TEXT)');
    //CREATE POINTS
    this.storage.query('CREATE TABLE IF NOT EXISTS points (id INTEGER PRIMARY KEY AUTOINCREMENT, player_id INTEGER, point INTEGER)');
  }

  // GAMES
  getGames() {
    return this.storage.query('SELECT * FROM games ORDER BY name');
  }

  getGame(game_id) {
    return this.storage.query("SELECT * FROM games WHERE id = " + game_id);
  }

  addGame(game: Game) {
    let sql = `INSERT INTO games (name, type, target, final_event) VALUES (?,?,?,?)`;
    return this.storage.query(sql, [game.name, game.type, game.target, game.final_event]);
  }

  removeGame(id: number) {
    let sql = `DELETE FROM games WHERE id = '` + id + `'`;
    return this.storage.query(sql);
  }

  updateGame(game: Game) {
    let sql = `UPDATE games SET name = '` + game.name + `', type = '` + game.type + `', target = '` + game.target + `', final_event = '` + game.final_event + `' WHERE id = ` + game.id;
    return this.storage.query(sql);
  }

  // MATCHES
  getMatches() {
    return this.storage.query('SELECT * FROM matches ORDER BY id DESC');
  }

  addMatch(match: Match) {
    let sql = `INSERT INTO matches (game_id, date) VALUES (?,?)`;
    return this.storage.query(sql, [match.game_id, match.date]);
  }

  updateMatchDate() {

  }

  // PLAYERS
  getPlayers(match_id) {
    return this.storage.query(`SELECT * FROM players WHERE match_id = ` + match_id + ` ORDER BY player`);
  }

  addPlayer(match_id, name) {
    let sql = `INSERT INTO players (match_id, player) VALUES (?,?)`;
    return this.storage.query(sql, [match_id, name]);
  }

  //POINTS
  getPoints(player_id) {
    return this.storage.query(`SELECT * FROM points WHERE player_id = ` + player_id);
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
