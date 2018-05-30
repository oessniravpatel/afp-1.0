import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesUserService } from '../services/sales-user.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
declare var AmCharts: any;
declare var $,PerfectScrollbar: any;

@Component({
  selector: 'app-sales-user-details',
  providers: [ SalesUserService ],
  templateUrl: './sales-user-details.component.html',
  styleUrls: ['./sales-user-details.component.css']
})
export class SalesUserDetailsComponent implements OnInit {
  domainData;
  domainDatapre;
  ratingscale;
  areaksa;
  rcourse;
  ksaList;
  allcourse;
  assessmentData;
  constructor( private http: HttpClient,private SalesUserService: SalesUserService,private globals: Globals, private route: ActivatedRoute,private router: Router) { }



  ngOnInit() {  debugger
   this.assessmentData='';


let id = this.route.snapshot.paramMap.get('id');    
this.SalesUserService.getUserAssessDetail(id)
.then((data) => 
{ 
  if(data=='fail'){
    this.router.navigate(['/dashboard']);
  } else {debugger
    this.domainData = data['domain'];
    this.domainDatapre = data['perdomain'];
    this.ratingscale=data['ratingscale'];
    this.areaksa=data['areaksa'];
    this.rcourse=data['rcourse'];
    this.allcourse=data['allcourse'];
    this.ksaList = data['ksa'];
    this.assessmentData = data['assessment'];
    // this.rscaleData = data['rscale'];
      var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      for(let obj of this.domainData)
        {
          let j = this.domainData.indexOf(obj);
          this.domainData[j].color = colorarray[j];
          if(this.domainData[j].ratingscale<=1){
            this.domainData[j].rscalename = "General Awareness";
          } else if(this.domainData[j].ratingscale<=2){
            this.domainData[j].rscalename = "Developing";
          } else if(this.domainData[j].ratingscale<=3){
            this.domainData[j].rscalename = "Intermediate";
          } else if(this.domainData[j].ratingscale<=4){
            this.domainData[j].rscalename = "Advanced";
          }  
        }
     
      var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      for(let obj of this.domainDatapre)
        {
          let j = this.domainDatapre.indexOf(obj);
          this.domainDatapre[j].color = colorarray[j];
        }

        var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      for(let obj of this.ratingscale)
        {
          let j = this.ratingscale.indexOf(obj);
          this.ratingscale[j].color = colorarray[j];
        }

        var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
        for(let obj of this.areaksa)
          {
            let j = this.areaksa.indexOf(obj);
            this.areaksa[j].color = colorarray[j];
          }
    var chart = AmCharts.makeChart("gneraluser_result", {
      "type": "serial",
      "startDuration": 0,
      "dataProvider": this.domainData,
      "valueAxes": [{
        "position": "left",
        "title": "Rating Scale",
      "axisAlpha": 1, 
      "titleFontSize" : 16,
      "integersOnly": true,
        "minimum": 0,
      "maximum": 5,
      "precision" : 0,
        "dashLength": 5
      }],
      "categoryField": "domain",
      "categoryAxis": {
        "gridPosition": "start",
      "title": "Domains",
      "axisAlpha": 1, 
      "titleFontSize" : 16,
      "dashLength": 5,
        "autoWrap": true
      },
		   "responsive": {
			"enabled": true
			},
      "graphs": [{
        "balloonText": "<b>[[rscalename]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 1,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "ratingscale",
      "fixedColumnWidth": 30,
      "labelText" : "[[value]]"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      }
    });


    var chart = AmCharts.makeChart( "domain_chart", {
      "type": "pie",
     "startDuration": 0,
      "dataProvider": this.domainDatapre,
      "valueField": "value",
      "titleField": "domain",
      "labelRadius": -20,
      "labelText": "[[percents]]%",
      "labelTickColor": "#FFFFFF",
      "color" : "#fff",
      "labelColorField": "#FFFFFF",
      // "balloonText": "",
      "colorField": "color",
      "percentPrecision" : 0,
      "balloon":{
         "fixedPosition":true
      },
     "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
      "export": {
        "enabled": false
      }
    });
    var chart = AmCharts.makeChart( "scale_chart", {
      "type": "pie",
     "startDuration": 0,
      "dataProvider": this.ratingscale,
      "valueField": "value",
      "titleField": "domain",
      "labelRadius": -20,
      "labelText": "[[percents]]%",
      "labelTickColor": "#FFFFFF",
      "color" : "#fff",
      "labelColorField": "#FFFFFF",
      // "balloonText": "",
      "colorField": "color",
      "percentPrecision" : 0,
      "balloon":{
         "fixedPosition":true
      },
		   "responsive": {
			"enabled": true
			},
      "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
      "export": {
        "enabled": false
      }
    });
    var chart = AmCharts.makeChart( "ca_chart", {
        "type": "pie",
       "startDuration": 0,
        "dataProvider": this.areaksa,
        "valueField": "value",
        "titleField": "domain",
        "labelRadius": -20,
        "labelText": "[[percents]]%",
        "labelTickColor": "#FFFFFF",
        "color" : "#fff",
        "labelColorField": "#FFFFFF",
        // "balloonText": "",
        "colorField": "color",
        "percentPrecision" : 0,
        "balloon":{
         	"fixedPosition":true
        },
		   "responsive": {
			"enabled": true
			},
        "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
        "export": {
          "enabled": false
        }
      });
      new PerfectScrollbar('.preview_ksa .scroll_table');
   new PerfectScrollbar('.course_rec .scroll_course');
  }
}, 
(error) => 
{
  alert('error');
});	 

}

  


}
