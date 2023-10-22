import { userController } from "../controllers/userController.js";
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { jwtToken } from "../utils/jwtToken.js"

const UserController = new userController();

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Login User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if email is not provided", async () => {
    const req = {
      body: {
        email: "",
        password: "Medabrache2001&M",
      },
    };

    await UserController.loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalide user credentails",
    });
  });

  it("should return status 400 if password is not provided", async () => {
    const req = {
      body: {
        email: "test@gmail.com",
        password: "",
      },
    };

    await UserController.loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        "error": "Invalide user credentails",
    });
  });

  it("should return status 401 if user is not found", async () => {
    const req = {
      body: {
        email: "test@gmail.com",
        password: "Medabrache2001&M",
      },
    };
  
    const userExistsMock = {
      populate: jest.fn().mockResolvedValueOnce(null),
    };
  
    const findOneMock = jest.spyOn(User, "findOne").mockReturnValueOnce(userExistsMock);
  
    await UserController.loginUser(req, res);
    
    expect(findOneMock).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(userExistsMock.populate).toHaveBeenCalledWith('role');

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalide credentails" });

  });

 

});