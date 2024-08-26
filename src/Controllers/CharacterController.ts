import StarRailService from "../Services/StarRailService";
import { Request, Response } from "express";

class CharacterController {
  private starRailService: StarRailService;

  constructor() {
    this.starRailService = new StarRailService();
  }

  async getAllCharacteres(req: Request, res: Response): Promise<void> {
    try {
      const Characters = await this.starRailService.getAllCharacteres();
      res.status(200).json(Characters);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default CharacterController;
