import '../../../assets/404.png';
export class NotFoundMainBlock {
  create(): void {
    const main: HTMLElement | null = document.querySelector('main');
    main?.classList.add('main__notfound');

    const mainNotfoundDescription: HTMLElement | null = document.createElement('div');
    mainNotfoundDescription.classList.add('main__notfound_descript');
    main?.appendChild(mainNotfoundDescription);
    const mainNotfoundText: HTMLElement | null = document.createElement('h3');
    mainNotfoundText.innerText = 'Ooops...Page Not Found';
    mainNotfoundDescription.appendChild(mainNotfoundText);
    const mainNotfoundButton: HTMLButtonElement | null = document.createElement('button');
    mainNotfoundButton.classList.add('main__notfound_button');
    mainNotfoundButton.type = 'button';
    mainNotfoundButton.innerHTML = 'Go Back';
    mainNotfoundDescription?.appendChild(mainNotfoundButton);
    mainNotfoundButton.addEventListener('click', () => {
      window.location.href = '/';
    });

    const mainNotfoundImg: HTMLImageElement | null = document.createElement('img');
    mainNotfoundImg.classList.add('main__notfound_img');
    mainNotfoundImg.src = '404.png';
    main?.appendChild(mainNotfoundImg);
  }
}
