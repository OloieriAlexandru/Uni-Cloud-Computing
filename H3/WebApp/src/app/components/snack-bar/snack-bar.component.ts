import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public text: string = "";
  public error: boolean = true;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.text = data.message;
    this.error = data.error;
  }

  ngOnInit() {
  }
}
