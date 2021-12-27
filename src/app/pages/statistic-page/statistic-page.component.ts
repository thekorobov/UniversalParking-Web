import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/api/http.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { CookieService } from 'src/app/services/cookie-service';
import { ParkingStatistic } from 'src/app/Models/parking-statistic';
import { BookingStatistic } from 'src/app/Models/booking-statistic';

export type ParkingTopOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  providers: [HttpService]
})
export class StatisticPageComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent;
    parkingTop: Partial<ParkingTopOptions>;
    freeParkingPlaceChart: Partial<ParkingTopOptions>;
    token: string;
    parkingStatistics: Array<ParkingStatistic>;
    freeParkingPlace: Array<ParkingStatistic>;

    currentChart: String = "Top";

    constructor(private router: Router, private httpService: HttpService) { }

    ngOnInit(): void {
        this.token = CookieService.getCookie('JWT_token')
        if (this.token == null) { return }

        this.httpService.getParkingTop(this.token).subscribe(
            (data: any) => {
                data = data['body'];
                var statistics = new Array<ParkingStatistic>();
                for (var i = 0; i < data.length; ++i) {
                    var statistic = new ParkingStatistic();
                    statistic.parking_id = data[i]['parkingID'];
                    statistic.parking_name = data[i]['parkingName'];
                    statistic.all_free = data[i]['allFree'];
                    statistic.all_booking = data[i]['allBooking'];
                    statistics.push(statistic);
                }

                this.parkingStatistics = statistics;
                this.initializeParkingsTop();
                this.initializeFreeParkingPlace();
            }
        );
    }

    private initializeParkingsTop() {
        var bookingDatas = Array<number>();
        var parkingNames = Array<string>();

        for (var i = 0; i < this.parkingStatistics.length; ++i) {
            var statistic = this.parkingStatistics[i];
            bookingDatas.push(statistic.all_booking);
            parkingNames.push(statistic.parking_name);
        }

        this.parkingTop = {
            series: [
                {
                    name: "Booking",
                    data: bookingDatas
                }
            ],
            chart: {
                type: "bar",
                width: 650,
                height: 350
            },
            title: {
                text: "Booking parkings",
                style: {
                    fontSize: "20px",
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "17px",
                    },
                },
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: "17px",
                    },
                },
                categories: parkingNames
            }
        };
    }

    private initializeFreeParkingPlace() {
        var statistics = new Array<ParkingStatistic>();
        for(var i = 0; i < this.parkingStatistics.length; i++) {
            var parkingID = this.parkingStatistics[i].parking_id;
            this.httpService.getFreeParkingPlaceByParking(this.token, parkingID).subscribe(
                (data: any) => {
                    data = data['body'];
                    var statistic = new ParkingStatistic();
                    statistic.parking_id = data['parkingID'];
                    statistic.parking_name = data['parkingName'];
                    statistic.all_free = data['allFree'];
                    statistic.all_booking = data['allBooking'];
                    statistics.push(statistic);
                }
            );
        }
        this.freeParkingPlace = statistics;
    }

    private initializeFreeParkingPlaceChart() {
        var freePlace = Array<number>()
        var parkingNames = Array<string>()

        this.freeParkingPlace.forEach(place => {
            console.log(place)
            freePlace.push(place.all_free);
            parkingNames.push(place.parking_name);
        })


        this.freeParkingPlaceChart = {
            series: [
                {
                    name: "Free Place",
                    data: freePlace
                }
            ],
            chart: {
                type: "bar",
                width: 650,
                height: 350
            },
            title: {
                text: "Free parking places",
                style: {
                    fontSize: "20px",
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "17px",
                    },
                },
            },
            xaxis: {
                labels: {
                    style: {
                        fontSize: "17px",
                    },
                },
                categories: parkingNames
            }
        };
    }

    onChange(value: any) {
        value = value.target.value;
        this.currentChart = value;
        switch(value) {
            case "Top":
                this.initializeParkingsTop();
                break;
            case "FreePlaces":
                this.initializeFreeParkingPlaceChart();
                break;
        }
    }
}