"use strict";

const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const should = chai.should();
chai.use(chaiHTTP);

describe("data", () => {
  // setiap sebelum melakukan test saya tambahkan satu data "belajar TDD"
  beforeEach(function (done) {
    let transaction = new Transaction({
      name: "Tes",
      phone: "081234",
      price: 600000,
      start: "2021-02-16T06:50:00.000Z",
      end: "2021-03-16T06:50:00.000Z",
      status: "PENDING",
      day: 1,
    });
    transaction.save(function (err) {
      done();
    });
  });

  // setiap habis melakukan test saya kosongkan data di collection transaction
  afterEach(function (done) {
    Transaction.findOneAndRemove({ name: "Tes" }, (err) => {
      done();
    });
  });

  it("seharusnya mendapatkan semua daftar transaction yang ada di table Transaction dengan metode GET", function (done) {
    chai
      .request(server)
      .get("/api/transaction")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("name");
        res.body[res.body.length - 1].should.have.property("phone");
        res.body[res.body.length - 1].should.have.property("price");
        res.body[res.body.length - 1].should.have.property("start");
        res.body[res.body.length - 1].should.have.property("end");
        res.body[res.body.length - 1].should.have.property("status");
        res.body[res.body.length - 1].should.have.property("day");
        res.body[res.body.length - 1].name.should.equal("Tes");
        res.body[res.body.length - 1].phone.should.equal("081234");
        res.body[res.body.length - 1].price.should.equal(600000);
        res.body[res.body.length - 1].start.should.equal(
          "2021-02-16T06:50:00.000Z"
        );
        res.body[res.body.length - 1].end.should.equal(
          "2021-03-16T06:50:00.000Z"
        );
        res.body[res.body.length - 1].status.should.equal("PENDING");
        res.body[res.body.length - 1].day.should.equal(1);
        done();
      });
  });

  it("seharusnya menambahkan satu transaction dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/api/transaction")
      .send({
        name: "Jes",
        phone: "081233",
        price: 600000,
        start: "2021-04-16T06:50:00.000Z",
        end: "2021-05-16T06:50:00.000Z",
        status: "PENDING",
        day: 1,
      })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        console.log(res.body);
        res.body.transaction.should.have.property("name");
        res.body.transaction.should.have.property("phone");
        res.body.transaction.should.have.property("price");
        res.body.transaction.should.have.property("start");
        res.body.transaction.should.have.property("end");
        res.body.transaction.should.have.property("status");
        res.body.transaction.should.have.property("day");
        res.body.transaction.name.should.equal("Jes");
        res.body.transaction.phone.should.equal("081233");
        res.body.transaction.price.should.equal(600000);
        res.body.transaction.start.should.equal("2021-04-16T06:50:00.000Z");
        res.body.transaction.end.should.equal("2021-05-16T06:50:00.000Z");
        res.body.transaction.status.should.equal("PENDING");
        res.body.transaction.day.should.equal(1);
        Transaction.findOneAndRemove({ name: "Jes" }, (err) => {
          done();
        });
      });
  });

  it("seharusnya bisa memperbaharui melalui path /api/transaction/<id> PUT", function (done) {
    Transaction.findOne({ name: "Tes" }).then((transaction) => {
      chai
        .request(server)
        .put("/api/transaction/" + transaction._id)
        .send({ status: "PENDING" })
        .end(function (error, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.transaction.should.have.property("name");
          res.body.transaction.should.have.property("phone");
          res.body.transaction.should.have.property("price");
          res.body.transaction.should.have.property("start");
          res.body.transaction.should.have.property("end");
          res.body.transaction.should.have.property("status");
          res.body.transaction.should.have.property("day");
          res.body.transaction.name.should.equal("Tes");
          res.body.transaction.phone.should.equal("081234");
          res.body.transaction.price.should.equal(600000);
          res.body.transaction.start.should.equal("2021-02-16T06:50:00.000Z");
          res.body.transaction.end.should.equal("2021-03-16T06:50:00.000Z");
          res.body.transaction.status.should.equal("PENDING");
          res.body.transaction.day.should.equal(1);
          done();
        });
    });
  });

  it("seharusnya bisa menghapus transaction melalui path /api/transaction/<id> DELETE", function (done) {
    Transaction.findOne({ name: "Tes" }).then((transaction) => {
      chai
        .request(server)
        .delete("/api/transaction/" + transaction._id)

        .end(function (error, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.transaction.should.have.property("name");
          res.body.transaction.should.have.property("phone");
          res.body.transaction.should.have.property("price");
          res.body.transaction.should.have.property("start");
          res.body.transaction.should.have.property("end");
          res.body.transaction.should.have.property("status");
          res.body.transaction.should.have.property("day");
          res.body.transaction.name.should.equal("Tes");
          res.body.transaction.phone.should.equal("081234");
          res.body.transaction.price.should.equal(600000);
          res.body.transaction.start.should.equal("2021-02-16T06:50:00.000Z");
          res.body.transaction.end.should.equal("2021-03-16T06:50:00.000Z");
          res.body.transaction.status.should.equal("PENDING");
          res.body.transaction.day.should.equal(1);
          done();
        });
    });
  });
});
