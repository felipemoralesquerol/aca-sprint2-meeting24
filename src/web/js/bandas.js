async function getBandas() {
    var elemento = document.getElementById("bandas");
    console.log("getBandas", elemento);
    const bandas = await fetch('http://localhost:3000/bandas');
    const respuesta = await bandas.json();
    for (let i = 0; i < respuesta.length; i++) {
        console.log(respuesta[i].nombre);
        elemento.value += respuesta[i].nombre + '\r\n';

    }


}