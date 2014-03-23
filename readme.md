
[Install and deploy](https://github.com/juanpasolano/angular-mobile-demo/wiki/Install-and-deploy)

[Gruntjs](https://github.com/juanpasolano/angular-mobile-demo/wiki/Gruntjs)

[Angular](https://github.com/juanpasolano/angular-mobile-demo/wiki/Angular)

- [Directivas](https://github.com/juanpasolano/angular-mobile-demo/wiki/Directivas)    
     - [Toasts](https://github.com/juanpasolano/angular-mobile-demo/wiki/Directivas#1-toasts)  
	- [Loading Pop Over](https://github.com/juanpasolano/angular-mobile-demo/wiki/Directivas#2-loading-pop-over)  
	- [Modal](https://github.com/juanpasolano/angular-mobile-demo/wiki/Directivas#3-modal)  

##Prerequisitos
- [Node / npm](http://nodejs.org/)
- [Grunt CLI](http://gruntjs.com/)

##Instalación
Para instalar o usar este boilerplate simplemente clona este repositorio dando `git clone https://github.com/juanpasolano/angular-mobile-demo.git` en la consola.

Una vez clonados los archivos debes instalar las dependencias de node para que gruntjs funcione. Esto se hace dando `npm install` en la consola. Si quieres ver las dependencias que se están usando, mira le archivo `package.json`.

Luego de instalar los paquetes de node puedes comenzar a usar grunt dando `grunt` en la consola.

##Deploy a phonegap

Para enviar los archivos a las carpetas de phonegap es probable que tengas que modificar el archivo `Gruntfile.js` que esta en la raíz del directorio.

En grunt esta disponible el task `copy-pg`. Este es el encargado de copiar los archivos hacia la carpeta de phonegap.

Para que funcione bien tienes que cambiar la carpeta a la que esta apuntando `Gruntfile.js`

```
copy: {
    phonegap: {
        files: [
            {expand: true, src: ['www/**'],
                dest: '../NOMBRE_CARPETA/platforms/ios/'},
            {expand: true, src: ['www/**'],
                dest: '../NOMBRE_CARPETA/platforms/android/assets/'},
        ]
    }
}
```
##Gruntjs

Hay 3 tareas de grunt importantes en el boilerplate:

- Compilar LESS.
- Compilar y concatenar javascript.
- Copiar archivos a carpetas de phonegap

##Angular
Uniquely parallel task parallel meta-services rather than functionalized information. Distinctively envisioneer synergistic models whereas future-proof applications. Proactively exploit cost effective alignments before premium.

##Configuraciones globales
Se proveen un *Factory* para definir las configuraciones globales. Estas están definidas en el archivo [`config.js`](https://github.com/juanpasolano/angular-mobile-demo/blob/master/www/js/app/config.js)


```
app.factory('ConfigFactory', [
	function(){
		return {
			server: {
				services: 'http://192.237.180.31/dhm/public/api/',
				assets: 'http://192.237.180.31/dhm/public/'
			},
			title : 'Angular boilerplate from factory',
			hasFooter: true,
			hasHeader:false,
			hasSideNavigation: false,
			hasBackButton: false,
			hasRightButton: false
		};
	}
]);
```
##Directivas
Las directivas son objetos de angular que permiten crear nuestros propios tags html que nos permiten manipular el DOM. De hecho se considera una mala practica manipular el DOM desde el Controller.
En angular es muy común que el HTML tenga estos tags, angular provee muchas directivas útiles por default, como: ng-click, ng-show, ng-switch:

Estas son las que el boilerplate provee:

###1. Toasts
Los Toasts son un [patrón de diseño copiado de Android](http://www.androidpatterns.com/uap_pattern/toast-message) que permite mostrar mensajes de ayuda pequeños: 'Archivo guardado', 'Lista de mercado actualizada'.

Para emitir un toast:

```
$rootScope.$emit('makeToast', {title:'<string>', type:'success | error | warning'});
```
[Ver archivo en github](https://github.com/juanpasolano/angular-mobile-demo/blob/development/www/js/app/directives/toastDirective.js)

###2. Loading Pop Over
Esta directiva muestra un mensaje que a diferencia del toast ocupa toda la pantalla y no permite la interacción con otros elementos hasta que desaparezca.

Para mostrarlo, importa $rootScope en el controlador y emite este evento.

```
$rootScope.$emit('showLoadingPopOver',{});
```
[Ver archivo en github](https://github.com/juanpasolano/angular-mobile-demo/blob/development/www/js/app/directives/loadingPopOverDirective.js)

###3. Modal
Es una ventana emergente que... Va! quien no sabe que es un modal?

Esta directiva se ejecuta como el resto con un emit.

```
$rootScope.$emit('makeModal', {
	options:{
		template:'partials/modals/calendarModal.html',
		text:'some text'
		cancelText :'Yep',
		hasCancelBtn: true,
		acceptText: 'Ok, go.'
		hasAcceptBtn: true,
		data: {}
	}
});
```
####Opciones
Opción | Descripción 
------------ | ------------- 
template | **String**. Recibe una ruta hacia un .html que se compila y se pasa al modal.  Tiene precedencia sobre **text**
text | **String**. Si no se quiere usar un archivo .html para usarlo como template, esta opción permite pasar un string y mostrarlo en el modal.
cancelText | **Stirng**. Permite configurar el copy del boton de cancelar. 
hasCancelBtn | **Boolean**. Permite decidir si se va a mostrar el botón de cancelar.
acceptText | **Stirng**. Permite configurar el copy del boton de aceptar. 
hasAcceptBtn | **Boolean**. Permite decidir si se va a mostrar el botón de aceptar.
data | **Object**. Permite pasar un objeto para compilar el template.


##Hojas de Estilos
###Helpers
Mixins clearfixes tar ttu
[mixins gist](https://gist.github.com/juanpasolano/8384599)

###Foundation
Bla bla bla foudnation rocks, bootstrap too!

###Uso de SMACSS
Este boilerplate intenta seguir los lineamientos propuestos por SMACSS para organizar nuestro CSS. 
####Que es SMACSS?
[SMACSS](http://smacss.com/) (Arquitectura modular y escalable para CSS) es una guía de estilo escrita por Jonathan Snook un diseñador, desarrollador web y autor de The Art and Science of CSS publicado por SitePoint. SMACSS abarca 12 capítulos que se pueden leerle gratuitamente online que explican cómo categorizar las reglas CSS. El acceso premium incluye 4 capítulos extras, sobre cómo aprovechar las características de los pre-procesadores de CSS para trabajar con SMACSS, cuándo definir estilos base y cuándo definir módulos, cómo trabajar con iconos, cómo lidiar con estados complejos y 2 videos.

SMACSS se basa en organizar las reglas CSS en 5 categorías:

**Base:** reglas básicas para elementos (o [atributos], pseudo-clases, etc.). Normalize.css es un ejemplo de reglas básicas.  

**Layout:** define las secciones de una página (grilla).

**Módulo:** componentes re-usables y modulares.

**Estado:** cómo luce un módulo a través de diferentes estados, o sea clases que se agregan vía JavaScript (oculto/expandido, activo/inactivo) y a través de distintas vistas (homepage, página interior).

**Tema:** es lo que en OOCSS se le llama “skin”. En SMACSS es opcional, los estilos visuales pueden estar integrados a los módulos y estados o separados por tema para sitios en donde el usuario pueda elegir un tema, para sitios multi-lenguaje, etc.

##Variables de less
Estas son las variables de less disponibles

```
@mainFont:'Lato', Sans-serif;
@sideBarWidth:250px;
@headerHeight: 70px;
@footerHeight:70px;

@mainColor:#E6375A;
@secondColor:spin(@mainColor, 20%);
@darkGray:#4A4D4E;
@lightGray:#dfe2e2;

@headerColor:@darkGray;
@sideNavColor:#fff;
@footerColor:@darkGray;
@contentColor: white;

@paragraphColor:@darkGray;
@headersColor:@darkGray;
```
###Transiciones de páginas
