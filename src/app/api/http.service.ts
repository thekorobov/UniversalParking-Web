import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConstants } from "./ApiConstants";
import { User } from 'src/app/Models/user';
import { MyParking } from "../Models/parking";
import { ParkingPlace } from "../Models/parkingPlace";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        const headers = { 'content-type': 'application/json' }
        const body = {
            email: user.email,
            name: user.username,
            password: user.password,
            role: user.role
        };
        var register_url = ApiConstants.main_url.toString() + ApiConstants.register_url.toString()
        return this.http.post(register_url, body, { 'headers': headers, observe: 'response' });
    }

    loginUser(email: string, password: string) {
        const headers = { 'content-type': 'application/json' }
        const body = {
            email: email,
            password: password
        };
        var login_url = ApiConstants.main_url.toString() + ApiConstants.login_url.toString()
        return this.http.post(login_url, body, { 'headers': headers, observe: 'response' });
    }

    getProfile(token: string) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var profile_url = ApiConstants.main_url.toString() + ApiConstants.profile_url.toString()
        return this.http.get(profile_url, { 'headers': headers, observe: 'response' });
    }

    updateUserProfile(token: string, user: User) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var body;
        if (user.password != null) {
            body = {
                email: user.email,
                name: user.username,
                password: user.password
            };
        } else {
            body = {
                email: user.email,
                name: user.username
            };
        }
        var profile_url = ApiConstants.main_url.toString() + ApiConstants.profile_url.toString()
        return this.http.put(profile_url, body, { 'headers': headers, observe: 'response' });
    }

    createParking(token: string, parking: MyParking) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        const body = {
            name: parking.name,
            address: parking.address,
            numberSlots: parking.numberSlots,
        };
        var parking_url = ApiConstants.main_url.toString() + ApiConstants.parking_url.toString()
        return this.http.post(parking_url, body, { 'headers': headers, observe: 'response' });
    }


    getParkings(token: string, parkingID: number = null) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var parking_url = ApiConstants.main_url.toString() + ApiConstants.parking_url.toString();
        if (parkingID != null) {
            parking_url += parkingID.toString() + "/";
        }
        return this.http.get(parking_url, { 'headers': headers, observe: 'response' });
    }

    updateParking(token: string, parking: MyParking) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        const body = {
            name: parking.name,
            address: parking.address,
            numberSlots: parking.numberSlots,
        };
        var parking_url = ApiConstants.main_url.toString() + ApiConstants.parking_url.toString() + parking.parking_id.toString() + "/"
        return this.http.put(parking_url, body, { 'headers': headers, observe: 'response' });
    }

    deleteParking(token: string, parkingID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var parking_url = ApiConstants.main_url.toString() + ApiConstants.parking_url.toString() + parkingID.toString() + "/"
        return this.http.delete(parking_url, { 'headers': headers, observe: 'response' });
    }

    createParkingPlace(token: string, parkingPlace: ParkingPlace) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        const body = {
            parkingID: parkingPlace.parking_id,
            name: parkingPlace.name,
            price: parkingPlace.price,
            state: parkingPlace.state
        };
        var parkingPlace_url = ApiConstants.main_url.toString() + ApiConstants.parkingPlace_url.toString()
        return this.http.post(parkingPlace_url, body, { 'headers': headers, observe: 'response' });
    }

    getParkingPlaces(token: string, parkingPlaceID: number = null) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var parkingPlace_url = ApiConstants.main_url.toString() + ApiConstants.parkingPlace_url.toString()
        if (parkingPlaceID != null) {
            parkingPlace_url += parkingPlaceID.toString() + "/";
        }
        return this.http.get(parkingPlace_url, { 'headers': headers, observe: 'response' });
    }
    
    getParkingPlacesByParking(token: string, parkingID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var parkingPlace_url = ApiConstants.main_url.toString() +
            ApiConstants.parkingPlacesByParking_url.toString() +
            parkingID.toString() + "/";
        return this.http.get(parkingPlace_url, { 'headers': headers, observe: 'response' });
    }

    updateParkingPlace(token: string, parkingPlace: ParkingPlace) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        const body = {
            parkingID: parkingPlace.parking_id,
            name: parkingPlace.name,
            price: parkingPlace.price,
            state: parkingPlace.state
        };
        var parkingPlace_url = ApiConstants.main_url.toString() + 
            ApiConstants.parkingPlace_url.toString() + parkingPlace.parkingPlace_id.toString() + "/"
        return this.http.put(parkingPlace_url, body, { 'headers': headers, observe: 'response' });
    }

    deleteParkingPlace(token: string, parkingPlaceID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var parkingPlace_url = ApiConstants.main_url.toString() + 
            ApiConstants.parkingPlace_url.toString() + parkingPlaceID.toString() + "/"
        return this.http.delete(parkingPlace_url, { 'headers': headers, observe: 'response' });
    }

    getParkingTop(token: string) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var statistics_url = ApiConstants.main_url.toString() + 
            ApiConstants.statistics_url.toString();
        return this.http.get(statistics_url, {'headers': headers, observe: 'response'});
    }

    
    getFreeParkingPlaceByParking(token: string, parkingID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var statistics_url = ApiConstants.main_url.toString() + 
            ApiConstants.statistics_url.toString() + parkingID.toString();
        return this.http.get(statistics_url, {'headers': headers, observe: 'response'});
    }

    getBookingStatisticsByParking(token: string, parkingID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var statistics_url = ApiConstants.main_url.toString() + 
            ApiConstants.statistics_url.toString() + parkingID.toString() + "/";
        return this.http.get(statistics_url, {'headers': headers, observe: 'response'});
    }

    getUsers(token: string, userID: number = null) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var user_url = ApiConstants.main_url.toString() + ApiConstants.admin_url.toString()
        if (userID != null) {
            user_url += userID.toString() + "/";
        }
        return this.http.get(user_url, { 'headers': headers, observe: 'response' });
    }

    updateUserProfileByAdmin(token: string, user: User) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var body;
        if (user.password != null) {
            body = {
                email: user.email,
                name: user.username,
                password: user.password
            };
        } else {
            body = {
                email: user.email,
                name: user.username
            };
        }
        var user_url = ApiConstants.main_url.toString() + ApiConstants.admin_url.toString() +
            user.user_id.toString() + "/";
        return this.http.put(user_url, body, { 'headers': headers, observe: 'response' });
    }

    deleteUser(token: string, userID: number) {
        const headers = { 'Authorization': 'Bearer ' + token, 'content-type': 'application/json' }
        var user_url = ApiConstants.main_url.toString() + ApiConstants.admin_url.toString() +
            userID.toString() + "/";
        return this.http.delete(user_url, { 'headers': headers, observe: 'response' });
    }
}