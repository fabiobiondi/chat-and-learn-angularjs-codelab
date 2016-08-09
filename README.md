## CHAT AND LEARN - AngularJS CodeLab

Questo repository contiene il codice sorgente dei tre webinars introduttivi su AngularJS

Le cartelle 2, 3 e 4  includono un file README in italiano con gli step affrontati duranti le sessioni.

---
Type: **webinar / live code**

Assets: **videos and source code**

Language: **italian**

---

## MATERIALE

### Step 1

Video: [Introduzione ad AngularJS](https://www.youtube.com/watch?v=2XMjpY9nauc)

Source static template: `1-static-template`

Source Angular App: `2-angular-app`


### Step 2

Video: [Applicazioni component-based in AngularJS](https://www.youtube.com/watch?v=f2vtYlUdMu8 )

Source e DOC: `3-component-based-app`


### Step 3

Video: custom directives (sezione 'Report') - presto disponibile

Source: `3-component-based-app`

DOC: `4-reports`


---

### BEST PRACTICES

I webinar su AngularJS 1.x si focalizzano principalmente sull'utilizzo del framework e non integrano molte delle best practices e convenzioni che tipicamente si dovrebbero utilizzare durante lo sviluppo di web application Angular.

Tra le più eclatanti, mi sento di segnalare:

* la cartella `bower_components` non dovrebbe essere "versionata" (ma a scopo didattico, per coloro che non utilizzano Bower, ho deciso di versionare tutti i files necessari al funziamente degli script)
* l'utilizzo di IIFE (Immediately Invoked Function Expression)
* `use strict`
* `$inject` o [inline array annotation](https://docs.angularjs.org/guide/di) per la gestione delle dipendenze
* Utilizzare automation tools (ad es. Gulp, Grunt, Webpack,...) per la generazione delle build: concat, minification, uglify/mangle, ngAnnotate, ecc.
* organizzazione di cartelle e files adeguata alla tipologia del progetto
* indentazione codice
* e potrei continuare. Consiglio di seguire le ottime (e più seguite) styleguides di [John Papa](https://github.com/johnpapa/angular-styleguide)
