//Obligatorio de Dante Puerto (360160) y Lucas Villamil (352138)
window.addEventListener("load",inicio);
let sistema = new Sistema();

function inicio(){
    let seccionEstadisticasMain = document.getElementById("seccionEstadisticas");
    seccionEstadisticasMain.style.display = "none";
    let botonDatos = document.getElementById("idDatos");
    botonDatos.style.backgroundColor = "rgb(43,145,165)"
    document.getElementById("idDatos").addEventListener("click",mostrarDatos);
    document.getElementById("idEstadisticas").addEventListener("click",mostrarEstadisticas);
    document.getElementById("idBotonAgregarCarrera").addEventListener("click", agregarCarrera);
    actualizar();
}

function mostrarDatos(){
    let seccionDatos = document.getElementById("seccionDatos")
    seccionDatos.style.display = "block";
    let seccionEstadisticas = document.getElementById("seccionEstadisticas");
    seccionEstadisticas.style.display = "none";
    let boton = document.getElementById("idEstadisticas");
    boton.style.backgroundColor = "";
    let botonDatos = document.getElementById("idDatos");
    botonDatos.style.backgroundColor = "rgb(43,145,165)";
}

function mostrarEstadisticas(){
    let seccionEstadisticas = document.getElementById("seccionEstadisticas");
    seccionEstadisticas.style.display = "block";
    let seccionDatos = document.getElementById("seccionDatos")
    seccionDatos.style.display = "none";
    let boton = document.getElementById("idEstadisticas");
    boton.style.backgroundColor = "rgb(43,145,165)";
    let botonDatos = document.getElementById("idDatos");
    botonDatos.style.backgroundColor = "";
}

function agregarCarrera(){
    if (document.getElementById("idFormCarreras").reportValidity()){
        let nombre = document.getElementById("idNombreCarrera").value;
        let departamento = document.getElementById("idDepartamentoCombo").value;
        let fecha = document.getElementById("idFecha").value;
        let cupo = document.getElementById("idIngresarCupo").value;
        if (!sistema.estaCarrera(nombre)){
            sistema.agregarCarreraEnLista(new Carrera(nombre,departamento,fecha,cupo));
            actualizar();
            document.getElementById("idFormCarreras").reset();
        }else{
            alert("NOMBRE DE CARRERA REPETIDO");
            document.getElementById("idNombreCarrera").value = "";
        }
    }
}

function actualizar(){
    cargarCarrerasenCombo();
}

function cargarCarrerasenCombo(){
    let combito = document.getElementById("idListaCarreras");
    combito.innerHTML = "";
    let listaCarreras = sistema.darListaCarreras();
    for (elem of listaCarreras){
        let nodoC = document.createElement("option");
        let nodoTextoC = document.createTextNode(elem.nombre);
        nodoC.appendChild(nodoTextoC);
        combito.appendChild(nodoC);
    }

}
