import { Router } from "express";
import { recognizeFace, registerFace } from "./face.controller";

const router = Router();

router.post('/register', registerFace);
router.post('/recognize', recognizeFace)

export default router