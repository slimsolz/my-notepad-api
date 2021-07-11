import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import "babel-polyfill";

const { expect } = chai;
chai.use(chaiHttp);

describe("GET /", () => {
  it("should return 200 and a welcome message", async () => {
    const res = await chai.request(app).get("/api/v1/");
    expect(res).to.have.status(200);
    expect(res.body.message).to.be.equal("Welcome to my-notepad API");
    expect(res.body.status).to.be.equal("success");
  });
});

describe("GET /xoxo", () => {
  it("should return 404 and an error message", async () => {
    const res = await chai.request(app).get("/api/v1/xyz");
    expect(res).to.have.status(404);
    expect(res.body.message).to.be.equal("404 route not found.");
    expect(res.body.status).to.be.equal("error");
    expect(res.body.data).to.be.equal(null);
  });
});
