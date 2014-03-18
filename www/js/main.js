
"use strict";
var app = angular.module('theapp', []);

app.controller('MainCtrl', function($scope) {
  $scope.welcome = 'Hello world! This is HTML5 Boilerplate.';
});


$(document).ready(function(){
	var element = $('.markdown');
	var converter = new Showdown.converter();
	var html = converter.makeHtml(element.text());
	element.html(html);
	SyntaxHighlighter.all();
  // $('pre').each(function(i, e) {hljs.highlightBlock(e)});
});