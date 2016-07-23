import {Page, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {NewMatchPage} from '../new-match/new-match';
//import {ScorebLoaderComponent} from '../../components/scoreb-loader/scoreb-loader';

@Page({
  templateUrl: 'build/pages/matches/matches.html'
})

export class MatchesPage{
  constructor(private nav: NavController){
    
  }

  addMatch(){
    this.nav.push(NewMatchPage);
  }
}
