import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import "babel-polyfill";

const { expect } = chai;
chai.use(chaiHttp);

const noteDetails = {
  content: "",
};

describe("validate Parameter", () => {
  it("should return 422 when creating a new note with an empty content", (done) => {
    chai
      .request(app)
      .post("/api/v1/notes")
      .send(noteDetails)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.message).to.equal("content is required");
        expect(res.body.data).to.equal(null);
        done();
      });
  });

  it("should return 422 for required params", async () => {
    const res = await chai
      .request(app)
      .patch("/api/v1/notes/-1")
      .send(noteDetails);
    expect(res).to.have.status(422);
    expect(res.body.message).to.equal(
      '"id" must only contain alpha-numeric characters'
    );
  });
});
