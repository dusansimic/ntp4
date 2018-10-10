const storage = window.localStorage;

function onLoginFormSubmit() {
	const inputuser = {
		username: $('#usernameInputLogin').val(),
		password: sha256($('#passwordInputLogin').val())
	};

	let database = storage.getItem('database');
	database = database === null ? [] : JSON.parse(database);

	let usernameFound = false;
	for (const user of database) {
		if (user.username === inputuser.username) {
			usernameFound = true;
			if (user.password === inputuser.password) {
				location.assign('data.html')
				return false;
			}
		}
	}
	if (!usernameFound) {
		$('#usernameInputLogin').removeClass('is-valid');
		$('#usernameInputLogin').addClass('is-invalid');
	} else {
		$('#usernameInputLogin').removeClass('is-invalid');
		$('#usernameInputLogin').addClass('is-valid');
		$('#passwordInputLogin').removeClass('is-valid');
		$('#passwordInputLogin').addClass('is-invalid');
	}
	console.log('not logged in');

	return false;
}

function onRegisterFormSubmit() {
	const inputuser = {
		username: $('#usernameInputRegister').val(),
		password: sha256($('#passwordInputRegister').val())
	};

	let database = storage.getItem('database');
	database = database === null ? [] : JSON.parse(database);

	let usernameInUse = false;
	for (const user of database) {
		if (user.username === inputuser.username) {
			$('#usernameInputRegister').removeClass('is-valid');
			$('#usernameInputRegister').addClass('is-invalid');
			return false;
		}
	}
	$('#usernameInputRegister').removeClass('is-invalid');
	$('#usernameInputRegister').addClass('is-valid');
	if ($('#passwordInputRegister').val() !== $('#repeatPasswordInputRegister').val()) {
		$('#passwordInputRegister').removeClass('is-valid');
		$('#passwordInputRegister').addClass('is-invalid');
		$('#repeatPasswordInputRegister').removeClass('is-valid');
		$('#repeatPasswordInputRegister').addClass('is-invalid');
		return false;
	} else {
		$('#passwordInputRegister').removeClass('is-invalid');
		$('#passwordInputRegister').addClass('is-valid');
		$('#repeatPasswordInputRegister').removeClass('is-invalid');
		$('#repeatPasswordInputRegister').addClass('is-valid');
	}
	database = [...database, inputuser];
	storage.setItem('database', JSON.stringify(database));

	return false;
}
