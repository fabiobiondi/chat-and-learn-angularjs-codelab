# From Angular Spaghetti to Components

Template di partenza -> cartella: `/2.angular-app`

Template finale -> cartella: `/3.component-based-app`


---

### Obiettivi

* approccio component-based in AngularJS
* organizzazione layout in direttive
* utilizzo di custom directives (scope isolation, controllerAS e bindToController)
* utilizzo di custom services per la gestione dei dati hard coded e la comunicazione con il server


---

### `<app-footer>` component


Rimuovere il codice HTML del footer da `index.html` e creare una direttiva <app-footer>:


`components/footer/app-footer.tpl.html`:

```html
<footer class="footer">
  <p>&copy; 2016 Company, Inc. Inspired by this <a href="http://getbootstrap.com/examples/justified-nav/#">Bootstrap 3 Template</a></p>
</footer>
```

`components/footer/AppFooter.js`:

```javascript

angular.module('demoApp')
.directive('appFooter', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/footer/app-footer.tpl.html',
    scope: {  },
  }
})

```

Includere il file della direttiva in `index.html`:

```html
<!-- components -->
<script src="app/components/footer/AppFooter.js"></script>
```

e inserire la direttiva al posto del precedente DOM:

```html
...
<div ng-view></div>
<app-footer></app-footer>
```







---

### `<navigation-bar>` component

Spostare il markup della navigation bar da `index.html` al template di una direttiva custom:

`components/navbar/navigation.tpl.html`:

```html
<div class="masthead">
 <h3 class="text-muted">Angular CodeLab</h3>
 <nav>
   <ul class="nav nav-justified">
     <li ng-class="{'active': ctrl.active === '/homepage'}"><a href="#/homepage">Homepage</a></li>
     <li ng-class="{'active': ctrl.active === '/news'}"><a href="#/news">News</a></li>
     <li ng-class="{'active': ctrl.active === '/reports'}"><a href="#/reports">Reports</a></li>
     <li ng-class="{'active': ctrl.active === '/contacts'}"><a href="#/contacts">Contacts</a></li>
   </ul>
 </nav>
</div>

```


Creare la direttiva `navigationBar` nel quale sarà inserito  il codice per la gestione dello stato `active`.

> E' quindi necessario eliminare il controller `NavBarCtrl` presente in `app.js` creato in precedenza!


`components/navbar/NavigationBar.js`:

```javascript
angular.module('demoApp')
.directive('navigationBar', function($rootScope, $location) {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/navbar/navigation.tpl.html',
    scope: {},
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($scope) {
      $rootScope.$on('$routeChangeSuccess', function() {
        this.active = $location.path();
      }.bind(this))
    }
  }
})
```

`bindTocontroller`: le proprietà del componente sono legate al controller e non allo scope.

> In the `http` callback, `this` binds to the global object 'window' (infact, this `this == window` would be true) so we use `bind(this)` to change the context to the controller.



Includere il file della direttiva in `index.html`:

```html
<!-- components -->
<script src="app/components/navbar/NavigationBar.js"></script>
```

e inserire la direttiva al posto del precedente DOM.
Ecco come si presenterà ora il DOM del file `index.html`:

```html
<div class="container">
  <navigation-bar></navigation-bar>
  <div ng-view></div>
  <app-footer></app-footer>
</div>
```





---
### `NewsService`

Eliminare i dati hard coded e richieste XHR dal controller da `HomePageCtrl` e spostarle in un servizio ad hoc.
Includere e spostare inoltre il servizio `URL` (`value`) presente in `app.js`:

`services/NewsService.js`:

```javascript

angular.module('demoApp')
.value('URL', 'http://jsonplaceholder.typicode.com')

.service('NewsService', function($http, URL) {

  this.getIntro = function() {
    return {
      title: 'Marketing stuff!',
      description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.',
      button: 'Get started today',
      buttonLink: '/news'
    };
  }

  this.getPosts = function() {
    return $http.get(URL + '/posts/');
  }

  this.getPost = function(id) {
    return $http.get(URL + '/posts/' + id);
  }

});


```


## HOMEPAGE Update

Modificare il controller della Home eliminando il codice precedente e utilizzando il nuovo service `NewsService`:

```javascript
angular.module('demoApp')

.controller('HomePageCtrl', function(NewsService) {
  //jumbotron data
  this.introObj = NewsService.getIntro();
  // news data
  NewsService.getPosts()
      .then(function(result){
        this.news = result.data.slice(0, 3);
      }.bind(this));
});

```


