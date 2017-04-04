import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-active-details-panel',
  templateUrl: './active-details-panel.component.html',
  styleUrls: ['./active-details-panel.component.scss']
})
export class ActiveDetailsPanelComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['scheme'];
      console.log(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
