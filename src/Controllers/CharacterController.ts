import StarRailService from "../Services/StarRailService";
import { Request, Response } from "express";
import _ from 'lodash';

class CharacterController {
  private starRailService: StarRailService;

  constructor() {
    this.starRailService = new StarRailService();
  }

  async searchCharactersByName(req: Request, res: Response): Promise<void> {
    const { page, limit, query } = req.query;
    const atualPage = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(limit as string, 10) || 20;
    const startIndex = (atualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    try {
      let characters = await this.starRailService.getAllCharacteres();
  
      if (query) {
        const searchTerm = (query as string).toLowerCase();
        characters = characters.filter(c => 
          c.name.get("en").toLowerCase().includes(searchTerm)
        );
      }
  
      const paginatedCharacters = characters.slice(startIndex, endIndex);
  
      res.status(200).json(paginatedCharacters.map(c => ({
        id: c.id,
        name: c.name.get("en")
      })));
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
  
  async getAllCharacteres(req: Request, res: Response): Promise<void> {
    const { page, limit, query } = req.query;
    const currentPage = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(limit as string, 10) || 20;
    const startIndex = (currentPage - 1) * itemsPerPage;

    try {
      let characters = await this.starRailService.getAllCharacteres();
  
      if (query) {
        const searchTerm = (query as string).toLowerCase();
        characters = characters.filter(c => 
          c.name.get("en").toLowerCase().includes(searchTerm)
        );
      }

      const paginatedCharacters = characters.slice(startIndex, startIndex + itemsPerPage);
      const safeCharacters = paginatedCharacters.map((c: any) => {
        return _.cloneDeep({
          id: c.id,
          charIcon: c.icon.url,
          stars: c.stars,
          pathName: c.path.id,
          pathIcon: c.path.icon.url,
          combatType: c.combatType.id,
          maxEnergy: c.maxEnergy,
          combatTypeIcon: c.combatType.icon.url,
          nameEnglish: c.name.get("en")
        });
      });
  
      res.status(200).json(safeCharacters);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getCharacterById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const characters = await this.starRailService.getAllCharacteres();
      const character = characters.find(c => c.id === Number(id));

      if (!character) {
        res.status(404).json({ message: "Personagem não encontrado." });
        return;
      }

      const safeCharacter = _.cloneDeep({
        id: character.id,
        icon: character.icon.url,
        stars: character.stars,
        pathName: character.path.id,
        pathIcon: character.path.icon.url,
        combatType: character.combatType.id,
        maxEnergy: character.maxEnergy,
        combatTypeIcon: character.combatType.icon.url,
        name: character.name.get("en"),
      });

      res.status(200).json(safeCharacter);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default CharacterController;
