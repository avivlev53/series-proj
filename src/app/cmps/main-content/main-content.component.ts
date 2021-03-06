import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { from } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service'
import { SeriesService } from 'src/app/services/series.service'

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  calendar$;
  subscription;
  calendar;
  defaultSeries;

  currYear = new Date().getFullYear()
  currMonth = new Date().getMonth()
  currDay = new Date().getDate()//המספר הנכון של היום

  constructor(private calendarService: CalendarService, private seriesService: SeriesService, private eventBus: NgEventBus) { }

  ngOnInit(): void {
    this.calendar$ = this.calendarService.calendar$
    this.subscription = this.calendarService.calendar$.subscribe(calendar => {
      console.log('Got calendar!', calendar);
      this.calendar = JSON.parse(JSON.stringify(calendar))
    })
    this.loadCalendar(this.currYear, this.currMonth, this.currDay)
    this.loadSeries()

  }
 
  updateCalendar({ year, month }) {
    this.calendarService.changeDate(year, month)
  }
  loadCalendar(year, month, day) {
    this.calendarService.query(year, month, day)
  }
  loadSeries() {
    // this.seriesService.addDefaultSeriesToCalendar()
    this.calendarService.addSeiresToCalendar()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
