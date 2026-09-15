import { useEffect, useRef, useState } from "react";
import "./constellation.css";

const chapters = [
 {id:"roots",year:"2017–2021",label:["THE FIRST QUESTION","最初的问题"],title:["What shapes a human decision?","人的决策如何形成？"],body:["Philosophy, psychology and cognitive science at Rutgers gave me three ways into the same question: how we reason, behave and make sense of the world.","在 Rutgers，哲学、心理学与认知科学让我从不同角度理解同一个问题：人如何推理、行动，并理解世界。"],nodes:[["Philosophy","哲学"],["Psychology","心理学"],["Cognitive science","认知科学"]]},
 {id:"research",year:"2021–2025",label:["MEETING THE DATA","走进数据产生的现场"],title:["A question becomes something we can study.","让问题变得可以研究。"],body:["Clinical research, diagnostic-test data and medical NLP connected theory to practice. At Miami's BRAIN Group, behavioral tasks, fMRI and ECG brought human questions into measurable research.","临床研究、诊断试验数据与医学 NLP 连接了理论和实践。随后在迈阿密大学 BRAIN Group，我通过行为任务、fMRI 与 ECG，把关于人的问题转化为可测量的研究。"],nodes:[["Clinical research","临床研究"],["fMRI & ECG","fMRI 与 ECG"],["Behavioral data","行为数据"]]},
 {id:"inference",year:"2023–PRESENT",label:["LEARNING TO INFER","学习推断与解释"],title:["The model is a way of thinking.","模型也是思考问题的方式。"],body:["MSPH training in biostatistics developed how I frame questions, choose models and interpret uncertainty. Bayesian, longitudinal and machine-learning methods each answer different kinds of questions.","MSPH 生物统计训练塑造了我定义问题、选择模型和解释不确定性的方式。贝叶斯、纵向分析与机器学习，分别帮助我回答不同类型的问题。"],nodes:[["Bayesian inference","贝叶斯推断"],["Longitudinal models","纵向模型"],["Machine learning","机器学习"]]},
 {id:"practice",year:"2025–PRESENT",label:["EVIDENCE IN PRACTICE","证据进入实际业务"],title:["Real work adds responsibility.","真实业务带来了新的责任。"],body:["International pharmacovigilance connects scientific evidence with local requirements, overseas audits, partner oversight and safety agreements. I work across those responsibilities and the processes behind them.","国际药物警戒把科学证据与各地要求、海外审计、合作伙伴管理和安全性协议联系起来。我在这些职责及其背后的业务流程中开展工作。"],nodes:[["Regulations & PVA","法规与 PVA"],["Audits & partners","审计与合作伙伴"],["Safety operations","药物安全运营"]]},
 {id:"systems",year:"CURRENT WORK",label:["BUILDING THE CONNECTIONS","把问题转化为系统"],title:["From understanding a workflow to building it.","从理解流程，到实现流程。"],body:["I build data foundations, use AI-assisted development to implement software, and integrate LLM capabilities into review workflows. RWE databases, SDV and Feishu automation connect this work to daily practice.","我建设数据基础，借助 AI 辅助开发实现软件，并将 LLM 能力接入核查流程。RWE 数据库、SDV 与飞书自动化，将这些工作连接到日常实践。"],nodes:[["Data foundations","数据基础设施"],["AI & software","AI 与软件"],["Workflow automation","流程自动化"]]},
 {id:"connections",year:"ONE CONNECTED PRACTICE",label:["THE WHOLE PICTURE","完整的能力图景"],title:["Three perspectives. One connected practice.","三种视角，彼此连接的实践。"],body:["Research and analysis, data and intelligent systems, and international drug safety practice meet in the projects below. Each case makes my role, methods and evidence explicit.","研究与分析、数据与智能系统、国际药物安全实践，在下方的项目中相互连接。每个案例都说明我的职责、采用的方法与验证方式。"],nodes:[["Research & analysis","研究与分析"],["Data & intelligent systems","数据与智能系统"],["Global safety practice","国际药物安全实践"]]},
];
const points = [[225,115],[455,192],[298,310]];
const backgroundStars = Array.from({length:62},(_,i)=>({x:(i*137.7+41)%100,y:(i*71.3+19)%100,r:i%9===0?1.4:.6}));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
const ease=v=>v*v*(3-2*v);

