contactBackgroundSketch = (s) => {
    let amount;
    let walkers = [];

    class Walker {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.tx = x;
            this.ty = y;
        }
        show() {
            walkers.forEach(walker => {
                let dist = s.dist(this.x, this.y, walker.x, walker.y);
                if (dist < 200) {
                    s.strokeWeight(.15);
                    s.stroke(0, s.map(dist, 0, 200, 255, 100));
                    s.line(this.x, this.y, walker.x, walker.y);
                    s.circle(this.x, this.y, 5);
                }
            });
        }
        update() {
            let d = s.dist(this.x, this.y, s.mouseX, s.mouseY);
            // update tx
            let dist = 50;
            this.tx = this.tx + s.random(-dist, dist);
            this.ty = this.ty + s.random(-dist, dist);
            // lerp
            this.x = d > 100? s.lerp(this.x, this.tx, .001):s.lerp(this.x, this.tx, .01);
            this.y = d > 100? s.lerp(this.y, this.ty, .001):s.lerp(this.y, this.ty, .01);
            // out of canvas
            if (this.x<0) this.tx = this.x + s.random(20, 50);
            if (this.y<50) this.ty = this.y + s.random(20, 50);
            if (this.x>s.width) this.tx = this.x - s.random(20, 50);
            if (this.y>s.height-200) this.ty = this.y - s.random(40, 50);
        }
    }

    s.setup = function() {
        s.createCanvas(document.querySelector('#'+contactBackgroundSketchId).clientWidth, document.querySelector('#'+contactBackgroundSketchId).clientHeight-25);
        amount = s.width<577? 10:40;
        
        for (let i=0; i<amount; i++) {
            walkers.push(new Walker(s.random(s.width), s.random(s.height)));
        }
    }

    s.draw = function() {
        s.background(252);

        walkers.forEach(walker => {
            walker.show();
            walker.update();
        });
    }

    s.windowResized = function() {
        s.resizeCanvas(document.querySelector('#'+contactBGSketchId).clientWidth, document.querySelector('#'+contactBGSketchId).clientHeight);
    }

}

let contactBackgroundSketchId = 'contact-background-sketch';
var contactBackgroundP5 = new p5(contactBackgroundSketch, contactBackgroundSketchId);