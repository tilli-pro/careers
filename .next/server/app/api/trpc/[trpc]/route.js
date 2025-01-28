(()=>{var e={};e.id=649,e.ids=[649],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},41790:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page-experimental.runtime.prod.js")},91936:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route-experimental.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},3716:()=>{},481:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>S,routeModule:()=>m,serverHooks:()=>y,workAsyncStorage:()=>A,workUnitAsyncStorage:()=>h});var s={};t.r(s),t.d(s,{GET:()=>g,POST:()=>g});var n=t(1491),i=t(67380),a=t(88579),o=t(51746),u=t(56158);t(62823);let c=e=>e=(e=e.startsWith("/")?e.slice(1):e).endsWith("/")?e.slice(0,-1):e;async function l(e){let r=new Headers,t=async t=>e.createContext?.({req:e.req,resHeaders:r,...t}),s=c((0,u.j)(e.req.url).pathname),n=c(e.endpoint),i=c(s.slice(n.length));return await (0,o.e)({...e,req:e.req,createContext:t,path:i,error:null,onError(r){e?.onError?.({...r,req:e.req})},responseMeta(t){let s=e.responseMeta?.(t);if(s?.headers){if(s.headers instanceof Headers)for(let[e,t]of s.headers.entries())r.append(e,t);else for(let[e,t]of Object.entries(s.headers))if(Array.isArray(t))for(let s of t)r.append(e,s);else"string"==typeof t&&r.set(e,t)}return{headers:r,status:s?.status}}})}var p=t(3382),d=t(8548),E=t(55309);let _=async e=>(0,E.uw)({headers:e.headers}),g=e=>l({endpoint:"/api/trpc",req:e,router:d.q,createContext:()=>_(e),onError:"development"===p.O.NODE_ENV?({path:e,error:r})=>{console.error(`❌ tRPC failed on ${e??"<no-path>"}: ${r.message}`)}:void 0}),m=new n.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/trpc/[trpc]/route",pathname:"/api/trpc/[trpc]",filename:"route",bundlePath:"app/api/trpc/[trpc]/route"},resolvedPagePath:"/home/runner/work/careers/careers/src/app/api/trpc/[trpc]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:A,workUnitAsyncStorage:h,serverHooks:y}=m;function S(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:h})}},78572:()=>{},13699:()=>{},1491:(e,r,t)=>{"use strict";e.exports=t(91936)},8548:(e,r,t)=>{"use strict";t.d(r,{d:()=>a,q:()=>i});var s=t(35606),n=t(55309);let i=(0,n.hA)({post:s.F}),a=(0,n.bn)(i)},35606:(e,r,t)=>{"use strict";t.d(r,{F:()=>d,M:()=>p});var s=t(47608),n=t(53524),i=t(36637),a=t(55309),o=t(20588);let u={department:!0,location:!0,hiringManager:{include:{user:!0}},questions:!0},c=i.z.object({location:i.z.string().optional(),department:i.z.string().optional()});n.Prisma.validator();let l=(0,s.unstable_cache)(async e=>o.db.jobPosting.findFirst({where:{slug:e},include:u}),["jobPosting"],{revalidate:3600}),p=(0,s.unstable_cache)(async()=>o.db.jobPosting.findMany({include:u}),["jobPostingAll"],{revalidate:3600}),d=(0,a.hA)({all:a.$y.input(c.optional()).query(async({ctx:e,input:r={}})=>{let{location:t,department:s}=r,n=await p();return t||s?n.filter(e=>(!t||e.location.slug===t)&&(!s||e.department.slug===s)):n}),count:a.$y.query(async()=>(await p()).length),bySlug:a.$y.input(i.z.object({slug:i.z.string()})).query(async({ctx:e,input:r})=>l(r.slug)),allDepartments:a.$y.query(async({ctx:e})=>e.db.department.findMany({include:{_count:!0}})),allLocations:a.$y.query(async({ctx:e})=>e.db.jobLocation.findMany({include:{_count:!0}}))})},55309:(e,r,t)=>{"use strict";t.d(r,{$y:()=>E,bn:()=>l,hA:()=>p,uw:()=>u});var s=t(84643),n=t(86873),i=t(36637),a=t(23084),o=t(20588);let u=async e=>{let r=await (0,a.W)();return{db:o.db,session:r,...e}},c=s.rN.context().create({transformer:n.ZP,errorFormatter:({shape:e,error:r})=>({...e,data:{...e.data,zodError:r.cause instanceof i.jm?r.cause.flatten():null}})}),l=c.createCallerFactory,p=c.router,d=c.middleware(async({next:e,path:r})=>{let t=Date.now();if(c._config.isDev){let e=Math.floor(400*Math.random())+100;await new Promise(r=>setTimeout(r,e))}let s=await e(),n=Date.now();return console.log(`[TRPC] ${r} took ${n-t}ms to execute`),s}),E=c.procedure.use(d);c.procedure.use(d).use(({ctx:e,path:r,next:t})=>{if(!e.session||!e.session.user)throw new s.bR({code:"UNAUTHORIZED"});return t({ctx:{session:{...e.session,user:e.session.user,path:r}}})}),c.procedure.use(d).use(async({ctx:e,next:r})=>{if(!e.session||!e.session.user||e.session.user?.interviewer===null&&e.session.user?.hiringManager===null)throw new s.bR({code:"UNAUTHORIZED"});return r({ctx:{session:{...e.session,user:e.session.user}}})})},23084:(e,r,t)=>{"use strict";t.d(r,{L:()=>c,W:()=>l});var s=t(36176),n=t(16573),i=t(64668),a=t(3382),o=t(20588),u=t(20983);let c={callbacks:{session:({session:e,user:r})=>({...e,user:{...e.user,id:r.id}})},adapter:{...(0,s.N)(o.db),getUser:async e=>o.db.user.findUnique({where:{id:e},include:{hiringManager:!0,interviewer:!0,applicant:!0}})},providers:[(0,i.Z)({sendVerificationRequest:async({identifier:e,token:r})=>{(e.endsWith("@tilli.pro")||e.endsWith("@utilli.com"))&&(await p(e,r)?console.log("Email sent successfully"):console.log("Email failed to send"))},from:"career@tilli.pro"})],pages:{signIn:"/auth/sign-in",signOut:"/auth/sign-out",error:"/auth/error",verifyRequest:"/auth/otp",newUser:"/auth/create"}},l=()=>(0,n.getServerSession)(c),p=async(e,r)=>(0,u.b)({email:e},a.O.NUDGE_OTP_ID,{otp:r})},20588:(e,r,t)=>{"use strict";t.d(r,{db:()=>a});var s=t(53524),n=t(3382);let i=globalThis,a=i.prisma??new s.PrismaClient({});"production"!==n.O.NODE_ENV&&(i.prisma=a)},20983:(e,r,t)=>{"use strict";t.d(r,{b:()=>n});var s=t(3382);let n=async(e,r,t,n,i)=>{t=Array.isArray(t=t??[])?t:Object.entries(t).map(([e,r])=>({tagName:e,tagValue:r}));let a=[];if(n?.length)for(let e of n)a.push({content:Buffer.from(await e.arrayBuffer()).toString("base64"),mimeType:e.type,fileName:e.name});let o=await fetch("https://app.nudge.net/api/v2/Nudge/Send",{method:"POST",headers:{accept:"application/json","content-type":"application/json",authorization:s.O.NUDGE_API_KEY},body:JSON.stringify({nudgeId:r,toEmailAddress:e.email,toName:e.name,mergeTags:t,channel:0,emailCc:i?.emailCc,emailBcc:i?.emailBcc,emailAttachments:a})});if(o.status>=200&&o.status<=399){try{let e=await o.json();console.log(o.status,e)}catch(e){console.log(e)}return!0}try{let e=await o.json();console.log(o.status,e)}catch(e){console.log(e)}return!1}},3382:(e,r,t)=>{"use strict";t.d(r,{O:()=>i});var s=t(38802),n=t(36637);let i=(0,s.D)({server:{DATABASE_URL:n.z.string().url(),NODE_ENV:n.z.enum(["development","test","production"]).default("development"),NEXTAUTH_SECRET:n.z.string(),NEXTAUTH_URL:n.z.preprocess(e=>process.env.VERCEL_URL??e,process.env.VERCEL?n.z.string():n.z.string().url()),NUDGE_API_KEY:n.z.string(),NUDGE_OTP_ID:n.z.number(),NUDGE_SUBMIT_ID:n.z.number(),NUDGE_NOTIFY_ID:n.z.number(),HIRING_SUPER_EMAIL:n.z.string().email(),HIRING_SUPER_NAME:n.z.string(),AWS_REGION:n.z.string(),AWS_ACCESS_KEY_ID:n.z.string(),AWS_SECRET_ACCESS_KEY:n.z.string(),S3_BUCKET:n.z.string()},client:{},runtimeEnv:{DATABASE_URL:process.env.DATABASE_URL,NODE_ENV:"production",NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,NEXTAUTH_URL:process.env.NEXTAUTH_URL,NUDGE_API_KEY:process.env.NUDGE_API_KEY,NUDGE_OTP_ID:parseInt(process.env.NUDGE_OTP_ID??"0000",10),NUDGE_SUBMIT_ID:parseInt(process.env.NUDGE_SUBMIT_ID??"0000",10),NUDGE_NOTIFY_ID:parseInt(process.env.NUDGE_NOTIFY_ID??"0000",10),HIRING_SUPER_EMAIL:process.env.HIRING_SUPER_EMAIL,HIRING_SUPER_NAME:process.env.HIRING_SUPER_NAME,AWS_REGION:process.env.AWS_REGION,AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,S3_BUCKET:process.env.S3_BUCKET},skipValidation:!!process.env.SKIP_ENV_VALIDATION,emptyStringAsUndefined:!0})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[543,548],()=>t(481));module.exports=s})();