# From static to Angular

## Istruzioni per convertire un template statico Bootstrap in un'applicazione Angular  

Template statico -> cartella: `/1.static-template`

Template dinamico -> cartella: `/2.angular-app`

---

### Obiettivi

* utilizzo di Bower per la gestione dipendenze
* homepage data-driven, utilizzo dei controller e del binding bidirezionale
* applicazione multi-view utilizzando il router (passaggio parametri)
* styling dinamico
* utilizzo di direttive e servizi inclusi nel framework

---

### Utilizzare Bower per includere le librerie necessarie

```bash
bower init
bower install angular --save
bower install angular-route --save
bower install bootstrap --save
```
---
### Rimuovere la CDN di Bootstrap e includere Angular, Angular Router e Bootstrap CSS in `index.html`:

```html
<!-- styles -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="css/core.css">

<!-- vendors -->
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-route/angular-route.min.js"></script>

```



---
### Definire il modulo principale dell'applicazione

```html
<html lang="en" ng-app="demoApp">
```
> A module is a collection of services, directives, controllers, filters, and configuration information


---
### Creare il file `app/app.js` nel quale sarà creato il modulo `demoApp` e in cui sarà iniettato il modulo `ngRoute`:

```javascript
angular.module('demoApp', [])
```

---

### Home Controller

Creare il controller della home in `app.js`:

```javascript
angular.module('demoApp')

.controller('HomePageCtrl', function($http, URL){
  // Jumbotron hard coded info
  this.title = 'Marketing stuff!';
  this.description = 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.';
  this.button = 'Get started today';
  this.buttonLink = '/news';

  // Get News
  $http.get('http://jsonplaceholder.typicode.com/posts')
      .then(function(result){
        // display just 3 elements
        this.news = result.data.splice(0,3);
      }.bind(this));
});

```

> In the `http` callback, `this` binds to the global object 'window' (infact, this `this == window` would be true) so we use `bind(this)` to change the context to the controller.



```html
<div ng-controller="HomePageCtrl as ctrl">

  <!-- Jumbotron -->
  <div class="jumbotron">
    <h1>{{ctrl.title}}</h1>
    <p class="lead">{{ctrl.description}}</p>
    <p><a class="btn btn-lg btn-success" ng-href="#{{ctrl.buttonLink}}" role="button">{{ctrl.button}}</a></p>
  </div>

  <!-- Example row of columns -->
  <div class="row">
    <div class="col-lg-4" ng-repeat="item in ctrl.news">
      <h2>{{item.title}}</h2>
      <p>{{item.body}}</p>
      <p><a class="btn btn-primary" ng-href="#/news/{{item.id}}" role="button">View details &raquo;</a></p>
    </div>
  </div>

</div>
```
---




### Spostare l'url in un `value` service e iniettarlo nel controller `HomePageCtrl`:

Creare un oggetto value con l'url base di ogni servizio REST invocato:
```javascript
.value('URL', 'http://jsonplaceholder.typicode.com')
```

> A `value` is a short way for registering a service such as a string, a number, an array, an object or a function, but you cannot inject other services into a value service.



e utilizzarlo nel controller (sarà successivamente utilizzando nella sezione News):

```javascript
angular.module('demoApp', [])
.controller('HomePageCtrl', function($http, URL){
  ...
  $http.get(URL + '/posts')
  ...
})
```




---

### Suddividere l'applicazione in views
Spostare controller e template della Home, creati nello step precedente, in due file distinti: `app/views/homepage/HomePageCtrl` e `app/views/homepage/homepage.tpl.html`

---


### ROUTER

Aggiungere il modulo `ngRoute` come dipendenza del modulo principale:

```html
angular.module('demoApp', ['ngRoute'])
```

Creare il file `app/router.js` che sarà incluso in `index.html` con le regole del routing (al momento solo della home):

```javascript
angular.module('demoApp')

.config(function($routeProvider) {

  $routeProvider
    .when('/homepage',
    {
      templateUrl: 'app/views/homepage/homepage.tpl.html',
      controller: 'HomePageCtrl',
      controllerAs: 'ctrl'
    })
    .when('/contacts',
      {
        templateUrl: 'app/views/contacts/contacts.tpl.html',
        controller: 'ContactPageCtrl',
        controllerAs: 'ctrl'
      })
    .otherwise({redirectTo: 'homepage'});
});



```



Accertarsi di aver incluso sia la libreria `angular-router` che `router.js` in `index.html`:

```html
<script src="bower_components/angular-route/angular-route.min.js"></script>
<script src="app/router.js"></script>
```




