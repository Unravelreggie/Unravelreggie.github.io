const base = "https://github.com/Unravelreggie/";
const research = [
  { path: "Hierarchical-Bayesian-Diffusion-Drift-Model-for-Working-Memory-Analysis", method: "BAYESIAN · HDDM", title: ["Working memory, beyond accuracy", "工作记忆：从准确率到潜在机制"], text: ["Hierarchical drift diffusion models connect response times and accuracy to latent decision processes. Public research code.", "以分层漂移扩散模型连接反应时、准确率与潜在决策过程。公开研究代码。"] },
  { path: "HIV_SETA_SEM", method: "STRUCTURAL EQUATION MODELING · R", title: ["Making relationships explicit", "把变量关系明确地表达出来"], text: ["Path analysis with lavaan: expressing and estimating a hypothesized structure of relationships. Public analysis code.", "使用 lavaan 进行路径分析，表达并估计假设中的变量关系结构。公开分析代码。"] },
  { path: "vaers-prototype", method: "DUCKDB · STREAMLIT · SAFETY DATA", title: ["A first lens on public safety reports", "探索公开安全性报告"], text: ["Explore VAERS reports and disproportionality summaries. A public prototype; reporting patterns do not establish incidence or causality.", "探索 VAERS 报告与不成比例分析摘要。公开原型；报告模式不能作为发生率或因果关系的结论。"] },
];
const connected = {
  "vaccine-modeling": [["Statistical modeling", "统计建模"], ["Clinical evidence", "临床证据"]],
  "cross-regulatory-safety": [["Data engineering", "数据工程"], ["Statistical analysis", "统计分析"], ["Drug safety", "药物安全"]],
  "meddra-operations": [["AI applications", "AI 应用"], ["Workflow design", "流程设计"], ["PV operations", "PV 业务"]],
  "international-gvp": [["Regulatory research", "法规研究"], ["AI retrieval", "AI 检索"]],
  "clinical-sdv": [["Software engineering", "软件工程"], ["AI applications", "AI 应用"], ["Data quality", "数据质量"]],
};
export function CapabilityTags({ id, language }) {
  return <div className="capability-tags" aria-label={language === "zh" ? "关联能力" : "Connected capabilities"}>{(connected[id] || []).map(pair => <span key={pair[0]}>{pair[language === "zh" ? 1 : 0]}</span>)}</div>;
}
export default function OpenResearch({ language }) {
  const l = language === "zh" ? 1 : 0;
  return <section id="open-research" className="open-research section-dark section-pad">
    <div className="section-heading light"><p className="section-number">{l ? "公开研究 / 可查看的代码" : "OPEN RESEARCH / CODE YOU CAN EXPLORE"}</p>
      <h2>{l ? "方法，也有具体的作品。" : "Methods, with work behind them."}</h2>
      <p>{l ? "从贝叶斯模型、结构方程到公开安全数据。这些独立仓库展示研究与原型工作，不代表当前业务系统的完整实现。" : "From Bayesian models and structural equations to public safety data. These repositories document research and prototype work, separate from the current business systems."}</p>
    </div>
    <div className="research-links">{research.map(item => <a key={item.path} href={base + item.path} target="_blank" rel="noreferrer">
      <small>{item.method}</small><h3>{item.title[l]}</h3><p>{item.text[l]}</p><span>{l ? "查看 GitHub 仓库 ↗" : "Explore repository ↗"}</span>
    </a>)}</div>
  </section>;
}
