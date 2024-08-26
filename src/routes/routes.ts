import { Router } from "express";
import CharacterController from "../Controllers/CharacterController";

const characterController = new CharacterController();

const router = Router();

router.get("/v1/characters", characterController.getAllCharacteres.bind(characterController));

export default router;
