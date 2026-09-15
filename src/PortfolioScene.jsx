import { useEffect, useRef } from "react";
export default function PortfolioScene({motion, paused, controllerRef}) {
 const host=useRef(null), engine=useRef(null), inputs=useRef({motion,paused});
 inputs.current={motion,paused};
 useEffect(()=>{
  let ended=false;
  import("./scene/PortfolioEngine.js").then(({createPortfolioEngine})=>{
   if(ended)return;
   engine.current=createPortfolioEngine(host.current,()=>inputs.current);
   controllerRef.current=engine.current;
  }).catch(()=>{document.documentElement.dataset.scene="fallback";});
  return()=>{ended=true;engine.current?.dispose();controllerRef.current=null;};
 },[controllerRef]);
 useEffect(()=>{engine.current?.invalidate?.();},[motion,paused]);
 return <div ref={host} className="portfolio-canvas" aria-hidden="true"/>;
}
