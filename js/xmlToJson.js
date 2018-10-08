
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
		const jsonStr = JSON.stringify(e.arrayAll);
		let element = document.createElement('a');
		element.text = "Download " + e.name;
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		element.setAttribute('download', filename);
		document.getElementById("downloads").appendChild(element);
		document.getElementById("downloads").appendChild(document.createElement('br'));
	});

	//var cont = 0;


	//metricas.map(e => {console.log(e.arrayValues[11].avg);cont += parseFloat(e.arrayValues[11].avg.replace(/,/,'.'))});
	//console.log("MEDIA "+cont/6);

	metricas[0].arrayMetrics.map((e, i) => (i !== 3 && i !== 4) ? makeTables(i):"");

}

function makeTables(pos) {
	var tabelas = document.getElementById("tabelas");
	tabelas.appendChild(document.createElement('br'));

	let table = document.createElement('table');

	let tr = document.createElement('tr');
	var td = document.createElement('td').appendChild(document.createTextNode(metricas[0].arrayMetrics[pos].description));
	tr.appendChild(td);
	table.appendChild(tr);
	metricas.map(m => {
		var td = document.createElement('td');
		var name = document.createTextNode("  " + m.name + "  ");
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);

	//Total
	tr = document.createElement('tr');
	td = document.createElement('td');
	var name = document.createTextNode("Total");
	td.appendChild(name);
	tr.appendChild(td);
	metricas.map(e => {
		var td = document.createElement('td');
		var name = document.createTextNode(e.arrayValues[pos].total === undefined ? "-" : e.arrayValues[pos].total);
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);

	//Total
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode("Máximo"));
	tr.appendChild(td);
	metricas.map(e => {
		var td = document.createElement('td');
		var name = document.createTextNode(e.arrayValues[pos].max === undefined ? "-" : e.arrayValues[pos].max);
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);

	//Média
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode("Média"));
	tr.appendChild(td);
	metricas.map(e => {
		var td = document.createElement('td');
		var name = document.createTextNode(e.arrayValues[pos].avg === undefined ? "-" : e.arrayValues[pos].avg);
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);

	//Desvio Padrão
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode("Desvio Padrão"));
	tr.appendChild(td);
	metricas.map(e => {
		var td = document.createElement('td');
		var name = document.createTextNode(e.arrayValues[pos].stddev === undefined ? "-" : e.arrayValues[pos].stddev);
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);
	tabelas.appendChild(table);

	//Desvio Padrão
	tr = document.createElement('tr');
	td = document.createElement('td');
	td.appendChild(document.createTextNode("Valor"));
	tr.appendChild(td);
	metricas.map(e => {
		var td = document.createElement('td');
		var name = document.createTextNode(e.arrayValues[pos].value === undefined ? "-" : e.arrayValues[pos].value);
		td.appendChild(name);
		tr.appendChild(td);
	});
	table.appendChild(tr);
	tabelas.appendChild(table);
}



//Ponto de partida;
leitura(destinyMetricas[0]);