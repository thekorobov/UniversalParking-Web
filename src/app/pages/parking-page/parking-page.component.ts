import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/api/http.service';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MyParking } from 'src/app/Models/parking';
import { CookieService } from 'src/app/services/cookie-service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-parking-page',
  templateUrl: './parking-page.component.html',
  styleUrls: ['./parking-page.component.scss'],
  providers: [HttpService]
})
export class ParkingPageComponent implements OnInit {

    faPlusSquare = faPlusSquare;
    faTimes = faTimes;
    searchValue = "";
    searchValueControl: FormControl;
    token: string;
    parkings: Array<MyParking>;
    searchParkings: Array<MyParking>;
    currentParkingID: number;

    constructor(private router: Router, private httpService: HttpService) { }

    ngOnInit(): void {
        this.searchParkings = this.parkings;
        this.searchValueControl = new FormControl(this.searchValue);

        this.token = CookieService.getCookie('JWT_token');
        if (this.token == null) { return }
        this.httpService.getParkings(this.token).subscribe({
            next: (data: any) => {
                data = data['body'];
                var parkings = new Array<MyParking>();
                for (var i = 0; i < data.length; ++i) {
                    var myParking = new MyParking();
                    myParking.parking_id = data[i]['parkingID'];
                    myParking.name = data[i]["name"];
                    myParking.address = data[i]["address"];
                    myParking.numberSlots = data[i]["numberSlots"];                  
                    parkings.push(myParking);
                }
                this.parkings = parkings;
                this.searchParkings = parkings;
            }
        });
    }

    onSearchFieldChange(value: any) {
      var t = "TeSt";
      console.log(value.toLowerCase());  
      this.searchValue = value.toLowerCase();
        this.searchParkings = this.parkings.filter(
            x => x.name.toLowerCase().indexOf(this.searchValue) !=- 1 ||
            x.address.toLowerCase().indexOf(this.searchValue) != -1);
    }
    
    onCreateClick() {
        this.router.navigateByUrl("/parking/create");
    }

    onEditClick(parkingID: number) {
        this.router.navigateByUrl(`/parking/edit/${parkingID}`);
    }

    onOpenRemoveModal(parkingID: number) {
        var removeModal = new bootstrap.Modal(document.getElementById("removeParkingModal"), {
            keyboard: false
        });
        removeModal?.show();
        this.currentParkingID = parkingID;
    }

    onRemoveClick() {
        this.httpService.deleteParking(this.token, this.currentParkingID).subscribe(
            (data: any) => {
                this.ngOnInit();
            }
        );
    }

}
