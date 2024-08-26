import { StarRail } from "starrail.js";

class StarRailService {
  private starRailService: StarRail;

  constructor() {
    this.starRailService = new StarRail({ cacheDirectory: "./cache" });
    this.starRailService.cachedAssetsManager.cacheDirectorySetup();
  }

  async getAllCharacteres() {
    return this.starRailService.getAllCharacters();
  }
}

export default StarRailService;
