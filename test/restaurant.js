// Clase Restaurante
// reservarHorario(horario): dado un horario (string) lo busca dentro del arreglo del horarios del restaurante y lo elimina.
// obtenerPuntuacion(): obtiene la puntuación del restaurante, que es el promedio de todas las calificaciones que recibió. Esta función suma todas las calificaciones que se encuentran en el arreglo de calificaciones y saca el promedio.
// calificar(nuevaCalificacion): agrega una nueva calificación al arreglo de calificaciones.

var expect = chai.expect;

describe("Clase Restaurant", function(){
  beforeEach(function(){
    restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
  })
  describe("Funcion reservarHorario", function(){
    // la cantidad de elementos del arreglo disminuya o no según corresponda.
    // el arreglo se mantenga igual, exactamente con los mismos elementos.
    // el arreglo cambie y contenga exactamente los elementos que corresponden.
    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.",function(){
      var cantidadDeElementos = restaurant.horarios.length;
      console.log(cantidadDeElementos);
      restaurant.reservarHorario("15:30");
      //expect(restaurant.horarios).to.exist("15:30");
      expect(restaurant.horarios).to.eql(["13:00", "18:00"]);
      //la cantidad de elementos del arreglo disminuya o no según corresponda
      var cantidadDeElementos2 = restaurant.horarios.length;
      expect(cantidadDeElementos2).to.equal(cantidadDeElementos-1);
    })
    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.",function(){
      restaurant.reservarHorario("15:70");
      expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"]);
    })
    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.",function(){
      restaurant.reservarHorario();
      expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"]);
    })
  })
  describe("Funcion obtenerPuntuacion", function(){
    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.",function(){
      var puntuacion = restaurant.obtenerPuntuacion();
      //expect(restaurant.horarios).to.exist("15:30");
      expect(puntuacion).to.equal(7.4);
    })

    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.",function(){
        // var puntuacion = restaurant.obtenerPuntuacion();
        // //expect(restaurant.horarios).to.exist("15:30");
        // expect(puntuacion).to.equal(7.4);
    })
    
  // it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.",function(){
  //     var puntuacion = restaurant.obtenerPuntuacion();
  //     //expect(restaurant.horarios).to.exist("15:30");
  //     expect("teta").to.equal("culo");
  //   })
    // it("dado ",function(){
    //   restaurant.reservarHorario("15:70");
    //   expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"]);
    // })
    //
    // it("cuando se intenta reservar un horario sin pasar parametro, el arreglo queda igual",function(){
    //   restaurant.reservarHorario();
    //   expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"]);
    // })
    //
  })
})
