namespace SpriteKind {
    export const Alien = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Alien, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Alien, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
    Delay += -50
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
    Delay += -50
})
let projectile2: Sprite = null
let Alien: Sprite = null
let FlagAlien: Sprite = null
let projectile: Sprite = null
let mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.setPosition(80, 110)
info.setScore(0)
let Delay = 1000
forever(function () {
    if (controller.A.isPressed()) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . 
            . . 8 . . 
            . . 8 . . 
            . . 8 . . 
            . . . . . 
            `, mySprite, 0, -100)
        music.pewPew.play()
        pause(50)
    }
})
game.onUpdateInterval(Delay, function () {
    if (sprites.allOfKind(SpriteKind.Enemy).length > 1) {
        FlagAlien = sprites.allOfKind(SpriteKind.Enemy)._pickRandom()
        Alien = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 7 7 . . 7 7 . . . . . 
            . . . . . . 7 . . 7 . . . . . . 
            . . . . 7 . 7 7 7 7 . 7 . . . . 
            . . . . 7 7 7 f 7 7 7 7 . . . . 
            . . . . . . 7 7 7 7 . . . . . . 
            . . . . 7 7 7 7 7 7 7 7 . . . . 
            . . . . 7 . . . . . . 7 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, FlagAlien, 0, 50)
        Alien.setKind(SpriteKind.Alien)
        Alien.vx += FlagAlien.vx
    }
})
game.onUpdateInterval(Delay, function () {
    projectile2 = sprites.createProjectileFromSide(assets.image`myImage`, 50, 0)
    projectile2.y = randint(10, 80)
    projectile2.setKind(SpriteKind.Enemy)
})
