function execute() {

    console.log(metricas);
    metricas.map(e => {
        const filename = e.name + '.json';
        const jsonStr = JSON.stringify(e.arrayAll);
        let element = document.createElement('a');
        element.text = 'Download ' + e.name;
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
        element.setAttribute('download', filename);
        document.getElementById('downloads').appendChild(element);
        document.getElementById('downloads').appendChild(document.createElement('br'));
    });

    //Create the metrics tables;
    metricas[0].arrayMetrics.map((e, i) => (i !== 3 && i !== 4) ? makeTables(i) : '');
}

function makeTables(pos) {
    var tabelas = document.getElementById('tabelas');
    tabelas.appendChild(document.createElement('br'));

    let table = document.createElement('table');
    table.setAttribute('class', 'table');

    const maximo = metricas[0].arrayMetrics[pos].max;
    const metrica = metricas[0].arrayMetrics[pos].description + (maximo == undefined ? '' : ' Max: ' + maximo);
    
    let tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(metrica));
    tr.appendChild(td); 
    table.appendChild(tr);

    metricas.map(m => {
        var td = document.createElement('td');
        var name = document.createTextNode('  ' + m.name + '  ');
        td.appendChild(name);
        tr.appendChild(td);
    });

    td = document.createElement('td');
    td.appendChild(document.createTextNode('Todos os módulos'));
    tr.appendChild(td);
    table.appendChild(tr);

    //Total
    tr = document.createElement('tr');
    td = document.createElement('td');
    var name = document.createTextNode('Total');
    td.appendChild(name);
    tr.appendChild(td);
    var cont = 0;
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].total !== undefined) {
            cont += parseInt(e.arrayValues[pos].total);
            name = document.createTextNode(e.arrayValues[pos].total);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    cont = cont === 0 ? '-' : cont;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(cont));
    tr.appendChild(td);
    table.appendChild(tr);

    //Máximo
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Máximo'));
    tr.appendChild(td);
    cont = 0;
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].max !== undefined) {
            cont = parseInt(e.arrayValues[pos].max) > cont ? parseInt(e.arrayValues[pos].max) : cont;
            name = document.createTextNode(e.arrayValues[pos].max);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    cont = cont === 0 ? '-' : cont;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(cont));
    tr.appendChild(td);
    table.appendChild(tr);

    //Média
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Média'));
    tr.appendChild(td);
    cont = 0;
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].avg !== undefined) {
            cont += parseFloat(e.arrayValues[pos].avg.replace(/,/, '.'));
            name = document.createTextNode(e.arrayValues[pos].avg);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    if (cont === 0) {
        cont = '-';
    } else {
        cont = (cont / metricas.length).toFixed(3);
    }
    cont = cont === 0 ? '-' : cont;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(cont));
    tr.appendChild(td);
    table.appendChild(tr);

    //Desvio Padrão
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Desvio Padrão'));
    tr.appendChild(td);
    metricas.map(e => {
        var td = document.createElement('td');
        var name = document.createTextNode(e.arrayValues[pos].stddev === undefined ? '-' : e.arrayValues[pos].stddev);
        td.appendChild(name);
        tr.appendChild(td);
    });
    td = document.createElement('td');
    td.appendChild(document.createTextNode('-'));
    tr.appendChild(td);
    table.appendChild(tr);

    //Valor
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Valor'));
    tr.appendChild(td);
    var cont = 0;
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].value !== undefined) {
            cont += parseInt(e.arrayValues[pos].value);
            name = document.createTextNode(e.arrayValues[pos].value);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    cont = cont === 0 ? '-' : cont;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(cont));
    tr.appendChild(td);
    table.appendChild(tr);

    tabelas.appendChild(table);
}

//Ponto de partida;
leitura(destinyMetricas[0]);