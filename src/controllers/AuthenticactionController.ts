import { Request, Response } from "express";
import { User, UserRole } from "../database/entities/user";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

 export class AuthenticationController {


 static async signin(request: Request, response: Response) {
    const { token } = request.body;
    const { role } = request.body;

    const WEB_CLIENT_ID = process.env.WEB_GOOGLE_CLIENT_ID;

    const client = new OAuth2Client(WEB_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();


    const user = await User.findOneBy({
      email: payload?.email || "",
    });

    if (!user) {
      const newUser = new User();

      newUser.email = payload?.email || "";
      newUser.profilePictureUrl = payload?.picture || "";
      newUser.firstName = payload?.given_name || "";
      newUser.lastName = payload?.family_name || "";
      newUser.role = role.toUpperCase() as UserRole;
      await newUser.save();

      const userData = {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        names: newUser.firstName + " " + newUser.lastName,
        profilePictureUrl: newUser.profilePictureUrl,
      };

      // generate access and refresh tokens
      const access_token = jwt.sign(userData, process.env.JWT_SECRET!, {
        expiresIn: "3d",
      });

      const refresh_token = jwt.sign(userData, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });


     response.json({
        ...userData,
        access_token,
        refresh_token,
      });
      return;
    }


    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      names: user.firstName + " " + user.lastName,
      profilePictureUrl: user.profilePictureUrl,
    };

    // generate access and refresh tokens
    const access_token = jwt.sign(userData, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    const refresh_token = jwt.sign(userData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

   response.json({ ...userData, access_token, refresh_token });
  }
 }