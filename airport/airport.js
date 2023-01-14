"use strict";
(function () {
  console.log("Hi");

  // helper
  const randomNum = () => Math.trunc(Math.random() * (100 - 10) + 1) + 10;

  // constructor functions
  const Person = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  const Seat = function (number, cat) {
    // need validate if only number
    this.number = number || randomNum();

    // need validate if only b || e
    this.category = (cat || "e").toUpperCase();
  };

  const Passenger = function (person, seat) {
    this.person = person;
    this.seat = seat;
  };

  const Flight = function (relation, date) {
    this.relation = relation;
    this.date = new Date(date);
    this.passengers = [];
  };

  const Airport = function () {
    this.name = "Nikola Tesla";
    this.flights = [];
  };

  // constructor functions methods
  Person.prototype.getData = function () {
    const name = `${this.firstName} ${this.lastName}`;
    return name;
  };

  Seat.prototype.getData = function () {
    const seating = `${this.number}, ${this.category}`;
    return seating;
  };

  Passenger.prototype.getData = function () {
    const passengerInfo = `${this.seat.number}, ${this.seat.category}, ${this.person.firstName} ${this.person.lastName}`;
    return passengerInfo;
  };

  Flight.prototype.addPassenger = function (passenger) {
    this.passengers.push(passenger);
  };

  Flight.prototype.getData = function () {
    const flightDate = `${this.date.getDate()}.${(
      "" +
      (this.date.getMonth() + 1)
    ).padStart(2, "0")}.${this.date.getFullYear()}`;

    let flightInfo = `${flightDate}, ${this.relation}`;

    this.passengers.forEach(passenger => {
      flightInfo += `
            ${passenger.seat.number}, ${passenger.seat.category}, ${passenger.person.firstName} ${passenger.person.lastName}`;
    });

    return flightInfo;
  };

  Airport.prototype.addFlight = function (flight) {
    this.flights.push(flight);
  };

  Airport.prototype.getData = function () {
    let totalPassengers = 0;
    let flightData = "";

    this.flights.forEach(flight => {
      totalPassengers += flight.passengers.length;
      flightData += `\t${flight.getData()} \n\t`;
    });

    const airportInfo = `Airport: ${this.name}, total passengers: ${totalPassengers}
      ${flightData}
    `;
    return airportInfo;
  };

  const createFlight = function (relation, date) {
    const flight = new Flight(relation, date);
    return flight;
  };

  const createPassenger = function (firstName, lastName, number, cat) {
    const person = new Person(firstName, lastName);
    const seat = new Seat(number, cat);
    const passenger = new Passenger(person, seat);
    return passenger;
  };

  const teslaAirport = new Airport();

  const flightBGNY = createFlight("Belgrade - New York", "Oct 25, 2017");
  const flightBGBAR = createFlight("Barcelona - Belgrade", "Nov 11, 2017");

  const john = createPassenger("John", "Snow", "1", "b");
  const cersei = createPassenger("Cersei", "Lannister", "2", "b");
  const daenerys = createPassenger("Daenerys", "Targaryen", "14");
  const tyrion = createPassenger("Tyrion", "Lannister");

  flightBGNY.addPassenger(john);
  flightBGNY.addPassenger(cersei);
  flightBGBAR.addPassenger(daenerys);
  flightBGBAR.addPassenger(tyrion);

  teslaAirport.addFlight(flightBGNY);
  teslaAirport.addFlight(flightBGBAR);

  console.log(teslaAirport.getData());
})();