---
### `ng-view`

Inserire la direttiva `ng-view` nel file index.html proprio sotto la navigation bar:


```html
<div ng-view></div>
```




---

### Navigation Bar

In `index.html` inserire gli attributi `href` con i link alle view:

```html
<nav>
  <ul class="nav nav-justified">
    <li><a href="#/homepage">Homepage</a></li>
    <li><a href="#/news">News</a></li>
    <li><a href="#/reports">Reports</a></li>
    <li><a href="#/contacts">Contacts</a></li>
  </ul>
</nav>
```


In 'app.js' creare il controller della Navigation Bar:

```javascript
angular.module('demoApp', ['ngRoute'])

.controller('NavBarCtrl', function($location, $rootScope){
  $rootScope.$on('$routeChangeSuccess', function(scope, current, pre) {
    this.active = $location.path();
  }.bind(this))
})

```


In `index.html` utilizzare la direttiva `ng-class` per evidenziare la pagina corrente

```html
<nav>
  <ul class="nav nav-justified">
    <li ng-class="{'active': ctrl.active === '/homepage'}"><a href="#/homepage">Homepage</a></li>
    <li ng-class="{'active': ctrl.active === '/news'}"><a href="#/news">News</a></li>
    <li ng-class="{'active': ctrl.active === '/reports'}"><a href="#/reports">Reports</a></li>
    <li ng-class="{'active': ctrl.active === '/contacts'}"><a href="#/contacts">Contacts</a></li>
  </ul>
</nav>
```


---

### PAGINA NEWS


`app/router.js`

Aggiungere la regola del router della sezione News:

```javascript
.config(function($routeProvider) {

  $routeProvider
    ...
    .when('/news',
      {
        templateUrl: 'app/views/news/news.tpl.html',
        controller: 'NewsCtrl',
        controllerAs: 'ctrl'
      })
    ...
});
```



La pagina News avrà un controller molto simile alla home:

`app/views/news/NewsCtrl.js`:

```javascript
angular.module('demoApp')

.controller('NewsCtrl', function($http, URL){
  // get news
  $http.get(URL + '/posts')
      .then(function(result){
        this.news = result.data;
      }.bind(this));
})

```

Nel template della view "News" non saranno solo visualizzate le news ma sarà inserito anche un filtro di ricerca client side:


`app/views/news/news.tpl.html`:

``` html
<div class="container">

    <h2>NEWS</h2>

    <!-- SEARCH -->
    <input type="search" class="form-control"
           ng-model="ctrl.search"
           placeholder="search something">

    <hr>

    <!-- NEWS LIST -->
    <div class="row">
      <div class="col-lg-4" ng-repeat="item in ctrl.news | filter: ctrl.search">
        <h2>{{item.title}}</h2>
        <p>{{item.body}}</p>
        <p><a class="btn btn-primary" ng-href="#/news/{{item.id}}" role="button">View details &raquo;</a></p>
      </div>
    </div>


</div>
```




---



### Dettaglio News

`app/router.js`:

```javascript
angular.module('demoApp')

.config(function($routeProvider) {

  $routeProvider
    ...
    .when('/news/:id',
      {
        templateUrl: 'app/views/news/news.details.tpl.html',
        controller: 'NewsDetailCtrl',
        controllerAs: 'ctrl'
      })
    ...
});
```


Acquisire l'id della news dall'url e invocare il servizio REST per l'acquisizione dei dati:


`app/views/news/NewsDetailsCtrl.js:`

```javascript
angular.module('demoApp')

.controller('NewsDetailCtrl', function($routeParams, $http, URL){
  // Get user ID from URL
  var id = $routeParams.id;
  // Get news details
  $http.get(URL + '/posts/' + id)
      .then(function(result){
        this.news = result.data;
      }.bind(this));
});
```

`app/views/news/news.details.tpl.html`:


```html
<h1>{{ctrl.news.title}}</h1>
<p>{{ctrl.news.body}}</p>

<a class="btn btn-primary" href="#/news">back</a>
```


---


### PROSSIMI STEP

* Refactoring dell'attuale versione: approccio component-based
* Suddividere Navigation Bar e Footer in componenti (custom  directives)
* Ripulire DOM e controller delle view 'home' e 'news' suddividendo il codice in direttive
* Suddividere le richieste al server (REST) in servizi (custom services)
* Creare la pagina Report con grafici e tabelle:
  * direttive con integrazione 3rd party libraries
  * comunicazione tra direttive
  * ng-repeat nidificati
