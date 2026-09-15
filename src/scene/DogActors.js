import * as THREE from 'three';

const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const joint=(p,name,pos)=>{const g=new THREE.Group();g.name=name;if(pos)g.position.set(...pos);p.add(g);return g};
function factory(){
 const gs=new Set(),ms=new Set(),mat=(color,roughness=.78)=>{const m=new THREE.MeshStandardMaterial({color,roughness});ms.add(m);return m};
 const mesh=(g,m,s,p,name)=>{gs.add(g);const o=new THREE.Mesh(g,m);o.name=name;o.castShadow=o.receiveShadow=true;s&&o.scale.set(...s);p&&o.position.set(...p);return o};
 return {mat,s:(m,s,p,n)=>mesh(new THREE.SphereGeometry(1,16,12),m,s,p,n),c:(m,r,l,s,p,n)=>mesh(new THREE.CapsuleGeometry(r,l,8,14),m,s,p,n),t:(m,p,r,n)=>mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p.map(v=>new THREE.Vector3(...v))),10,r,6),m,null,null,n),dispose:()=>{gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose())}};
}
function eye(k,p,x,y,z,iris,side){
 const e=joint(p,side+'-eye',[x,y,z]);e.add(k.s(k.mat(0x1d130e,.28),[.1,.1,.07],[0,0,0],side+'-eye-gloss'));
 const u=joint(e,side+'-pupil',[0,0,.058]);u.add(k.s(iris,[.057,.063,.02],[0,0,0],side+'-pupil'));u.add(k.s(k.mat(0xffffff,.18),[.018,.018,.008],[-.024,.028,.018],side+'-catchlight'));return[e,u];
}
function leg(k,p,name,x,z,y,a,b,paw,m,rear){
 const u=joint(p,name+'-upper-leg',[x,y,z]);u.add(k.c(m,.1,a-.2,rear?[1.1,1,.94]:[.94,1,.94],[0,-a/2,0],name+'-upper-coat'));
 const l=joint(u,name+'-lower-leg',[0,-a,0]);l.add(k.c(m,.082,b-.16,[1,1,.96],[0,-b/2,0],name+'-lower-coat'));l.add(k.s(m,paw,[0,-b-paw[1]*.7,.06],name+'-paw'));return[u,l];
}
function dog(kind,k){
 const golden=kind==='golden',root=new THREE.Group();root.name=golden?'golden-retriever':'french-bulldog';
 const rig=joint(root,kind+'-rig'),white=k.mat(golden?0xf3d69e:0xf4f0e5),coat=k.mat(golden?0xd6aa64:0x191919),dark=k.mat(0x241610,.38),pink=k.mat(0xc77e76),iris=k.mat(0x644327,.24),base=golden?.88:.51;
 const body=joint(rig,kind+'-body',[0,base,0]);body.add(k.s(white,golden?[.48,.5,.72]:[.37,.34,.43],[0,0,0],kind+'-torso'));
 body.add(k.s(coat,golden?[.38,.35,.45]:[.22,.24,.27],[golden?0:-.18,-.02,golden?-.43:.1],kind+'-coat-patch'));if(!golden)body.add(k.s(coat,[.22,.24,.27],[.18,.03,.12],'frenchie-black-patch-right'));
 if(golden)[[0,-.29],[-.15,-.22],[.15,-.22]].forEach(v=>body.add(k.s(coat,[.15,.25,.13],[v[0],v[1],-.62],'golden-soft-chest-feather')));
 const neck=joint(body,kind+'-neck',[0,golden?.33:.23,golden?-.49:-.28]);neck.rotation.x=-.25;neck.add(k.c(white,golden?.24:.2,golden?.31:.17,[1.05,1,1],[0,.1,0],kind+'-neck'));
 const head=joint(neck,kind+'-head',[0,golden?.35:.22,-.03]);head.add(k.s(white,golden?[.38,.34,.39]:[.35,.31,.31],[0,0,0],kind+'-skull'));
 head.add(k.s(coat,golden?[.28,.24,.39]:[.27,.16,.17],[0,-.06,golden?.31:.27],kind+'-muzzle'));head.add(k.s(dark,golden?[.105,.078,.07]:[.12,.065,.055],[0,0,golden?.67:.45],kind+'-nose'));
 if(!golden){head.add(k.s(white,[.07,.24,.045],[0,.08,.29],'frenchie-white-blaze'));[-.1,.1].forEach(x=>head.add(k.t(coat,[[x,.1,.35],[x*.8,.02,.44]],.016,'frenchie-muzzle-wrinkle')))}
 const jaw=joint(head,kind+'-jaw',[0,-.14,golden?.35:.23]);jaw.add(k.s(coat,[.2,.07,.14],[0,0,.1],kind+'-lower-jaw'));jaw.add(k.s(pink,[.085,.018,.065],[0,-.075,.2],kind+'-tongue'));
 const eyes=[eye(k,head,golden?-.17:-.15,.1,golden?.3:.27,iris,'left'),eye(k,head,golden?.17:.15,.1,golden?.3:.27,iris,'right')],ears=[];
 [['left',golden?-.34:-.21],['right',golden?.34:.21]].forEach(v=>{const e=joint(head,v[0]+'-ear',[v[1],golden?.13:.2,-.03]);e.rotation.z=v[0]==='left'?(golden?.18:-.12):(golden?-.18:.12);e.add(golden?k.c(coat,.14,.32,[.78,1.45,.68],[0,-.22,0],v[0]+'-floppy-ear'):k.s(coat,[.16,.33,.085],[0,.23,0],v[0]+'-bat-ear'));ears.push(e)});
 const tail=joint(body,kind+'-tail',[0,.03,golden?.6:.4]);tail.rotation.x=-.7;if(golden){tail.add(k.t(white,[[0,0,0],[0,.03,.22],[0,.12,.6]],.105,'golden-tail'));tail.add(k.t(coat,[[-.05,0,.1],[-.08,.02,.55]],.06,'golden-tail-feather'))}else tail.add(k.s(coat,[.09,.075,.11],[0,.02,.08],'frenchie-tiny-tail'));
 const p=golden?[.13,.07,.17]:[.105,.055,.14],a=golden?.39:.23,b=golden?.36:.23,ra=golden?.35:.22,rb=golden?.34:.21,ls=[
 leg(k,body,'front-left',golden?-.31:-.23,golden?-.43:-.27,-.2,a,b,p,white),leg(k,body,'front-right',golden?.31:.23,golden?-.43:-.27,-.2,a,b,p,white),leg(k,body,'rear-left',golden?-.32:-.24,golden?.39:.28,-.2,ra,rb,p,coat,true),leg(k,body,'rear-right',golden?.32:.24,golden?.39:.28,-.2,ra,rb,p,coat,true)];
 return{root,body,head,jaw,tail,eyes,ears,ls,base,stride:golden?.64:.53,rate:golden?4.7:8.4};
}
function animate(a,v){
 const t=Number.isFinite(v.time)?v.time:0,s=clamp(v.speed??0),x=clamp(v.gazeX??0,-1,1),y=clamp(v.gazeY??0,-1,1),ex=clamp(v.excitement??0),sit=clamp(v.sit??0),side=clamp(v.sideEye??0,-1,1),w=Math.sin(t*a.rate*Math.PI*2);
 a.body.position.y=a.base+Math.sin(t*(7+s*2))*.012-sit*.08;a.body.rotation.x=sit*.17-ex*.06;a.head.rotation.set(-y*.16-ex*.075+sit*.05,x*.28+side*.19,0);a.jaw.rotation.x=ex*.34+s*.055;a.tail.rotation.y=Math.sin(t*(4+ex*8))*(.12+ex*.58+s*.12);a.tail.rotation.x=-sit*.12;
 a.ears.forEach((q,i)=>q.rotation.x=Math.sin(t*5.2+i*.6)*.045*(s+ex));const blink=(Math.sin(t*1.7)+Math.sin(t*.43+1.2))*.5>.91?.16:1;a.eyes.forEach((q,i)=>{q[0].scale.y=blink;q[1].position.set((x+side*(i?-.45:1))*.018,y*.012,.058)});
 a.ls.forEach((q,i)=>{const p=w*(i%2?-1:1),rear=i>1;q[0].rotation.x=p*a.stride*s*(rear?.78:1)+(rear?sit*.72:-sit*.1);q[1].rotation.x=Math.max(0,-p)*a.stride*s*.56+(rear?-sit*.78:sit*.14)});
}
export function createDogActor(kind){if(kind!=='golden'&&kind!=='frenchie')throw new Error(`Unknown dog actor: ${kind}`);const k=factory(),a=dog(kind,k);return{root:a.root,update:(values={})=>animate(a,values),dispose:()=>k.dispose()};}
