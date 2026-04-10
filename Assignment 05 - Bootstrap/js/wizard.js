function nextStep(step) {
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();

	updateProgress(step);
}

function previousStep(step) {
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();

	updateProgress(step);
}

function submitForm() {

}

function showAlert(message, type) {

}

function validateStep1() {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;

	if (name === "" || email === "") {
		showAlert("Please fill all fields", "danger");
		return false;
	}

	return true;
}

function validateStep2() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        showAlert("Please fill all fields", "danger");
        return false;
    }

    return true;
}

function submitForm() {
    showAlert("Registration completed successfully", "success");
}

function showAlert(message, type) {
	let area = document.getElementById("alert-area");
	let alert = document.createElement("div");

	alert.className = "alert alert-" + type;
	alert.textContent = message;

	area.appendChild(alert);
	setTimeout(() => alert.remove(), 3000);
}

function updateProgress(step) {
	let progress = document.getElementById("wizardProgress");
	let percent = (step / 3) * 100;

	progress.style.width = percent + "%";
}