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
    document.getElementById("idBotonAgregarCorredor").addEventListener("click", agregarCorredorALaLista);
    document.getElementById("idBotonInscribir").addEventListener("click", agregarInscripcion);
    document.getElementById("idConsultaNombreCarrera").addEventListener("change", cargarTabla);
    let radiosTabla = document.getElementsByName("ordenarCarrera");
    for(let i = 0; i < radiosTabla.length; i++){
        radiosTabla[i].addEventListener("change",cargarTabla);
    }
    actualizar();
}

function actualizar(){
    cargarCarrerasenCombo();
    cargarCarrerasenCombo2();
    cargarCarrerasenCombo3();
    cargarPorcentajeElites();
    cargarCorredoresEnCombo();
    cargarPromedioPorCarrera();
    cargarCarreraConMasInscriptosEnLista();
    cargarCarrerasSinInscriptos();
    cargarTabla();
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

function agregarCorredorALaLista(){
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
            sistema.agregarCorredorEnLista(new Corredor(nombre,edad,cedula,vencFichaMedica,tipoCorredor,null));
            actualizar();
            document.getElementById("idFormCorredores").reset();
        }else{
            alert("CEDULA REPETIDA");
            document.getElementById("idCedulaCorredor").value = "";
        }
    }
}

function porcentajeElite(){
    let porcent = Math.round((sistema.darElites().length)*100 / (sistema.darListaCorredores().length)*100) / 100;
    return porcent;
}

function cargarPorcentajeElites(){
    if(sistema.darListaCorredores().length == 0){
        document.getElementById("idPorcentajeElite").innerHTML = "sin datos";
    }else{
        document.getElementById("idPorcentajeElite").innerHTML = porcentajeElite() + "%";
    }
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
    let numero = 1;
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
    let patrocinador = [];
    for(let elem of sistema.darListaPatrocinadores()){
        if(elem.carreras.includes(carrera.nombre)){
            patrocinador.push(elem.nombre + " (" + elem.rubro + ") ");
        }
    }
    let fechaEnPartesCarrera = carrera.fecha.split("-");
    let fechaOrdenadaCarrera = fechaEnPartesCarrera[2] + "/" + fechaEnPartesCarrera[1] + "/" + fechaEnPartesCarrera[0];
    let fechaEnPartesFicha = corredor.vencimientoFicha.split("-");
    let fechaOrdenadaFicha = fechaEnPartesFicha[2] + "/" + fechaEnPartesFicha[1] + "/" + fechaEnPartesFicha[0];
    if(vencFicha < fechaCarrera){
        alert("-FICHA MEDICA VENCIDA PARA LA FECHA DE LA CARRERA-")
        document.getElementById("formInscripciones").reset();
    }else{
        if(cupo <= 0){
            alert("-CARRERA SIN CUPO-")
            document.getElementById("formInscripciones").reset();
        }else{
            let ok = true;
            for(let elem of sistema.darListaInscripciones()){
                if(elem.corredores.cedula == corredor.cedula && elem.carreras.nombre == carrera.nombre){
                    alert("EL CORREDOR YA FUE INSCRIPTO A LA CARRERA");
                    document.getElementById("formInscripciones").reset();
                    ok = false;
                }
            }
            if(ok){
                for(let elem of sistema.darListaInscripciones()){
                    if(elem.carreras.nombre == carrera.nombre){
                        numero++;
                    }
                }
                sistema.agregarInscripcionEnLista(new Inscripcion(corredor, carrera, numero));
                alert("Número: " + numero + "\n" + "Nombre: " + corredor.nombre + " " + corredor.edad + " años, CI: " + corredor.cedula + " Ficha Médica " + fechaOrdenadaFicha 
                + "\n" + corredor.tipoCorredor + "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + fechaOrdenadaCarrera
                + " Cupo: " + carrera.cupo + "\n" + patrocinador.toString());
                generarPDF(numero, corredor, carrera, patrocinador);
                document.getElementById("formInscripciones").reset();
                for(let elem of sistema.darListaCarreras()){
                    if(elem.nombre == carrera.nombre){
                    elem.cupo--;
                    }
                }
                actualizar();
            }
        }
    }
}

