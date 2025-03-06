class Player {
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.bV = 10;
        this.v = 10;
    }

    draw(ctx){
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    update(keys){
        if(keys['w']) {
            if (this.y - this.v >= 0){
                this.y -= this.v;
            }
        }
        if(keys['s']) {
            if(this.y + this.w + this.v <= gameCanvas.height){
                this.y += this.v;
            }
        }
        if(keys['a']) {
            if(this.x - this.v >= 0){
                this.x -= this.v;
            }
        }
        if(keys['d']) {
            if(this.x + this.w + this.v < gameCanvas.width){
                this.x += this.v;
            }
        }
        if(keys[" "]){
            this.v = 20;
        } else {
            this.v = this.bV;
        }
        if(keys["f"]){
            if(this.w >= 10){
            this.w -= 2;
            this.h -= 2;
            }
        }
        if(keys["r"]){
            this.w += 2;
            this.h += 2;
        }
    }

}
    

const myPlayer = new Player(10, 10, 50, 50, "red");


const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const resizeCanvas = () => {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

const gameLoop = () => {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    console.log(keys);
    myPlayer.draw(ctx);
    myPlayer.update(keys);
    ctx.fillStyle = testObject.c;
    ctx.fillRect(testObject.x, testObject.y, testObject.w, testObject.h);
    checkCollision(myPlayer, testObject);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

let testObject = {
    x: 100,
    y: 200,
    w: 100,
    h: 100,
    c: "blue",
    bC: "blue"
}



const checkCollision = (object1, object2) => {
    if(object1.x + object1.w > object2.x && object1.x < object2.x + object2.w && object1.y + object1.h > object2.y && object1.y < object2.y + object2.h){
        console.log("jsi brambor");
        object2.c = "green";
    } else {
        object2.c = object2.bC;
    }
}