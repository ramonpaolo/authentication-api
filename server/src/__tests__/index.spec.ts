//---- Packages
import RequestsToTests from "./requests";
import dotenv from "dotenv"

dotenv.config()

const requests = new RequestsToTests();

describe("Authentication User", () => {
  let token: string = "";
  it("create-user", async () => {
    var data = await requests.createUser(
      "User Test",
      "user_test@gmail.com",
      "123456"
    );
    token = await data.data.token;
    expect(200).toBe(data.status);
  });

  it("login-user", async () => {
    var data = await requests.loginUser("user_test@gmail.com", "123456");
    expect(200).toBe(data.status);
  });

  it("verify-user", async () => {
    var data = await requests.verifyUser(token);
    expect(200).toBe(data.status);
  });
});