function calcularPromedioPorCarrera(){
    let porcent = Math.round((sistema.darListaInscripciones().length / sistema.darListaCarreras().length)*100) / 100;
    return porcent;
}
function cargarPromedioPorCarrera(){
    if(sistema.darListaInscripciones().length == 0){
        document.getElementById("idPromedioInscriptos").innerHTML = "sin datos"
    }else{
        document.getElementById("idPromedioInscriptos").innerHTML = " " + calcularPromedioPorCarrera();
    }
}

function generarPDF(numero, corredor, carrera, patrocinador){
    let {jsPDF} = window.jspdf;
    let doc = new jsPDF();
    let fechaEnPartesCarrera = carrera.fecha.split("-");
    let fechaOrdenadaCarrera = fechaEnPartesCarrera[2] + "/" + fechaEnPartesCarrera[1] + "/" + fechaEnPartesCarrera[0];
    let fechaEnPartesFicha = corredor.vencimientoFicha.split("-");
    let fechaOrdenadaFicha = fechaEnPartesFicha[2] + "/" + fechaEnPartesFicha[1] + "/" + fechaEnPartesFicha[0];
    doc.setFontSize(16);
    doc.text("Comprobante de inscripción", 10, 20);
    doc.setFontSize(12);
    doc.text("Número: " + numero, 10, 40);
    doc.text("Nombre: " + corredor.nombre + " " + corredor.edad + " años, CI: " + corredor.cedula + " Ficha médica: " + fechaOrdenadaFicha, 10, 50);
    doc.text(corredor.tipoCorredor, 10, 60);
    doc.text("Carrera: " + carrera.nombre + " en " + carrera.departamento + " el " + fechaOrdenadaCarrera + " Cupo: " + carrera.cupo, 10, 70);
    doc.text(doc.splitTextToSize(patrocinador.toString(), 190) , 10, 80);
    doc.save("comprobante-inscripcion.pdf");
}

function carreraConMasInscriptos(){
    let listaCarreras = sistema.darListaCarreras();
    let listaInscripciones = sistema.darListaInscripciones();
    let maxInsCarrera = 1;
    let carrerasMasInscripciones = [];
    let inscripciones = 0;
    for(let carrera of listaCarreras){
        let fechaEnPartesCarrera = carrera.fecha.split("-");
        let fechaOrdenadaCarrera = fechaEnPartesCarrera[2] + "/" + fechaEnPartesCarrera[1] + "/" + fechaEnPartesCarrera[0];
        for(let elem of listaInscripciones){
            if(carrera.nombre == elem.carreras.nombre){
                inscripciones++;
            }
        }
        if(inscripciones >= maxInsCarrera){
            maxInsCarrera = inscripciones;
            carrerasMasInscripciones.push(carrera.nombre + " en " + carrera.departamento + " el " + fechaOrdenadaCarrera + 
            " Cupo: " + carrera.cupo + " inscriptos: " + inscripciones); 
        }
        inscripciones = 0;
    }
    return carrerasMasInscripciones;
}

function cargarCarreraConMasInscriptosEnLista(){
    if(sistema.darListaInscripciones().length == 0){
        return;
    }else{
        let lista = document.getElementById("idCarreMasInscriptos");
	    lista.innerHTML = "";
        let carreras = carreraConMasInscriptos();
	    for (let elem of carreras){
   	        let li = document.createElement("LI");
	        let nodo = document.createTextNode(elem);
  	        li.appendChild(nodo);
	        lista.appendChild(li);
        }
    }
}

