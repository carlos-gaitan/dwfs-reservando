var Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento) {
  this.horario = horario;
  this.cantidadDePersonas = cantidadDePersonas;
  this.precioPorPersona = precioPorPersona;
  this.codigoDeDescuento = codigoDeDescuento;
};

Reserva.prototype.precioBase = function() {
  return this.cantidadDePersonas * this.precioPorPersona;
};

// descuento por cantidad de personas
Reserva.prototype.descuentoPorCantidadDePersonas = function(precioBase) {
  if (this.cantidadDePersonas >= 4 && this.cantidadDePersonas <= 6) {
    return (precioBase * 5 / 100);
  } else if (this.cantidadDePersonas >= 7 && this.cantidadDePersonas <= 8) {
      return (precioBase * 10 / 100);
    } else if (this.cantidadDePersonas > 8) {
        return (precioBase * 15 / 100);
      };
  return 0;
};

// descuento por codigo
Reserva.prototype.descuentoPorCodigoDeDescuento = function(precioBase) {
  console.log("codigoDescuento: ", this.codigoDeDescuento);
  switch (this.codigoDeDescuento) {
    case 'DES15':
      return (precioBase * 15 / 100);
      break;
    case 'DES200':
      return 200;
      break;
    case 'DES1':
      return this.precioPorPersona;
      break;
    default: return 0;
  };
};

//adicional horario
Reserva.prototype.adicionalPorHorario = function(precioBase) {
  var minutos = (this.horario.getHours() * 60) + this.horario.getMinutes();
  console.log("Hora: ", this.horario.getHours(), " - Minutos: ", this.horario.getMinutes());
  if ((minutos >= 780 && minutos < 840) || (minutos >= 1200 && minutos < 1260)){
    return (precioBase * 5 / 100);
  } else {
    return 0;
  };
};

//adicional dia de semana
Reserva.prototype.adicionalPorDiaSemana = function(precioBase) {
  var diaSemana = this.horario.getUTCDay();
  console.log("diaSemana: ", diaSemana);
  // Tenemos en cuenta que el Lunes es el dia 1 de la semana
  // entonces 5 es viernes, 6 es sabado y 7 es domingo
  if (diaSemana == 5 || diaSemana == 6 || diaSemana == 7) {
    return (precioBase * 10 / 100);
  } else {
    return 0;
  };
};

Reserva.prototype.precioFinal = function() {
  var precioBase = this.precioBase();
  var descuentos = this.descuentoPorCantidadDePersonas(precioBase) + this.descuentoPorCodigoDeDescuento(precioBase);
  var adicionales = this.adicionalPorHorario(precioBase) + this.adicionalPorDiaSemana(precioBase);

  console.log("precioBase: ", precioBase, " - descuentos: ",  descuentos, "+ adicionales", adicionales);
  console.log(precioBase - descuentos + adicionales);
  console.log("----------------------------------------------");
  return precioBase - descuentos + adicionales;
};
