let data;

let highestValue;/* Este Lo necesitamos para poder transformar los amount del json, para que esten en el rango de 0 a 1, ya que sino las barras sobresalen del grafico :) */

const getData = async () => {
    const res = await fetch("../data.json");

    if(!res.ok){/* EN CASO DE ERROR */
        throw new Error(`Parece que tenemos un Payasito, HTTP error! status: ${res.status}`);
    }

    const done = await res.json();
    data = done;
};

async function loadData(){

    await getData();

    let array = [];

    data.forEach(element => {
        array.push(element.amount);
    });

    highestValue = Math.max(...array);

    for(let i = 0; i < document.querySelectorAll(".data").length; i++){
        //Le cambiamos el texto "Data" de cada barra con su respectivo monto:
        document.querySelectorAll(".data")["" + i].textContent = "$" + array[i];
    }

    for(let i = 0; i < document.querySelectorAll(".tdBarra").length; i++){
        //Le cambiamos el texto "Data" de cada barra con su respectivo monto:
        document.querySelectorAll(".tdBarra")["" + i].style = "--size: " + (array[i] / highestValue);
    }
    
    
}

loadData();




