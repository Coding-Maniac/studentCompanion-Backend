import { Router } from "express";
import { registerFace } from "./face.controller";

const router = Router();

router.post('/register', registerFace);

export default router