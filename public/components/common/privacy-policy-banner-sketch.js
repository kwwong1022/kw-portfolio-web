privacyBannerSketch = (s) => {
    let canvasWidth, canvasHeight;
    let circles;
    let rows, cols;
    let size = 10;
    let font, fontB;
    let targetHeight, currHeight = -50;

    s.preload = function() {
        font = s.loadFont('/assets/font/quicksand/Quicksand-Light.ttf');
        fontB = s.loadFont('/assets/font/quicksand/Quicksand-Regular.ttf');
    }

    s.setup = function() {
        s.createCanvas(document.querySelector('#'+bannerSketchId).clientWidth, document.querySelector('#'+bannerSketchId).clientHeight);
        canvasWidth = s.width;
        canvasHeight = s.height;
        targetHeight = s.height/1.75+35;
        s.noStroke();

        initCircles();
    }

    s.draw = function() {
        s.background(252);

        circles.forEach(c => {
            c.render();
            //if (s.mouseX>0 && s.mouseX<s.width && s.mouseY>0 && s.mouseY<s.height) 
            c.update();
        });
        s.fill(50);
        s.textAlign(s.CENTER);
        s.textSize(36);
        s.textFont(font);
        s.text('Privacy Policy', s.width/2, currHeight-20);
        // s.textSize(16);
        // s.textFont(fontB);
        // s.text('Technical, Documentation, Demo', s.width/2, currHeight);

        currHeight = s.lerp(currHeight, targetHeight, .1);
    }

    s.windowResized = function() {
        s.resizeCanvas(document.querySelector('#'+bannerSketchId).clientWidth, document.querySelector('#'+bannerSketchId).clientHeight);
        canvasWidth = s.width;
        canvasHeight = s.height;
        initCircles();
    }

    let initCircles = () => {
        let sizeOffset = .2;
        rows = s.height/size*sizeOffset;
        cols = s.width/size*sizeOffset;

        circles = [];
        for (let y=0; y<rows; y++) {
            for (let x=0; x<cols; x++) {
                let xPos = s.map(x, 0, cols, s.width/2*-1, s.width/2);
                let yPos = s.map(y, 0, rows, s.height/2*-1, s.height/2);
                circles.push(new Circle(xPos+size, yPos+size, size, s.random(220, 255)));
            }
        }
    }

    class Circle {
        constructor(x, y, r, c) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.or = r;
            this.tr = r;
            this.c = c;
        }
        render() {
            s.fill(this.c);
            s.circle(s.width/2+this.x, s.height/2+this.y, this.r);
        }
        update() {
            let dist = s.dist(s.mouseX, s.mouseY, s.width/2+this.x, s.height/2+this.y);
            if (dist < 80) {
                this.tr = s.map(dist, 0, 80, this.or*3, this.or);
                this.r = s.lerp(this.r, this.tr, .1);
            } else {
                this.r = s.lerp(this.r, this.or, .02);
            }
        }
    }
}

let bannerSketchId = 'privacy-policy-banner-sketch';
var privacyBannerP5 = new p5(privacyBannerSketch, bannerSketchId);