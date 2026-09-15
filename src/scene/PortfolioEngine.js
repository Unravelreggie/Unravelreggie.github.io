import * as THREE from "three";
import { createDogActor } from "./DogActors.js";
import { clamp, smooth, sampleJourney, progressFor, stops } from "./director.js";

function makeBall() {
 const root=new THREE.Group();
 const felt=new THREE.MeshStandardMaterial({color:0xcce946,roughness:.95});
 const sphere=new THREE.Mesh(new THREE.SphereGeometry(.17,32,20),felt);
 sphere.castShadow=true;root.add(sphere);
 const points=Array.from({length:161},(_,i)=>{
  const t=i/160*Math.PI*2,lat=.53*Math.sin(t*2);
  return new THREE.Vector3(Math.cos(t)*Math.cos(lat)*.171,Math.sin(lat)*.171,Math.sin(t)*Math.cos(lat)*.171);
 });
 const seam=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,true),160,.008,5,true),new THREE.MeshStandardMaterial({color:0xf5f4d2,roughness:1}));
 root.add(seam);return root;
}
function makeAvatar() {
 const root=new THREE.Group(), pivot=new THREE.Group();root.add(pivot);
 const material=c=>new THREE.MeshStandardMaterial({color:c,roughness:.87});
 const skin=material(0xd7a27c),shirt=material(0xf4eee0),pants=material(0x254d40),hair=material(0x2c2721),sole=material(0xe9e4d8);
 const ell=(parent,mat,s,x,y,z)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),mat);o.scale.set(...s);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o;};
 ell(pivot,shirt,[.23,.35,.16],0,.9,0);ell(pivot,skin,[.2,.23,.2],0,1.44,0);
 ell(pivot,hair,[.212,.11,.203],0,1.58,-.012);
 for(const side of [-1,1]){ell(pivot,pants,[.105,.32,.12],side*.13,.37,0);ell(pivot,sole,[.12,.07,.22],side*.13,.065,.08);}
 const arm=new THREE.Group();arm.position.set(.2,1.1,0);pivot.add(arm);
 ell(arm,shirt,[.09,.18,.1],.04,-.12,0);ell(arm,skin,[.075,.22,.08],.09,-.36,0);
 const racket=new THREE.Group();racket.position.set(.11,-.58,0);arm.add(racket);
 const handle=new THREE.Mesh(new THREE.CylinderGeometry(.025,.028,.27,10),pants);handle.position.y=-.12;racket.add(handle);
 const hoop=new THREE.Mesh(new THREE.TorusGeometry(.19,.016,8,36),shirt);hoop.scale.y=1.3;hoop.position.y=-.46;racket.add(hoop);
 const lineMat=new THREE.LineBasicMaterial({color:0xc8d2c5,transparent:true,opacity:.7});
 for(let i=-3;i<=3;i++){const d=i*.044,a=Math.sqrt(.19*.19-d*d);let g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(d,-.46-a*1.3,0),new THREE.Vector3(d,-.46+a*1.3,0)]);racket.add(new THREE.Line(g,lineMat));g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-a,-.46+d*1.3,0),new THREE.Vector3(a,-.46+d*1.3,0)]);racket.add(new THREE.Line(g,lineMat));}
 const other=new THREE.Group();other.position.set(-.21,1.1,0);pivot.add(other);ell(other,skin,[.075,.28,.08],-.07,-.25,0);
 root.scale.setScalar(.83);
 return {root,update:t=>{arm.rotation.z=-.7+Math.sin(clamp((t-.22)/.58)*Math.PI)*2;arm.rotation.x=-.25-Math.sin(clamp(t/.8)*Math.PI)*.7;pivot.rotation.y=-.3+Math.sin(clamp(t/.9)*Math.PI)*.9;other.rotation.x=-.3;}};
}
function disposeTree(root) {
 const geometries=new Set(),materials=new Set();
 root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});
 geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
}
export function createPortfolioEngine(host,getInputs) {
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"});}
 catch{document.documentElement.dataset.scene="fallback";return {serve:()=>document.getElementById("constellation")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}),dispose(){},invalidate(){}};}
 renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);
 scene.add(new THREE.HemisphereLight(0xf9f4e3,0x91a386,2));
 const sun=new THREE.DirectionalLight(0xffe9c8,2.3);sun.position.set(-4,7,5);sun.castShadow=true;
 sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.normalBias=.035;scene.add(sun,sun.target);
 const golden=createDogActor("golden"),frenchie=createDogActor("frenchie");
 scene.add(golden.root,frenchie.root);
 const ball=makeBall();scene.add(ball);
 const avatar=makeAvatar();scene.add(avatar.root);avatar.root.visible=false;
 const landmarks=new THREE.Group();scene.add(landmarks);
 const landmarkTextures=[],loader=new THREE.TextureLoader();
 const wood=new THREE.MeshStandardMaterial({color:0xb29b73,roughness:.93});
 const boardMat=new THREE.MeshStandardMaterial({color:0xf1eee0,roughness:1});
 const images=["data-streams.webp","model-distributions.webp","review-workflow.webp"];
 stops.forEach((stop,i)=>{
  const stand=new THREE.Group();stand.position.set(stop.x+2.8,stop.y,stop.z-2.1);stand.rotation.y=-.16;
  const board=new THREE.Mesh(new THREE.BoxGeometry(2.1,1.25,.07),boardMat);board.position.y=1.75;board.castShadow=true;stand.add(board);
  for(const x of [-.75,.75]){const post=new THREE.Mesh(new THREE.BoxGeometry(.055,1.1,.055),wood);post.position.set(x,.57,0);post.castShadow=true;stand.add(post);}
  const ledge=new THREE.Mesh(new THREE.BoxGeometry(2.3,.075,.55),wood);ledge.position.set(0,1.1,.1);ledge.castShadow=true;stand.add(ledge);
  if(images[i]){
   const tex=loader.load("/assets/"+images[i]);tex.colorSpace=THREE.SRGBColorSpace;landmarkTextures.push(tex);
   const picture=new THREE.Mesh(new THREE.PlaneGeometry(1.91,1.07),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
   picture.position.set(0,1.75,.04);stand.add(picture);
  }else{
   board.visible=false;
   const book=new THREE.Mesh(new THREE.BoxGeometry(.7,.065,.45),boardMat);book.position.set(.28,1.18,.1);stand.add(book);
  }
  landmarks.add(stand);
 });
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(50,70),new THREE.ShadowMaterial({color:0x273626,opacity:.2}));floor.rotation.x=-Math.PI/2;floor.position.y=-.012;floor.receiveShadow=true;scene.add(floor);
 const pointer={x:0,y:0,near:false,inside:false,sideAt:-10};
 let started=false,previousInputs="",frame=0,last=0,time=0,lastScroll=scrollY,direction=1,launch=-1,served=false,disposed=false,dirty=true;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const hero=document.getElementById("top"),journey=document.getElementById("constellation");
 const stage=journey?.querySelector(".journey-scene"),ballButton=document.querySelector(".tennis-start");
 const canvas=renderer.domElement;
 const resize=()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();dirty=true;if(started)wake();};
 resize();
 function serve() {
  const input=getInputs();
  if(input.paused)return;
  if(!input.motion||reduced.matches||innerWidth<=820){journey?.scrollIntoView({behavior:reduced.matches?"auto":"smooth"});return;}
  if(launch>=0)return;
  launch=time;served=false;pointer.near=false;wake();
 }
 const cancelServe=()=>{if(launch>=0){launch=-1;avatar.root.visible=false;}};
 const pointerMove=e=>{
  if(getInputs().paused)return;
  const rect=hero.getBoundingClientRect();
  if(rect.bottom<0||rect.top>innerHeight)return;
  pointer.inside=e.clientY>=rect.top&&e.clientY<=rect.bottom;
  pointer.x=clamp(e.clientX/innerWidth*2-1,-1,1);pointer.y=clamp(1-e.clientY/innerHeight*2,-1,1);
  if(ballButton&&pointer.inside){
   const b=ballButton.getBoundingClientRect(),d=Math.hypot(e.clientX-b.x-b.width/2,e.clientY-b.y-b.height/2);
   const next=d<(pointer.near?170:125);
   if(pointer.near&&!next)pointer.sideAt=time;
   pointer.near=next;
  }else pointer.near=false;
  wake();
 };
 const pointerLeave=()=>{pointer.inside=false;pointer.near=false;wake();};
 function wake(){dirty=true;if(started&&!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(renderTick);}
 const renderTick=now=>{
  if(disposed)return;
  frame=0;
  if(document.hidden)return;
  const inputs=getInputs(),inputKey=String(inputs.motion)+String(inputs.paused)+String(reduced.matches);
  if(inputKey!==previousInputs){dirty=true;previousInputs=inputKey;if(!inputs.motion||reduced.matches)cancelServe();}
  const animated=inputs.motion&&!reduced.matches&&!inputs.paused;
  const elapsed=Math.min((now-last)/1000,.08);
  if(now-last<33&&!dirty&&launch<0){if(animated&&innerWidth>820)frame=requestAnimationFrame(renderTick);return;}
  last=now;
  if(animated)time+=elapsed;
  const hr=hero.getBoundingClientRect(),jr=stage?.getBoundingClientRect(),mobile=innerWidth<=820;
  const inHero=hr.bottom>70&&hr.top<innerHeight, inJourney=!mobile&&journey&&!journey.classList.contains("journey-static")&&jr.top<innerHeight-50&&jr.bottom>100;
  if(!inHero&&!inJourney){host.style.display="none";dirty=false;return;}
  host.style.display="block";landmarks.visible=inJourney;
  const rect=inHero?hr:jr,top=Math.max(0,rect.top),bottom=Math.max(0,innerHeight-rect.bottom);
  host.style.clipPath="inset("+top+"px 0 "+bottom+"px 0)";
  if(scrollY!==lastScroll){direction=scrollY>lastScroll?1:-1;lastScroll=scrollY;dirty=true;}
  const still=!animated||mobile;
  if(inputs.paused){canvas.dataset.phase="detail-open";dirty=false;return;}
  if((!animated||mobile)&&!dirty){return;}
  let state={index:0,x:0,y:0,z:0,moving:0,travel:0,position:0,reading:true};
  if(inJourney){const inset=parseFloat(getComputedStyle(stage).top)||0;state=sampleJourney(progressFor(journey,stage,inset));}
  landmarks.children.forEach((stand,i)=>{stand.visible=i===state.from||(i===state.to&&state.moving>.15);});
  const travel=inJourney?state.position:0;
  const base=new THREE.Vector3(state.x,state.y,state.z);
  const width=innerWidth/innerHeight;
  if(inHero){
   camera.position.set(0,2.1,mobile?8.5:8.2);
   camera.lookAt(0,mobile?2.0:2.0,0);
   // The original meshes have independent articulation; the backdrop is only the environment.
   golden.root.position.set(mobile?-Math.min(1.2,width*1.5):-3.15,0,.05);
   frenchie.root.position.set(mobile?Math.min(1.2,width*1.5):3.18,0,.7);
   golden.root.scale.setScalar(mobile?.9:1.17);frenchie.root.scale.setScalar(mobile?.95:1.32);
   golden.root.rotation.y=.52;frenchie.root.rotation.y=-.52;
   ball.position.set(.25,.42,1.45);
  }else{
   camera.position.set(base.x-1.1,base.y+2.5,base.z+8.4);
   camera.lookAt(base.x-.45,base.y+1,base.z);
   golden.root.position.set(base.x+1.35,base.y,base.z-.15);
   frenchie.root.position.set(base.x+3.1,base.y,base.z+.65);
   golden.root.scale.setScalar(1.03);frenchie.root.scale.setScalar(1.18);
   const run=Math.sin(state.moving*Math.PI);
   golden.root.rotation.y=run*(direction>0?Math.PI:0)+.15*(1-run);
   frenchie.root.rotation.y=run*(direction>0?Math.PI:0)-.45*(1-run);
   golden.root.position.z+=run*.45*direction;
   frenchie.root.position.z-=run*.55*direction;
   ball.position.set(base.x+2.25+Math.sin(travel*Math.PI)*.32,base.y+.19+Math.sin(state.moving*Math.PI)*2.25,base.z+1.2-Math.sin(state.moving*Math.PI)*3.2*direction);
  }
  const serveT=launch<0?-1:time-launch;
  let run=inJourney&&!still?Math.sin(state.moving*Math.PI):0;
  if(serveT>=0&&inHero&&!still){
   avatar.root.visible=true;avatar.root.position.set(.2,0,.1);avatar.update(serveT);
   const fly=smooth((serveT-.52)/.72);
   ball.position.set(.25+fly*1.2,.42+Math.sin(fly*Math.PI)*2.8,1.45-fly*5);
   run=fly;
   frenchie.root.position.z-=fly*3;golden.root.position.z-=smooth((serveT-.68)/.72)*2.6;
   frenchie.root.rotation.y=-.35+fly*Math.PI;golden.root.rotation.y=.28+fly*Math.PI;
   if(serveT>1.25&&!served){served=true;launch=-1;journey.scrollIntoView({behavior:"smooth"});}
   if(serveT>2.5)launch=-1;
  }else avatar.root.visible=false;
  if(inputs.paused)run=0;
  const chase=run>.025||serveT>.5;
  if(inJourney&&run>.025){
   golden.root.rotation.y=THREE.MathUtils.lerp(.15,Math.atan2(ball.position.x-golden.root.position.x,ball.position.z-golden.root.position.z),run);
   frenchie.root.rotation.y=THREE.MathUtils.lerp(-.45,Math.atan2(ball.position.x-frenchie.root.position.x,ball.position.z-frenchie.root.position.z),run);
  }
  const gazeX=still?0:chase?0:(inHero&&pointer.inside?pointer.x:0),gazeY=still?0:chase?.12:(inHero&&pointer.inside?pointer.y*.6:0);
  const excitement=inHero&&(pointer.near||document.activeElement===ballButton)&&!chase&&!still?1:0;
  const sideEye=!still&&time-pointer.sideAt<.65?1:0;
  golden.update({time:still?0:time,speed:run,gazeX:chase?clamp((ball.position.x-golden.root.position.x)*Math.cos(golden.root.rotation.y)*.3,-1,1):gazeX,gazeY,excitement:excitement*.5,sit:inJourney&&state.index===1?1-run:0,sideEye:0});
  frenchie.update({time:still?0:time,speed:run,gazeX:chase?clamp((ball.position.x-frenchie.root.position.x)*Math.cos(frenchie.root.rotation.y)*.3,-1,1):gazeX,gazeY,excitement,sit:inJourney&&state.index===3?1-run:0,sideEye});
  floor.position.set(base.x,base.y-.012,base.z-10);
  sun.position.set(base.x-4,base.y+7,base.z+5);sun.target.position.copy(base);
  ball.rotation.set(time*(run>.02?2:0),travel*3,time*(run>.02?1:0));
  if(ballButton&&inHero){
   const pos=ball.position.clone().project(camera);
   ballButton.style.left=((pos.x+1)/2*innerWidth)+"px";
   ballButton.style.top=((1-pos.y)/2*innerHeight-hr.top)+"px";
  }
  renderer.render(scene,camera);
  canvas.dataset.chapter=String(state.index);
  canvas.dataset.phase=inputs.paused?"detail-open":still?"static":serveT>=0?"serve":run>.02?"chase":"reading";
  canvas.dataset.time=time.toFixed(2);canvas.dataset.position=travel.toFixed(3);
  document.documentElement.dataset.scene="ready";dirty=false;
  if(animated&&!mobile)frame=requestAnimationFrame(renderTick);
 };
 started=true;wake();
 addEventListener("resize",resize);addEventListener("pointermove",pointerMove,{passive:true});document.addEventListener("pointerleave",pointerLeave);
 addEventListener("wheel",cancelServe,{passive:true});addEventListener("touchstart",cancelServe,{passive:true});
 const scrollUpdate=()=>wake();addEventListener("scroll",scrollUpdate,{passive:true});
 const mediaUpdate=()=>wake();reduced.addEventListener("change",mediaUpdate);
 const vis=()=>{last=performance.now();if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener("visibilitychange",vis);
 const keys=e=>{if(["ArrowDown","ArrowUp","PageDown","PageUp","Home","End","Escape"].includes(e.key))cancelServe();};
 addEventListener("keydown",keys);
 return {serve,invalidate:wake,dispose(){
  disposed=true;cancelAnimationFrame(frame);removeEventListener("keydown",keys);removeEventListener("resize",resize);removeEventListener("pointermove",pointerMove);
  document.removeEventListener("pointerleave",pointerLeave);removeEventListener("wheel",cancelServe);removeEventListener("touchstart",cancelServe);
  removeEventListener("scroll",scrollUpdate);reduced.removeEventListener("change",mediaUpdate);document.removeEventListener("visibilitychange",vis);
  golden.dispose();frenchie.dispose();disposeTree(landmarks);landmarkTextures.forEach(t=>t.dispose());disposeTree(ball);disposeTree(avatar.root);floor.geometry.dispose();floor.material.dispose();
  renderer.dispose();canvas.remove();
 }};
}
