//Obligatorio de Dante Puerto (360160) y Lucas Villamil (352138)
class Sistema{
    constructor(){
        this.listaCarreras = [];
        this.listaPatrocinadores = [];
    }
    agregarCarreraEnLista(carrera){
        this.listaCarreras.push(carrera);
    }
    darListaCarreras(){
        return this.listaCarreras;
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
}

class Carrera{
    constructor(nombre, departamento, fecha, cupo){
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo; 
    }
    toString(){
        return "Carrera:" + " " + this.nombre + " en " + this.departamento + " el " + this.fecha + " Cupo: " + this.cupo;
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
}

class Inscripcion{
    constructor(corredores, carreras){
        this.corredores = corredores;
        this.carreras = carreras; 
    }
}

class Patrocinador{
    constructor(nombre, rubro, carreras){
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreras = carreras;
    }
}