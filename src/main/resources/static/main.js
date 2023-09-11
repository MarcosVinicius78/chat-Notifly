const websocketUrl = "/spring-boot-tutorial"
const topic = "/topic/";
const app = "/app/";
var client = null;

function connect(id) {
	const sock = new SockJS(websocketUrl);
	client = Stomp.over(sock);
	client.connect({}, () => {
		setConnected(true);
		client.subscribe(topic + id, payload => {
			showMessage(payload.body);
		});

	});
	console.log("Connected");
};

function disconnect() {
	if (client !== null) {
		client.disconnect();
		setConnected(false);
		console.log("Disconnected");
	};
}

function showMessage(message) {
	greetings.innerHTML += "<p>" + message + "</p>";
}

function sendMessage(msg, enviar) {
	let message = msg
	client.send(app + 'msg/' + enviar, {}, JSON.stringify({ 'name': message }));
};

function setConnected(connected) {
	buttonConnect.disabled = connected;
	buttonDisConnect.disabled = !connected;
	buttonSend.disabled = !connected;
}

var nameInput;
var msg;
var suaMsg;

document.addEventListener("DOMContentLoaded", function () {
	buttonConnect = document.getElementById("connect");
	buttonDisConnect = document.getElementById("disconnect");
	buttonSend = document.getElementById("send");
	conversationDisplay = document.getElementById("conversation");
	greetings = document.getElementById("greetings");
	// formInput = document.getElementById("form");


	buttonConnect.addEventListener("click", (e) => {
		nameInput = document.getElementById("name");
		let user = nameInput.value
		console.log(user)
		connect(user);
		e.preventDefault();
	});
	buttonDisConnect.addEventListener("click", (e) => {
		disconnect();
		e.preventDefault();
	});
	buttonSend.addEventListener("click", (e) => {
		msg = document.getElementById("msg")
		enviar = document.getElementById("enviar")
		suaMsg = document.getElementById("sua-msg")

		suaMsg.innerHTML += "<p>"+ msg.value +"</p>"
		sendMessage(msg.value, enviar.value);
		msg.value = ""
		e.preventDefault();
	});
	// formInput.addEventListener("submit", (e) => e.preventDefault());
	// setConnected(false);
});