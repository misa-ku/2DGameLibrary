export class Canvas{

    constructor(canvasId, width, height, borderWidth, borderStyle, borderColor){
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.style.borderWidth = borderWidth ?? "medium";
        this.canvas.style.borderStyle = borderStyle ?? "solid";
        this.canvas.style.borderColor = borderColor ?? "gray";
        
        this.ctx.imageSmoothingEnabled = false; //maybe adding a toggle function soon
    }
    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    rotate(angle){
        this.ctx.rotate(angle);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Sprite{

    constructor(canvas, img, x, y, width, height, sx, sy, swidth, sheight){
        this.canvas = canvas;
        this.img = img;

        this.x = x ?? 0;
        this.y = y ?? 0;
        this.width = width ?? img.width;
        this.height = height ?? img.height;

        this.sx = sx ?? 0;
        this.sy = sy ?? 0;
        this.swidth = swidth ?? img.width;
        this.sheight = sheight ?? img.height;

        this.isAnchorCentered = Boolean(false); // if false, the sprites' anchorpoint will be at the top-left corner (default)
    }

    draw(){
        // clipping images is not supported and may cause some position offset
        this.canvas.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }

    // all the GET and SET functions aren't necessary but easier to find (and looks cleaner) while using the object: "player.getX()" instead of "player.x"
    setPos(x, y){ this.x = x ?? 0; this.y = y ?? 0; }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    
    getPos(){
        return new Map([["x", this.x], ["y", this.y]]);
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    center(){// sprite's anchorpoint is at top left corner
        this.x = this.canvas.getWidth() / 2 - this.width / 2;
        this.y = this.canvas.getHeight() / 2 - this.height / 2;
    }

    setSize(width, height){
        this.width = width;
        this.height = height;
    }
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    getSize(){
        return new Map([["width", this.width], ["height", this.height]]);
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }

    changePos(changeX, changeY){
        this.x += changeX;
        this.y += changeY;
    }
    changeX(changeX){
        this.x += changeX;
    }
    changeY(changeY){
        this.y += changeY;
    }

    moveInDirection(direction, speed){
        const rad = (direction-90) * Math.PI / 180;
        this.x += Math.cos(rad) * speed;
        this.y += Math.sin(rad) * speed;
    }

    getDirection(destination){
        //TASK use one parameter "destination"
        const dx = destination.get("x") - this.x;  //distance between both x values
        const dy = destination.get("y") - this.y;  //distance between both y values

        return Math.atan2(dy, dx); // Radiant
    }
    moveToDestination(destination, speed){
        const direction = this.getDirection(destination);

        const vx = Math.cos(direction) * speed;
        const vy = Math.sin(direction) * speed;

        const dx = destination.get("x") - this.x;
        const dy = destination.get("y") - this.y;
        const distance = Math.hypot(dx, dy);

        // stops when distance (almost) reached
        if (distance > speed){
            this.x += vx;
            this.y += vy;
        } else{
            this.x = destination.get("x");
            this.y = destination.get("y");
        }
    }

    rotate(){
        const oldRotation = 
    }

}

export class Input{
    static keys = new Set();
    static mouse = new Map([
        ["x", null],
        ["y", null]
    ]);
    
    static keyDown(key1, key2){   //checks if one of the keys(parameters) is pressed
        if(Input.keys.has(key1)){return true;}
        if(Input.keys.has(key2)){return true;}
        return false;
    }

    static getMouse(){
        return 
    }
}

(function loadEvents(){
    //KeyInput
    window.addEventListener("keydown", function(e){
        Input.keys.add(e.key);
    });
    window.addEventListener("keyup", function(e){
        Input.keys.delete(e.key);
    });

    //MouseInput
    window.addEventListener("mousemove", function(e){
        Input.mouse.set("x", e.clientX);
        Input.mouse.set("y", e.clientY);
    });
})();