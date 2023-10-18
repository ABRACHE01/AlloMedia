import mongoose from "mongoose";
import { Role } from "../models/roleModel.js";


const roles = [
    { name: "Admin" },
    { name: "Client" },
    { name: "Deliver" },
  ];

  const seedRoles = async () => {
    try {

      // Delete existing roles
      await Role.deleteMany();
  
      // Insert the new roles
      await Role.insertMany(roles);
  
      console.log(`Roles seeded successfully`.cyan.bgMagenta);
    } catch (error) {
      console.error("Error seeding roles:", error);
    }
  };
  
export{seedRoles}
