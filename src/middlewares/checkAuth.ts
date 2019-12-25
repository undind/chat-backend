
import express from "express";
import { verifyJWTToken } from "../helpers";

export default (req: any, res: any, next: any) => {

  const token = req.headers.token;

  verifyJWTToken(token)
    .then((user: any) => {
      req.user = user.data._doc;
      next();
    })
    .catch(err => {
      res.status(403).json({ message: "Invalid auth token provided." });
    });
};
