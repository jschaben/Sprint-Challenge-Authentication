const request = require("supertest");

const server = require("../api/server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE1ODUzMjc1NzMsImV4cCI6MTU4NTMzODM3M30.v7shO24s0cAI1Wxrokz9ZxunMOXUUlIsq3bAzBuC7pk";

it('should return code 401 and "you shall not pass!" without credentials', function() {
  return request(server)
    .get("/api/jokes")
    .then(res => {
      expect(res.status).toBe(401);
      expect(res.body.you).toMatch(/shall not pass/i);
    });
});

it("should return code 200 and list of jokes with credentials", function() {
  return request(server)
    .get("/api/jokes")
    .set("Authorization", token)
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.length).toBeGreaterThan(0);
    });
});