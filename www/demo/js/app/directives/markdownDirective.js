/*
* MarkdownDirective.js
*/

app.directive('mbMarkdown',[
	function(){
		var converter = new Showdown.converter();
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.mbMarkdown) {
          scope.$watch(attrs.mbMarkdown, function (newVal) {
            var html = newVal ? converter.makeHtml(newVal) : '';
            element.html(html);
          });
        } else {
          var html = converter.makeHtml(element.text());
          element.html(html);
        }
      }
    };
	}
]);