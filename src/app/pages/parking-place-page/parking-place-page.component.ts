import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/api/http.service';
import { CookieService } from 'src/app/services/cookie-service';
import { ParkingPlace } from 'src/app/Models/parkingPlace';
import { faEdit, faPlusSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-parking-place-page',
  templateUrl: './parking-place-page.component.html',
  styleUrls: ['./parking-place-page.component.scss'],
  providers: [HttpService]
})
export class ParkingPlacePageComponent implements OnInit {

  faTimes = faTimes;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  form: FormGroup;
  token: string;
  isCreateAction: boolean;
  parkingPlace: ParkingPlace = new ParkingPlace();
  notification: string;

  constructor(private router: Router, private httpService: HttpService,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.form = new FormGroup({
          ParkingPlaceName: new FormControl('', [Validators.required]),
          Price: new FormControl('', [Validators.required]),
          State: new FormControl('', [Validators.required]),
      });

      this.token = CookieService.getCookie('JWT_token')
      if (this.token == null) { return }

      this.isCreateAction = this.router.url.indexOf("/parkingPlace/create") != -1 ? true: false;
      this.route.params.subscribe((params: any) => {
          if (this.isCreateAction) {
              this.initializeCreationPage(params);
          }
          else {
              this.initializeEditingPage(params);
          }
      });

  }

  private initializeCreationPage(params: any) {
      var parkingID = Number.parseInt(params['parkingID']);
      this.parkingPlace.parking_id = parkingID;
  }

  private initializeEditingPage(params: any) {
      var parkingPlaceID = Number.parseInt(params['parkingPlaceID']);

      this.httpService.getParkingPlaces(this.token, parkingPlaceID).subscribe(
          (data: any) => {
              data = data['body'];
              var parkingPlace = new ParkingPlace();
              parkingPlace.parkingPlace_id = parkingPlaceID;
              parkingPlace.parking_id = data['parkingID'];
              parkingPlace.name = data['name']; 
              parkingPlace.price = Number(data['price']);
              parkingPlace.state = Boolean(data['state']);

              this.parkingPlace = parkingPlace;
              this.initializeData();
          }
      );
  }

  private initializeData() {
      this.form = new FormGroup({
          ParkingPlaceName: new FormControl(this.parkingPlace.name,
              [Validators.required]),
          Price: new FormControl(this.parkingPlace.price,
              [Validators.required]),
          State: new FormControl(this.parkingPlace.state,
              [Validators.required]),
      });
  }

  private openNotificationModal() {
      var notificationModal = new bootstrap.Modal(document.getElementById("notificationModal"), {
          keyboard: false
      });
      notificationModal?.show();
  }
  
  onCreateParkingPlaceClick() {
      if (!this.form?.valid) { 
          this.openNotificationModal();
          return; 
      }
      this.parkingPlace.name = this.form.get("ParkingPlaceName").value;
      this.parkingPlace.price = Number(this.form.get("Price").value);     
      this.parkingPlace.state = Boolean(this.form.get('State').value);

      this.httpService.createParkingPlace(this.token, this.parkingPlace).subscribe(
          (data: any) => {
              if (data.status == 201) {
                  this.router.navigateByUrl(`/parking/edit/${this.parkingPlace.parking_id}`);
              }
          }
      );
  }

  onEditParkingPlaceClick() {
      if (!this.form?.valid) { 
          this.openNotificationModal();
          return; 
      }
      this.parkingPlace.name = this.form.get("ParkingPlaceName").value;
      this.parkingPlace.price = Number(this.form.get("Price").value);     
      this.parkingPlace.state = Boolean(this.form.get('State').value);
      console.log(this.parkingPlace);

      this.httpService.updateParkingPlace(this.token, this.parkingPlace).subscribe(
          (data: any) => {
              if (data.status == 200) {
                  this.ngOnInit();
              }
          }
      );
  }
}
