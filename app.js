const SUBJECTS=[
 {name:"Mathematics",icon:"∑",tone:"blue",count:"Numbers, algebra & more"},
 {name:"English",icon:"A",tone:"purple",count:"Grammar, reading & writing"},
 {name:"Kiswahili",icon:"あ",tone:"orange",count:"Sarufi, msamiati na zaidi"},
 {name:"Integrated Science",icon:"⚗",tone:"green",count:"Living things & materials"},
 {name:"Social Studies",icon:"◎",tone:"teal",count:"People, places & history"},
 {name:"Agriculture & Nutrition",icon:"♧",tone:"lime",count:"Farming, food & nutrition"},
 {name:"Pre-Technical Studies",icon:"⚙",tone:"slate",count:"Tools, design & safety"},
 {name:"Creative Arts & Sports",icon:"✦",tone:"pink",count:"Art, music & movement"},
 {name:"Religious Education",icon:"✧",tone:"gold",count:"Values, faith & society"}
];
const QUESTIONS=[
 {s:"Mathematics",t:"Integers",q:"What is −5 + 8?",o:["−13","3","−3","13"],a:1,e:"Start at −5 on a number line and move 8 steps to the right. You land on 3."},
 {s:"Mathematics",t:"Fractions",q:"What is 1/2 + 1/4?",o:["2/6","3/4","1/8","1/2"],a:1,e:"Change 1/2 to 2/4. Then 2/4 + 1/4 = 3/4."},
 {s:"English",t:"Parts of Speech",q:"Which word is an adjective in this sentence: “The tall boy ran”?",o:["boy","ran","tall","the"],a:2,e:"An adjective describes a noun. “Tall” describes the boy."},
 {s:"Kiswahili",t:"Msamiati",q:"Kinyume cha neno “mrefu” ni nini?",o:["mfupi","mnene","mkubwa","mzuri"],a:0,e:"Kinyume cha mrefu ni mfupi."},
 {s:"Integrated Science",t:"Cells",q:"What is the basic unit of life?",o:["Tissue","Organ","Cell","Atom"],a:2,e:"All living things are made of cells. The cell is the basic unit of life."},
 {s:"Social Studies",t:"Kenya",q:"What is the capital city of Kenya?",o:["Mombasa","Kisumu","Nakuru","Nairobi"],a:3,e:"Nairobi is the capital city of Kenya."},
 {s:"Agriculture & Nutrition",t:"Nutrition",q:"Which nutrient helps the body grow and repair itself?",o:["Carbohydrates","Proteins","Fats","Water"],a:1,e:"Proteins help the body build and repair tissues."},
 {s:"Pre-Technical Studies",t:"Tools and Safety",q:"Which tool is used to drive a nail into wood?",o:["Saw","Hammer","Plane","Chisel"],a:1,e:"A hammer is used to drive nails into wood."},
 {s:"Creative Arts & Sports",t:"Art",q:"Mixing blue and yellow paint makes which colour?",o:["Orange","Purple","Brown","Green"],a:3,e:"Blue and yellow paint mix to make green."},
 {s:"Religious Education",t:"Bible Knowledge",q:"Which book begins the Bible?",o:["Exodus","Genesis","Psalms","Matthew"],a:1,e:"Genesis is the first book of the Bible."}
];
const $=id=>document.getElementById(id);
let currentQuestions=[],questionIndex=0,score=0,answered=false,lastSubject=null;
const readHistory=()=>{try{return JSON.parse(localStorage.getItem("darasani-history")||"[]")}catch{return[]}};
function saveResult(subject,percent,correct,total){const h=readHistory();h.unshift({subject,percent,correct,total,date:new Date().toISOString()});localStorage.setItem("darasani-history",JSON.stringify(h.slice(0,20)));renderStats()}
function renderStats(){const h=readHistory();$("quizCount").textContent=h.length;$("averageScore").textContent=h.length?Math.round(h.reduce((n,x)=>n+x.percent,0)/h.length)+"%":"—";$("streak").textContent=h.length?1:0;const history=$("history");history.innerHTML=h.length?h.slice(0,5).map(x=>`<div class="history-item"><span>${escapeHtml(x.subject)}<small>${new Date(x.date).toLocaleDateString()}</small></span><b>${x.percent}%</b></div>`).join(""):'Your completed quizzes will appear here.'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderSubjects(filter=""){$("subjectGrid").innerHTML=SUBJECTS.filter(s=>s.name.toLowerCase().includes(filter.toLowerCase())).map((s,i)=>`<button class="subject-card" data-subject="${escapeHtml(s.name)}"><span class="subject-icon ${s.tone}">${s.icon}</span><strong>${escapeHtml(s.name)}</strong><small>${s.count}</small></button>`).join("");document.querySelectorAll("[data-subject]").forEach(b=>b.addEventListener("click",()=>startQuiz(b.dataset.subject)))}
function showView(id){["studentView","teacherView","quizView","resultView"].forEach(v=>$(v).classList.toggle("hidden",v!==id));window.scrollTo({top:0,behavior:"smooth"})}
function startQuiz(subject){lastSubject=subject;currentQuestions=subject==="Mixed subjects"?QUESTIONS.slice(0,5):QUESTIONS.filter(q=>q.s===subject);if(!currentQuestions.length){toast("More questions for this learning area are coming soon.");return}currentQuestions=currentQuestions.slice(0,5);questionIndex=0;score=0;showView("quizView");$("quizTitle").textContent=subject==="Mixed subjects"?"Quick mixed quiz":subject+" practice";$("quizSubject").textContent="GRADE 7 • PRACTICE";renderQuestion()}
function renderQuestion(){answered=false;const q=currentQuestions[questionIndex];$("questionCounter").textContent=`${questionIndex+1} / ${currentQuestions.length}`;$("questionNumber").textContent=String(questionIndex+1).padStart(2,"0");$("questionText").textContent=q.q;$("progressBar").style.width=`${(questionIndex/currentQuestions.length)*100}%`;$("answers").innerHTML=q.o.map((o,i)=>`<button class="answer-btn" data-answer="${i}"><b>${String.fromCharCode(65+i)}.</b> ${escapeHtml(o)}</button>`).join("");$("explanation").classList.add("hidden");$("nextQuestion").disabled=true;$("nextQuestion").textContent=questionIndex===currentQuestions.length-1?"See results →":"Next question →";document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>chooseAnswer(Number(b.dataset.answer))))}
function chooseAnswer(choice){if(answered)return;answered=true;const q=currentQuestions[questionIndex];if(choice===q.a)score++;document.querySelectorAll("[data-answer]").forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct");else if(i===choice)b.classList.add("incorrect")});$("explanation").textContent=(choice===q.a?"Correct! ":"Not quite. ")+q.e;$("explanation").classList.remove("hidden");$("nextQuestion").disabled=false;$("progressBar").style.width=`${((questionIndex+1)/currentQuestions.length)*100}%`}
function finishQuiz(){const pct=Math.round(score/currentQuestions.length*100);saveResult(lastSubject||"Mixed subjects",pct,score,currentQuestions.length);$("resultScore").textContent=pct+"%";$("resultTitle").textContent=pct>=80?"Excellent work!":pct>=50?"Good effort!":"Keep practising!";$("resultMessage").textContent=`You answered ${score} out of ${currentQuestions.length} questions correctly. Review the explanations and try again.`;showView("resultView")}
function toast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2500)}
document.querySelectorAll(".role-tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".role-tab").forEach(x=>x.classList.toggle("active",x===b));showView(b.dataset.role==="student"?"studentView":"teacherView")}));
$("subjectSearch").addEventListener("input",e=>renderSubjects(e.target.value));
$("dailyQuiz").addEventListener("click",()=>startQuiz("Mixed subjects"));
$("nextQuestion").addEventListener("click",()=>{if(!answered)return;if(questionIndex<currentQuestions.length-1){questionIndex++;renderQuestion()}else finishQuiz()});
$("backHome").addEventListener("click",()=>showView("studentView"));
$("quitQuiz").addEventListener("click",()=>showView("studentView"));
$("resultHome").addEventListener("click",()=>showView("studentView"));
$("retryQuiz").addEventListener("click",()=>startQuiz(lastSubject||"Mixed subjects"));
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("darasani-theme",document.body.classList.contains("dark")?"dark":"light")});
$("profileBtn").addEventListener("click",()=>toast("Learner profile and accounts will be added in a later release."));
document.querySelectorAll("[data-teacher-action]").forEach(b=>b.addEventListener("click",()=>toast(({assessment:"Assessment builder is planned for the teacher release.",questions:"The sample question bank is included in this preview.",reports:"Reports currently show activity saved on this device.",resources:"Teacher learning resources are planned for the next release."})[b.dataset.teacherAction])));
if(localStorage.getItem("darasani-theme")==="dark")document.body.classList.add("dark");
renderSubjects();renderStats();
