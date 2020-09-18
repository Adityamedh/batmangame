class RainDrops{
    constructor(x,y,radius){
        super(x,y,width,height);
        
        this.image = loadImage("Untitled.png")
       
        
    }
     fall(speed){
        this.y +=speed;
    }
  
    display(){
        super.display(); 
       
        push();
        colorMode(HSB);
        noStroke();
        //translate(pos.x,pos.y);
       
        fill(this.color);
        ellipse(this.x, this.y, this.radius);
        pop();
    }
  }