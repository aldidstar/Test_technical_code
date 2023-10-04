"use strict";

const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Car = require("../models/Car");
const User = require("../models/User");

chai.use(chaiHTTP);
const should = chai.should();

describe("car", () => {
    // setiap sebelum melakukan test saya tambahkan satu data "belajar TDD"
    beforeEach(function (done) {
        let car = new Car({
            name: "Mustang",
            platNumber: "B 2321 KJS",
            transmission: "Manual",
            price: 1000,
            position: {
                "lat": -6.924738262846862,
                "lng": 107.68815680997388
            },
            seat: 4,
            fuel: "Pertamax / Pertalite",
            cc: 1500,
        });
        car.save(function (err) {
            done();
        });
    });

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        Car.findOneAndRemove({ name: "Mustang" }, (err) => {
            done();
        });
    });
    it("seharusnya mendapatkan semua daftar data yang ada di table Car dengan metode GET", function (done) {
        chai
            .request(server)
            .get("/api/car")
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body[res.body.length - 1].should.have.property("_id");
                res.body[res.body.length - 1].should.have.property("name");
                res.body[res.body.length - 1].should.have.property("platNumber");
                res.body[res.body.length - 1].should.have.property("price");
                res.body[res.body.length - 1].should.have.property("position");
                res.body[res.body.length - 1].should.have.property("seat");
                res.body[res.body.length - 1].should.have.property("fuel");
                res.body[res.body.length - 1].should.have.property("cc");
                res.body[res.body.length - 1].should.have.property("transactions");
                done();
            });
    });

    it("seharusnya bisa manmbahkan satu data transaction", function (done) {
        chai
            .request(server)
            .post("/api/car")
            .send({
                name: "Lamborghini",
                platNumber: "B 2321 KJS",
                transmission: "Manual",
                price: 1000,
                position: {
                    "lat": -6.924738262846862,
                    "lng": 107.68815680997388
                },
                seat: 4,
                fuel: "Pertamax / Pertalite",
                cc: 1500,
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.car.should.have.property("name")
                res.body.car.should.have.property("platNumber")
                res.body.car.should.have.property("transmission")
                res.body.car.should.have.property("price")
                res.body.car.should.have.property("position")
                res.body.car.should.have.property("seat")
                res.body.car.should.have.property("fuel")
                res.body.car.should.have.property("cc")
                res.body.car.should.have.property("transactions")
                res.body.car.name.should.equal("Lamborghini");
                res.body.car.platNumber.should.equal("B 2321 KJS");
                res.body.car.transmission.should.equal("Manual");
                res.body.car.price.should.equal(1000);
                res.body.car.seat.should.equal(4);
                res.body.car.fuel.should.equal("Pertamax / Pertalite");
                res.body.car.cc.should.equal(1500);
                Car.findOneAndRemove({ name: "Lamborghini" }, (err) => {
                    done();
                });
            });
    });
    it("seharusnya bisa manmbahkan satu data transaction", function (done) {
        Car.findOne({name: "Mustang"}).then(data => {
            chai
            .request(server)
            .put("/api/car/")
            .send({
                id: data._id,
                position: {
                    "lat": -6.924738262846862,
                    "lng": 107.68815680997388
                },
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.car.should.have.property("name")
                res.body.car.should.have.property("platNumber")
                res.body.car.should.have.property("transmission")
                res.body.car.should.have.property("price")
                res.body.car.should.have.property("position")
                res.body.car.should.have.property("seat")
                res.body.car.should.have.property("fuel")
                res.body.car.should.have.property("cc")
                res.body.car.should.have.property("transactions")
                res.body.car.name.should.equal("Mustang");
                res.body.car.platNumber.should.equal("B 2321 KJS");
                res.body.car.transmission.should.equal("Manual");
                res.body.car.price.should.equal(1000);
                res.body.car.seat.should.equal(4);
                res.body.car.fuel.should.equal("Pertamax / Pertalite");
                res.body.car.cc.should.equal(1500);
                done()
            });
        })
    });
    it("seharusnya bisa manmbahkan satu data transaction", function (done) {
        Car.findOne({name: "Mustang"}).then(data => {
            chai
            .request(server)
            .delete("/api/car/" + data._id)
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.car.should.have.property("name")
                res.body.car.should.have.property("platNumber")
                res.body.car.should.have.property("transmission")
                res.body.car.should.have.property("price")
                res.body.car.should.have.property("position")
                res.body.car.should.have.property("seat")
                res.body.car.should.have.property("fuel")
                res.body.car.should.have.property("cc")
                res.body.car.should.have.property("transactions")
                res.body.car.name.should.equal("Mustang");
                res.body.car.platNumber.should.equal("B 2321 KJS");
                res.body.car.transmission.should.equal("Manual");
                res.body.car.price.should.equal(1000);
                res.body.car.seat.should.equal(4);
                res.body.car.fuel.should.equal("Pertamax / Pertalite");
                res.body.car.cc.should.equal(1500);
                done()
            });
        })
    });
});
