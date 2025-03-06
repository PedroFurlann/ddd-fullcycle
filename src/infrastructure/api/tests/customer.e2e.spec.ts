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

  it("should not create a customer without address", async () => {
    const response = await request(app).post("/customer").send({
      name: "Pedro Furlan",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
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

    await request(app)
      .post("/customer")
      .send({
        name: "João Silva",
        address: {
          street: "Rua 2",
          number: "456",
          zip: "54321",
          city: "Rio de Janeiro",
        },
      });

    const response = await request(app).get("/customer");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    const customer1 = response.body.customers[0];
    expect(customer1.name).toBe("Pedro Furlan");
    expect(customer1.address.city).toBe("São Paulo");
    const customer2 = response.body.customers[1];
    expect(customer2.name).toBe("João Silva");
    expect(customer2.address.city).toBe("Rio de Janeiro");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml");
    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>Pedro Furlan</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<city>São Paulo</city>`);
    expect(listResponseXML.text).toContain(`<name>João Silva</name>`);
    expect(listResponseXML.text).toContain(`<city>Rio de Janeiro</city>`);
  });
});
