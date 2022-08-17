namespace SpriteKind {
    export const Button = SpriteKind.create();
}
function redPress () {
    red.setImage(assets.image`redButtonPush`);
    red.startEffect(effects.fountain, 500);
    music.playTone(262, music.beat(BeatFraction.Whole));
    pause(500);
    red.setImage(assets.image`redButton`);
    pause(500);
}

function bluePress() {
    blue.setImage(assets.image`blueButtonPush`);
    blue.startEffect(effects.fountain, 500);
    music.playTone(262, music.beat(BeatFraction.Whole));
    pause(500);
    blue.setImage(assets.image`blueButton`);
    pause(500);
}

function greenPress() {
    green.setImage(assets.image`greenButtonPush`);
    green.startEffect(effects.fountain, 500);
    music.playTone(262, music.beat(BeatFraction.Whole));
    pause(500);
    green.setImage(assets.image`greenButton`);
    pause(500);
}

function yellowPress() {
    yellow.setImage(assets.image`yellowButtonPush`);
    yellow.startEffect(effects.fountain, 500);
    music.playTone(262, music.beat(BeatFraction.Whole));
    pause(500);
    yellow.setImage(assets.image`yellowButton`);
    pause(500);
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {onKey(0)});
controller.left.onEvent(ControllerButtonEvent.Pressed, function () { onKey(1) });
controller.down.onEvent(ControllerButtonEvent.Pressed, function () { onKey(2) });
controller.right.onEvent(ControllerButtonEvent.Pressed, function () { onKey(3) });

let pressingKey = false;
function onKey(key: Number) {
    if (pressingKey) return;
    pressingKey = true;

    if (userTurn) {
        if (lights[currentGuess] == 0 && 0 == key) {
            redPress();
            currentGuess += 1;
        } else if (lights[currentGuess] == 1 && 1 == key) {
            bluePress();
            currentGuess += 1;
        } else if (lights[currentGuess] == 2 && 2 == key) {
            greenPress();
            currentGuess += 1;
        } else if (lights[currentGuess] == 3 && 3 == key) {
            yellowPress();
            currentGuess += 1;
        } else {
            wrongGuess();
        }
    }

    if (currentGuess == lights.length) {
        currentGuess = 0;
        addScore();
        userTurn = false;
        noPress.setFlag(SpriteFlag.Invisible, false);
        
        pause(1000);
        addLight();
        lightUp();
    }

    pressingKey = false;
}
function setButton () {
    red = sprites.create(assets.image`redButton`, SpriteKind.Player);
    red.setPosition(80, 40);
    green = sprites.create(assets.image`greenButton`, SpriteKind.Player);
    green.setPosition(80, 80);
    blue = sprites.create(assets.image`blueButton`, SpriteKind.Player);
    blue.setPosition(60, 60);
    yellow = sprites.create(assets.image`yellowButton`, SpriteKind.Player);
    yellow.setPosition(100, 60);
}

function lightUp () {
    for (let value of lights) {
        if (value == 0) {
            redPress();
        } else if (value == 1) {
            bluePress();
        } else if (value == 2) {
            greenPress();
        } else {
            yellowPress();
        }
    }
    userTurn = true;
    currentGuess = 0;
    noPress.setFlag(SpriteFlag.Invisible, true);
}

function addLight () {
    randLight = randint(0, 3);
    lights.push(randLight);
}

function wrongGuess () {
    game.over(false, effects.melt);
}

function addScore() {
    info.changeScoreBy(1)
}

info.setScore(0);

let randLight = 0;

let yellow: Sprite = null;
let blue: Sprite = null;
let green: Sprite = null;
let red: Sprite = null;

let noPress: Sprite = sprites.create(assets.image`NoPress`, SpriteKind.Player);
noPress.left = 0;
noPress.top = 0;

let currentGuess = 0;
let userTurn = false;
let lights: number[] = [];
scene.setBackgroundColor(1);
setButton();
lights = [];
userTurn = false;
addLight();
lightUp();
