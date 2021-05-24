import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  month;
  year;
  calendar$;
  subscription;
  series:any=null;
  constructor(private http:HttpClient,private calendarService:CalendarService,private seriesService:SeriesService) { }

  ngOnInit(): void {
    
  }
  changeCalendar(year,month){
    this.calendarService.changeDate(year,month)
  }
  
  addSeries(){
    
  }
  get monthToShow(){
    this.calendar$=this.calendarService.calendar$
    this.subscription = this.calendarService.calendar$.subscribe(calendar => {
      this.month= calendar[0][6].fullDate.monthNum+1
    })
    if (this.month<10){
      this.month="0"+this.month
    }
    return this.month
  }
  get yearToShow(){
    this.calendar$=this.calendarService.calendar$
    this.subscription = this.calendarService.calendar$.subscribe(calendar => {
      this.year=calendar[0][6].fullDate.yearNum
    })
    return this.year
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // showConfig() {
    // this.seriesService.getConfig()
    //   .subscribe((data: Config) => this.config = {
    //       heroesUrl: data.heroesUrl,
    //       textfile:  data.textfile,
    //       date: data.date,
    //   });
  // }

}