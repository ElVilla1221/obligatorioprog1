//Obligatorio de Dante Puerto (360160) y Lucas Villamil (352138)
class Sistema{
    constructor(){
        this.listaCarreras = [];
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
}

class Carrera{
    constructor(nombre, departamento, fecha, cupo){
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo; 
    }
    toString(){
        return this.nombre + " en " + this.departamento + " el " + this.fecha + " Cupo: " + this.cupo;
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
    constructor(nombrePatrocinador, rubro, carreraPatrocinador){
        this.nombre = nombrePatrocinador;
        this.rubro = rubro;
        this.carrera = carreraPatrocinador;
    }
}