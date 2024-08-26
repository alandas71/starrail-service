import { StarRail } from "starrail.js";

class StarRailService {
  private starRailService: StarRail;

  constructor() {
    this.starRailService = new StarRail({ showFetchCacheLog: true });
    this.starRailService.cachedAssetsManager.fetchAllContents(null);
  }

  async getAllCharacteres() {
    return this.starRailService.getAllCharacters();
  }
}

export default StarRailService;
