import { Request, Response } from "express";
import { User } from "../database/entities/user";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

 export class AuthenticationController {


 static async signin(request: Request, response: Response) {
    const { token } = request.body;

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

    //   if (!payload.email) throw new BadRequestError("Email is required");

      newUser.email = payload?.email || "";
      newUser.profilePictureUrl = payload?.picture || "";

      await newUser.save();

      const userData = {
        id: newUser.id,
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