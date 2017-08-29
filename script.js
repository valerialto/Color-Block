var ballRadius
var ball
var building
var buildings
var colors
var index
var indexB
var points = 0
var ballSpeed = 0
var gameOver = false
var launched = false
var currBallColor
var buildingWidth = 130
var lives = 4
var ending
var speed = -8 //the velocity of the ball
var imageend
var resetGame = false
var ballEject = false

function setup() {
    createCanvas(windowWidth, windowHeight)
    ballRadius = 35
    imageend = loadImage("game.png")
    colors = [
        [126, 69, 143],
        [140, 195, 235],
        [115, 138, 116],
        [222, 220, 254],
        [142, 76, 87],
        [28, 139, 235]
    ]

    buildings = new Group()
    index = Math.floor(Math.random() * 6)
    ball = createSprite(windowWidth / 2 - ballRadius / 2, windowHeight * .8, ballRadius, ballRadius)
    currBallColor = [colors[index][0], colors[index][1], colors[index][2]]
    ball.draw = function() {
        fill(colors[index][0], colors[index][1], colors[index][2])
        ellipse(0, 0, ballRadius, ballRadius)
    }
    var button = createButton("Reset")
    button.mousePressed(reset)
}

function draw() {
    clear()
    drawSprites()
    if (gameOver == false) {
        console.log("here")
        if (keyWentDown(32)) {
            if (lives % 5 == 0) {
                speed -= 3
            }
            ball.setVelocity(0, speed)
            ballEject = true

        }
        if (frameCount % 30 == 0) {
            getBuilding()
        }

        if (frameCount % 120 == 0 && !ballEject) {
            if (ball.position.y == windowHeight * .8) {
                ballColor()
            }
        }

        if (ball.position.y < 0) {
            ball.position.y = windowHeight * .8
            ball.setVelocity(0, 0)
        }

        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].position.x > windowWidth) {
                // buildings.remove(buildings[i])
                buildings[i].remove()
            }
            ball.collide(buildings[i], hitBuilding)
        }
    }
    else {
            if (frameCount % 340 == 0) {
                ending = createSprite(windowWidth / 2, windowHeight * .35, 100, 50)
                ending.addImage(imageend)
            }
    }

    fill(0, 0, 0)
    textFont("serif", 35)
    text(`Score: ${points}`, 100, 100)
    text(`Lives left: ${lives - 1}`, windowWidth - 400, 100)

    if (lives == 1) {
        gameOver = true
    }
}

function getBuilding() {
    indexB = Math.floor(Math.random() * 6)
    var mybuilding = createSprite(0, windowHeight * .35, buildingWidth, windowHeight * .1)
    mybuilding.shapeColor = color(colors[indexB][0], colors[indexB][1], colors[indexB][2])
    console.log(mybuilding.shapeColor.levels)
    mybuilding.setVelocity(5, 0)
    buildings.add(mybuilding)

}

function hitBuilding(ball, buildingHit) {
    ballEject = false

    var correctCounter = 0;
    for (var i = 0; i < 3; i++) {
        buildingRGB = buildingHit.shapeColor.levels
        // ballRGB = ball.shapeColor.levels
        if (buildingRGB[i] == currBallColor[i]) {
            console.log("here")
            correctCounter++
        }
    }
    if (correctCounter == 3) {
        buildingHit.remove()
        points++
    }
    else if (buildingRGB[i] != currBallColor[i]) {
        lives = lives - 1
        buildingWidth = buildingWidth - 20
    }
    ball.position.x = windowWidth / 2 - ballRadius / 2
    ball.position.y = windowHeight * .8
    ball.setVelocity(0, 0)

}

function ballColor() {
    index = Math.floor(Math.random() * 5)
    currBallColor = [colors[index][0], colors[index][1], colors[index][2]]
    ball.draw = function() {
        fill(colors[index][0], colors[index][1], colors[index][2])
        ellipse(0, 0, ballRadius, ballRadius)
    }
}

function gameOver() {
    gameOver = true
}

function reset() {
    gameOver = false
    resetGame = true
    lives = 4
    points = 0
    ending.remove()
    ball.position.x = windowWidth / 2 - ballRadius / 2
    ball.position.y = windowHeight * .8
    ball.setVelocity(0, 0)
    buildingWidth = 130;
    while(buildings.length!=0){
        buildings[0].remove()
    }
}