function carrerasSinInscriptos(){
    let listaCarreras = sistema.darListaCarreras().sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
    let listaInscripciones = sistema.darListaInscripciones();
    let listaCarrSinInsc = [];
    for(let carrera of listaCarreras){
        let noEsta = true;
        let fechaEnPartesCarrera = carrera.fecha.split("-");
        let fechaOrdenadaCarrera = fechaEnPartesCarrera[2] + "/" + fechaEnPartesCarrera[1] + "/" + fechaEnPartesCarrera[0];
        for(let insc of listaInscripciones){
            if(insc.carreras.nombre == carrera.nombre){
                noEsta = false;
            }
        }
        if(noEsta){
            listaCarrSinInsc.push(carrera.nombre + " en " + carrera.departamento + " el " + fechaOrdenadaCarrera + 
            " Cupo: " + carrera.cupo);
        }
    }
    return listaCarrSinInsc;
}
function cargarCarrerasSinInscriptos(){
    if(sistema.darListaCarreras().length == 0){
        return;
    }else{
        let lista = document.getElementById("idCarreSinInscriptosPorFecha");
	    lista.innerHTML = "";
        let carreras = carrerasSinInscriptos();
        if(carreras.length == 0){
            let li = document.createElement("LI");
            let nodo = document.createTextNode("sin datos");
  	        li.appendChild(nodo);
	        lista.appendChild(li);
        }else{
            for (let elem of carreras){
                let li = document.createElement("LI");
                let nodo = document.createTextNode(elem);
  	            li.appendChild(nodo);
	            lista.appendChild(li);
            }
        }
    }
}

function cargarTabla(){
    let ordenadosNombre = [];
    let ordenadosNumero = [];
    let lista = [];
    let nomCarrera = document.getElementById("idConsultaNombreCarrera").value;
    let listaInscripciones = sistema.darListaInscripciones();
    for(let elem of listaInscripciones){
        if(nomCarrera == elem.carreras.nombre){
            lista.push(elem);
        }
    }
    if(lista.length > 0){
        ordenadosNumero = lista.slice().sort((a,b) => (a.numero) - (b.numero));
        ordenadosNombre = lista.slice().sort((a,b) => a.corredores.nombre.localeCompare(b.corredores.nombre, 'es', { sensitivity: 'base' }));
    }
    let radios = document.getElementsByName("ordenarCarrera");
    let cuerpo = document.getElementById("idBodyTablaInscriptos");
    cuerpo.innerHTML = "";
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked && radios[i].value == "nombre"){
            for(let elem of ordenadosNombre){
                let tr = document.createElement("tr");
                let tdNombre = document.createElement("td");
                tdNombre.textContent = elem.corredores.nombre;
                tr.appendChild(tdNombre);
                let tdEdad = document.createElement("td");
                tdEdad.textContent = elem.corredores.edad;
                tr.appendChild(tdEdad);
                let tdCedula = document.createElement("td");
                tdCedula.textContent = elem.corredores.cedula;
                tr.appendChild(tdCedula);
                let tdFicha = document.createElement("td");
                tdFicha.textContent = elem.corredores.vencimientoFicha;
                tr.appendChild(tdFicha);
                let tdNumero = document.createElement("td");
                tdNumero.textContent = elem.numero;
                tr.appendChild(tdNumero);
                cuerpo.appendChild(tr);
            }
        }
        else if(radios[i].checked && radios[i].value == "numero"){
            for(let elem of ordenadosNumero){
                let tr = document.createElement("tr");
                let tdNombre = document.createElement("td");
                tdNombre.textContent = elem.corredores.nombre;
                tr.appendChild(tdNombre);
                let tdEdad = document.createElement("td");
                tdEdad.textContent = elem.corredores.edad;
                tr.appendChild(tdEdad);
                let tdCedula = document.createElement("td");
                tdCedula.textContent = elem.corredores.cedula;
                tr.appendChild(tdCedula);
                let tdFicha = document.createElement("td");
                tdFicha.textContent = elem.corredores.vencimientoFicha;
                tr.appendChild(tdFicha);
                let tdNumero = document.createElement("td");
                tdNumero.textContent = elem.numero;
                tr.appendChild(tdNumero);
                cuerpo.appendChild(tr);
            }
        }
    }
}