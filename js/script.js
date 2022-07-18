"use strict"

document.addEventListener('DOMContentLoaded', function () {

	const form = document.getElementById('form');
	const button = document.querySelector('.form__button');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		// formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
			alert('Регистрация прошла успешно');
			form.reset();
		} else {
			button.classList.add('button__error');
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
				// } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				// 	formAddError(input);
				// 	error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}


	button.addEventListener('click', function () {
		validatePass();
	});
	// функция проверки купона установлен текст demo для проверки работы функции


	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
		button.classList.add('button__error');

	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
		button.classList.remove('button__error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	function validatePass() {
		let pass1 = document.querySelector("#formPassword");
		let pass2 = document.querySelector("#formRePassword");
		pass2.addEventListener('keyup', function () {

			if (pass2.value === pass1.value) {
				pass1.classList.add('valid');
				pass1.classList.remove('_error');
				button.classList.remove('button__error');
				return true;
			} else {
				pass1.classList.add('_error');
				pass1.classList.remove('valid');
				button.classList.add('button__error');
				return false;
			}
		});
	}

});

