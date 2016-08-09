## CHAT AND LEARN - AngularJS CodeLab

Questo repository contiene il codice sorgente dei tre webinars introduttivi su AngularJS

Le cartelle 2, 3 e 4  includono un file README in italiano con gli step affrontati duranti le sessioni.

---
Type: **webinar / live code**

Assets: **videos and source code**

Language: **italian**

---

## MATERIALE

### 1. Introduzione ad AngularJS

Video: [Introduzione ad AngularJS](https://www.youtube.com/watch?v=2XMjpY9nauc)

Source static template: `1-static-template`

Source Angular App: `2-angular-app`


### 2. Applicazioni component-based in AngularJS

Video: presto disponibile

Source e DOC: `3-component-based-app`


### 3. custom directives (sezione 'Report')

Video: presto disponibile

Source: `3-component-based-app`

DOC: `4-reports`


---

### BEST PRACTICES

I webinar su AngularJS 1.x si focalizzano principalmente sull'utilizzo del framework e non integrano molte delle best practices e convenzioni che tipicamente si dovrebbero utilizzare durante lo sviluppo di web application Angular.

Tra le più eclatanti, mi sento di segnalare:

* l'utilizzo di IIFE (Immediately Invoked Function Expression)
* `use strict`
* `$inject` o [inline array annotation](https://docs.angularjs.org/guide/di) per la gestione delle dipendenze
* Utilizzare automation tools (ad es. Gulp, Grunt, Webpack,...) per la generazione delle build: concat, minification, uglify/mangle, ngAnnotate, ecc.
* organizzazione di cartelle e files adeguata alla tipologia del progetto
* indentazione codice
* e potrei continuare. Consiglio di seguire le ottime (e più seguite) styleguides di [John Papa](https://github.com/johnpapa/angular-styleguide)
