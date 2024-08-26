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
  
      res.status(200).json(paginatedCharacters.map(c => ({
        id: c.id,
        name: c.name.get("en")
      })));
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
  
  async getAllCharacteres(req: Request, res: Response): Promise<void> {
    const { page, limit, query, level, ascension } = req.query;
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
        
        const stats = c.getStatsByLevel(ascension ? parseInt(ascension as string) : 0, level ? parseInt(level as string) : 1);
            
        const statsObject = stats.reduce((acc: any, stat: any) => {
            acc[stat.type] = stat.value;
            return acc;
        }, {});

        return _.cloneDeep({
          id: c.id,
          stars: c.stars,
          maxEnergy: c.maxEnergy,
          charIcon: c.icon.url,
          pathIcon: c.path.icon.url,
          combatTypeIcon: c.combatType.icon.url,
          combatType: c.combatType.name.get("en"),
          pathName: c.path.name.get("en"),
          nameEnglish: c.name.get("en"),
          stats: statsObject
        });
      });
  
      res.status(200).json(safeCharacters);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getCharacterById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { level, ascension } = req.query;

    try {
      const characters = await this.starRailService.getAllCharacteres();
      const character = characters.find(c => c.id === Number(id));

      if (!character) {
        res.status(404).json({ message: "Personagem não encontrado." });
        return;
      }

      const stats = character.getStatsByLevel(ascension ? parseInt(ascension as string) : 0, level ? parseInt(level as string) : 1);
            
      const statsObject = stats.reduce((acc: any, stat: any) => {
          acc[stat.type] = stat.value;
          return acc;
      }, {});

      const safeCharacter = _.cloneDeep({
        id: character.id,
        stars: character.stars,
        maxEnergy: character.maxEnergy,
        charIcon: character.icon.url,
        pathIcon: character.path.icon.url,
        combatTypeIcon: character.combatType.icon.url,
        combatType: character.combatType.name.get("en"),
        pathName: character.path.name.get("en"),
        nameEnglish: character.name.get("en"),
        stats: statsObject,
      });

      res.status(200).json(safeCharacter);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default CharacterController;
