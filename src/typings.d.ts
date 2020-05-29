interface TilesConfig {
  type: string
  texture: string
  x: number
  y: number,
  frame: string
}

interface MapSize {
  x: number
  y: number
  width: number
  height: number
}

interface CoinDetail {
  frame: string,
  positions: Array<TilePosition>
}

interface Configuration {
  player: PlayerData,
  levels: Array<LevelData>;
}

interface PlayerData {
  width: number,
  height: number,
  texture: string
}

interface Levels {
  levels: Array<LevelData>;
}

interface LevelData {
  background: number;
  playerStart: PlayerStart;
  platform: Platform;
}

interface Platform {
  coins: Array<CoinDetail>;
  tiles: Array<TileDetail>;
  meta: platformMetaData;
}

interface TileDetail {
  frame: string,
  positions: Array<TilePosition>
}

interface TilePosition {
  x: number;
  y: number;
  xRange: number;
  xSkip: number;
  yRange: number;
  ySkip: number;
  noCollide: boolean;
  xOffset: number;
  yOffset: number;
  scale: number;
}

interface PlayerStart {
  x: number;
  y: number;
}

interface platformMetaData {
  levelHeight : number;
  levelWidth: number;
}
