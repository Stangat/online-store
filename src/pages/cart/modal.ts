import '././styles/modal.scss';

export class Form {
  create(): void {
    const main = document.querySelector('.main');
    const modal = document.createElement('div');
    modal.className = 'modal';
    main?.append(modal);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal__container';
    modal.append(modalContainer);

    const form = document.createElement('form');
    form.className = 'form';
    form.action = '/';
    modalContainer.append(form);

    const personDetails = document.createElement('div');
    personDetails.className = 'person-details';
    form.append(personDetails);

    const personDetailsTitle = document.createElement('h2');
    personDetailsTitle.className = 'form__title person-details__title';
    personDetailsTitle.textContent = 'Personal details';
    personDetails.append(personDetailsTitle);

    const name = document.createElement('div');
    name.className = 'form__item person-name';
    personDetails.append(name);

    const nameInput = document.createElement('input');
    nameInput.className = 'form__input person-name__input';
    nameInput.placeholder = 'Name';
    nameInput.type = 'text';
    nameInput.required = true;
    name.append(nameInput);

    const phone = document.createElement('div');
    phone.className = 'form__item phone-number';
    personDetails.append(phone);

    const phoneInput = document.createElement('input');
    phoneInput.className = 'form__input phone-number__input';
    phoneInput.placeholder = 'Phone number';
    phoneInput.type = 'text';
    phoneInput.required = true;
    phone.append(phoneInput);

    const adress = document.createElement('div');
    adress.className = 'form__item delivery-adress';
    personDetails.append(adress);

    const adressInput = document.createElement('input');
    adressInput.className = 'form__input delivery-adress__input';
    adressInput.placeholder = 'Delivery adress';
    adressInput.type = 'text';
    adressInput.required = true;
    adress.append(adressInput);

    const email = document.createElement('div');
    email.className = 'form__item email';
    personDetails.append(email);

    const emailInput = document.createElement('input');
    emailInput.className = 'form__input email__input';
    emailInput.placeholder = 'E-mail';
    emailInput.type = 'email';
    emailInput.required = true;
    email.append(emailInput);

    const cardDetails = document.createElement('div');
    cardDetails.className = 'card-details';
    form.append(cardDetails);

    const cardDetailsTitle = document.createElement('h2');
    cardDetailsTitle.className = 'form__title card-details__title';
    cardDetailsTitle.textContent = 'Credit card details';
    cardDetails.append(cardDetailsTitle);

    const cardData = document.createElement('div');
    cardData.className = 'card-data';
    cardDetails.append(cardData);

    const cardNumber = document.createElement('div');
    cardNumber.className = 'card-number';
    cardData.append(cardNumber);

    const cardType = document.createElement('img');
    cardType.className = 'pay-system';
    cardType.alt = 'pay system';
    cardType.src =
      'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
    cardNumber.append(cardType);

    const cardNumberInput = document.createElement('input');
    cardNumberInput.className = 'card-data__input card-number__input';
    cardNumberInput.placeholder = 'Card number';
    cardNumberInput.type = 'text';
    cardNumberInput.required = true;
    cardNumber.append(cardNumberInput);

    const cardOtherData = document.createElement('div');
    cardOtherData.className = 'card-other-data';
    cardData.append(cardOtherData);

    const cardValidDate = document.createElement('div');
    cardValidDate.className = 'card-other-data__item valid-item';
    cardValidDate.textContent = 'VALID:';
    cardOtherData.append(cardValidDate);

    const cardValidDateInput = document.createElement('input');
    cardValidDateInput.className = 'card-data__input valid-date__input';
    cardValidDateInput.placeholder = 'Valid thru';
    cardValidDateInput.type = 'text';
    cardValidDateInput.required = true;
    cardValidDate.append(cardValidDateInput);

    const cardCvvData = document.createElement('div');
    cardCvvData.className = 'card-other-data__item cvv-item';
    cardCvvData.textContent = 'CVV:';
    cardOtherData.append(cardCvvData);

    const cardCvvDataInput = document.createElement('input');
    cardCvvDataInput.className = 'card-data__input cvv-data__input';
    cardCvvDataInput.placeholder = 'Code';
    cardCvvDataInput.type = 'text';
    cardCvvDataInput.required = true;
    cardCvvData.append(cardCvvDataInput);

    const submitButton = document.createElement('button');
    submitButton.className = 'button form__submit-button';
    submitButton.textContent = 'Confirm';
    submitButton.type = 'submit';
    form.append(submitButton);

    this.nameInputValidate();
    this.phoneInputValidate();
    this.adressInputValidate();
    this.emailInputvalidate();
    this.cardNumberInputValidate();
    this.cardValidDateInputValidate();
    this.cardCvvValidate();
    this.submitForm();
    this.closeModal();
  }

