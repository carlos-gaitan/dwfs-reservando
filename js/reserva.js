var Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento) {
  this.horario = horario;
  this.cantidadDePersonas = cantidadDePersonas;
  this.precioPorPersona = precioPorPersona;
  this.codigoDeDescuento = codigoDeDescuento;
}

Reserva.prototype.precioBase = function() {
  return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.precioFinal = function() {
  var descuentos = 0;
  if (this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6) {
    descuentos += this.precioBase() * 5 / 100;
  } else if (this.cantidadDePersonas >= 7 && this.cantidadDePersonas <= 8) {
    descuentos += this.precioBase() * 10 / 100;
  } else if (this.cantidadDePersonas > 8) {
    descuentos += this.precioBase() * 15 / 100;
  };
  switch (this.codigoDeDescuento) {
    case "DES15":
      descuentos += this.precioBase() * 15 / 100;
      break;
    case "DES200":
      descuentos += 200;
      break;
    case "DES1":
      descuentos += this.precioPorPersona;
      break;
    default:
  };

  var adicionales = 0;
  //adicional horario
  if ((this.horario >= 13 && this.horario <= 14) || (this.horario >=20 && this.horario <= 21)) {
    adicionales += this.precioBase() * 5 / 100;
  }
  //adicional dia de semana
  var diaSemana = this.horario.getUTCDay();
  if (diaSemana == 0 || diaSemana == 5 || diaSemana == 6) {
    adicionales += this.precioBase() * 10 / 100;
  }

  var precioFinal = this.precioBase() + adicionales - descuentos;
  return precioFinal;
}
//
// Reserva.prototype.xxx2 = function() {
//     this.dibujarHorarios();
//     this.dibujarRubros();
//     this.dibujarCiudades();
// }
