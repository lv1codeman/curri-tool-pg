import{_ as F,u as z,k as B,n as x,E as D,c as U,a as n,b as a,w as o,U as P,r as c,z as y,o as C,d as u,f as h,g as O}from"./C5r524bu.js";import{V as j,g as R,a as q,b as W,c as X,d as $}from"./Cjt9B7t0.js";import{V as K}from"./rI5o8rN-.js";import{V as H}from"./BEAtVyrO.js";import{V as J}from"./CQN3Q_MW.js";import{V as f}from"./BXEFH6sP.js";import{V as v}from"./Bitbg23O.js";import{V as Q,a as g}from"./C7LHED88.js";import{V as T}from"./B92kFjt5.js";import"./DJ3CnaVN.js";import"./CEeC41he.js";import"./DtFG_KyT.js";import"./DrInFnf1.js";import"./DPBXQ3_f.js";import"./DuOlhAmy.js";import"./CSzqDGWj.js";import"./D6JWrHMy.js";import"./Dz5DXylH.js";import"./CV5SA1MJ.js";import"./ufGmr_k9.js";import"./BS_nsrhs.js";import"./DkuHFODj.js";import"./Dbq49kCv.js";import"./CgjkiN1U.js";import"./fhLkuaKZ.js";import"./CCrZtN6a.js";const Y=`輔一甲
特教一
教博一
復碩一
高照原民專班一
科博一
數一甲
物一甲
生一
化一
光博一
統資碩一
理學位碩一
科技機電產攜專班一
人管博一
車輛碩一
AI碩士學程一
智車一
技職碩一
英一
國一甲
地一
美一
科英碩一
翻譯碩一
台文碩一
歷碩一
機電一
電機一
電機博一
電子一
資工一
工學位碩一
資管一
會一甲
企管一
財金一
運一
運碩一
運健碩一
公育一
特殊學籍班(大學部)
特殊學籍學士班
特殊學籍碩博班
核心通識
物碩博
光電碩博
大三、四體育
歷大學
語文課
產業學士班
產業碩士班
地碩博
電機碩博
機電碩博
台碩博
國碩博
科技碩博
數碩博
科碩博
教碩博
輔導碩博

`,Z={class:"d-flex justify-center"},tt={class:"d-flex"},et={class:"conditional-area d-flex align-center"},at={class:"d-flex flex-column ga-5"},lt={__name:"ClassToOthers",setup(ot){const E=e=>e.replace(/\r/g,"").replace(/\uFEFF/g,"").trim(),p=c(new Map),r=c(""),d=c(""),s=c("系所簡稱"),m=c(!1),V=["系所簡稱","系所全名","學院簡稱","學院全名","系辦助理","系辦助理分機","系辦助理Email","課務承辦人","課務承辦人分機","課務承辦人Email"],{$curridataAPI:_}=z(),A=e=>{e.preventDefault();const t=e.clipboardData.getData("text");r.value=t.replace(/\r/g,"").replace(/\uFEFF/g,"").trim()},b=async()=>{try{await navigator.clipboard.writeText(d.value),m.value=!0}catch{alert("複製失敗")}},k=async()=>{try{await navigator.clipboard.writeText(Y),m.value=!0}catch{alert("複製失敗")}},w=()=>{r.value="",d.value=""},N=async()=>{const e=s.value==="系辦助理Email";s.value;const t=e?"AGENT_EMAIL":"CAGENT_EMAIL",l=r.value.split(`
`).map(I=>{const M=E(I);return p.value.get(M)?.[t]}).filter(Boolean),i=[...new Set(l)];await navigator.clipboard.writeText(i.join(`
`)),m.value=!0};B(async()=>{try{(await _.get("/get_all_data")).data.forEach(l=>{if(l.CLASS){const i=E(l.CLASS);p.value.set(i,l)}})}catch(e){console.error("載入失敗:",e),x("/login")}});const S={系所全名:e=>e.DEPT,系所簡稱:e=>e.DEPT_S,學院全名:e=>e.COLLEGE,學院簡稱:e=>e.COLLEGE_S,系辦助理:e=>e.AGENT_NAME,系辦助理分機:e=>e.AGENT_EXT,系辦助理Email:e=>e.AGENT_EMAIL,課務承辦人:e=>e.CAGENT_NAME,課務承辦人分機:e=>e.CAGENT_EXT,課務承辦人Email:e=>e.CAGENT_EMAIL},G=y(()=>{if(!r.value||!p.value.size)return"";const e=S[s.value];return r.value.split(`
`).map(t=>{const l=E(t),i=p.value.get(l);return i.length<=0&&x("/welcome"),i&&e(i)||"查無資料"}).join(`
`)});D(G,e=>{d.value=e});const L=y(()=>V.reduce((t,l)=>t.length>l.length?t:l).length*10+80);return(e,t)=>(C(),U("div",Z,[n("div",null,[t[12]||(t[12]=n("h1",null,"班級簡稱轉換(114以後)",-1)),n("div",tt,[a(j,{class:"my-2 my-card-wrapper",variant:"tonal",color:"indigo"},{default:o(()=>[a(R,null,{default:o(()=>[a(q,null,{default:o(()=>[...t[4]||(t[4]=[u("使用教學",-1)])]),_:1}),a(W,null,{default:o(()=>[...t[5]||(t[5]=[u("輸入限制：班級簡稱",-1)])]),_:1})]),_:1}),a(X,null,{default:o(()=>[...t[6]||(t[6]=[n("ul",null,[n("li",null," 在左輸入框貼上從Excel複製的班級簡稱，右邊輸入框會自動產出結果。 "),n("li",null,"貼上後想看不同結果可選擇下拉選項"),n("li",null,"可將結果複製貼回Excel中使用。")],-1)])]),_:1}),a($,null,{default:o(()=>[a(f,{color:"indigo-lighten-3 text-white",variant:"elevated",onClick:k},{default:o(()=>[t[7]||(t[7]=u(" 點我複製範例 ",-1)),a(v,{icon:"mdi-content-copy",end:""})]),_:1})]),_:1})]),_:1})]),n("div",et,[a(K,{modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=l=>s.value=l),class:"function-selector mt-4 listitemheight",items:V,label:"功能選擇",style:P({maxWidth:`${L.value}px`}),density:"comfortable"},null,8,["modelValue","style"])]),a(H,{id:"mpage",class:"px-0"},{default:o(()=>[a(Q,{"no-gutters":"",class:"align-center"},{default:o(()=>[a(g,{cols:"auto"},{default:o(()=>[a(T,{ref:"inputRef",modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=l=>r.value=l),class:"resizable-textarea text-right",label:"輸入框",onPaste:A},null,8,["modelValue"])]),_:1}),a(g,{cols:"auto",class:"px-2 pb-5"},{default:o(()=>[n("div",at,[s.value==="系辦助理Email"||s.value==="課務承辦人Email"?(C(),h(f,{key:0,color:"purple-lighten-3 text-grey-darken-4",onClick:N,variant:"elevated"},{default:o(()=>[t[8]||(t[8]=u(" Email ",-1)),a(v,{icon:"mdi-email-multiple-outline",end:""})]),_:1})):O("",!0),a(f,{color:"green-lighten-3 text-grey-darken-4",onClick:b},{default:o(()=>[t[9]||(t[9]=u(" Copy ",-1)),a(v,{icon:"mdi-content-copy",end:""})]),_:1}),a(f,{color:"blue-lighten-3 text-grey-darken-4",onClick:w},{default:o(()=>[t[10]||(t[10]=u(" Clear ",-1)),a(v,{icon:"mdi-close-circle-outline",end:""})]),_:1})])]),_:1}),a(g,{cols:"auto"},{default:o(()=>[a(T,{ref:"outputRef",modelValue:d.value,"onUpdate:modelValue":t[2]||(t[2]=l=>d.value=l),class:"resizable-textarea",label:"輸出框"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(J,{modelValue:m.value,"onUpdate:modelValue":t[3]||(t[3]=l=>m.value=l),timeout:2e3,color:"success",location:"bottom right"},{default:o(()=>[...t[11]||(t[11]=[u(" 已複製到剪貼簿 ",-1)])]),_:1},8,["modelValue"])])]))}},It=F(lt,[["__scopeId","data-v-dbaa437d"]]);export{It as default};
