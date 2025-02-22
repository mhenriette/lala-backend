import { Request, Response } from "express";
import { Property } from "../database/entities/property";

interface AuthRequest extends Request {
  user?: any;
}

class PropertyController {
  public async createProperty(req: AuthRequest, res: Response): Promise<void> {
    const propertyData = req.body;
    const id = req.user.id;
    try {
      const property = new Property();
      property.title = propertyData.title;
      property.description = propertyData.description;
      property.pricePerNight = propertyData.pricePerNight;
      property.location = propertyData.location;
      property.hostId = id;
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

  public async getMyProperties(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.user.id;
    try {
      const properties = await Property.find({ where: { hostId } });
      res.status(200).json({ data: properties });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getMyOneProperty(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const hostId = req.user.id;
    const propertyId = req.params.id;
    try {
      const property = await Property.findOne({
        where: { hostId, id: propertyId },
      });
      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }
      res.status(200).json({ data: property });
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateProperty(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.user.id;
    const propertyId = req.params.id;
    const propertyData = req.body;
    try {
      const property = await Property.findOne({
        where: { hostId, id: propertyId },
      });
      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }
      if (propertyData.title) {
        property.title = propertyData.title;
      }
      if (propertyData.description) {
        property.description = propertyData.description;
      }
      if (propertyData.pricePerNight) {
        property.pricePerNight = propertyData.pricePerNight;
      }
      if (propertyData.location) {
        property.location = propertyData.location;
      }
      await property.save();
      res
        .status(200)
        .json({ message: "Property updated successfully", data: property });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteProperty(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.user.id;
    const propertyId = req.params.id;
    try {
      const property = await Property.findOne({
        where: { hostId, id: propertyId },
      });
      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }
      await property.remove();
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new PropertyController();
