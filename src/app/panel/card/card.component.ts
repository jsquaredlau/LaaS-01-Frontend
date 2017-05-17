import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cardName: any;
  private businessName: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  @Input() title: any;

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'].replace('%20', ' ');
    if (this.title !== undefined) {
      if (typeof this.title === 'string') {
        this.cardName = this.title;
      } else if (typeof this.title === 'object') {
        this.cardName = this.title.$key;
      }
    }
  }

  public seeDetails(): void {
    this.router.navigate([this.businessName + '/activated/' + this.cardName]);
  }

}
