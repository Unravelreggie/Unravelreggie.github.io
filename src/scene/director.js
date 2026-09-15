export const clamp = (n, a=0, b=1) => Math.max(a, Math.min(b,n));
export const smooth = n => { const t=clamp(n); return t*t*(3-2*t); };
export const stops = [
 {x:-.6,y:0,z:0},{x:1.3,y:.1,z:-7},{x:-1.1,y:-.15,z:-14},{x:.4,y:0,z:-21}
];
// Scroll is the clock: seeking or reversing never queues missed animations.
export function sampleJourney(progress) {
 const scaled=clamp(progress)*4;
 const from=Math.min(3,Math.floor(scaled)), to=Math.min(3,from+1);
 const local=scaled-from, moving=from<3?clamp((local-.66)/.34):0;
 const travel=smooth(moving), index=moving>.5?to:from;
 const a=stops[from],b=stops[to];
 return {from,to,index,travel,moving,reading:moving===0||moving===1,
  position:from+travel,
  x:a.x+(b.x-a.x)*travel,y:a.y+(b.y-a.y)*travel,z:a.z+(b.z-a.z)*travel,
  contentOpacity:from===3?1:1-Math.sin(moving*Math.PI)**4};
}
export function progressFor(root, stage, inset=0) {
 return clamp((inset-root.getBoundingClientRect().top)/Math.max(1,root.offsetHeight-stage.offsetHeight));
}
