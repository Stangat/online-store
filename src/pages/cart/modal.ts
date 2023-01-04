import '././styles/modal.scss';

export class Form {
  create() {
    const main = document.querySelector('.main');
    const modal = document.createElement('div');
    modal.className = 'modal';
    main?.append(modal);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal__container';
    modal.append(modalContainer);

    const form = document.createElement('form');
    form.className = 'form';
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
    name.append(nameInput);

    const phone = document.createElement('div');
    phone.className = 'form__item phone-number';
    personDetails.append(phone);

    const phoneInput = document.createElement('input');
    phoneInput.className = 'form__input phone-number__input';
    phoneInput.placeholder = 'Phone number';
    phone.append(phoneInput);

    const adress = document.createElement('div');
    adress.className = 'form__item delivery-adress';
    personDetails.append(adress);

    const adressInput = document.createElement('input');
    adressInput.className = 'form__input delivery-adress__input';
    adressInput.placeholder = 'Delivery adress';
    adress.append(adressInput);

    const email = document.createElement('div');
    email.className = 'form__item email';
    personDetails.append(email);

    const emailInput = document.createElement('input');
    emailInput.className = 'form__input email__input';
    emailInput.placeholder = 'E-mail';
    emailInput.type = 'email';
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
    cardType.className = 'paying-system';
    cardType.alt = 'paying system';
    cardType.src =
      'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
    cardNumber.append(cardType);

    const cardNumberInput = document.createElement('input');
    cardNumberInput.className = 'card-data__input card-number__input';
    cardNumberInput.placeholder = 'Card number';
    cardNumberInput.type = 'text';
    cardNumber.append(cardNumberInput);

    const cardOtherData = document.createElement('div');
    cardOtherData.className = 'card-other-data';
    cardData.append(cardOtherData);

    const cardValidData = document.createElement('div');
    cardValidData.className = 'card-other-data__item valid-item';
    cardValidData.textContent = 'VALID:';
    cardOtherData.append(cardValidData);

    const cardValidDataInput = document.createElement('input');
    cardValidDataInput.className = 'card-data__input valid-data__input';
    cardValidDataInput.placeholder = 'Valid thru';
    cardValidDataInput.type = 'text';
    cardValidData.append(cardValidDataInput);

    const cardCvvData = document.createElement('div');
    cardCvvData.className = 'card-other-data__item cvv-item';
    cardCvvData.textContent = 'CVV:';
    cardOtherData.append(cardCvvData);

    const cardCvvDataInput = document.createElement('input');
    cardCvvDataInput.className = 'card-data__input cvv-data__input';
    cardCvvDataInput.placeholder = 'Code';
    cardCvvDataInput.type = 'text';
    cardCvvData.append(cardCvvDataInput);

    const submitButton = document.createElement('button');
    submitButton.className = 'button form__submit-button';
    submitButton.textContent = 'Confirm';
    form.append(submitButton);

    this.emailInputvalidate();
  }
  emailInputvalidate() {
    const emailInput: HTMLInputElement | null = document.querySelector('.email__input');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailInput.validity.typeMismatch) {
          emailInput.setCustomValidity('Please, input correct e-mail address!');
        } else {
          emailInput.setCustomValidity('');
        }
      });
    }
  }
}
