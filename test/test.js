var expect = chai.expect;

describe("Test Master", function(){
  describe("Test reservaHorario -> restaurant", function(){
    var restaurantTest;
    beforeEach(function(){
      restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    })

    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.", function(){
      var inicial = restaurantTest.horarios.length;
      restaurantTest.reservarHorario("13:00");
      expect(restaurantTest.horarios).to.lengthOf(inicial - 1);
      expect(restaurantTest.horarios.indexOf("13:00")).to.equal(-1);
    });

    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.", function(){
      var inicial = restaurantTest.horarios.length;
      restaurantTest.reservarHorario("14:00");
      expect(restaurantTest.horarios).to.lengthOf(inicial);
      expect(restaurantTest.horarios).to.eql(["13:00", "15:30", "18:00"]);
    });

    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){
      var inicial = restaurantTest.horarios.length;
      restaurantTest.reservarHorario();
      expect(restaurantTest.horarios).to.lengthOf(inicial);
      expect(restaurantTest.horarios).to.eql(["13:00", "15:30", "18:00"]);
    });

  });

  describe("Test obtenerPuntuacion() -> restaurant",function(){
    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente",function(){
      var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
      var puntuacion = restaurantTest.obtenerPuntuacion();
      expect(puntuacion).to.equal(7.4);
    })

    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.",function(){
      var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", []);
      var puntuacion = restaurantTest.obtenerPuntuacion();
      expect(puntuacion).to.equal(0);
    })

  })


  describe("Test calificar(val) -> restaurant", function(){
    it("Califica en 4, agregandolo al final de calificaciones", function(){
      var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 5]);
      restaurantTest.calificar(4);
      expect(restaurantTest.calificaciones).to.eql([6, 7, 9, 5, 4]);
    });

    it("Calificacion en -10, no agrega calificacion", function(){
      var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
      restaurantTest.calificar(-10);
      expect(restaurantTest.calificaciones).to.eql([6, 7, 9, 10, 5]);
    });

    it("No agrega calificacion si no es entero entre 1 y 9.", function(){
      var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
      restaurantTest.calificar("22");
      restaurantTest.calificar("pepep");
      restaurantTest.calificar(5.9);
      restaurantTest.calificar(10);
      restaurantTest.calificar("");
      restaurantTest.calificar();
      restaurantTest.calificar([10]);
      restaurantTest.calificar({calif: 8});
      restaurantTest.calificar(-8.7);
      var valoresTest = [1,2,3,4,5,6,7,8,9];
      expect(restaurantTest.calificaciones).to.eql([6, 7, 9, 10, 5]);
      restaurantTest.calificaciones = [];
      valoresTest.forEach(element => {
        restaurantTest.calificar(element);
      });
      expect(restaurantTest.calificaciones).to.eql(valoresTest);
    });
  });

  describe("Test buscarRestaurante(id) ->listado",function(){
    it("Buscar restaurant por id numerico entero, devolviendo el obj restaruant solicitado",function(){
      if (listado.restaurantes[0].id){
        var idExpect = listado.restaurantes[0].id;
        var objResult = listado.buscarRestaurante(idExpect);
        expect(objResult.id).to.equal(idExpect);
      }
    })
    it("Busca restaurant con id nulo, espera respuesta con id undefinded, independientemente del strig error", function(){
      expect(listado.buscarRestaurante().id).to.be.undefined;
    });
  });

  describe("Test obtenerRestaurantes(filtroRubro,filtroCiudad,filtroHorario) -> listado",function(){
    var testListado;
    beforeEach(function(){
      var testRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
        new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
        new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
        new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
        new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
        new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6])];
      testListado = new Listado(testRestaurantes);
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver los restaurantes que cumplan con el filtro rubro",function(){
      var rubro = "Pasta";
      var cantidadEsperada = 2;
      var listadoResult = testListado.obtenerRestaurantes(rubro,null,null);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      listadoResult.forEach(element => {
        expect(element.rubro).to.be.equal(rubro);
      });
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver vacio ante un rubro inexistente",function(){
      var rubro = "Parrilla";
      var cantidadEsperada = 0;
      var listadoResult = testListado.obtenerRestaurantes(rubro,null,null);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      expect(listadoResult).to.be.empty;
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver los restaurantes que cumplan con el filtro ciudad",function(){
      var ciudad = "Londres";
      var cantidadEsperada = 2;
      var listadoResult = testListado.obtenerRestaurantes(null,ciudad,null);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      listadoResult.forEach(element => {
        expect(element.ubicacion).to.be.equal(ciudad);
      });
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver vacio ante una ciudad inexistente",function(){
      var ciudad = "Madrid";
      var cantidadEsperada = 0;
      var listadoResult = testListado.obtenerRestaurantes(null,ciudad,null);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      expect(listadoResult).to.be.empty;
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver los restaurantes que cumplan con el filtro horario",function(){
      var horario = "12:00";
      var cantidadEsperada = 4;
      var listadoResult = testListado.obtenerRestaurantes(null,null,horario);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      listadoResult.forEach(element => {
        expect(element.horarios).to.be.an('array').that.includes(horario);
      });
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver vacio ante un horario inexistente",function(){
      var horario = "12:38";
      var cantidadEsperada = 0;
      var listadoResult = testListado.obtenerRestaurantes(null,null,horario);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      expect(listadoResult).to.be.empty;
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver todos los elementos cuando los filtros son nulos",function(){
      var cantidadEsperada = 10;
      var listadoResult = testListado.obtenerRestaurantes(null,null,null);
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      expect(listadoResult).to.be.eql(testListado.restaurantes);
    });

    it("Dado un grupo de restaurantes, obtenerRestaurantes debe devolver vacio con filtros erroneos",function(){
      var cantidadEsperada = 0;
      var listadoResult = testListado.obtenerRestaurantes("Mar del Plata","ssddwwdasd","-qweqjwnekasd");
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
      listadoResult = testListado.obtenerRestaurantes("Mar del Plata",10,"-qweqjwnekasd");
      expect(listadoResult.length).to.be.equal(cantidadEsperada);
    });
  });
});


describe("Nuevas funcionalidades", function(){
  var testReserva;
  beforeEach(function(){
    testReserva  = [
      new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
      new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200"),
    ];
  });

  describe('Test precioBase -> reserva', function() {
    it('Calcula correctamente el precio base', function() {
      expect(testReserva[0].precioBase()).to.equal(2800);
      expect(testReserva[1].precioBase()).to.equal(300);
    });
  });

  describe('Test precioFinal -> reserva', function() {
    it('Calcula correctamente el precio final', function() {
      expect(testReserva[0].precioFinal()).to.equal(2310);
      expect(testReserva[1].precioFinal()).to.equal(100);
    });
  });
});
