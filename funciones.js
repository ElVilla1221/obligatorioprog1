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
    document.getElementById("idBotonAgregarPatrocinador").addEventListener("click",agregarPatrocinador);
    document.getElementById("idBotonAgregarCorredor").addEventListener("click", agregarCorredor);
    document.getElementById("idBotonInscribir").addEventListener("click", agregarInscripcion);
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
        let cupo = parseInt(document.getElementById("idIngresarCupo").value);
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
    cargarCarrerasenCombo2();
    cargarCarrerasenCombo3();
    cargarPorcentajeElites();
    cargarCorredoresEnCombo();
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
function cargarCarrerasenCombo2(){
    let combito = document.getElementById("idCarrerasInscribir");
    combito.innerHTML = "";
    let listaCarreras = sistema.darListaCarreras();
    for (elem of listaCarreras){
        let nodoC = document.createElement("option");
        let nodoTextoC = document.createTextNode(elem.nombre);
        nodoC.appendChild(nodoTextoC);
        combito.appendChild(nodoC);
    }
}
function cargarCarrerasenCombo3(){
    let combito = document.getElementById("idConsultaNombreCarrera");
    combito.innerHTML = "";
    let listaCarreras = sistema.darListaCarreras();
    for (elem of listaCarreras){
        let nodoC = document.createElement("option");
        let nodoTextoC = document.createTextNode(elem.nombre);
        nodoC.appendChild(nodoTextoC);
        combito.appendChild(nodoC);
    }
}

function agregarPatrocinador(){
    if(document.getElementById("formPatrocinadores").reportValidity()){
        let nombrePatr = document.getElementById("idNombrePatrocinador").value;
        let rubroPatr = document.getElementById("idPatrocinadorCombo").value;
        let carrerasPatr = [];
        for (let elem of document.getElementById("idListaCarreras").selectedOptions){
            carrerasPatr.push(elem.value);
        }
        if(!sistema.estaPatrocinador(nombrePatr)){
            sistema.agregarPatrocinadorEnLista(new Patrocinador(nombrePatr,rubroPatr,carrerasPatr));
            document.getElementById("formPatrocinadores").reset();
        }else{
            alert("NOMBRE DE PATROCINADOR REPETIDO, ACTUALIZANDO DATOS");
            for(let i = 0; i < sistema.darListaPatrocinadores().length; i++){
                if(sistema.darListaPatrocinadores()[i].nombre == nombrePatr){
                    sistema.darListaPatrocinadores()[i].rubro = rubroPatr;
                    sistema.darListaPatrocinadores()[i].carreras = carrerasPatr;
                }
            }
            document.getElementById("formPatrocinadores").reset();
        }
    }
}

function agregarCorredor(){
    if (document.getElementById("idFormCorredores").reportValidity()){
        let nombre = document.getElementById("idNombreCorredor").value;
        let edad = document.getElementById("idEdadCorredor").value;
        let vencFichaMedica = document.getElementById("idVencFichaMedica").value;
        let cedula = document.getElementById("idCedulaCorredor").value;
        let tipoCorredor = "";
        let radios = document.getElementsByName("tipodeportista");
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                tipoCorredor = radios[i].value;
            }
        }
        if (!sistema.estaCorredor(cedula)){
            sistema.agregarCorredorEnLista(new Corredor(nombre,edad,cedula,vencFichaMedica,tipoCorredor));
            actualizar();
            document.getElementById("idFormCorredores").reset();
        }else{
            alert("CEDULA REPETIDA");
            document.getElementById("idCedulaCorredor").value = "";
        }
    }
}

function porcentajeElite(){
    let porcent = Math.round((sistema.darElites().length * 100) / sistema.darListaCorredores().length*100) / 100;
    return porcent;
    actualizar();
}

function cargarPorcentajeElites(){
    document.getElementById("idPorcentajeElite").innerHTML = porcentajeElite() + "%";
}

function cargarCorredoresEnCombo(){
    let combito = document.getElementById("idCorredoresAInscribir");
    combito.innerHTML = "";
    let listaCorredores = sistema.darListaCorredores();
    for (elem of listaCorredores){
        let nodoC = document.createElement("option");
        let nodoTextoC = document.createTextNode(elem.nombre + " CI: (" + elem.cedula +")");
        nodoC.appendChild(nodoTextoC);
        combito.appendChild(nodoC);
    }
}

function agregarInscripcion(){
    let numero = 0;
    let corredor = document.getElementById("idCorredoresAInscribir").value;
    corredor = corredor.split("(")[1].split(")")[0];
    let carrera = document.getElementById("idCarrerasInscribir").value;
    for(let elem of sistema.darListaCorredores()){
        if(elem.cedula == corredor.toString()){
            corredor = elem;
        }
    }
    for(let elem of sistema.darListaCarreras()){
        if(elem.nombre == carrera){
            carrera = elem;
        }
    }
    let cupo = carrera.cupo;
    let vencFicha = new Date(corredor.vencimientoFicha);
    let fechaCarrera = new Date(carrera.fecha);
    if(vencFicha < fechaCarrera){
        alert("-FICHA MEDICA VENCIDA PARA LA FECHA DE LA CARRERA-")
        document.getElementById("formInscripciones").reset();
    }else{
        if(cupo <= 0){
            alert("-CARRERA SIN CUPO-")
            document.getElementById("formInscripciones").reset();
        }else{
            sistema.agregarInscripcionEnLista(new Inscripcion(corredor, carrera));
            for(let elem of sistema.darListaInscripciones()){
                if(elem.carreras.nombre == carrera.nombre){
                    numero++;
                }
            }
            alert("Número: " + numero + "\n" + "Nombre: " + corredor.nombre + " " + corredor.edad + " años, CI: " + corredor.cedula + " Ficha Médica " + corredor.vencimientoFicha 
            + "\n" + corredor.tipoCorredor + "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + carrera.fecha
            + " Cupo: " + carrera.cupo)
            document.getElementById("formInscripciones").reset();
            for(let elem of sistema.darListaCarreras()){
                if(elem.nombre == carrera.nombre){
                elem.cupo--;
                }
            }
        }
    }
}