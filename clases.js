//Obligatorio de Dante Puerto (360160) y Lucas Villamil (352138)
class Sistema{
    constructor(){
        this.listaCarreras = [];
        this.listaPatrocinadores = [];
        this.listaCorredores = [];
        this.listaInscripciones = [];
    }
    agregarCarreraEnLista(carrera){
        this.listaCarreras.push(carrera);
    }
    darListaCarreras(){
        let lista = this.listaCarreras
        lista = lista.sort((a,b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
        return lista;
    }
    estaCarrera(nombreCarrera){
        let esta = false;
        for (let elem of this.listaCarreras){
            if (elem.nombre == nombreCarrera){
                esta = true;
            }
        }
        return esta;
    }
    agregarPatrocinadorEnLista(patrocinador){
        this.listaPatrocinadores.push(patrocinador);
    }
    darListaPatrocinadores(){
        return this.listaPatrocinadores;
    }
    estaPatrocinador(nombrePatrocinador){
        let esta = false;
        for(let elem of this.listaPatrocinadores){
            if(elem.nombre == nombrePatrocinador){
                esta = true;
            }
        }
        return esta;
    }
    agregarCorredorEnLista(corredor){
        this.listaCorredores.push(corredor);
    }
    darListaCorredores(){
        let lista = this.listaCorredores;
        lista = lista.sort((a,b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
        return lista;
    }
    estaCorredor(cedulaIngresada){
        let esta = false;
        for(let elem of this.listaCorredores){
            if (elem.cedula == cedulaIngresada){
                esta = true;
            }
        }
        return esta;
    }
    darElites(){
        let list = [];
        for(let elem of this.listaCorredores){
            if(elem.esElite()){
                list.push(elem);
            }
        }
        return list;
    }
    agregarInscripcionEnLista(inscripcion){
        this.listaInscripciones.push(inscripcion);
    }
    darListaInscripciones(){
        return this.listaInscripciones;
    }
    carrerasPorDepartamento(departamento){
        let cant = 0;
        let listaCarreras = sistema.darListaCarreras();
        for(let elem of listaCarreras){
            if(elem.departamento == departamento){
                cant++;
            }
        }
        return cant;
    }
    inscriptosPorDepartamento(departamento){
        let cant = 0;
        let listaInsc = sistema.darListaInscripciones();
        for(let elem of listaInsc){
            if(elem.carreras.departamento == departamento){
                cant++;
            }
        }
        return cant;
    }
}

class Carrera{
    constructor(nombre, departamento, fecha, cupo){
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo;
    }   
}

class Corredor{
    constructor(nombre,edad,cedula,vencFicha,tipoCorredor){
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.vencimientoFicha = vencFicha;
        this.tipoCorredor = tipoCorredor;
    }
    esElite(){
        let elite = false
        if(this.tipoCorredor == "Élite"){
            elite = true
            return elite;
        }
        return elite;
    }
}

class Inscripcion{
    constructor(corredores, carreras, numero){
        this.corredores = corredores;
        this.carreras = carreras; 
        this.numero = numero;
    }
}

class Patrocinador{
    constructor(nombre, rubro, carreras){
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreras = carreras;
    }
}