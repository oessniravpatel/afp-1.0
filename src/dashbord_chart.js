var chart = AmCharts.makeChart("dashboard_result_bar1", {
  "type": "serial",
  "startDuration": 0,
  "dataProvider": [{
    "domain": "Strategy",
    "ratingscale": 4,
    "color": "#001F49"
  }, {
    "domain": "Gathering and Analyzing Information",
    "ratingscale": 2,
    "color": "#799628"
  }, {
    "domain": "Budgeting and Financal Principles",
    "ratingscale": 4,
    "color": "#F79317"
  }, {
    "domain": "Forecasting with Systems and Tools",
    "ratingscale": 1,
    "color": "#1BAC98"
  }, {
    "domain": "Communication and Presentation Techniques",
    "ratingscale": 3,
    "color": "#65287E"
  }, {
    "domain": "Business Partnering",
    "ratingscale": 2,
    "color": "#B8044A"
  }],
  "valueAxes": [{
    "position": "left",
	"axisAlpha": 1, 
	"integersOnly": true,
    "minimum": 0,
	"maximum": 5,
	"precision" : 0,
    "dashLength": 5
  }],
  "categoryField": "domain",
  "categoryAxis": {
    "gridPosition": "start",
	"axisAlpha": 1, 
	"titleFontSize" : 1,
	"dashLength": 5,
	"labelsEnabled": false
  },
  "graphs": [{
    "balloonText": "<b>[[category]]: [[value]]</b>",
    "fillColorsField": "color",
    "fillAlphas": 1,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "ratingscale",
	"fixedColumnWidth": 20,
	"labelText" : "[[value]]"
  }],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  }
});

var chart = AmCharts.makeChart("dashboard_result_bar2", {
  "type": "serial",
  "startDuration": 0,
  "dataProvider": [{
    "domain": "Strategy",
    "ratingscale": 2,
    "color": "#001F49"
  }, {
    "domain": "Gathering and Analyzing Information",
    "ratingscale": 4,
    "color": "#799628"
  }, {
    "domain": "Budgeting and Financal Principles",
    "ratingscale": 1,
    "color": "#F79317"
  }, {
    "domain": "Forecasting with Systems and Tools",
    "ratingscale": 1,
    "color": "#1BAC98"
  }, {
    "domain": "Communication and Presentation Techniques",
    "ratingscale": 4,
    "color": "#65287E"
  }, {
    "domain": "Business Partnering",
    "ratingscale": 3,
    "color": "#B8044A"
  }],
  "valueAxes": [{
    "position": "left",
	"axisAlpha": 1, 
	"integersOnly": true,
    "minimum": 0,
	"maximum": 5,
	"precision" : 0,
    "dashLength": 5
  }],
  "categoryField": "domain",
  "categoryAxis": {
    "gridPosition": "start",
	"axisAlpha": 1, 
	"titleFontSize" : 1,
	"dashLength": 5,
	"labelsEnabled": false
  },
  "graphs": [{
    "balloonText": "<b>[[category]]: [[value]]</b>",
    "fillColorsField": "color",
    "fillAlphas": 1,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "ratingscale",
	"fixedColumnWidth": 20,
	"labelText" : "[[value]]"
  }],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  }
});

var chart = AmCharts.makeChart("dashboard_result_bar3", {
  "type": "serial",
  "startDuration": 0,
  "dataProvider": [{
    "domain": "Strategy",
    "ratingscale": 1,
    "color": "#001F49"
  }, {
    "domain": "Gathering and Analyzing Information",
    "ratingscale": 2,
    "color": "#799628"
  }, {
    "domain": "Budgeting and Financal Principles",
    "ratingscale": 1,
    "color": "#F79317"
  }, {
    "domain": "Forecasting with Systems and Tools",
    "ratingscale": 4,
    "color": "#1BAC98"
  }, {
    "domain": "Communication and Presentation Techniques",
    "ratingscale": 3,
    "color": "#65287E"
  }, {
    "domain": "Business Partnering",
    "ratingscale": 4,
    "color": "#B8044A"
  }],
  "valueAxes": [{
    "position": "left",
	"axisAlpha": 1, 
	"integersOnly": true,
    "minimum": 0,
	"maximum": 5,
	"precision" : 0,
    "dashLength": 5
  }],
  "categoryField": "domain",
  "categoryAxis": {
    "gridPosition": "start",
	"axisAlpha": 1, 
	"titleFontSize" : 1,
	"dashLength": 5,
	"labelsEnabled": false
  },
  "graphs": [{
    "balloonText": "<b>[[category]]: [[value]]</b>",
    "fillColorsField": "color",
    "fillAlphas": 1,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "ratingscale",
	"fixedColumnWidth": 20,
	"labelText" : "[[value]]"
  }],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  }
});