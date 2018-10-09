const storage = window.localStorage;

function onLoginFormSubmit() {
	const inputuser = {
		username: $('#usernameInputLogin').val(),
		password: sha256($('#passwordInputLogin').val())
	};

	let database = storage.getItem('database');
	database = database === null ? [] : JSON.parse(database);

	for (const user of database) {
		if (JSON.stringify(user) === JSON.stringify(inputuser)) {
			location.assign('data.html')
			return false;
		}
	}
	console.log('not logged in');

	return false;
}

function onRegisterFormSubmit() {
	if ($('#passwordInputRegister').val() !== $('#repeatPasswordInputRegister').val()) {
		console.log('Passwords don\'t match!');
		return false;
	}

	const inputuser = {
		username: $('#usernameInputRegister').val(),
		password: sha256($('#passwordInputRegister').val())
	};

	let database = storage.getItem('database');
	database = database === null ? [] : JSON.parse(database);

	for (const user of database) {
		if (user.username === inputuser.username) {
			console.log(`Username ${inputuser.username} is already in use.`);
			return false;
		}
	}
	database = [...database, inputuser];
	storage.setItem('database', JSON.stringify(database));

	return false;
}
