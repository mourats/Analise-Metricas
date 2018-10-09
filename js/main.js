function execute() {

    obj = {
        name: 'Todos os módulos',
        arrayValues: [],
        arrayMetrics: metricas[0].arrayMetrics
    }
    metricas.push(obj);

    //Calculate metrics of all modules and Create the metrics tables;
    metricas[0].arrayMetrics.map((e, i) => { calculeMetricsOfAll(i); makeTables(i); });
    //Make table for milestone
    makePrincipalTable();

    console.log(metricas);
    metricas.map((e, i) => {
        const filename = e.name + '.json';
        const jsonStr = JSON.stringify(i == 6 ? e : e.arrayAll);
        let element = document.createElement('a');
        element.text = 'Download ' + e.name;
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
        element.setAttribute('download', filename);
        document.getElementById('downloads').appendChild(element);
        document.getElementById('downloads').appendChild(document.createElement('br'));
    });
}

function calculeMetricsOfAll(pos) {
    obj = {};
    //Total
    var cont = 0;
    metricas.map(e => {
        if (e.name !== 'Todos os módulos' && e.arrayValues[pos].total !== undefined)
            cont += parseInt(e.arrayValues[pos].total);
    });
    cont = cont === 0 ? '' : obj.total = cont;

    //Máximo
    cont = 0;
    metricas.map(e => {
        if (e.name !== 'Todos os módulos' && e.arrayValues[pos].max !== undefined)
            cont = parseInt(e.arrayValues[pos].max) > cont ? parseInt(e.arrayValues[pos].max) : cont;
    });
    cont = cont === 0 ? '' : obj.max = cont;

    //Média
    cont = 0;
    metricas.map(e => {
        if (e.name !== 'Todos os módulos' && e.arrayValues[pos].avg !== undefined)
            cont += parseFloat(e.arrayValues[pos].avg.replace(/,/, '.'));
    });
    if (cont !== 0) {
        cont = (cont / (metricas.length - 1)).toFixed(3);
        obj.avg = cont;
    }
    //Valor
    var cont = 0;
    metricas.map(e => {
        if (e.name !== 'Todos os módulos' && e.arrayValues[pos].value !== undefined)
            cont += parseInt(e.arrayValues[pos].value);
    });
    cont = cont === 0 ? '' : obj.value = cont;

    metricas[6].arrayValues.push(obj);
}

//Ponto de partida;
leitura(destinyMetricas[0]);