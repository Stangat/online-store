import './footer.scss';

export class Footer {
  create(): void {
    const body: HTMLBodyElement | null = document.getElementsByTagName('body')[0];
    const footer: HTMLElement | null = document.createElement('footer');

    const footerAutors: HTMLDivElement | null = document.createElement('div');
    const footerAutorsOne: HTMLElement | null = document.createElement('a');
    const footerAutorsTwo: HTMLElement | null = document.createElement('a');

    const footerYear: HTMLDivElement | null = document.createElement('div');
    const footerYearTotal: HTMLSpanElement | null = document.createElement('span');

    const footerShcool: HTMLDivElement | null = document.createElement('div');
    const footerShoolLink: HTMLElement | null = document.createElement('a');
    const footerShoolImage: HTMLImageElement | null = document.createElement('img');

    body.appendChild(footer);
    footer.classList.add('footer');

    footer.appendChild(footerAutors);
    footerAutors.classList.add('footer__autors');
    footerAutors.appendChild(footerAutorsOne);
    footerAutorsOne.classList.add('footer__autors__one');
    footerAutorsOne.setAttribute('href', 'https://github.com/Stangat');
    footerAutorsOne.innerText = 'Stanislav Gatilov';
    footerAutors.appendChild(footerAutorsTwo);
    footerAutorsTwo.classList.add('footer__autor');
    footerAutorsTwo.setAttribute('href', 'https://github.com/MarinaZai');
    footerAutorsTwo.innerText = 'Marina Zaitseva';

    footer.appendChild(footerYear);
    footerYear.classList.add('footer__year');
    footerYear.appendChild(footerYearTotal);
    footerYearTotal.classList.add('footer__year__total');
    footerYearTotal.innerText = '2022-2023';

    footer.appendChild(footerShcool);
    footerShcool.classList.add('footer__shool');
    footerShcool.appendChild(footerShoolLink);
    footerShoolLink.classList.add('footer__link');
    footerShoolLink.setAttribute('href', 'https://rs.school/js/');
    footerShoolLink.appendChild(footerShoolImage);
    footerShoolImage.classList.add('footer__link__image');
    footerShoolImage.src = 'https://rs.school/images/rs_school_js.svg';
  }
}
