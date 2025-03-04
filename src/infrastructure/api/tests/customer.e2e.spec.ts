import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Pedro Furlan",
        address: {
          street: "Rua 1",
          number: "123",
          zip: "12345",
          city: "São Paulo",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Pedro Furlan");
    expect(response.body.address.street).toBe("Rua 1");
    expect(response.body.address.number).toBe("123");
    expect(response.body.address.zip).toBe("12345");
    expect(response.body.address.city).toBe("São Paulo");
  });
});
