import { Request, Response } from 'express';

class PropertyController {
    public createProperty(req: Request, res: Response): void {
        const propertyData = req.body; 
        console.log('Received property data:', propertyData);

        res.status(201).json({ message: 'Property created successfully', data: propertyData });
    }
}

export default new PropertyController();
