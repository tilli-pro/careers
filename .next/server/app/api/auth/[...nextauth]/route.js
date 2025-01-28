(()=>{var e={};e.id=912,e.ids=[912],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},41790:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page-experimental.runtime.prod.js")},91936:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route-experimental.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},3716:()=>{},6810:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>S,routeModule:()=>E,serverHooks:()=>d,workAsyncStorage:()=>_,workUnitAsyncStorage:()=>l});var s={};t.r(s),t.d(s,{GET:()=>c,POST:()=>c});var i=t(1491),n=t(67380),a=t(88579),o=t(16573),u=t.n(o),p=t(23084);let c=u()(p.L),E=new i.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/auth/[...nextauth]/route",pathname:"/api/auth/[...nextauth]",filename:"route",bundlePath:"app/api/auth/[...nextauth]/route"},resolvedPagePath:"/home/runner/work/careers/careers/src/app/api/auth/[...nextauth]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:_,workUnitAsyncStorage:l,serverHooks:d}=E;function S(){return(0,a.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:l})}},78572:()=>{},13699:()=>{},1491:(e,r,t)=>{"use strict";e.exports=t(91936)},23084:(e,r,t)=>{"use strict";t.d(r,{L:()=>p,W:()=>c});var s=t(36176),i=t(16573),n=t(64668),a=t(3382),o=t(20588),u=t(20983);let p={callbacks:{session:({session:e,user:r})=>({...e,user:{...e.user,id:r.id}})},adapter:{...(0,s.N)(o.db),getUser:async e=>o.db.user.findUnique({where:{id:e},include:{hiringManager:!0,interviewer:!0,applicant:!0}})},providers:[(0,n.Z)({sendVerificationRequest:async({identifier:e,token:r})=>{(e.endsWith("@tilli.pro")||e.endsWith("@utilli.com"))&&(await E(e,r)?console.log("Email sent successfully"):console.log("Email failed to send"))},from:"career@tilli.pro"})],pages:{signIn:"/auth/sign-in",signOut:"/auth/sign-out",error:"/auth/error",verifyRequest:"/auth/otp",newUser:"/auth/create"}},c=()=>(0,i.getServerSession)(p),E=async(e,r)=>(0,u.b)({email:e},a.O.NUDGE_OTP_ID,{otp:r})},20588:(e,r,t)=>{"use strict";t.d(r,{db:()=>a});var s=t(53524),i=t(3382);let n=globalThis,a=n.prisma??new s.PrismaClient({});"production"!==i.O.NODE_ENV&&(n.prisma=a)},20983:(e,r,t)=>{"use strict";t.d(r,{b:()=>i});var s=t(3382);let i=async(e,r,t,i,n)=>{t=Array.isArray(t=t??[])?t:Object.entries(t).map(([e,r])=>({tagName:e,tagValue:r}));let a=[];if(i?.length)for(let e of i)a.push({content:Buffer.from(await e.arrayBuffer()).toString("base64"),mimeType:e.type,fileName:e.name});let o=await fetch("https://app.nudge.net/api/v2/Nudge/Send",{method:"POST",headers:{accept:"application/json","content-type":"application/json",authorization:s.O.NUDGE_API_KEY},body:JSON.stringify({nudgeId:r,toEmailAddress:e.email,toName:e.name,mergeTags:t,channel:0,emailCc:n?.emailCc,emailBcc:n?.emailBcc,emailAttachments:a})});if(o.status>=200&&o.status<=399){try{let e=await o.json();console.log(o.status,e)}catch(e){console.log(e)}return!0}try{let e=await o.json();console.log(o.status,e)}catch(e){console.log(e)}return!1}},3382:(e,r,t)=>{"use strict";t.d(r,{O:()=>n});var s=t(38802),i=t(36637);let n=(0,s.D)({server:{DATABASE_URL:i.z.string().url(),NODE_ENV:i.z.enum(["development","test","production"]).default("development"),NEXTAUTH_SECRET:i.z.string(),NEXTAUTH_URL:i.z.preprocess(e=>process.env.VERCEL_URL??e,process.env.VERCEL?i.z.string():i.z.string().url()),NUDGE_API_KEY:i.z.string(),NUDGE_OTP_ID:i.z.number(),NUDGE_SUBMIT_ID:i.z.number(),NUDGE_NOTIFY_ID:i.z.number(),HIRING_SUPER_EMAIL:i.z.string().email(),HIRING_SUPER_NAME:i.z.string(),AWS_REGION:i.z.string(),AWS_ACCESS_KEY_ID:i.z.string(),AWS_SECRET_ACCESS_KEY:i.z.string(),S3_BUCKET:i.z.string()},client:{},runtimeEnv:{DATABASE_URL:process.env.DATABASE_URL,NODE_ENV:"production",NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,NEXTAUTH_URL:process.env.NEXTAUTH_URL,NUDGE_API_KEY:process.env.NUDGE_API_KEY,NUDGE_OTP_ID:parseInt(process.env.NUDGE_OTP_ID??"0000",10),NUDGE_SUBMIT_ID:parseInt(process.env.NUDGE_SUBMIT_ID??"0000",10),NUDGE_NOTIFY_ID:parseInt(process.env.NUDGE_NOTIFY_ID??"0000",10),HIRING_SUPER_EMAIL:process.env.HIRING_SUPER_EMAIL,HIRING_SUPER_NAME:process.env.HIRING_SUPER_NAME,AWS_REGION:process.env.AWS_REGION,AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,S3_BUCKET:process.env.S3_BUCKET},skipValidation:!!process.env.SKIP_ENV_VALIDATION,emptyStringAsUndefined:!0})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[543],()=>t(6810));module.exports=s})();