import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/api/http.service';
import { faEdit, faPlusSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MyParking } from 'src/app/Models/parking';
import { CookieService } from 'src/app/services/cookie-service';
import { CommonValidators } from 'src/app/validators/validators';
import * as bootstrap from 'bootstrap';
import { ParkingPlace } from 'src/app/Models/parkingPlace';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-parking-view-page',
    templateUrl: './parking-view-page.component.html',
    styleUrls: ['./parking-view-page.component.scss'],
    providers: [HttpService]
})

export class ParkingViewPageComponent implements OnInit {

    faPlusSquare = faPlusSquare;
    faTimes = faTimes;
    faTrash = faTrash;
    faEdit = faEdit;
    searchValue = '';
    searchValueControl: FormControl;
    token: string;
    notification: string;
    parking: MyParking = new MyParking();
    isCreateAction: boolean = true;
    form: FormGroup;
    parkingPlaces: Array<ParkingPlace>;
    currentParkingPlaceID: number;

    constructor(private router: Router, private httpService: HttpService,
        private route: ActivatedRoute, public translate: TranslateService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            ParkingName: new FormControl('', [Validators.required]),
            Address: new FormControl('', [Validators.required]),
            NumberSlots: new FormControl('', [Validators.required])
        });

        this.token = CookieService.getCookie('JWT_token')
        if (this.token == null) { return }

        this.route.params.subscribe((params: any) => {
            var parkingID = null;
            if (params['parkingID'] != null) {
              parkingID = Number.parseInt(params['parkingID']);
                this.isCreateAction = false;
            }

            if (!this.isCreateAction) {
                this.httpService.getParkings(this.token, parkingID).subscribe(
                    (data: any) => {
                        data = data['body'];
                        var parking = new MyParking();
                        parking.parking_id = data["parkingID"];
                        parking.name = data["name"];
                        parking.address = data["address"];
                        parking.numberSlots = data["numberSlots"];

                        this.form = new FormGroup({
                          ParkingName: new FormControl(parking.name, [Validators.required]),
                          Address: new FormControl(parking.address, [Validators.required]),
                          NumberSlots: new FormControl(parking.numberSlots, [Validators.required])
                      });

                        this.parking = parking;
                    }
                );
            }

            this.httpService.getParkingPlacesByParking(this.token, parkingID).subscribe(
              (data: any) => {
                  data = data['body'];
                  var parkingPlaces = new Array<ParkingPlace>();
                  for (var i = 0; i < data.length; ++i) {
                      var parkingPlace = new ParkingPlace();
                      parkingPlace.parkingPlace_id = data[i]['parkingPlaceID'];
                      parkingPlace.parking_id = data[i]['parkingID'];
                      parkingPlace.name = data[i]['name'];
                      parkingPlace.price = data[i]['price'];
                      parkingPlace.state = data[i]['state'];

                      parkingPlaces.push(parkingPlace);
                  }

                  this.parkingPlaces = parkingPlaces;
              }
          )
      });
    }

    private openNotificationModal() {
        var notificationModal = new bootstrap.Modal(document.getElementById("notificationModal"), {
            keyboard: false
        });
        notificationModal?.show();
    }
    
    onCreateParkingClick() {
        if (!this.form?.valid) {
            this.translate.get('PARKING.NOTIFICATION').subscribe(
                (res: string) => this.notification = res
            );
            this.openNotificationModal();
            return; 
        }
     
        this.parking.name = this.form.get("ParkingName").value;
        this.parking.address = this.form.get("Address").value;
        this.parking.numberSlots = this.form.get('NumberSlots').value.toString();

        this.httpService.createParking(this.token, this.parking).subscribe(
            (data: any) => {
                console.log(data.status);
                if (data.status == 200) {
                    this.router.navigateByUrl(`/parking`)
                }
            }
        );
    }

    onEditParkingClick() {
        if (!this.form?.valid) {           
            this.translate.get('PARKING.NOTIFICATION').subscribe(
                (res: string) => this.notification = res
            );   
            this.openNotificationModal();
            return; 
        }
        this.parking.name = this.form.get("ParkingName").value;
        this.parking.address = this.form.get("Address").value;
        this.parking.numberSlots = this.form.get('NumberSlots').value.toString();

        this.httpService.updateParking(this.token, this.parking).subscribe(
            (data: any) => {
                if (data.status == 200) {
                    this.ngOnInit();
                }
            }
        );
    }

    onCreateParkingPlaceClick() {
      this.router.navigateByUrl(`parking/${this.parking.parking_id}/parkingPlace/create`);
    }

    onEditClick(parkingPlaceID: number) {
        this.router.navigateByUrl(`parkingPlace/edit/${parkingPlaceID}`);
    }

    onOpenRemoveModal(parkingPlaceID: number) {
        var removeModal = new bootstrap.Modal(document.getElementById('removeParkingPlaceModal'), {
            keyboard: false
        });
        removeModal?.show();
        this.currentParkingPlaceID = parkingPlaceID;
    }

    onRemoveClick() {
        this.httpService.deleteParkingPlace(this.token, this.currentParkingPlaceID)
            .subscribe((data: any) => {
                this.ngOnInit();
            });
    }

}
