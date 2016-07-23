import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import {Control, ControlGroup, FormBuilder, Validators} from '@angular/common';

import {ScorebService, Game} from '../../providers/scoreb-service/scoreb-service';

@Page({
    templateUrl: `build/pages/game-detail/game-detail.html`
})

export class GameDetailPage {
    game: Game;
    addMode = false;
    form: ControlGroup;

    constructor(private nav: NavController, private navParams: NavParams, private service: ScorebService, private fb: FormBuilder) {
        this.form = fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            target: ['', Validators.required],
            final_event: ['', Validators.required]
        })

        this.game = navParams.get("game");
    }

    removeGame() {
        this.service.removeGame(this.game.id).then(
            () => {
                this.nav.pop();
            }
        );
    }

    onSubmit() {
        if (this.form.valid == false) {
            let toast = Toast.create({
                message: "Così non andiamo da nessuna parte. Specifica tutti i campi",
                duration: 3000,
                position: "bottom"
            });

            this.nav.present(toast);
        }
        else {
            if (this.game.id != null) {
                this.service.updateGame(this.game).then(
                    () => {
                        console.log("updated");
                        this.nav.pop();
                    }
                );
            }
            else {
                this.service.addGame(this.game).then(
                    () => {
                        console.log("added");
                        this.nav.pop();
                    },
                    (error) => console.error(error)
                )
            }
        }
    }
}