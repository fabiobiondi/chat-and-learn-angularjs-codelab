# Custom Directives

Cartella: `/3.component-based-app`

---

### Obiettivi
In questa sessione creeremo due direttive, un chart e una tabella di dati, allo scopo di illustrare i seguenti concetti:

* custom directives (scope isolation, controllerAS e bindToController)
* utilizzo dei watcher in directives
* integrazione plugin 3rd party (HighChart)
* comunicazione tra direttive
* ng-repeat nidificati
* custom services

---

### `ReportService`

ReportService espone semplicemente un metodo `getChartData()` per acquisire la configurazione tipica di un chart creato con la libraria HighChart, il cui codice è stato acquisito da una delle demo della libreria.

[Link alla demo statica 'Line Basic Chart'](http://www.highcharts.com/demo/line-basic)

Il seguente modello sarà utilizzato sia per popolare due componenti: il chart e una tabella di dati, realizzati negli step seguenti:


`services/ReportService.js`:

```javascript
angular.module('demoApp')
.service('ReportService', function() {

  // data source: http://www.highcharts.com/demo/line-basic
  this.getChartData = function() {
    return {
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5],
            color: 'pink'
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0],
            color: 'orange'
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0],
            color: 'lightgreen'
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2],
            color: 'lightblue'
        }]
    }
  }
})

```

---

## REPORT view

In questa view saranno inserite due direttive: `<chart>` e `<table-data>` per la visualizzazione dei dati inseriti nel service ReportService.
IL chart visualizzerà 4 serie e altrettanto farà la tabella sottostante.
Al click di una riga della tabella il chart sarà aggiornato e visualizzerà esclusivamente la serie selezionata.


### `<table-data>` component

Inizialmente creiamo la tabella per la sola visualizzazione delle serie che sarà  utilizzata nel template della view Report.


`app/views/reports/reports.tpl.html`:

```html
<div class="container">
  <table-data data="ctrl.tableData"></table-data>
</div>
```

E popolata tramite i dati acquisiti dal controller (o meglio, dal service):

`app/views/reports/ReportCtrl.js`:

```javascript
angular.module('demoApp')

.controller('ReportCtrl', function(ReportService) {
  this.tableData = ReportService.getChartData();
})
```



`components/table-data/TableData.js`:

```javascript
angular.module('demoApp')
.directive('tableData', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/table-data/table-data.tpl.html',
    scope: {
      data: '=',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})

```

`components/table-data/table-data.tpl.html`:

```html
<table class="table table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th ng-repeat="col in ctrl.data.xAxis.categories">{{col}}</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="row in ctrl.data.series">
      <th scope="row" style="color: {{row.color}}">
        {{row.name}}
      </th>
      <td ng-repeat="val in row.data">{{val}}</td>
    </tr>
  </tbody>
</table>

```





---

### `<chart>` component

La direttiva sarà utilizzata nel template della view Report.


`app/views/reports/reports.tpl.html`:

```html
<chart config="ctrl.chartData"></chart>
```

La cui configurazione sarà acquisita dal controller della view:

`app/views/reports/ReportCtrl.js`:

```javascript
angular.module('demoApp')

.controller('ReportCtrl', function(ReportService) {
  this.tableData = ReportService.getChartData();
  this.chartData = angular.copy(this.tableData);
})
```

> Viene utilizzato `angular.copy` per clonare i dati. Perchè? La libreria "highchart" manipola il dato e di conseguenza e causa del binding bidirezionale questo potrebbe modificare irreperabilmente il modello di dati originale (che ci servirà in una fase successiva )




`components/chart/Chart.js`:

```javascript
angular.module('demoApp')

.directive('chart', function() {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div style="width: 100%; height: 300px"></div>',
    scope: {
      config: '=',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($scope, $element) {
       var chart = $($element[0]);

       // watch for config changes
       $scope.$watchCollection(
         function() {
           return this.config;
         }.bind(this),
         function(val) {
           chart.highcharts(val);
         }
       )
    }
  }
})

```

---

### Comunicazione tra direttive

L'obiettivo è quello di permettere all'utente di poter selezionare una riga della <table-data> realizzata in precedenza e aggiornare il chart affinché non mostri più le 4 serie ma solo quella selezionata.

La direttiva `<chart>` è già pronta all'uso e grazie al watcher integrato aggiornerà il chart sulla base dell'attuale configurazione passata come proprietà `config`.

`<table-data>` necessita di ulteriori modifiche al fine di:

1. supportare la selezione di una riga attraverso una nuova proprietà `activeIndex`
2. comunicare verso l'esterno, utilizzando invece il "method" binding e integrando quindi una nuova proprietà `onSelectRow`


`app/views/reports/reports.tpl.html`:

```html
<div class="container">

  <table-data
    data="ctrl.tableData"
    on-select-row="ctrl.updateChart($index, $item)"
    active-index="ctrl.activeIndex"></table-data>

</div>
```


`app/views/reports/ReportCtrl.js`:

```javascript
angular.module('demoApp')

.controller('ReportCtrl', function(ReportService) {
  this.tableData = ReportService.getChartData();
  this.chartData = angular.copy(this.tableData);

  // Update data
  this.updateChart = function(index, row) {
    this.activeIndex = index;
    // Merge original data and override series with the selected one
    this.chartData = angular.extend({},
      // Deep clone of original data model
      angular.merge(this.tableData),
      // Override previous series with the selected one
      {series: [row]}
    );
  }

  // View all series (original data model)
  this.viewAll = function() {
    // remove select row
    this.activeIndex = null;
    // restore original data
    this.chartData = angular.copy(this.tableData);
  }

})

```

> `angular.merge` (Angular 1.4+): Deeply extends the destination object dst by copying own enumerable properties from the src object(s) to dst.

`components/table-data/TableData.js`:


```javascript
angular.module('demoApp')
.directive('tableData', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/table-data/table-data.tpl.html',
    scope: {
      data: '=',
      onSelectRow: '&',
      activeIndex: '=',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
```

`components/table-data/table-data.tpl.html`:

```html
<table class="table table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th ng-repeat="col in ctrl.data.xAxis.categories">{{col}}</th>
    </tr>
  </thead>
  <tbody>
    <tr
      ng-repeat="row in ctrl.data.series"
      ng-click="ctrl.onSelectRow({$index: $index, $item: row})"
      ng-class="{'warning': $index === ctrl.activeIndex}" >
      <th scope="row" style="color: {{row.color}}">
        {{row.name}}
      </th>
      <td ng-repeat="val in row.data">{{val}}</td>
    </tr>
  </tbody>
</table>


```
