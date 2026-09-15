import { useState } from "react";
const groups=[
 {id:"research",title:["Research & analysis","研究与分析"],line:["Questions, models and interpretation.","问题、模型与解释。"]},
 {id:"systems",title:["Data & intelligent systems","数据与智能系统"],line:["Data foundations, software and workflows.","数据基础、软件与流程。"]},
 {id:"practice",title:["International drug safety practice","国际药物安全实践"],line:["Requirements, responsibilities and quality.","要求、责任与质量。"]},
];
const capabilities=[
 {id:"statistics",group:"research",title:["Statistical research & modeling","统计研究与建模"],body:["I connect research questions to data structures, model choices and interpretation. Bayesian and hierarchical models address latent processes and heterogeneity; longitudinal models address repeated observations; machine learning supports prediction and validation.","我将研究问题与数据结构、模型选择和结果解释联系起来。贝叶斯与层级模型用于研究潜在过程和异质性，纵向模型用于分析重复观测，机器学习用于预测与验证。"],evidence:["HDDM / HSSM · LMM / GLMM · SEM · ML","HDDM / HSSM · 混合效应模型 · SEM · 机器学习"],link:"#lab"},
 {id:"data-engineering",group:"systems",title:["Data engineering & analytical foundations","数据工程与分析基础设施"],body:["I build the database and analytical layers behind RWE work: multi-source ingestion, shared field definitions, terminology mapping, quality checks and reproducible transformations. Data structure is designed around the questions the analysis needs to answer.","我建设 RWE 工作所需的数据库与分析层：多来源接入、统一字段、术语映射、质量检查与可复现的数据处理。数据结构围绕实际分析问题设计。"],evidence:["RWE databases · Harmonization · Quality control","RWE 数据库 · 标准化 · 质量控制"],link:"#work"},
 {id:"ai-engineering",group:"systems",title:["AI applications & software engineering","AI 应用与软件工程"],body:["I use AI-assisted development to turn requirements into working software. Separately, I integrate LLMs into applications for evidence extraction, retrieval and structured outputs, with deterministic rules, exception handling and human review.","我通过 AI 辅助开发，把需求转化为可用软件；同时，将 LLM 接入应用，用于证据提取、检索和结构化输出，并与确定性规则、异常处理和人工复核相衔接。"],evidence:["Python · APIs · OCR / LLM · Web interfaces","Python · API · OCR / LLM · 网页应用"],link:"#ai-practice"},
 {id:"automation",group:"systems",title:["Workflow design & automation","业务流程设计与自动化"],body:["I break down roles, inputs, outputs and handoffs before implementing the flow. Feishu bots, APIs, tables, approval links, synchronization and scheduled notifications connect systems to the people using them.","我先拆解角色、输入输出与交接环节，再实现流程。通过飞书机器人、API、表格、审批关联、数据同步与定时通知，把系统接入实际协作。"],evidence:["Feishu · Integration · Workflow automation","飞书 · 系统集成 · 流程自动化"],link:"#ai-practice"},
 {id:"pv-operations",group:"practice",title:["International PV & regulatory operations","国际药物警戒与法规业务"],body:["I interpret overseas requirements, map responsibilities and translate them into operational work. PVA/SDEA coordination includes clause discussion, responsibility definition, signing follow-up and cross-market communication.","我解读海外要求、梳理责任，并将其转化为业务工作。PVA/SDEA 协调涵盖条款沟通、责任界定、签署跟进与跨市场协作。"],evidence:["GVP interpretation · PVA / SDEA · Coordination","GVP 解读 · PVA / SDEA · 国际协作"],link:"#business-practice"},
 {id:"quality",group:"practice",title:["Quality, audits & partner management","质量、审计与合作伙伴管理"],body:["My work includes overseas PV audits, findings and corrective-action follow-up, alongside vendor and agent coordination. The focus is how responsibilities are implemented, how quality is monitored and how issues reach closure.","我的工作涉及海外 PV 审计、发现记录与整改跟踪，以及供应商和代理商协调。重点在于责任如何落实、质量如何监督，以及问题如何形成闭环。"],evidence:["Overseas audits · CAPA · Vendor management","海外审计 · CAPA · 供应商管理"],link:"#business-practice"},
];
export function Expertise({language}){
 const [active,setActive]=useState("all");
 const l=language==="zh"?1:0;
 return <section id="capabilities" className="expertise section-pad section-paper">
  <div className="expertise-heading"><p className="section-number">{l?"能力图景 / 三个入口，六类能力":"THE PRACTICE / THREE PERSPECTIVES, SIX CAPABILITIES"}</p><h2>{l?"交叉的背景，有清晰的结构。":"An interdisciplinary background. A clear structure."}</h2><p>{l?"研究、系统与业务相互支撑。选择一个入口，查看相应能力；同一项目可以连接多个领域。":"Research, systems and practice support one another. Choose a perspective to explore the capabilities behind it; individual projects can connect several areas."}</p></div>
  <div className="perspective-picker" role="group" aria-label={l?"选择能力领域":"Choose a perspective"}>
   {groups.map((g,i)=><button type="button" key={g.id} aria-pressed={active===g.id} onClick={()=>setActive(active===g.id?"all":g.id)}><span>0{i+1}</span><strong>{g.title[l]}</strong><small>{g.line[l]}</small></button>)}
  </div>
  <button className="all-capabilities" type="button" onClick={()=>setActive("all")} aria-pressed={active==="all"}>{l?"查看全部六类能力":"View all six capabilities"} ↗</button>
  <p className="sr-only" role="status">{l?"当前显示":"Showing"} {capabilities.filter(c=>active==="all"||c.group===active).length} {l?"类能力":"capabilities"}</p>
  <div className="capability-grid">{capabilities.filter(c=>active==="all"||c.group===active).map(c=><article key={c.id}><p className="capability-number">{String(capabilities.indexOf(c)+1).padStart(2,"0")}</p><h3>{c.title[l]}</h3><p>{c.body[l]}</p><small>{c.evidence[l]}</small><a href={c.link}>{l?"查看相关实践":"Explore related work"} ↗</a></article>)}</div>
 </section>
}
export function AppliedPractice({language}){
 const l=language==="zh"?1:0;
 return <section id="ai-practice" className="applied-practice section-pad section-dark">
  <p className="section-number">{l?"应用 AI / 从业务问题到可用系统":"APPLIED AI / FROM A WORKFLOW TO A WORKING SYSTEM"}</p>
  <h2>{l?"理解业务，拆解流程，构建并验证。":"Understand the work. Build it. Verify it."}</h2>
  <p className="practice-lede">{l?"AI 辅助开发是我实现软件的一种方式。应用中的 LLM 则承担明确的功能，两者都需要对实际任务负责。":"AI-assisted development is part of how I implement software. LLMs inside the software perform specific tasks. Both are evaluated against the work they need to support."}</p>
  <div className="practice-flow">{[["01","Frame the work","明确业务问题"],["02","Structure the data","组织数据"],["03","Build & integrate","实现与集成"],["04","Validate & iterate","验证与迭代"]].map(s=><div key={s[0]}><span>{s[0]}</span><strong>{s[l+1]}</strong></div>)}</div>
  <div className="practice-columns"><article><h3>{l?"SDV：提取与核查":"SDV: extraction & review"}</h3><p>{l?"OCR 与 LLM 将文档转化为可追溯字段；身份匹配、一致性规则、异常分流与人工复核构成完整核查流程。":"OCR and LLMs turn documents into traceable fields. Identity matching, consistency rules, exception routing and human review form the surrounding workflow."}</p></article><article><h3>{l?"PV：信息与协作":"PV: information & coordination"}</h3><p>{l?"法规来源、协议责任和业务数据需要相互关联。平台功能与飞书机器人、API、同步和通知流程，共同支撑日常工作。":"Regulatory sources, agreement responsibilities and business data need to stay connected. Platform functionality, Feishu bots, APIs, synchronization and notifications support the daily workflow."}</p></article></div>
 </section>
}
export function BusinessPractice({language}){
 const l=language==="zh"?1:0;
 const cases=[
  {title:["Overseas audits & partner oversight","海外审计与合作伙伴管理"],question:["How are PV responsibilities being implemented across partner organizations?","合作伙伴如何在实际工作中落实 PV 职责？"],role:["Audit preparation and execution, findings documentation, corrective-action follow-up, and vendor/agent coordination.","审计准备与执行、发现记录、整改跟踪，以及供应商／代理商协调。"],evidence:["Responsibilities, findings, actions and follow-up status form the record of the work.","通过责任、发现、行动与跟进状态记录工作过程。"]},
  {title:["Regulatory interpretation & safety agreements","法规解读与药物警戒协议"],question:["How do requirements become clear, workable responsibilities across markets?","如何把各市场要求转化为清晰、可执行的责任？"],role:["Overseas GVP interpretation, requirement mapping, PVA/SDEA clause coordination and signing follow-up.","海外 GVP 解读、要求映射、PVA/SDEA 条款协调与签署跟进。"],evidence:["Source context, agreed responsibilities and unresolved questions remain explicit throughout coordination.","在协调过程中持续明确法规来源、约定责任与待解决问题。"]},
 ];
 return <section id="business-practice" className="business-practice section-pad section-paper"><p className="section-number">{l?"国际药物安全 / 业务与质量实践":"GLOBAL DRUG SAFETY / BUSINESS & QUALITY PRACTICE"}</p><h2>{l?"把要求变成责任，把责任落实到工作。":"Turning requirements into responsibilities—and practice."}</h2><div className="business-cases">{cases.map(c=><article key={c.title[0]}><h3>{c.title[l]}</h3><p>{c.question[l]}</p><h4>{l?"我的工作":"My work"}</h4><p>{c.role[l]}</p><h4>{l?"过程与证据":"Process & evidence"}</h4><p>{c.evidence[l]}</p></article>)}</div></section>
}
