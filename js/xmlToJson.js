
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
			arrayAll: jsonXml.Metrics.Metric.reduce((a, e) => { return a.concat([e, e.Values == undefined ? e.Value : e.Values]); }, []).reduce((a, e) => { return a.concat(e["@attributes"]); }, []),
			arrayValues: jsonXml.Metrics.Metric.reduce((a, e) => { return a.concat(e.Values == undefined ? e.Value : e.Values); }, []).reduce((a, e) => { return a.concat(e["@attributes"]); }, []),
			arrayMetrics: jsonXml.Metrics.Metric.reduce((a, e) => { return a.concat(e["@attributes"]); }, [])
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
	metricas.map(e => {
		const filename = e.name + '.json';
		const jsonStr = JSON.stringify(e);
		let element = document.createElement('a');
		element.text = "Download " + e.name;
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		element.setAttribute('download', filename);
		document.body.appendChild(element);
		document.body.appendChild(document.createElement('br'));
	});
}

leitura(destinyMetricas[0]);