export default function EvidenceConstellation({language="en"}) {
 const root=useRef(null), scene=useRef(null);
 const [position,setPosition]=useState(0);
 const [compact,setCompact]=useState(false);
 const lang=language==="zh"?1:0;
 useEffect(()=>{
  const media=matchMedia("(max-width: 820px), (max-height: 600px), (prefers-reduced-motion: reduce)");
  const update=()=>setCompact(media.matches);
  update();media.addEventListener("change",update);
  return()=>media.removeEventListener("change",update);
 },[]);
 useEffect(()=>{
  if(compact) return;
  let frame=0;
  const update=()=>{
   frame=0;
   const rect=root.current.getBoundingClientRect();
   const available=root.current.offsetHeight-scene.current.offsetHeight;
   setPosition(clamp((86-rect.top)/Math.max(1,available))*chapters.length);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);
  return()=>{removeEventListener("scroll",schedule);removeEventListener("resize",schedule);cancelAnimationFrame(frame);};
 },[compact]);
 const index=Math.min(chapters.length-1,Math.floor(position));
 const local=position-index;
 const chapter=chapters[index];
 const illuminated=compact?3:Math.max(1,Math.min(3,Math.floor(local*5)+1));
 const departing=index<chapters.length-1?ease(clamp((local-.73)/.27)):0;
 const arriving=index>0?1-ease(clamp(local/.2)):0;
 const zoom=1+departing*1.5-arriving*.3;
 const opacity=1-departing*.98-arriving*.65;
 const goTo=(i)=>{
  const available=root.current.offsetHeight-scene.current.offsetHeight;
  window.scrollTo({top:window.scrollY+root.current.getBoundingClientRect().top-86+available*((i+.12)/chapters.length),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 };
 return (
  <section id="constellation" ref={root} className={"cosmos "+(compact?"cosmos--compact":"")} aria-labelledby={compact?"cosmos-transcript-title":"cosmos-title"}>
   <div className="cosmos-scene" ref={scene} data-stage={index} data-progress={position.toFixed(3)}>
    <div className="cosmos-dust" aria-hidden="true" style={{transform:"translateY("+(-position*6)+"px)"}}>
     {backgroundStars.map((s,i)=><i key={i} style={{left:s.x+"%",top:s.y+"%",width:s.r*2,height:s.r*2,opacity:.15+(i%5)*.12}}/>)}
    </div>
    <div className="cosmos-topline"><span>{lang?"UNRAVEL / 一条逐渐展开的线索":"UNRAVEL / FOLLOW THE THREAD"}</span><a href="#capabilities">{lang?"直接查看能力与项目 ↗":"Skip to capabilities & work ↗"}</a></div>
    <div className="cosmos-layout">
     <div className="cosmos-copy">
      <p className="cosmos-kicker">{String(index+1).padStart(2,"0")} / {chapter.label[lang]}</p>
      <h2 id="cosmos-title">{chapter.title[lang]}</h2>
      <p className="cosmos-description">{chapter.body[lang]}</p>
      <p className="cosmos-year">{chapter.year.replace("PRESENT",lang?"至今":"PRESENT").replace("CURRENT WORK",lang?"当前实践":"CURRENT WORK").replace("ONE CONNECTED PRACTICE",lang?"彼此连接的实践":"ONE CONNECTED PRACTICE")}</p>
     </div>
     <div className="cosmos-window" aria-label={lang?"随滚动点亮的能力星群":"A constellation of connected capabilities"}>
      {index>0&&<div className="cosmos-memory" aria-hidden="true">{chapters.slice(0,index).map(c=><span key={c.id}>✦</span>)}</div>}
      <svg viewBox="0 0 650 440" role="img" aria-label={chapter.nodes.map(n=>n[lang]).join(" · ")}>
       <defs><radialGradient id="star-glow"><stop offset="0" stopColor="#fff8e4"/><stop offset=".15" stopColor="#ffad78" stopOpacity=".8"/><stop offset="1" stopColor="#f15a43" stopOpacity="0"/></radialGradient></defs>
       <g style={{transformOrigin:"50% 50%",transform:"translate("+(-departing*65)+"px,"+(-departing*15)+"px) scale("+zoom+")",opacity}}>
        <circle cx="330" cy="220" r="173" className="cosmos-orbit"/>
        <circle cx="330" cy="220" r="215" className="cosmos-orbit cosmos-orbit--outer"/>
        {points.slice(0,2).map((p,i)=><path key={i} d={"M "+p.join(" ")+" L "+points[i+1].join(" ")} pathLength="1" className="cosmos-thread" style={{strokeDashoffset:1-clamp((local-.2-i*.2)/.18)}}/>)}
        {index===5&&<path d="M 298 310 L 225 115" pathLength="1" className="cosmos-thread" style={{strokeDashoffset:1-clamp((local-.5)/.18)}}/>}
        {points.map(([x,y],i)=><g key={i} className={i<illuminated?"star is-lit":"star"} opacity={i<illuminated?1:.15}>
          <circle cx={x} cy={y} r={i<illuminated?36:5} fill={i<illuminated?"url(#star-glow)":"#e4d7c1"}/>
          <circle cx={x} cy={y} r="3" fill="#fff6e4"/>
          <path d={"M "+(x-9)+" "+y+" H "+(x+9)+" M "+x+" "+(y-9)+" V "+(y+9)} className="star-rays"/>
          <text x={x} y={y+37} textAnchor="middle">{chapter.nodes[i][lang]}</text>
        </g>)}
       </g>
       {departing>.05&&<g opacity={departing}><circle cx="330" cy="220" r={6+departing*24} fill="url(#star-glow)"/></g>}
      </svg>
      <p className="cosmos-map-caption">{lang?"滚动点亮星点，沿着连线进入下一层。":"Illuminate a star. Follow its connection. Enter the next layer."}</p>
     </div>
    </div>
    <div className="cosmos-bottom">
     <nav aria-label={lang?"故事章节":"Story chapters"}>{chapters.map((c,i)=><button key={c.id} type="button" aria-label={c.label[lang]} aria-current={i===index?"step":undefined} onClick={()=>goTo(i)}><span>{String(i+1).padStart(2,"0")}</span><i style={{transform:"scaleX("+clamp(position-i)+")"}}/></button>)}</nav>
     <span className="cosmos-scroll-hint">{lang?"向下探索 · 向上回溯":"SCROLL TO EXPLORE · REVERSE TO RETURN"}</span>
    </div>
   </div>
   <div className="cosmos-transcript">
    <h2 id="cosmos-transcript-title">{lang?"一条逐渐展开的线索":"Follow the thread"}</h2>
    {chapters.map((c,i)=><article key={c.id}><span className="cosmos-kicker">{String(i+1).padStart(2,"0")} / {c.year}</span><h3>{c.title[lang]}</h3><p>{c.body[lang]}</p><div>{c.nodes.map(n=><span key={n[0]}>✦ {n[lang]}</span>)}</div></article>)}
   </div>
  </section>
 );
}
