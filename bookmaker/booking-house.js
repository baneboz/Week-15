"use strict";
const Continent = {
  ASIA: "AS",
  EUROPE: "EU",
  AFRICA: "AF",
  SOUTHAMERICA: "SA",
  NORTHAMERICA: "NA",
  AUSTRALIA: "AU",
};
Object.freeze(Continent);

const Country = function (name, odds, continent) {
  this.name = name;
  this.odds = odds;
  this.continent = continent;
};

const Person = function (name, surname, dateOfBirth) {
  this.name = name;
  this.surname = surname;
  this.dateOfBirth = dateOfBirth;
};

const Player = function (person, betAmount, country) {
  this.person = person;
  this.betAmount = betAmount;
  this.country = country;
};

const Address = function (country, city, postalCode, street, number) {
  this.country = country;
  this.city = city;
  this.postalCode = postalCode;
  this.street = street;
  this.number = number;
};

const BettingPlace = function (address) {
  this.address = address;
  this.players = [];
};

const BettingHouse = function (title) {
  this.title = title;
  this.numOfPlayers = 0;
  this.betPlaces = [];
};

Person.prototype.getData = function () {
  const info = `${this.name} ${this.surname} ${this.dateOfBirth}`;
  return info;
};

Address.prototype.getData = function () {
  const info = `${this.street} ${this.number}, ${this.postalCode} ${this.city}, ${this.country.name}`;
  return info;
};

Player.prototype.getData = function () {
  const thisYear = new Date().getFullYear();
  const playerAge = thisYear - this.person.dateOfBirth.slice(-4);
  const info = `${this.country.name}, ${(
    this.country.odds * this.betAmount
  ).toFixed(2)} eur, ${this.person.name} ${
    this.person.surname
  }, ${playerAge} years`;
  return info;
};

BettingPlace.prototype.getData = function () {
  let sum = 0;
  this.players.forEach(player => {
    sum += player.betAmount;
  });
  const info = `${this.address.street}, ${this.address.postalCode} ${this.address.city}, sum of all bets: ${sum} eur`;
  return info;
};
BettingPlace.prototype.addPlayer = function (player) {
  this.players.push(player);
};

//
(function () {
  const createPlayer = function (person, betAmount, country) {
    const player = new Player(person, betAmount, country);
    return player;
  };

  const createBettingPlace = function (address) {
    const betPlace = new BettingPlace(address);
    return betPlace;
  };

  const WC = new BettingHouse("Football World Cup Winner");

  const srb = new Country("SR", 2.5, Continent.EUROPE);
  const ger = new Country("GR", 1.5, Continent.EUROPE);

  const nemanjina = new Address(srb, "Beograd", 11000, "Nemanjina", 4);
  const kolasinska = new Address(
    srb,
    "Kosovska Mitrovica",
    38228,
    "Kolasinska",
    25
  );

  const bane = new Person("Bane", "Boz", "01.01.1990");
  const mika = new Person("Mika", "Mikic", "21.10.1991");
  const pera = new Person("Pera", "Peric", "11.11.1989");
  const zika = new Person("Zika", "Zikic", "31.12.1995");

  const banePlayer = new Player(bane, 1050, srb);
  const mikaPlayer = new Player(mika, 1500, srb);
  const peraPlayer = new Player(pera, 2000, ger);
  const zikaPlayer = new Player(zika, 2150, srb);

  const betAtNemanjina = new BettingPlace(nemanjina);
  const betAtKolasinska = new BettingPlace(kolasinska);

  betAtNemanjina.addPlayer(banePlayer);
  betAtNemanjina.addPlayer(mikaPlayer);
  betAtKolasinska.addPlayer(peraPlayer);
  betAtKolasinska.addPlayer(zikaPlayer);

  WC.betPlaces[0] = betAtNemanjina;
  WC.betPlaces[1] = betAtKolasinska;

  const getAllBetHouseData = function (bettingHouse) {
    let counter = 0;

    // set num of players === num of bets
    bettingHouse.numOfPlayers = bettingHouse.betPlaces.reduce(
      (acc, place) => acc + place.players.length,
      0
    );

    bettingHouse.betPlaces.forEach(place => {
      place.players.forEach(player => {
        if (player.country.name === "SR") counter++;
      });
    });

    // get data
    const data = `${bettingHouse.title}, ${
      bettingHouse.betPlaces.length
    } betting places, ${bettingHouse.numOfPlayers} bets
        ${bettingHouse.betPlaces[0].getData()}
            ${banePlayer.getData()}
            ${mikaPlayer.getData()}
        ${bettingHouse.betPlaces[1].getData()}
            ${peraPlayer.getData()}
            ${zikaPlayer.getData()}
    There are ${counter} bets on Serbia
            `;

    return data;
  };

  const bettingHouseData = getAllBetHouseData(WC);

  console.log(bettingHouseData);
})();
