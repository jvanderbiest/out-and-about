// import BeeSprite from './bee'
// import SlimeSprite from './slime'
// import EnemyClass from './enemyClass'

import YellowMonsterSprite from "./yellowMonster.component"
import PinkMonsterSprite from "./pinkMonster.component"

export default class EnemiesGroup extends Phaser.GameObjects.Group {
  tiles: TilesConfig[]
  TILE_SIZE = 96
  constructor(scene: Phaser.Scene) {
    super(scene)

   

    let enemyTypes = [ { texture: 'yellow-monster' },
                       { texture: 'pink-monster' }]

    let enemies: Array<YellowMonsterSprite> = []
    enemyTypes.forEach(enemy => {
      switch (enemy.texture) {
        case 'yellow-monster':
          enemies.push(new YellowMonsterSprite(scene, 712, 712, 10))
          console.log(`pushed monster at ${250} - ${400}`)
          break;
        case 'pink-monster':
          enemies.push(new PinkMonsterSprite(scene, 612, 612, 10))
          console.log(`pushed monster at ${350} - ${500}`)
          break;
        // case 'slime':
        //   enemies.push(new SlimeSprite(scene, enemy.x, enemy.y))
        //   break
      }
    })
    this.addMultiple(enemies)
  }

  update() {
    // check if the enemy should change its direction
    // @ts-ignore
    this.children.iterate((enemy: YellowMonsterSprite) => {
      if (enemy.dead) return
      if (enemy.body.blocked.left) {
        enemy.setFlipX(true)
        enemy.body.velocity.set(60, null);
      }
      else if (enemy.body.blocked.right) {
        enemy.setFlipX(false)
        enemy.body.velocity.set(-60, null);
      }

      // let enemyIsMovingRight = enemy.body.velocity.x = 0

      //   let hasGroundDetection = this.tiles.filter(tile => {
      //     let enemyPositionX = enemyIsMovingRight ? enemy.body.right : enemy.body.left
      //     let x = enemyPositionX + 32 > tile.x && enemyPositionX - 32 < tile.x + this.TILE_SIZE
      //     let y =
      //       enemy.body.bottom + this.TILE_SIZE / 2 > tile.y &&
      //       enemy.body.bottom + this.TILE_SIZE / 2 < tile.y + this.TILE_SIZE
      //     return x && y
      //   })

      //   if (hasGroundDetection.length === 0) {
      //@ts-ignore
      // enemy.body.setVelocityX(enemy.body.velocity.x * -1)
      // enemy.setFlipX(!enemyIsMovingRight)
      //   }
    }, null)
  }

  getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}