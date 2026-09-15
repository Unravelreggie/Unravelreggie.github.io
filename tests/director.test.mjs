import test from "node:test";
import assert from "node:assert/strict";
import { Box3 } from "three";
import { sampleJourney } from "../src/scene/director.js";
import { createDogActor } from "../src/scene/DogActors.js";
test("fast seeking and reverse seeking reach the intended chapter without history",()=>{
 for(const [p,i] of [[.01,0],[.31,1],[.57,2],[.95,3],[.05,0],[1,3],[-1,0],[2,3]])assert.equal(sampleJourney(p).index,i);
});
test("each reading hold keeps the camera fixed and copy fully visible",()=>{
 for(let i=0;i<4;i++){
  const a=sampleJourney((i+.1)/4),b=sampleJourney((i+.6)/4);
  assert.equal(a.x,b.x);assert.equal(a.z,b.z);assert.equal(a.contentOpacity,1);assert.equal(b.contentOpacity,1);
 }
});
test("chapter transitions remain continuous at boundaries",()=>{
 for(const p of [.25,.5,.75]){
  const a=sampleJourney(p-1e-6),b=sampleJourney(p+1e-6);
  assert.ok(Math.abs(a.z-b.z)<.001);assert.ok(Math.abs(a.x-b.x)<.001);
 }
});
test("both original rigs expose eyes, jaw and four articulated legs",()=>{
 for(const kind of ["golden","frenchie"]){
  const a=createDogActor(kind), names=[];a.root.traverse(o=>names.push(o.name));
  for(const part of ["head","jaw","tail"])assert.ok(names.includes(kind+"-"+part));
  assert.equal(names.filter(n=>n.endsWith("-upper-leg")).length,4);
  assert.equal(names.filter(n=>n.endsWith("-lower-leg")).length,4);
  a.update({time:1,speed:0});
  const b=new Box3().setFromObject(a.root);
  assert.ok(b.min.y>-.15&&b.max.y<2.5);
  const before=a.root.getObjectByName("front-left-upper-leg").rotation.x;
  a.update({time:1,speed:1});const after=a.root.getObjectByName("front-left-upper-leg").rotation.x;
  assert.notEqual(before,after);
  a.update({time:1,speed:0});assert.equal(a.root.getObjectByName("front-left-upper-leg").rotation.x,before);
  a.dispose();
 }
});
