import { Request, Response } from "express";
import { Property } from "../database/entities/property";

class PropertyController {
  public async createProperty(req: Request, res: Response): Promise<void> {
    const propertyData = req.body;
    try {
      const property = new Property();
      property.title = propertyData.title;
      property.description = propertyData.description;
      property.pricePerNight = propertyData.pricePerNight;
      property.location = propertyData.location;
      property.hostId = propertyData.hostId;
      await property.save();
      res
        .status(201)
        .json({ message: "Property created successfully", data: property });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async listProperties(req: Request, res: Response) {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error("Error listing properties:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new PropertyController();
