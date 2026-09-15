import { useEffect, useRef, useState } from "react";
import { ArrowRight, StarFour } from "@phosphor-icons/react";

const chapters=[
 {year:"2017–2021",title:["Start with a human question.","先从关于人的问题出发。"],text:["Philosophy, psychology and cognitive science at Rutgers taught me to look at how people think, behave and make decisions.","在 Rutgers 的哲学、心理学与认知科学训练，让我从不同视角理解人的思考、行为与决策。"],tag:["Rutgers · Three disciplines","Rutgers · 三个学科"],link:"#experience",action:["Explore my background","查看教育与经历"]},
 {year:"2022–2025",title:["Meet the data. Learn to ask better.","走进数据，也学会更好地提问。"],text:["Clinical research and medical NLP brought me into real data workflows. At Miami, biostatistics and research using behavior, fMRI and ECG deepened how I model and interpret uncertainty.","临床研究与医学 NLP 带我走进真实的数据流程。随后在迈阿密大学，生物统计及行为、fMRI、ECG 研究，让我逐步深入建模与不确定性的解释。"],tag:["Clinical research → MSPH Biostatistics","临床研究 → MSPH 生物统计"],link:"#open-research",action:["Explore public research","查看公开研究"]},
 {year:"2025–PRESENT",title:["Bring the methods into practice.","把方法带到实际工作中。"],text:["International pharmacovigilance connects regulations, partners and data quality. I combine that business context with statistical analysis, data foundations and AI-supported review workflows.","国际药物警戒连接法规、合作伙伴与数据质量。我将这一业务背景与统计分析、数据基础建设及 AI 核查流程结合起来。"],tag:["International PV · Data · Applied AI","国际 PV · 数据 · AI 应用"],link:"#work",action:["Explore the projects","查看代表项目"]},
 {year:"LOOKING AHEAD",title:["Keep growing. Ask the next question.","继续生长，探索下一个问题。"],text:["I want to extend this foundation toward pharmacovigilance signal analysis and drug safety data analytics. It is a direction to develop, supported by the work and training I already have.","我希望在已有工作与训练的基础上，继续向药物警戒信号分析与药物安全性数据分析拓展。这是下一步希望深入的方向。"],tag:["A direction to grow into","希望逐步深入的方向"],link:"#next",action:["Read about my next chapter","了解未来方向"]}
];
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));

export default function Journey({language,motion}){
 const root=useRef(null),scene=useRef(null);
 const [position,setPosition]=useState(0);
 const [reduced,setReduced]=useState(false);
 const l=language==="zh"?1:0;
 useEffect(()=>{
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setReduced(media.matches);
  update();media.addEventListener("change",update);return()=>media.removeEventListener("change",update);
 },[]);
 const staticMode=reduced||!motion;
 useEffect(()=>{
  if(staticMode)return;
  let frame=0;
  const update=()=>{frame=0;if(!root.current||!scene.current)return;
   const inset=parseFloat(getComputedStyle(scene.current).top)||0;
   const progress=clamp((inset-root.current.getBoundingClientRect().top)/Math.max(1,root.current.offsetHeight-scene.current.offsetHeight));
   const scaled=progress*chapters.length;
   const stage=Math.min(chapters.length-1,Math.floor(scaled));
   const moving=clamp((scaled-stage-.62)/.38);
   setPosition(Math.min(chapters.length-1,stage+moving*moving*(3-2*moving)));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);
  return()=>{cancelAnimationFrame(frame);removeEventListener("scroll",schedule);removeEventListener("resize",schedule);};
 },[staticMode]);
 const index=Math.round(position);
 const jump=(i)=>{
  if(staticMode)return;
  const inset=parseFloat(getComputedStyle(scene.current).top)||0;
  const top=scrollY+root.current.getBoundingClientRect().top-inset;
  const travel=root.current.offsetHeight-scene.current.offsetHeight;
  window.scrollTo({top:top+travel*(i+.06)/chapters.length,behavior:"smooth"});
 };
 return <section id="constellation" ref={root} className={"journey "+(staticMode?"journey-static":"")} aria-label={l?"我的成长路径":"My path"}>
  <div className="journey-scene" ref={scene} data-stage={index} data-progress={position.toFixed(3)}>
   <div className="journey-top"><p className="eyebrow">{l?"一段仍在继续的旅程":"A PATH STILL UNFOLDING"}</p><a href="#experience" className="text-link">{l?"直接查看经历":"Skip to experience"} <ArrowRight size={16}/></a></div>
   {staticMode?<div className="journey-transcript">{chapters.map(c=><article key={c.year}><p className="journey-year">{c.year.replace("PRESENT",l?"至今":"PRESENT").replace("LOOKING AHEAD",l?"未来方向":"LOOKING AHEAD")}</p><h2>{c.title[l]}</h2><p>{c.text[l]}</p><a className="text-link" href={c.link}>{c.action[l]} <ArrowRight size={17}/></a></article>)}</div>:
    <><div className="journey-viewport">
      <div className="journey-art" aria-hidden="true" style={{transform:"translate3d("+(-position*26)+"px,"+(position*14)+"px,-220px) rotateY("+(position*4)+"deg)"}}><img src="/assets/data-streams.webp" width="1400" height="950" alt="" loading="lazy"/></div>
      <button className="journey-beacon" onClick={()=>index<chapters.length-1?jump(index+1):document.getElementById("next").scrollIntoView({behavior:"smooth"})} aria-label={l?(index<3?"点亮下一层":"了解未来方向"):(index<3?"Illuminate the next layer":"Explore the next chapter")} style={{transform:"translate3d(0,"+(-Math.sin(position*Math.PI)*25)+"px,120px) rotateY("+(-Math.sin(position*Math.PI)*12)+"deg)"}}><StarFour size={50} weight="fill"/><span>{String(index+1).padStart(2,"0")} / 04</span></button>
      <div className="journey-space" style={{transform:"translateZ("+(position*460)+"px)"}}>
       {chapters.map((c,i)=>{
        const distance=i-position,active=i===index;
        return <article key={c.year} className={"journey-layer "+(active?"is-current":"")} aria-hidden={!active} inert={!active?true:undefined} style={{transform:"translate3d("+((i%2?1:-1)*distance*45)+"px,0,"+(-i*460)+"px) rotateY("+(distance*5)+"deg)",opacity:active?1:0,pointerEvents:active?"auto":"none"}}>
         <p className="journey-year">{c.year.replace("PRESENT",l?"至今":"PRESENT").replace("LOOKING AHEAD",l?"未来方向":"LOOKING AHEAD")}</p>
         <h2>{c.title[l]}</h2><p className="journey-body">{c.text[l]}</p><p className="journey-tag">{c.tag[l]}</p><a className="text-link" href={c.link}>{c.action[l]} <ArrowRight size={18}/></a>
        </article>;
       })}
      </div>
     </div>
     <div className="journey-controls"><nav aria-label={l?"选择旅程章节":"Choose a chapter"}>{chapters.map((c,i)=><button key={c.year} onClick={()=>jump(i)} aria-label={(l?"第 "+(i+1)+" 章：":"Chapter "+(i+1)+": ")+c.title[l]} aria-current={i===index?"step":undefined} className={position>=i-.2?"is-lit":""}><StarFour size={24} weight={position>=i-.2?"fill":"light"}/><span>0{i+1}</span></button>)}</nav><p>{l?"向下滚动，进入下一层":"Scroll down. Enter the next layer."}</p></div></>}
  </div>
 </section>;
}
