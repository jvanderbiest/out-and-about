import TileComponent from "../tile.component";
import { ImageConstants } from "../../constants/image.constants";


export default class StartMenuTileGroupComponent extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, private width: number, private height: number) {
        super(scene)
        this.drawTiles();
    }

    getAlternateGround(sequence: number) {
        return this.getAlternate(sequence, 'ground05', 'ground06');
    }

    getAlternateHollowGround(sequence: number) {
        return this.getAlternate(sequence, 'hollow02', 'hollow13');
    }

    resize() {
        this.drawTiles();
    }

   

    getAlternate(sequence: number, texture1: string, texture2: string) {
        if (sequence % 2) {
            return texture1;
        }
        return texture2;
    }

    _maxColumns = 18;
    _maxRows = 8;

    addLine(tiles: any[], row: number, first: string, alternate1: string, alternate2: string, last: string) {
        tiles.push({ row: row, column: 0, texture: first });

        for (var i = 1; i < this._maxColumns; i++) {
            tiles.push({ row: row, column: i, texture: this.getAlternate(i, alternate1, alternate2) });
        }
        
        tiles.push({ row: row, column: 18, texture: last });
    }

    addColumn(tiles: any[], column: number, alternate1: string, alternate2: string) {
        for (var i = 1; i < this._maxRows; i++) {
            tiles.push({ row: i, column: column, texture: this.getAlternate(i, alternate1, alternate2) });
        }
    }

    drawTiles() {
        
        var tiles = [];
        // add top line
        this.addLine(tiles, 0, 'leafy_hollow01', 'leafy_hollow03', 'leafy_hollow04', 'leafy_hollow02')
        // add bottom line
        this.addLine(tiles, this._maxRows, 'hollow06', 'hollow15', 'hollow16', 'hollow05')
        
        // add left line
        this.addColumn(tiles, 0, 'hollow02', 'hollow13')
        // add right line
        this.addColumn(tiles, this._maxColumns, 'hollow01', 'hollow14')

        // add play sourroundings
        tiles.push({ row: this._maxRows - 3, column: 6, texture: 'hollow07' });
        tiles.push({ row: this._maxRows - 3, column: 7, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 8, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 9, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 10, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 11, texture: 'hollow09' });

        tiles.push({ row: this._maxRows - 1, column: 6, texture: 'hollow02' });
        tiles.push({ row: this._maxRows - 2, column: 6, texture: 'hollow13' });
        
        tiles.push({ row: this._maxRows - 1, column: 11, texture: 'hollow01' });
        tiles.push({ row: this._maxRows - 2, column: 11, texture: 'hollow14' });

        // add left 
        tiles.push({ row: this._maxRows - 3, column: 2, texture: 'hollow middle blank' });
        tiles.push({ row: this._maxRows - 3, column: 3, texture: 'hollow middle blank' });
        tiles.push({ row: this._maxRows - 3, column: 4, texture: 'hollow middle blank' });

        tiles.push({ row: this._maxRows - 3, column: 2, texture: 'ground13' });
        tiles.push({ row: this._maxRows - 3, column: 3, texture: 'ground11' });
        tiles.push({ row: this._maxRows - 3, column: 4, texture: 'ground13' });
        
        // add right
        tiles.push({ row: this._maxRows - 3, column: 13, texture: 'hollow middle blank' });
        tiles.push({ row: this._maxRows - 3, column: 14, texture: 'hollow middle blank' });
        tiles.push({ row: this._maxRows - 3, column: 15, texture: 'hollow middle blank' });

        tiles.push({ row: this._maxRows - 3, column: 13, texture: 'ground13' });
        tiles.push({ row: this._maxRows - 3, column: 14, texture: 'ground11' });
        tiles.push({ row: this._maxRows - 3, column: 15, texture: 'ground13' });
        

        
        

        for (var column = 0; column <= this._maxColumns; column++) {
            for (var row = 0; row <= this._maxRows; row++) {
                var texture = 'hollow middle blank';
                var items = tiles.filter(x => x.row == row && x.column == column);

                if (items && items.length > 0) {
                    items.forEach(x => this.add(new TileComponent(this.scene, column * 63, row * 63, ImageConstants.GameTexture, x.texture)));
                }
                else {
                    this.add(new TileComponent(this.scene, column * 63, row * 63, ImageConstants.GameTexture, texture));
                }
            }
        }

        // for (var column = 0; column <= maxColumns; column++) {
        //     for (var row = 0; row <= maxRows; row++) {
        //         var texture = '';
        //         if (row == 0) {
        //             texture = topLine[column];
        //         }
        //         else if (row == maxRows) {
        //             texture = bottomLine[column];
        //         }
        //         else {
        //             if (column == 0) {
        //                 texture = this.getAlternate(row, 'hollow13', 'hollow02');
        //             }
        //             else if (column == maxColumns - 1) {
        //                 texture = this.getAlternate(row, 'hollow01', 'hollow14');
        //             }
        //             else if (column < maxColumns) {
        //                 if (column >= 2 && column < 6 && row == maxRows - 3) {
        //                     texture = 'ground11'
        //                 }
        //                 else if (row == maxRows - 3 && column > 5 && column < 12) {
        //                     if (column == 6) {
        //                         texture = 'hollow07'
        //                     }
        //                     else if (column >= 7 && column < 11) {
        //                         texture = 'hollow08'
        //                     }
        //                     else if (column == 11) {
        //                         texture = 'hollow09'

        tiles.push({ row: this._maxRows - 3, column: 2, texture: 'ground11' });
        tiles.push({ row: this._maxRows - 3, column: 3, texture: 'ground11' });
        tiles.push({ row: this._maxRows - 3, column: 4, texture: 'ground11' });
        tiles.push({ row: this._maxRows - 3, column: 5, texture: 'ground11' });
        

        
        tiles.push({ row: this._maxRows - 3, column: 6, texture: 'hollow07' });
        tiles.push({ row: this._maxRows - 3, column: 7, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 8, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 9, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 10, texture: 'hollow08' });
        tiles.push({ row: this._maxRows - 3, column: 11, texture: 'hollow09' });
        //                     }
        //                 }
        //                 else if ((row == maxRows - 1  || row == maxRows - 2) && column == 6) {
        //                     texture = 'hollow02'
        tiles.push({ row: this._maxRows - 1, column: 6, texture: 'hollow02' });
        tiles.push({ row: this._maxRows - 2, column: 6, texture: 'hollow02' });
        //                 }
        //                 else if ((row == maxRows - 1  || row == maxRows - 2) && column == 11) {
        //                     texture = 'hollow01'
        tiles.push({ row: this._maxRows - 1, column: 11, texture: 'hollow01' });
        //                 }
        //                 else {
        //                     texture = 'hollow middle blank';
        //                 }
        //             }
        //         }

        //         if (texture) {
        //             this.add(new TileComponent(this.scene, column * 63, row * 63, ImageConstants.GameTexture, texture));
        //         }
        //     }
    }
}