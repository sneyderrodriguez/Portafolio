document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("nether-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height, centerX, centerY, maxDistance;
    let stars = [];
    const ancientRunes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"];
    const codeSymbols = ["</>", "{ }", "[ ]", "=>", "();", "&&", "||", "===", "++", "/*"];
    const allSymbols = [...ancientRunes, ...codeSymbols];
    let symbols = [];
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2;
        centerY = height / 2;
        maxDistance = Math.sqrt(width * width + height * height) / 2;
    }
    window.addEventListener("resize", resize);
    resize();

    class Star {
        constructor() {
            this.angle = Math.random() * Math.PI * 2;
            this.distance = Math.sqrt(Math.random());
            this.size = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.6 + 0.4;
        }

        update() {
            this.angle += 0.00002;
        }

        draw() {
            const x = centerX + Math.cos(this.angle) * this.distance * maxDistance;
            const y = centerY + Math.sin(this.angle) * this.distance * maxDistance;

            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "#119DA4";
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    class FlickerSymbol {
        constructor() {
            this.reset();
            this.life = Math.random() * this.maxLife;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.char = allSymbols[Math.floor(Math.random() * allSymbols.length)];
            this.size = Math.random() * 10 + 14;
            this.maxLife = Math.random() * 180 + 240;
            this.life = 0;
        }

        update() {
            this.life++;
            if (this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw() {
            const fade = 90;
            let opacity = 1;

            if (this.life < fade) {
                opacity = this.life / fade;
            } else if (this.maxLife - this.life < fade) {
                opacity = (this.maxLife - this.life) / fade;
            }

            ctx.globalAlpha = opacity * 0.8;
            ctx.fillStyle = "#D4AF37";
            ctx.font = `${this.size}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.char, this.x, this.y);
        }
    }
    for (let i = 0; i < 400; i++) {
        stars.push(new Star());
    }
    for (let i = 0; i < 5; i++) {
        symbols.push(new FlickerSymbol());
    }
    function animate() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
            star.update();
            star.draw();
        });
        symbols.forEach((symbol) => {
            symbol.update();
            symbol.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});