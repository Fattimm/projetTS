const text: string = 'Hello TypeScript';
console.log(text);

const $buttonElement = document.querySelector('#button') as HTMLElement | null;
if ($buttonElement) {
  const buttonElement: HTMLElement = $buttonElement;
  // Ajoutez votre logique ici pour buttonElement
  buttonElement.addEventListener('click', () => {
    alert('Button clicked!');
  });
}

const $modalElement = document.querySelector('#modal') as HTMLElement | null;
if ($modalElement) {
  const modalElement: HTMLElement = $modalElement;
  // Ajoutez votre logique ici pour modalElement
}

