import IMask from 'imask';
import {openModal} from '../utils/modal';

const formsValidation = () => {
  const forms = document.querySelectorAll('.js-form');
  const successModal = document.querySelector('.modal--success');

  class ValidateForm {
    constructor(el) {
      this.errors = [];
      this.emailRegex = /^\s*[\w.-]+@[\w-]+\.([\w-]+\.)?[A-Za-z]{2,8}\s*$/;
      this.minNameLength = 1;
      this.minTelLength = 11;
      this.validClass = 'valid';
      this.invalidClass = 'invalid';
      this.telMaskOption = {
        mask: '+{7}(000)000-00-00',
      };

      this.form = el.closest('form');
      this.inputs = this.form.querySelectorAll('input');
      this.submitBtn = this.form.querySelector('button[type="submit"]');
      this.resetBtn = this.form.querySelector('button[type="reset"]');

      this.form.addEventListener('submit', this.onFormSubmit.bind(this));
      this.form.addEventListener('reset', this.resetForm.bind(this));

      this.initTelInputs();
      this.setListeners();
    }

    initTelInputs() {
      const telInputs = this.form.querySelectorAll('input[type="tel"]');
      telInputs.forEach((telInput) => {
        let mask = new IMask(telInput, this.telMaskOption);
      });
    }

    setListeners() {
      this.inputs.forEach((input) => {
        input.addEventListener('blur', () => {
          this.validateInput(input);
        });
        input.addEventListener('change', () => {
          this.validateInput(input);
        });
      });
    }

    resetInput(input) {
      input.classList.remove(this.invalidClass);
      input.classList.remove(this.validClass);
    }

    setInvalid(input) {
      this.resetInput(input);
      input.classList.add(this.invalidClass);
    }

    setValid(input) {
      this.resetInput(input);
      input.classList.add(this.validClass);
    }

    validateName(value, message, input) {
      let errMsg = message;

      if (value.length < this.minNameLength) {
        this.setInvalid(input);
        return errMsg;
      }

      this.setValid(input);
      return '';
    }

    validateEmail(value, message, input) {
      let errMsg = message;

      if (!this.emailRegex.test(value)) {
        this.setInvalid(input);
        return errMsg;
      }

      this.setValid(input);
      return '';
    }

    validateTelInput(value, message, input) {
      let errMsg = message;
      const unmaskedValue = value.replace(/[\+\(\)\s\-]/g, '');

      if (unmaskedValue.length < this.minTelLength) {
        this.setInvalid(input);
        return errMsg;
      }

      this.setValid(input);
      return '';
    }

    validateInput(input) {
      const inputType = input.getAttribute('type');
      const value = input.value;
      let message = input.dataset.error;

      switch (inputType) {
        case 'text':
          message = this.validateName(value, message, input);
          break;
        case 'email':
          message = this.validateEmail(value, message, input);
          break;
        case 'tel':
          message = this.validateTelInput(value, message, input);
          break;
        default:
          message = '';
      }

      return message;
    }

    getErrorMessages() {
      this.errors = [];

      this.inputs.forEach((input) => {
        let message = this.validateInput(input);

        if (message.length) {
          this.errors.push(message);
        }
      });
    }

    resetForm() {
      this.inputs.forEach((input) => {
        this.resetInput(input);
        this.form.reset();
        this.errors = [];
      });
    }

    onFormSubmit(evt) {
      this.getErrorMessages();

      if (this.errors.length) {
        evt.preventDefault();
      } else {
        evt.preventDefault();
        this.resetForm();
        openModal(successModal);
      }
    }
  }

  if (forms.length) {
    forms.forEach((form) => {
      let formInst = new ValidateForm(form);
    });
  }
};

export {formsValidation};
