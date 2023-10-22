import mongoose from "mongoose";
import { Role } from "../models/roleModel.js";


const roles = [
    { name: "Admin" },
    { name: "Client" },
    { name: "Deliver" },
  ];

  const seedRoles = async () => {
    try {

      await Role.deleteMany();
  
      await Role.insertMany(roles);
  
      console.log(`Roles seeded successfully`.cyan.bgMagenta);
    } catch (error) {
      console.error("Error seeding roles:", error);
    }
  };
  
export{seedRoles}
