// import { GlowParticle } from './glowpaticle.js';

// const COLORS = [
//   // { r: 235, g: 143, b: 144 }, // #EB8F90
//   // { r: 255, g: 180, b: 113 }, // #FFB471
//   { r: 173, g: 190, b: 210 }, // #ADBED2
//   // { r: 18, g: 64, b: 106 }, // #12406A

//   { r: 252, g: 174, b: 187 }, // #FCAEBB Lavender Pink
//   { r: 237, g: 187, b: 203 }, // #EDBBCB Beauty Bush
//   { r: 239, g: 198, b: 210 }, // #EFC6D2
//   { r: 242, g: 222, b: 233 }, // #F2DEE9 Vanilla Ice
//   // { r: 243, g: 235, b: 238 }, // #F3EBEE Soft Peach
//   { r: 173, g: 190, b: 210 }, // #ADBED2
// ]

// class Gradation {
//   constructor() {
//     this.canvas = document.createElement('canvas');
//     this.canvas.style.position = 'fixed';
//     this.canvas.style.top = 0;
//     this.canvas.style.left = 0;
//     this.canvas.style.zIndex = -1;
//     document.body.appendChild(this.canvas);
//     this.ctx = this.canvas.getContext('2d');

//     console.log(this.ctx);
//     this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

//     this.totalParticles = 20;
//     this.particles = [];
//     this.maxRadius = 900;
//     this.minRadius = 400;

//     window.addEventListener('resize', this.resize.bind(this), false);
//     this.resize();

//     window.requestAnimationFrame(this.animate.bind(this));
//   }

//   resize() {
//     this.stageWidth = document.body.clientWidth;
//     this.stageHeight = document.body.clientHeight;

//     this.canvas.width = this.stageWidth * this.pixelRatio;
//     this.canvas.height = this.stageHeight * this.pixelRatio;
//     this.ctx.scale(this.pixelRatio, this.pixelRatio);

//     this.ctx.globalCompositeOperation = 'saturation';

//     this.createParticles();
//   }

//   createParticles() {
//     let curColor = 0;
//     this.particles = [];
//     for (let i = 0; i < this.totalParticles; i++) {
//       const item = new GlowParticle(
//         Math.random() * this.stageWidth,
//         Math.random() * this.stageHeight,
//         Math.random() *
//         (this.maxRadius - this.minRadius) + this.minRadius,
//         COLORS[curColor]
//       );

//       if (++curColor >= COLORS.length) {
//         curColor = 0;
//       }
//       this.particles[i] = item;
//     }
//   }

//   animate() {
//     window.requestAnimationFrame(this.animate.bind(this));
//     this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

//     for (let i = 0; i < this.totalParticles; i++) {
//       const item = this.particles[i];
//       item.animate(this.ctx, this.stageWidth, this.stageHeight);
//     }
//   }
// }

// window.onload = () => {
//   new Gradation();
// }