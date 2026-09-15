import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, DownloadSimple, GithubLogo, LinkedinLogo, List, X, ChartLineUp, Code, ShieldCheck } from "@phosphor-icons/react";
import { translateContent, translateText } from "./site-language.js";
import { projects, methods, experiences, earlierFoundations, interests } from "./portfolio-data.js";
import Journey from "./Journey.jsx";
import PortfolioScene from "./PortfolioScene.jsx";

const covers = {
  "cross-regulatory-safety": { title:["Multi-source safety data","多来源安全数据"], image:"data-streams.webp", line:["Data foundation · Ongoing analysis","数据基础 · 持续分析"], link:"https://github.com/Unravelreggie/vaers-prototype" },
  "vaccine-modeling": { title:["Clinical statistical modeling","临床统计建模"], image:"model-distributions.webp", line:["Bayesian · Longitudinal · Machine learning","贝叶斯 · 纵向模型 · 机器学习"], link:"https://github.com/Unravelreggie/Hierarchical-Bayesian-Diffusion-Drift-Model-for-Working-Memory-Analysis" },
  "clinical-sdv": { title:["SDV review workflows","SDV 核查工作流"], image:"review-workflow.webp", line:["AI-assisted development · Pilot / UAT","AI 辅助开发 · 试点 / 用户验收"] }
};
const featuredIds = ["cross-regulatory-safety", "vaccine-modeling", "clinical-sdv"];
function ProjectDialog({project,language,onClose}) {
  const ref=useRef(null);
  const onCloseRef=useRef(onClose); onCloseRef.current=onClose;
  const t=x=>translateText(x,language);
  const pick=(en,zh)=>language==="zh"?zh:en;
  useEffect(()=>{
    const dialog=ref.current;
    if(!project)return;
    const opener=document.activeElement;
    dialog.showModal();
    document.body.classList.add("dialog-open");
    return()=>{dialog.close();document.body.classList.remove("dialog-open");opener?.focus({preventScroll:true});};
  },[project?.id]);
  if(!project)return null;
  const cover=covers[project.id];
  return <dialog ref={ref} className="project-dialog" aria-labelledby="case-title" onKeyDown={e=>{if(e.key!=="Tab")return; const items=[...ref.current.querySelectorAll("button, a[href]")]; const first=items[0],last=items[items.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}} onCancel={e=>{e.preventDefault();onCloseRef.current();}} onClick={e=>{if(e.target===ref.current)onCloseRef.current();}}>
    <div className="case-content">
      <button className="close-button" onClick={onClose} aria-label={pick("Close project","关闭项目")}><X size={24}/></button>
      <p className="eyebrow">{pick("PROJECT NOTES","项目说明")}</p>
      <h2 id="case-title">{project.title}</h2>
      <div className="case-meta"><span>{project.role}</span><span>{project.maturity}</span></div>
      {cover&&<div className="case-visual"><img src={"/assets/"+cover.image} alt="" width="640" height="360"/><small>{pick("Conceptual illustration · not project results","概念示意 · 非项目结果")}</small></div>}
      <p className="case-summary">{project.summary}</p>
      <div className="case-grid">{[
        ["QUESTION","研究或业务问题",project.question],["MY CONTRIBUTION","我的职责",project.ownership],
        ["METHOD & SYSTEM","方法与系统",project.method],["COLLABORATION","协作方式",project.collaboration],
        ["VALIDATION","验证与边界",project.validation],["VALUE","工作价值",project.value]
      ].map(([en,zh,text])=><section key={en}><h3>{pick(en,zh)}</h3><p>{text}</p></section>)}</div>
      {cover?.link&&<a className="text-link" href={cover.link} target="_blank" rel="noreferrer">{pick("Related public research / prototype — separate from this business project","相关公开研究／原型——与本业务项目独立")} <ArrowRight size={18}/></a>}
      <p className="small-note">{t("Public-safe overview. Patient-level data, company-confidential figures, and regulated records are not shown.")}</p>
    </div>
  </dialog>;
}

export function App() {
  const [language,setLanguage]=useState(()=>{try{return localStorage.getItem("unravel-language")==="zh"?"zh":"en";}catch{return "en";}});
  const [menu,setMenu]=useState(false);
  const [selectedId,setSelectedId]=useState(null);
  const [motion,setMotion]=useState(true);
  const hero=useRef(null),sceneControl=useRef(null);
  const l=language==="zh"?1:0;
  const pick=(en,zh)=>l?zh:en;
  const t=x=>translateText(x,language);
  const content=translateContent(projects,language);
  const history=translateContent(experiences,language);
  const methodContent=translateContent(methods,language);
  const personal=translateContent(interests,language);
  const cv="/assets/Xiaoyuan_Zhang_CV_2026_"+(l?"ZH":"EN")+".pdf?v=20260915";
  const startJourney=()=>{if(sceneControl.current?.serve)sceneControl.current.serve();else document.getElementById("constellation")?.scrollIntoView({behavior:!motion||matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});};
  const toggleMotion=()=>{
    const target=document.getElementById("constellation"),rect=target.getBoundingClientRect();
    const inJourney=rect.top<innerHeight&&rect.bottom>88;
    const stage=target.querySelector(".journey-scene");
    const articles=[...target.querySelectorAll(".journey-transcript article")];
    const chapter=articles.length?Math.max(0,articles.findIndex(a=>a.getBoundingClientRect().bottom>100)):Number(stage.dataset.stage||0);
    const enabling=!motion;
    setMotion(enabling);
    if(inJourney)requestAnimationFrame(()=>{
      const cards=target.querySelectorAll(".journey-transcript article");
      if(cards.length)cards[chapter]?.scrollIntoView({behavior:"instant",block:"start"});
      else {
        const inset=parseFloat(getComputedStyle(stage).top)||0;
        scrollTo({top:scrollY+target.getBoundingClientRect().top-inset+(target.offsetHeight-stage.offsetHeight)*(chapter+.1)/4,behavior:"instant"});
      }
    });
  };
  useEffect(()=>{
    document.documentElement.lang=l?"zh-CN":"en";
    document.title=pick("Xiaoyuan Zhang — Biostatistics, Data & International PV","张潇远 — 生物统计、数据与国际药物警戒");
    try{localStorage.setItem("unravel-language",language);}catch{}
  },[language]);
  const nav=[["work","Work","项目"],["constellation","Journey","探索"],["experience","About","经历"],["contact","Contact","联系"]];
  const navigate=()=>setMenu(false);
  return <>
    <a className="skip-link" href="#main-content">{pick("Skip to content","跳至正文")}</a>
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label={pick("Xiaoyuan Zhang — back to top","张潇远——返回首页")}><strong>UNRAVEL</strong><span>Xiaoyuan Zhang</span></a>
      <nav className="desktop-nav" aria-label={pick("Primary navigation","主导航")}>{nav.map(([id,en,zh])=><a key={id} href={"#"+id}>{pick(en,zh)}</a>)}</nav>
      <div className="header-actions"><div className="language-toggle" role="group" aria-label={pick("Language","语言")}><button onClick={()=>setLanguage("en")} aria-pressed={!l}>EN</button><span>/</span><button onClick={()=>setLanguage("zh")} aria-pressed={!!l}>中文</button></div><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-nav" aria-label={pick(menu?"Close navigation":"Open navigation",menu?"关闭导航":"打开导航")}>{menu?<X size={23}/>:<List size={23}/>}</button></div>
      {menu&&<nav id="mobile-nav" className="mobile-nav" aria-label={pick("Mobile navigation","移动端导航")}>{nav.map(([id,en,zh])=><a key={id} href={"#"+id} onClick={navigate}>{pick(en,zh)}</a>)}<a href={cv} target="_blank" rel="noreferrer" onClick={navigate}>{pick("View CV","查看简历")}</a></nav>}
    </header>
    <main id="main-content">
      <section id="top" className="hero cinema-hero" ref={hero}>
        <div className="hero-world" aria-hidden="true"><img className="terrace-backdrop" src="/assets/tennis-terrace.webp" alt="" width="1672" height="941" fetchPriority="high"/></div>
        <div className="hero-copy">
          <p className="eyebrow">{pick("BIOSTATISTICS · APPLIED AI · INTERNATIONAL PHARMACOVIGILANCE","生物统计 · AI 应用 · 国际药物警戒")}</p>
          <h1>{pick('Xiaoyuan “Reginald” Zhang',"张潇远 / Reginald")}</h1>
          <h2>{l?<><span>从问题出发，</span><span>让证据清晰。</span></>:<>Turning questions<br/>into evidence.</>}</h2>
          <p className="hero-intro">{pick("I bring statistical thinking, practical AI, and international drug-safety experience together to make complex work clearer and more usable.","我把统计思维、AI 应用与国际药物警戒实践结合起来，将复杂的问题转化为更清晰的分析和更可用的工具。")}</p>
          <div className="hero-actions"><a className="button primary" href="#work">{pick("Explore my work","查看代表项目")}<ArrowRight size={18}/></a><a className="button secondary" href={cv} target="_blank" rel="noreferrer">{pick("View CV","查看简历")}<DownloadSimple size={18}/></a></div>
          <p className="hero-credentials">{pick("MSPH Biostatistics · University of Miami  /  International PV · SINOVAC","迈阿密大学 MSPH 生物统计 / SINOVAC 科兴 · 国际 PV")}</p>
        </div>
        <button className="tennis-start" onClick={startJourney} aria-label={pick("Hit the tennis ball and explore the projects","击出网球，探索项目")}><span className="ball-hit-target"/><span className="ball-invitation">{pick("Give the ball a tap.","点一下网球，出发。")}<ArrowDown size={15}/></span></button>
        <div className="hero-bottom"><button className="follow-invitation" onClick={startJourney}>{pick("Follow the ball. Discover the work.","跟着球，走进我的项目。")}<ArrowDown size={17}/></button><button className="motion-toggle" aria-pressed={motion} onClick={toggleMotion}>{pick(motion?"Motion on":"Motion off",motion?"动效开启":"动效关闭")}</button></div>
      </section>

      <section id="work" className="selected-work section-wrap">
        <div className="section-head"><h2>{pick("Selected work","代表项目")}</h2><span className="section-rule"/><p>{pick("Questions. Methods. Something you can use.","从问题到方法，再到可用的成果。")}</p></div>
        <div className="featured-grid">{featuredIds.map((id,i)=>{
          const project=content.find(p=>p.id===id), cover=covers[id];
          return <article key={id} className="featured-project"><span className="project-index">0{i+1}</span><div><button className="project-title" onClick={()=>setSelectedId(id)}><h3>{cover.title[l]}</h3><ArrowRight size={22}/></button><p className="project-line">{cover.line[l]}</p><button className="project-art" onClick={()=>setSelectedId(id)} aria-label={pick("Read project: ","查看项目：")+cover.title[l]}><img src={"/assets/"+cover.image} alt="" loading="lazy" width="640" height="360"/></button><p className="project-role">{project.role}</p><p className="project-brief">{id==="cross-regulatory-safety"?pick("Bringing VAERS, CVAR, JADER and EudraVigilance into a traceable analytical foundation.","将 VAERS、CVAR、JADER 与 EudraVigilance 组织为可追溯的分析基础。"):id==="vaccine-modeling"?pick("Framing outcomes, building models and interpreting uncertainty across clinical datasets.","围绕临床数据定义结局、构建模型，并解释不确定性。"):pick("Turning source documents and CRA requirements into a reviewable consistency workflow.","将源文档与 CRA 核查需求，转化为可追溯的一致性核查流程。")}</p><button className="text-link" onClick={()=>setSelectedId(id)}>{pick("Role, methods & validation","职责、方法与验证")} <ArrowRight size={17}/></button></div></article>;
        })}</div>
        <p className="art-note">{pick("Illustrations are conceptual. Project notes describe current roles, collaboration and validation status.","插图为概念示意。项目说明列出当前职责、协作方式与验证状态。")}</p>
        <details className="more-work"><summary>{pick("More work: MedDRA assistance & regulatory intelligence","更多项目：MedDRA 编码辅助与法规情报")}</summary><div className="secondary-projects">{content.filter(p=>!featuredIds.includes(p.id)).map(p=><article key={p.id}><h3>{p.title}</h3><p>{p.summary}</p><small>{p.role} · {p.maturity}</small><button className="text-link" onClick={()=>setSelectedId(p.id)}>{pick("Read project notes","查看项目说明")} <ArrowRight size={17}/></button></article>)}</div></details>
      </section>

      <Journey language={language} motion={motion} paused={!!selectedId} onProject={setSelectedId} projects={content} cv={cv} onToggleMotion={toggleMotion}/>

      <section id="capabilities" className="approach section-wrap">
        <div className="section-head"><h2>{pick("How I work","我如何开展工作")}</h2><p>{pick("Three connected perspectives.","三种相互支撑的视角。")}</p></div>
        <div className="approach-grid">
          <article id="lab"><ChartLineUp size={30} weight="light"/><h3>{pick("Think statistically","用统计思考")}</h3><p>{pick("Start with the question, the data-generating process and the uncertainty. Choose a model for what it can explain.","从问题、数据产生过程与不确定性出发，选择适合回答问题的模型。")}</p><div className="method-list">{methodContent.map((m,i)=><details key={m.number}><summary>{["Bayesian & hierarchical models","Longitudinal & mixed models","Machine learning & validation"].map((x,j)=>j===i?pick(x,["贝叶斯与层级模型","纵向与混合效应模型","机器学习与验证"][j]):null)}</summary><p>{m.text}</p><small>{m.tools}</small></details>)}</div></article>
          <article id="ai-practice"><Code size={30} weight="light"/><h3>{pick("Build useful systems","构建可用系统")}</h3><p>{pick("Turn fragmented data and manual steps into coherent workflows, with review and feedback built in.","把分散的数据与手工步骤组织成完整流程，并让核查与反馈进入实际使用。")}</p><div className="method-list">
            <details><summary>{pick("Data engineering & RWE foundations","数据工程与 RWE 数据基础")}</summary><p>{pick("Database design, multi-source ingestion, terminology mapping, quality checks and reproducible transformations. I configure the technology around the analytical workflow.","数据库设计、多来源接入、术语映射、质量检查与可复现的数据处理；围绕分析流程配置和整合技术栈。")}</p></details>
            <details><summary>{pick("Applied AI & software development","AI 应用与软件开发")}</summary><p>{pick("AI-assisted coding helps me implement software. Inside applications, OCR, retrieval and LLMs perform defined tasks alongside rules, exception handling and human review.","我借助 AI 辅助编程实现软件；应用内部则用 OCR、检索与 LLM 承担具体任务，并结合规则、异常处理和人工复核。")}</p></details>
            <details><summary>{pick("Feishu bots & workflow automation","飞书机器人与流程自动化")}</summary><p>{pick("Map roles, inputs, outputs and handoffs; connect APIs, tables, approval references, synchronization and notifications to day-to-day work.","梳理角色、输入输出与交接环节，将 API、表格、审批关联、数据同步和通知接入日常协作。")}</p></details>
          </div></article>
          <article id="business-practice"><ShieldCheck size={30} weight="light"/><h3>{pick("Understand the practice","理解真实业务")}</h3><p>{pick("International PV makes the context tangible: local requirements, accountable partners and the quality of the underlying records.","国际药物警戒让我理解各地要求、合作伙伴职责，以及原始记录质量对实际工作的影响。")}</p><div className="method-list">
            <details><summary>{pick("Regulations & safety agreements","法规解读与安全性协议")}</summary><p>{pick("Overseas GVP research and interpretation; PVA/SDEA clause discussion, responsibility mapping and signing follow-up. Material interpretations remain source-grounded and professionally reviewed.","海外 GVP 研究与解读；PVA/SDEA 条款沟通、责任梳理与签署跟进。关键解释保留来源，并交由相关专业人员复核。")}</p></details>
            <details><summary>{pick("Overseas audits & partner oversight","海外审计与合作伙伴管理")}</summary><p>{pick("Audit preparation and execution, findings and corrective-action follow-up, plus international PV vendor and agent coordination.","审计准备与执行、发现记录与整改跟踪，以及国际 PV 供应商和代理商协调。")}</p></details>
            <details><summary>{pick("Clinical & post-market data quality","临床与上市后数据质量")}</summary><p>{pick("GCP and GVP connect reliable source records, clear responsibilities and human review across the evidence lifecycle.","GCP 与 GVP 将可靠的源记录、清晰的职责和人工复核，贯穿临床及上市后的证据工作。")}</p></details>
          </div></article>
        </div>
      </section>


      <section id="experience" className="experience section-wrap">
        <div className="section-head"><h2>{pick("A path across disciplines","跨学科的成长路径")}</h2><a href={cv} className="text-link" target="_blank" rel="noreferrer">{pick("Full CV","完整简历")} <ArrowRight size={18}/></a></div>
        <div className="experience-layout"><div className="education"><p className="eyebrow">{pick("EDUCATION","教育背景")}</p><h3>University of Miami</h3><p>{pick("MSPH · Biostatistics","MSPH · 生物统计")}<br/>2023–2025</p><h3>Rutgers University</h3><p>{pick("BA · Philosophy, Psychology & Cognitive Science","BA · 哲学、心理学与认知科学")}<br/>2017–2021</p></div><div className="experience-rows">{history.slice(0,2).map(e=><article key={e.id}><p className="experience-date">{e.period}</p><h3>{e.company}</h3><p className="experience-role">{e.role}</p><p>{e.summary}</p></article>)}<details className="earlier-roles"><summary>{pick("Earlier experience · Clinical research, medical NLP & operations","早期经历 · 临床研究、医学 NLP 与运营")}</summary>{history.slice(2).map(e=><article key={e.id}><small>{e.period}</small><h3>{e.company}</h3><p className="experience-role">{e.role}</p><p>{e.summary}</p></article>)}{translateContent(earlierFoundations,language).map(e=><article key={e.id}><small>{e.year}</small><h3>{e.title}</h3><p>{e.detail}</p></article>)}</details></div></div>
      </section>

      <section id="open-research" className="open-research section-wrap"><div className="section-head"><h2>{pick("Research you can explore","可以查看的研究")}</h2><GithubLogo size={28}/></div><div className="research-grid">{[
        ["Hierarchical-Bayesian-Diffusion-Drift-Model-for-Working-Memory-Analysis","Bayesian models of working memory","工作记忆的贝叶斯建模","HDDM / HSSM","Public research code linking response times and accuracy to latent decision processes.","以反应时和准确率研究潜在决策过程的公开代码。"],
        ["HIV_SETA_SEM","Relationships, made explicit","把变量关系明确表达出来","R · lavaan · SEM","Path analysis and structural equation modeling of hypothesized relationships.","利用路径分析与结构方程模型，表达并估计假设中的变量关系。"],
        ["vaers-prototype","Exploring public safety reports","探索公开安全性报告","DuckDB · Streamlit · VAERS","A public prototype for report exploration and disproportionality summaries; separate from the current business system.","用于报告探索与不成比例分析摘要的公开原型，与当前业务系统独立。"]
      ].map(([repo,en,zh,tags,body,bzh])=><a className="research-link" key={repo} href={"https://github.com/Unravelreggie/"+repo} target="_blank" rel="noreferrer"><small>{tags}</small><h3>{pick(en,zh)}</h3><p>{pick(body,bzh)}</p><span>{pick("Explore code","查看代码")} <ArrowRight size={18}/></span></a>)}</div><p className="small-note">{pick("Spontaneous-reporting patterns do not establish incidence or causality.","自发报告模式不能作为发生率或因果关系的结论。")}</p></section>

      <section id="next" className="next-chapter section-wrap"><div><p className="eyebrow">{pick("LOOKING AHEAD","未来拓展方向")}</p><h2>{pick("The next questions I want to explore.","下一步，希望深入的问题。")}</h2></div><div><h3>{pick("Pharmacovigilance signal analysis & drug safety data analytics","药物警戒信号分析与药物安全性数据分析")}</h3><p>{pick("This is the direction I want to grow into. I hope to build on my biostatistics training, safety-data work and international PV experience to develop deeper expertise in signal analysis and the interpretation of safety evidence.","这是我希望进一步拓展的方向。我希望以生物统计训练、安全数据建设与国际 PV 实践为基础，逐步深入信号分析与安全性证据的解释。")}</p><a className="text-link" href="mailto:reggiezhang9719@gmail.com">{pick("Open to a conversation","欢迎交流")} <ArrowRight size={18}/></a></div></section>

      <section id="off-hours" className="off-hours section-wrap"><div className="section-head"><h2>{pick("Beyond the work","工作之外")}</h2><p>{pick("Still learning. Still curious.","保持好奇，也保持生活的热度。")}</p></div><div className="personal-grid">{personal.map(item=>{const Icon=item.icon;return <article key={item.id}><Icon size={25} weight="light"/><h3>{item.title}</h3><p>{item.body}</p></article>;})}</div></section>

      <footer id="contact" className="site-footer section-wrap"><div><a className="wordmark" href="#top"><strong>UNRAVEL</strong><span>Xiaoyuan Zhang · 张潇远</span></a><p>{pick("Good questions are a good place to start.","好的问题，值得一起聊聊。")}</p></div><div className="footer-links"><a href="mailto:reggiezhang9719@gmail.com">Email <ArrowRight size={17}/></a><a href="https://github.com/Unravelreggie" target="_blank" rel="noreferrer">GitHub <GithubLogo size={19}/></a><a href="https://www.linkedin.com/in/xiaoyuan-zhang-4a4999352" target="_blank" rel="noreferrer">LinkedIn <LinkedinLogo size={19}/></a><a href={cv} target="_blank" rel="noreferrer">{pick("View CV","查看简历")} <DownloadSimple size={18}/></a></div><p className="footer-note">© 2026 Xiaoyuan Zhang <a href="https://github.com/Unravelreggie/Unravelreggie.github.io" target="_blank" rel="noreferrer">{pick("Website source","网站源码")}</a></p></footer>
    </main>
    <PortfolioScene motion={motion} paused={!!selectedId} controllerRef={sceneControl}/>
    <ProjectDialog project={content.find(p=>p.id===selectedId)} language={language} onClose={()=>setSelectedId(null)}/>
  </>;
}
