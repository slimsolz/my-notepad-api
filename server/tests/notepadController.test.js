import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import "babel-polyfill";
import Note from "../models/note";

const { expect } = chai;
chai.use(chaiHttp);

const noteDetails = {
  content: "dummy text 2",
};

const noteUpdatedContent = {
  content: "dummy text update",
};
const badId = "60e991ab184ccd45058ab84z";
let id = "60e9a8ff3e90475deb32b8d5";

describe("Connect to mongodb", () => {
  before((done) => {
    Note.create({ content: "just for test" }).then((res) => {
      id = res.id;
    });

    done();
  });
});

describe("test CRUD for notes", () => {
  it("should return 201 and successfully create a new note", () => {
    chai
      .request(app)
      .post("/api/v1/notes")
      .send(noteDetails)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal("success");
        expect(res.body.message).to.equal("note retrieved successfully");
        done();
      });
  });
  it("should return 409 and fail to re-create an existing note", () => {
    chai
      .request(app)
      .post("/api/v1/notes")
      .send(noteDetails)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal("note already exists");
        done();
      });
  });
  it("should return 404 and fail update a note", (done) => {
    chai
      .request(app)
      .patch(`/api/v1/notes/${badId}`)
      .send(noteUpdatedContent)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal("note not found");
        done();
      });
  });

  it("should return 200 and successfully update a note", () => {
    chai
      .request(app)
      .patch(`/api/v1/notes/${id}`)
      .send(noteUpdatedContent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal("note updated successfully");
        done();
      });
  });
  it("should return 200 and a successfully retrieve all notes", () => {
    chai
      .request(app)
      .get("/api/v1/notes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal("success");
        expect(res.body.message).to.equal("notes retrieved successfully");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.notes).to.be.an("array");
        done();
      });
  });
  it("should return 200 and successfully retrieve a single note", () => {
    chai
      .request(app)
      .get(`/api/v1/notes/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal("success");
        expect(res.body.message).to.equal("note retrieved successfully");
        expect(res.body.data).to.be.an("object");
        done();
      });
  });
  it("should return 404 and fail to get note", (done) => {
    chai
      .request(app)
      .get(`/api/v1/notes/${badId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal("note not found");
        done();
      });
  });
  it("should return 404 and fail to delete note that doesn't exist", (done) => {
    chai
      .request(app)
      .delete(`/api/v1/notes/${badId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal("note not found");
        done();
      });
  });
  it("should return 204 and successfully delete a note", () => {
    chai
      .request(app)
      .delete(`/api/v1/notes/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        expect(res.body.status).to.be.equal("success");
        done();
      });
  });
  it("should return 204 and successfully delete all notes", () => {
    chai
      .request(app)
      .delete("/api/v1/notes")
      .end((err, res) => {
        expect(res).to.have.status(204);
        expect(res.body.status).to.be.equal("success");
        done();
      });
  });
});
