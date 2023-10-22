import { userController } from "../controllers/userController.js";
import { User } from '../models/userModel.js';
import { Role } from '../models/roleModel.js';
import bcrypt from 'bcryptjs';
import { jwtToken } from "../utils/jwtToken.js"
import {sendEmail} from "../utils/email.js";



const UserController = new userController();

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};


describe("Register User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if name is not allowed to be empty", async () => {
    const req = {
      body: {
        name: "",
        role: "Client",
        email: "test@gmail.com",
        password: "Medabrache2001&M",
        repeat_password: "Medabrache2001&M",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: ["\"name\" is not allowed to be empty"],
    });
  });

  it("should return status 400 if email is not valid", async () => {
    const req = {
      body: {
        name: "mohamed abrache",
        role: "Client",
        email: "invalid-email",
        password: "Medabrache2001&M",
        repeat_password: "Medabrache2001&M",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: [
      "\"email\" with value \"invalid-email\" fails to match the required pattern: /^\\S+@\\S+\\.\\S+$/",
      "\"email\" must be a valid email"
    ],
    });
  });

  it("should return status 400 if password is too short", async () => {
    const req = {
      body: {
        name: "John Doe",
        role: "Client",
        email: "test@gmail.com",
        password: "pass",
        repeat_password: "pass",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: [
        "\"password\" length must be at least 8 characters long",
        "\"password\" with value \"pass\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$/",
            ],
    });
  });

  it("should return status 400 if password doesn't meet complexity requirements", async () => {
    const req = {
      body: {
        name: "John Doe",
        role: "Client",
        email: "test@gmail.com",
        password: "password123",
        repeat_password: "password123",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: [
        "\"password\" with value \"password123\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$/",
      ],
    });
  });

  it("should return status 400 if password and repeat_password don't match", async () => {
    const req = {
      body: {
        name: "John Doe",
        role: "Client",
        email: "test@gmail.com",
        password: "Medabrache2001&M",
        repeat_password: "DifferentPassword",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: ["\"repeat_password\" must be [ref:password]"],
    });
  });

  it("should return status 400 if role is invalid", async () => {
    const req = {
      body: {
        name: "John Doe",
        role: "InvalidRole",
        email: "test@gmail.com",
        password: "Medabrache2001&M",
        repeat_password: "Medabrache2001&M",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };

    await UserController.registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: ["\"role\" must be one of [Client, Deliver, Admin]"],
    });
  });

  it("should return an error message if user already exists", async () => {
    const req = {
      body: {
        name: "John Doe",
        role: "Client",
        email: "test@gmail.com",
        password: "Medabrache2001&M",
        repeat_password: "Medabrache2001&M",
      },
      file: {
        path: "/path/to/image.jpg",
      },
    };
  
    const existingUser = {
      id: "existingUserId",
      email: "test@gmail.com",
      profileImage: "/path/to/oldimage.jpg",
    };
  
    const userExistsMock = jest.spyOn(User, "findOne").mockResolvedValueOnce(existingUser);
  
    await UserController.registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'This user already exists' });
  
    expect(userExistsMock).toHaveBeenCalledWith({ email: "test@gmail.com" });
  });


});