### `<jumbotron`> component

Spostare il markup del jumbotron presente `homepage.tpl.html` nel template della nuova direttiva `<jumbotron>`:


`components/jumbotron/jumbotron.tpl.html`:

```html
<!-- Jumbotron -->
<div class="jumbotron">
  <h1>{{ctrl.title}}</h1>
  <p class="lead">{{ctrl.description}}</p>
  <p><a class="btn btn-lg btn-success" ng-href="#{{ctrl.link}}" role="button">{{ctrl.button}}</a></p>
</div>
```

`components/jumbotron/Jumbotron.js`:


```javascript
angular.module('demoApp')
.directive('jumbotron', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/jumbotron/jumbotron.tpl.html',
    scope: {
      title: '@',
      description: '@',
      button: '@',
      link: '@'
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
```

> scope prefix `@` -> 1-way-binding (aka 'string method): utilizzato per accedere a stringhe definite al di fuori della direttiva.



Includere il file della direttiva in `index.html`:

```html
<script src="app/components/jumbotron/Jumbotron.js"></script>
```

e inserire il tag `<jumbotron>` al posto del precedente DOM in 'app/views/homepage/homepage.tpl.html':

```html
<!-- Jumbotron -->
<jumbotron
  title="{{ctrl.introObj.title}}"
  description="{{ctrl.introObj.description}}"
  button="{{ctrl.introObj.button}}"
  link="{{ctrl.introObj.buttonLink}}"
></jumbotron>
```




---

### <post-list> (news) component:

Stesse operazioni effettuate per il componente `<jumbotron>` allo scopo di creare un componente che gestisca la visualizzazione delle news in homepage.
Allo scopo di utilizzare la stessa direttiva anche nella view "News" verrà inoltre inserito il supporto alla proprietà `search` al fine di poter passare la stringa di ricerca e filtrare i dati qualora fosse necessario.


`components/post-list/post-list.tpl.html`:

```html
<div class="row">
  <div class="col-lg-4" ng-repeat="item in ctrl.items | filter: ctrl.search">
    <h2>{{item.title}}</h2>
    <p>{{item.body}}</p>
    <p><a class="btn btn-primary" ng-href="#/news/{{item.id}}" role="button">View details &raquo;</a></p>
  </div>
</div>

```

`components/post-list/PostList.js`:


```javascript
angular.module('demoApp')
.directive('postList', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/post-list/post-list.tpl.html',
    scope: {
      items: '<',
      search: '<'
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
```
> **scope prefix `=` -> 2-way binding**: il bind con l'oggetto passato alla direttiva è bidirezionale.

> Da Angular 1.5 è disponibile il **prefisso `<` per abilitare il one-way-binding** (no watcher)

Includere il file della direttiva in `index.html`:

```html
<script src="app/components/post-list/PostList.js"></script>
```

e inserire la direttiva `<post-list>` proprio sotto `<jumbotron>`.
Di seguito l'HTML di `homepage.tpl.html` definitivo

```html
<jumbotron ...></jumbotron>
<post-list items="ctrl.news"></post-list>
```

> TIP: invece di passare ogni singola proprietà di <jumbotron> si potrebbe passare l'intero oggetto come mostrato di seguito. In questo scenario, all'interno della direttiva è preferibile l'utilizzo del prefisso `<`. Esempio:

```html
<jumbotron config="{{ctrl.introObj}}"></jumbotron>
```


## NEWS Update

Nella view e nel template della sezione News si utilizzano direttive e servizi creati nei precedenti step:

Il controller della view dovrà quindi iniettare e utilizzare il servizio `NewsService`:

`components/news/NewsCtrl.js`:


```javascript
angular.module('demoApp')

.controller('NewsCtrl', function(NewsService){
  // get news
  NewsService.getPosts()
      .then(function(result){
        this.news = result.data;
      }.bind(this));
})

```

Il template HTML includerà invece la direttiva `<post-link>`, utilizzando anche il parametro `search` per filtrare i dati in base ad una stringa di ricerca:

`components/news/news.tpl.html`:

```html
<div class="container">
    <h2>NEWS</h2>
    <input type="search" class="form-control"
           ng-model="ctrl.search"
           placeholder="search something">
    <hr>
    <post-list items="ctrl.news" search="ctrl.search"></post-list>
</div>

```

---

### PROSSIMO STEP

* utilizzo dei watcher in directives
* integrazione plugin 3rd party (HighChart)
* comunicazione tra direttive
* ng-repeat nidificati
* utilizzo di custom service
