
var destinyMetricas = ['data/telegrambots.xml', 'data/telegrambots-abilities.xml', 'data/telegrambots-chat-session-bot.xml', 'data/telegrambots-meta.xml', 'data/telegrambots-spring-boot-starter.xml', 'data/telegrambotsextensions.xml'];
var metricas = [];

function leitura(destiny) {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', destiny, true);

	xhr.timeout = 2000;

	xhr.onload = function () {

		destinyMetricas.shift();

		var xmlDoc = this.responseXML; // <- Here the XML file
		var jsonXml = xmlToJson(xmlDoc);

		const obj = {
			name: jsonXml.Metrics["@attributes"].scope,
			arrayAll: jsonXml.Metrics.Metric, 
			arrayValues: jsonXml.Metrics.Metric.reduce((a, e) => {return a.concat(e.Values == undefined? e.Value: e.Values);}, []).reduce((a, e) => {return a.concat(e["@attributes"]);}, []),
			arrayMetrics: jsonXml.Metrics.Metric.reduce((a, e) => {return a.concat(e["@attributes"]);}, [])

		}

		metricas.push(obj); // Inserindo metricas de um modulo;

		if (destinyMetricas.length == 0) {
			execute();
		} else {
			leitura(destinyMetricas[0]);
		}

		//const arrayMetrics = jsonXml.Metrics.Metric;
		//arrayMetrics.map(e => console.log(e["@attributes"].description)); 
	};

	xhr.ontimeout = function (e) {
		console.log("Falha na leitura do arquivo");
	};

	xhr.send(null);

}

// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof (obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof (obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function execute() {

	console.log(metricas);

	var table = document.createElement('table');

	metricas.map((e, i) => {
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');

		var name = document.createTextNode(e.name);


		td1.appendChild(name);

		tr.appendChild(td1);

		if (i == 0) {
			let tr = document.createElement('tr');
			var td1 = document.createElement('td').appendChild(document.createTextNode('-'));
			tr.appendChild(td1);
			table.appendChild(tr);
			metricas.map(m => {
				var td1 = document.createElement('td');
				var name = document.createTextNode("  " + m.name + "  ");
				td1.appendChild(name);
				tr.appendChild(td1);
			});
			table.appendChild(tr);
		}

		table.appendChild(tr);
	});

	document.body.appendChild(table);
}

leitura(destinyMetricas[0]);