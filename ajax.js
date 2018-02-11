function Ajax (method, url, flag, data, callback) {
	var app = null;
	if (window.XMLHttpRequest) {
		app = new window.XMLHttpRequest();
	}else {
		app = new window.ActiveXObject("Microsoft.XMLHTTP")
	}
	method = method.toUpperCase();
	if (method === "GET") {
		app.open(method, url + "?" + data, flag);
		app.send();
	}else if (method === "POST") {
		app.open(method, url, flag);
		app.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		app.send(data);
	}
	app.onreadystatechange = function () {
		if (app.readyState === 4) {
			if (app.status === 200) {
				callback(app.responseText);
			}else {
				alert("error");
			}
		}
	}
}