  showModal(): void {
    const buttonBuy: HTMLButtonElement | null = document.querySelector('.button-buy');

    if (buttonBuy) {
      buttonBuy.addEventListener('click', () => {
        this.create();
      });
    }
  }

  nameInputValidate(): void {
    const nameInput: HTMLInputElement | null = document.querySelector('.person-name__input');
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        this.removeNonLetters();
        const nameValue = nameInput.value.trim();
        const validName = /^[a-zA-Z,.'-\s]{3,}( [a-zA-Z,.'-\s]{3,})+$/;
        if (nameValue === '') {
          nameInput.setCustomValidity('Name is required');
        } else if (!validName.test(nameValue)) {
          nameInput.setCustomValidity('Input must be in "Name Lastname" format, at least 3 characters each');
        } else {
          nameInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  phoneInputValidate(): void {
    const phoneInput: HTMLInputElement | null = document.querySelector('.phone-number__input');
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        this.removeNonDigit();
        const phoneValue = phoneInput.value.trim();
        const validPhone = /^[+][0-9]{9,}$/;
        if (phoneValue === '') {
          phoneInput.setCustomValidity('Phone is required');
        } else if (!validPhone.test(phoneValue)) {
          phoneInput.setCustomValidity('Input must begin with "+" and contain at least 9 digits without white spaces');
        } else {
          phoneInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  adressInputValidate(): void {
    const adressInput: HTMLInputElement | null = document.querySelector('.delivery-adress__input');
    if (adressInput) {
      adressInput.addEventListener('input', () => {
        const adressValue = adressInput.value.trim();
        const validAdress = /^[^\s]{5,}( [^\s]{5,})( [^\s]{5,})+$/;
        if (adressValue === '') {
          adressInput.setCustomValidity('Adress is required');
        } else if (!validAdress.test(adressValue)) {
          adressInput.setCustomValidity('Input must contain at least 3 words, not less than 5 characters each');
        } else {
          adressInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  emailInputvalidate(): void {
    const emailInput: HTMLInputElement | null = document.querySelector('.email__input');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailInput.validity.typeMismatch) {
          emailInput.setCustomValidity('Please, input correct e-mail address');
        } else {
          emailInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  cardNumberInputValidate(): void {
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', () => {
        this.removeNonDigit();
        this.removeRedundantDigit();
        this.addSpaces();
        this.changePaySystem();
        const cardNumberValue = cardNumberInput.value;
        const validCardNumber = /^[0-9\s]{19}$/;
        if (cardNumberValue === '') {
          cardNumberInput.setCustomValidity('Card number is required');
        } else if (!validCardNumber.test(cardNumberValue)) {
          cardNumberInput.setCustomValidity('Input must contain 16 digits');
        } else {
          cardNumberInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  cardValidDateInputValidate(): void {
    const cardValidDateInput: HTMLInputElement | null = document.querySelector('.valid-date__input');
    if (cardValidDateInput) {
      cardValidDateInput.addEventListener('input', () => {
        this.removeNonDigit();
        this.removeRedundantDigit();
        this.addSlash();

        const dateValue = cardValidDateInput.value;
        const NUMBER_OF_DIGITS = 5;
        const NUMBER_OF_MOUNTHS = 12;
        const NON_EXISTENT_MOUNTH = '00';
        const mounthInput = cardValidDateInput.value.slice(0, 2);
        if (+mounthInput > NUMBER_OF_MOUNTHS || mounthInput === NON_EXISTENT_MOUNTH) {
          cardValidDateInput.value = cardValidDateInput.value.slice(0, 2);
          cardValidDateInput.style.color = 'red';
        } else {
          cardValidDateInput.style.color = 'black';
        }
        if (dateValue === '') {
          cardValidDateInput.setCustomValidity('Card validation is required');
        } else if (dateValue.length !== NUMBER_OF_DIGITS) {
          cardValidDateInput.setCustomValidity('Please, use correct format "mounth/year"');
        } else {
          cardValidDateInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  cardCvvValidate(): void {
    const cardCodeInput: HTMLInputElement | null = document.querySelector('.cvv-data__input');
    if (cardCodeInput) {
      cardCodeInput.addEventListener('input', () => {
        this.removeNonDigit();
        this.removeRedundantDigit();
        const codeValue = cardCodeInput.value;
        const NUMBER_OF_DIGITS = 3;
        if (codeValue === '') {
          cardCodeInput.setCustomValidity('CVV validation is required');
        } else if (codeValue.length !== NUMBER_OF_DIGITS) {
          cardCodeInput.setCustomValidity('Input must contain 3 digits');
        } else {
          cardCodeInput.setCustomValidity('');
        }
        this.checkInputsValidity();
      });
    }
  }

  removeNonLetters(): void {
    const nameInput: HTMLInputElement | null = document.querySelector('.person-name__input');

    if (nameInput) {
      nameInput.value = nameInput.value.replace(/\d/g, '');
    }
  }

  removeNonDigit(): void {
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    const cardValidDateInput: HTMLInputElement | null = document.querySelector('.valid-date__input');
    const phoneInput: HTMLInputElement | null = document.querySelector('.phone-number__input');
    const cardCodeInput: HTMLInputElement | null = document.querySelector('.cvv-data__input');
    const eventTarget = event?.target;

    if (cardNumberInput && cardValidDateInput && phoneInput && cardCodeInput) {
      if (eventTarget) {
        if (eventTarget === cardNumberInput) {
          cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '');
        }
        if (eventTarget === cardValidDateInput) {
          cardValidDateInput.value = cardValidDateInput.value.replace(/\D/g, '');
        }
        if (eventTarget === phoneInput) {
          phoneInput.value = phoneInput.value.replace(/[a-zA-Z]/g, '');
        }
        if (eventTarget === cardCodeInput) {
          cardCodeInput.value = cardCodeInput.value.replace(/\D/g, '');
        }
      }
    }
  }

  removeRedundantDigit(): void {
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    const cardValidDateInput: HTMLInputElement | null = document.querySelector('.valid-date__input');
    const cardCodeInput: HTMLInputElement | null = document.querySelector('.cvv-data__input');
    const eventTarget = event?.target;

    if (cardNumberInput && cardValidDateInput && cardCodeInput) {
      if (eventTarget) {
        if (eventTarget === cardNumberInput) {
          cardNumberInput.value = cardNumberInput.value.slice(0, 16);
        }
        if (eventTarget === cardValidDateInput) {
          cardValidDateInput.value = cardValidDateInput.value.slice(0, 4);
        }
        if (eventTarget === cardCodeInput) {
          cardCodeInput.value = cardCodeInput.value.slice(0, 3);
        }
      }
    }
  }

  addSpaces(): void {
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    const NUMBER_OF_DIGITS = 4;
    if (cardNumberInput) {
      let i = NUMBER_OF_DIGITS;
      while (i < cardNumberInput.value.length) {
        cardNumberInput.value =
          cardNumberInput.value.slice(0, i) + ' ' + cardNumberInput.value.slice(i, cardNumberInput.value.length);
        i += NUMBER_OF_DIGITS + 1;
      }
    }
  }

  changePaySystem(): void {
    const paySystem: HTMLImageElement | null = document.querySelector('.pay-system');
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    if (cardNumberInput && paySystem) {
      if (cardNumberInput.value.charAt(0) === '4') {
        paySystem.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
      } else if (cardNumberInput.value.charAt(0) === '5') {
        paySystem.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
      } else if (cardNumberInput.value.charAt(0) === '6') {
        paySystem.src = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png';
      } else {
        paySystem.src =
          'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
      }
    }
  }

  addSlash(): void {
    const cardValidDateInput: HTMLInputElement | null = document.querySelector('.valid-date__input');
    const NUMBER_OF_DIGITS = 2;
    if (cardValidDateInput) {
      let i = NUMBER_OF_DIGITS;
      while (i < cardValidDateInput.value.length) {
        cardValidDateInput.value =
          cardValidDateInput.value.slice(0, i) +
          '/' +
          cardValidDateInput.value.slice(i, cardValidDateInput.value.length);
        i += NUMBER_OF_DIGITS + 1;
      }
    }
  }

  checkInputsValidity(): void {
    const nameInput: HTMLInputElement | null = document.querySelector('.person-name__input');
    const phoneInput: HTMLInputElement | null = document.querySelector('.phone-number__input');
    const adressInput: HTMLInputElement | null = document.querySelector('.delivery-adress__input');
    const emailInput: HTMLInputElement | null = document.querySelector('.email__input');
    const cardNumberInput: HTMLInputElement | null = document.querySelector('.card-number__input');
    const cardValidDateInput: HTMLInputElement | null = document.querySelector('.valid-date__input');
    const cardCodeInput: HTMLInputElement | null = document.querySelector('.cvv-data__input');
    const personDetails: HTMLHeadingElement | null = document.querySelector('.person-details__title');
    const cardDetails: HTMLHeadingElement | null = document.querySelector('.card-details__title');
    const submitButton: HTMLButtonElement | null = document.querySelector('.form__submit-button');

    if (
      nameInput &&
      phoneInput &&
      adressInput &&
      emailInput &&
      cardNumberInput &&
      cardValidDateInput &&
      cardCodeInput &&
      personDetails &&
      cardDetails &&
      submitButton
    ) {
      const nameInputIsValid = nameInput.validity.valid;
      const phoneInputIsValid = phoneInput.validity.valid;
      const adressInputIsValid = adressInput.validity.valid;
      const emailInputIsValid = emailInput.validity.valid;
      const cardNumberInputIsValid = cardNumberInput.validity.valid;
      const cardValidDateInputIsValid = cardValidDateInput.validity.valid;
      const cardCodeInputIsValid = cardCodeInput.validity.valid;

      if (
        nameInputIsValid === true &&
        phoneInputIsValid === true &&
        adressInputIsValid === true &&
        emailInputIsValid === true &&
        cardNumberInputIsValid === true &&
        cardValidDateInputIsValid === true &&
        cardCodeInputIsValid === true
      ) {
        personDetails.style.color = '#486c24';
        cardDetails.style.color = '#486c24';
        submitButton.style.backgroundColor = '#486c24';
        submitButton.addEventListener('mouseover', () => {
          submitButton.style.backgroundColor = '#293e14';
        });
        submitButton.addEventListener('mouseout', () => {
          submitButton.style.backgroundColor = '#486c24';
        });
      }
    }
  }

  submitForm(): void {
    const form: HTMLFormElement | null = document.querySelector('.form');
    if (form) {
      form.addEventListener('submit', this.handleSubmit);
      form.addEventListener('submit', () => {
        this.hideModal();
        this.showMessage();
      });
    }
  }

  closeModal(): void {
    const modal = document.querySelector('.modal');
    modal?.addEventListener('click', (event: Event) => {
      if (event.target === modal) {
        modal.remove();
      }
    });
  }

  handleSubmit(event: Event): void {
    const form: HTMLFormElement | null = document.querySelector('.form');
    if (form) {
      event.preventDefault();
      setTimeout(() => {
        form.submit();
        localStorage.clear();
      }, 3000);
    }
  }

  hideModal(): void {
    const modal = document.querySelector('.modal');
    modal?.classList.add('hidden');
  }

  showMessage(): void {
    const main = document.querySelector('.main');
    if (main) {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      main.append(overlay);
      const message = document.createElement('p');
      message.className = 'message';
      message.textContent = 'Thank you for your purchase, you will be back to main page in 3 seconds';
      overlay?.append(message);
    }
  }
}
