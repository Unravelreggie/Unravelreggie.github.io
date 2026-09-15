import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { journeyChapters } from "./portfolio-data.js";
import { translateContent } from "./site-language.js";
import { sampleJourney, progressFor } from "./scene/director.js";

export default function Journey({language,motion,paused,onProject,projects,cv,onToggleMotion}) {
 const root=useRef(null),stage=useRef(null),layer=useRef(null);
 const [index,setIndex]=useState(0),[reduced,setReduced]=useState(()=>matchMedia("(prefers-reduced-motion: reduce)").matches);
 const [compact,setCompact]=useState(()=>matchMedia("(max-width: 820px)").matches);
 const staticMode=!motion||reduced||compact;
 const chapters=translateContent(journeyChapters,language), l=language==="zh";
 useEffect(()=>{
  const reduce=matchMedia("(prefers-reduced-motion: reduce)"),mobile=matchMedia("(max-width: 820px)");
  const update=()=>{setReduced(reduce.matches);setCompact(mobile.matches);};
  reduce.addEventListener("change",update);mobile.addEventListener("change",update);
  return()=>{reduce.removeEventListener("change",update);mobile.removeEventListener("change",update);};
 },[]);
 useEffect(()=>{
  if(staticMode||paused)return;
  let frame=0;
  const update=()=>{
   frame=0;const inset=parseFloat(getComputedStyle(stage.current).top)||0;
   const s=sampleJourney(progressFor(root.current,stage.current,inset));
   setIndex(s.index);
   stage.current.dataset.progress=s.position.toFixed(3);
   stage.current.dataset.reading=String(s.reading);
   if(layer.current)layer.current.style.opacity=s.contentOpacity;
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);
  return()=>{cancelAnimationFrame(frame);removeEventListener("scroll",schedule);removeEventListener("resize",schedule);};
 },[staticMode,paused]);
 const jump=i=>{
  const inset=parseFloat(getComputedStyle(stage.current).top)||0;
  scrollTo({top:scrollY+root.current.getBoundingClientRect().top-inset+(root.current.offsetHeight-stage.current.offsetHeight)*(i+.1)/4,behavior:"smooth"});
 };
 const chapter=c=>{
  const p=projects.find(p=>p.id===c.projectId);
  return <><p className="journey-year">{c.label}</p><h2>{c.title}</h2><p className="journey-body">{c.body}</p>
   {p&&<p className="journey-role">{p.role}<br/><span>{p.maturity}</span></p>}
   <p className="journey-boundary">{c.boundary}</p>
   {p?<button className="button primary" onClick={()=>onProject(c.projectId)}>{c.action}<ArrowRight size={17}/></button>:<div className="chapter-actions"><a className="button primary" href="#experience">{c.action}<ArrowRight size={17}/></a><a className="text-link" href={cv} target="_blank" rel="noreferrer">{l?"查看简历":"View CV"}<ArrowRight size={16}/></a></div>}
  </>;
 };
 return <section id="constellation" ref={root} className={"journey director-journey "+(staticMode?"journey-static":"")} aria-label={l?"跟着球，走进我的项目":"Follow the ball. Discover the work."}>
  <div className="journey-scene" ref={stage} data-stage={index}>
   <div className="journey-environment" aria-hidden="true"/>
   <div className="journey-top"><p className="eyebrow">{l?"跟着球，走进我的项目":"FOLLOW THE BALL. DISCOVER THE WORK."}</p><div className="journey-top-actions"><button className="journey-mode" onClick={onToggleMotion} aria-pressed={!motion}>{l?(motion?"静态阅读":"开启动效"):(motion?"Read without motion":"Enable motion")}</button><a className="text-link" href="#experience">{l?"直接查看经历":"Skip to background"}<ArrowRight size={16}/></a></div></div>
   {staticMode?<div className="journey-transcript">{chapters.map(c=><article key={c.id}>{chapter(c)}</article>)}</div>:<>
    <div className="journey-reading" ref={layer}><article key={chapters[index].id}>{chapter(chapters[index])}</article></div>
    <p className="journey-concept">{l?"概念示意 · 非项目结果":"Conceptual illustrations · not project results"}</p><div className="journey-controls"><nav aria-label={l?"选择项目章节":"Choose a project chapter"}>{chapters.map((c,i)=><button key={c.id} onClick={()=>jump(i)} aria-current={i===index?"step":undefined}><span>0{i+1}</span>{c.short}</button>)}</nav><p><ArrowDown size={17}/>{l?"向下滚动，继续探索":"Scroll to the next bounce"}</p></div>
   </>}
  </div>
 </section>;
}
