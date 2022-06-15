import { createMocks } from "node-mocks-http";
import categories from "../../../pages/api/categories/index";

describe("/api/categories API Endpoint", () => {
  function mockRequestResponse(method = "GET") {
    const { req, res } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.query = {};
    return { req, res };
  }

  it("should return data if method is GET", async () => {
    const { req, res } = mockRequestResponse("GET");

    await categories(req, res);

    expect(res.statusCode).toBe(200);
  });

  it("should confirm creation if method is POST", async () => {
    const { req, res } = mockRequestResponse("POST");

    await categories(req, res);

    expect(res.statusCode).toBe(201);
  });

  it("should return a 405 if HTTP method is PUT", async () => {
    const { req, res } = mockRequestResponse("PUT"); // Invalid HTTP call

    await categories(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      err: "Method not allowed",
    });
    expect(res.end());
  });

  it("should return a 405 if HTTP method is DELETE", async () => {
    const { req, res } = mockRequestResponse("DELETE"); // Invalid HTTP call

    await categories(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      err: "Method not allowed",
    });
    expect(res.end());
  });
});
