
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

    //Total
    tr = document.createElement('tr');
    td = document.createElement('td');
    var name = document.createTextNode('Total');
    td.appendChild(name);
    tr.appendChild(td);
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].total !== undefined) {
            name = document.createTextNode(e.arrayValues[pos].total);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    table.appendChild(tr);

    //Máximo
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Máximo'));
    tr.appendChild(td);
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].max !== undefined) {
            name = document.createTextNode(e.arrayValues[pos].max);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    table.appendChild(tr);

    //Média
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Média'));
    tr.appendChild(td);
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].avg !== undefined) {
            ;
            name = document.createTextNode(e.arrayValues[pos].avg);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
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
    table.appendChild(tr);

    //Valor
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Valor'));
    tr.appendChild(td);
    metricas.map(e => {
        var td = document.createElement('td');
        var name;
        if (e.arrayValues[pos].value !== undefined) {
            name = document.createTextNode(e.arrayValues[pos].value);
        } else {
            name = document.createTextNode('-');
        }
        td.appendChild(name);
        tr.appendChild(td);
    });
    table.appendChild(tr);

    tabelas.appendChild(table);
}


function makePrincipalTable() {
    var tabelas = document.getElementById('tabelas');
    tabelas.appendChild(document.createElement('br'));
    let table = document.createElement('table');

    let tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('Métricas'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Total'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Máximo'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Média'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Valor'));
    tr.appendChild(td);
    table.appendChild(tr);

    metricas[6].arrayMetrics.map((e, i) => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(e.description));
        tr.appendChild(td);

        td = document.createElement('td');
        if (metricas[6].arrayValues[i].total !== undefined) {
            td.appendChild(document.createTextNode('' + metricas[6].arrayValues[i].total));
            tr.appendChild(td);
        } else {
            td.appendChild(document.createTextNode('-'));
            tr.appendChild(td);
        }

        td = document.createElement('td');
        if (metricas[6].arrayValues[i].max !== undefined) {
            td.appendChild(document.createTextNode('' + metricas[6].arrayValues[i].max));
            tr.appendChild(td);
        } else {
            td.appendChild(document.createTextNode('-'));
            tr.appendChild(td);
        }

        td = document.createElement('td');
        if (metricas[6].arrayValues[i].avg !== undefined) {
            td.appendChild(document.createTextNode('' + metricas[6].arrayValues[i].avg));
            tr.appendChild(td);
        } else {
            td.appendChild(document.createTextNode('-'));
            tr.appendChild(td);
        }

        td = document.createElement('td');
        if (metricas[6].arrayValues[i].value !== undefined) {
            td.appendChild(document.createTextNode('' + metricas[6].arrayValues[i].value));
            tr.appendChild(td);
        } else {
            td.appendChild(document.createTextNode('-'));
            tr.appendChild(td);
        }

        table.appendChild(tr);
    });
    tabelas.appendChild(table);
}