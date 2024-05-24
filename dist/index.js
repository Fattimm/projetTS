"use strict";
var text = 'Hello TypeScript';
console.log(text);
var $buttonElement = document.querySelector('#button');
if ($buttonElement) {
    var buttonElement = $buttonElement;
    // Ajoutez votre logique ici pour buttonElement
    buttonElement.addEventListener('click', function () {
        alert('Button clicked!');
    });
}
var $modalElement = document.querySelector('#modal');
if ($modalElement) {
    var modalElement = $modalElement;
    // Ajoutez votre logique ici pour modalElement
}
//# sourceMappingURL=index.js.map