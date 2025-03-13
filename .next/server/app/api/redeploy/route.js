(()=>{var e={};e.id=16,e.ids=[16],e.modules={41790:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page-experimental.runtime.prod.js")},91936:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route-experimental.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},49411:e=>{"use strict";e.exports=require("node:path")},53149:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>U,routeModule:()=>I,serverHooks:()=>T,workAsyncStorage:()=>j,workUnitAsyncStorage:()=>R});var s={};t.r(s),t.d(s,{POST:()=>N,runtime:()=>S});var o=t(46715),n=t(72673),i=t(83771);let a=require("node:child_process"),d=require("node:fs/promises");var l=t(49411),c=t(59539);let _=require("node:crypto"),u=require("node:buffer");var p="5.1.1";async function m(e,r){if(!e||!r)throw TypeError("[@octokit/webhooks-methods] secret & payload required for sign()");if("string"!=typeof r)throw TypeError("[@octokit/webhooks-methods] payload must be a string");let t="sha256";return`${t}=${(0,_.createHmac)(t,e).update(r).digest("hex")}`}async function v(e,r,t){if(!e||!r||!t)throw TypeError("[@octokit/webhooks-methods] secret, eventPayload & signature required");if("string"!=typeof r)throw TypeError("[@octokit/webhooks-methods] eventPayload must be a string");let s=u.Buffer.from(t),o=u.Buffer.from(await m(e,r));return s.length===o.length&&(0,_.timingSafeEqual)(s,o)}async function h(e,r,t,s){if(await v(e,r,t))return!0;if(void 0!==s)for(let e of s){let s=await v(e,r,t);if(s)return s}return!1}m.VERSION=p,v.VERSION=p;var g=e=>({debug:()=>{},info:()=>{},warn:console.warn.bind(console),error:console.error.bind(console),...e}),y=["branch_protection_configuration","branch_protection_configuration.disabled","branch_protection_configuration.enabled","branch_protection_rule","branch_protection_rule.created","branch_protection_rule.deleted","branch_protection_rule.edited","check_run","check_run.completed","check_run.created","check_run.requested_action","check_run.rerequested","check_suite","check_suite.completed","check_suite.requested","check_suite.rerequested","code_scanning_alert","code_scanning_alert.appeared_in_branch","code_scanning_alert.closed_by_user","code_scanning_alert.created","code_scanning_alert.fixed","code_scanning_alert.reopened","code_scanning_alert.reopened_by_user","commit_comment","commit_comment.created","create","custom_property","custom_property.created","custom_property.deleted","custom_property.updated","custom_property_values","custom_property_values.updated","delete","dependabot_alert","dependabot_alert.auto_dismissed","dependabot_alert.auto_reopened","dependabot_alert.created","dependabot_alert.dismissed","dependabot_alert.fixed","dependabot_alert.reintroduced","dependabot_alert.reopened","deploy_key","deploy_key.created","deploy_key.deleted","deployment","deployment.created","deployment_protection_rule","deployment_protection_rule.requested","deployment_review","deployment_review.approved","deployment_review.rejected","deployment_review.requested","deployment_status","deployment_status.created","discussion","discussion.answered","discussion.category_changed","discussion.closed","discussion.created","discussion.deleted","discussion.edited","discussion.labeled","discussion.locked","discussion.pinned","discussion.reopened","discussion.transferred","discussion.unanswered","discussion.unlabeled","discussion.unlocked","discussion.unpinned","discussion_comment","discussion_comment.created","discussion_comment.deleted","discussion_comment.edited","fork","github_app_authorization","github_app_authorization.revoked","gollum","installation","installation.created","installation.deleted","installation.new_permissions_accepted","installation.suspend","installation.unsuspend","installation_repositories","installation_repositories.added","installation_repositories.removed","installation_target","installation_target.renamed","issue_comment","issue_comment.created","issue_comment.deleted","issue_comment.edited","issues","issues.assigned","issues.closed","issues.deleted","issues.demilestoned","issues.edited","issues.labeled","issues.locked","issues.milestoned","issues.opened","issues.pinned","issues.reopened","issues.transferred","issues.unassigned","issues.unlabeled","issues.unlocked","issues.unpinned","label","label.created","label.deleted","label.edited","marketplace_purchase","marketplace_purchase.cancelled","marketplace_purchase.changed","marketplace_purchase.pending_change","marketplace_purchase.pending_change_cancelled","marketplace_purchase.purchased","member","member.added","member.edited","member.removed","membership","membership.added","membership.removed","merge_group","merge_group.checks_requested","merge_group.destroyed","meta","meta.deleted","milestone","milestone.closed","milestone.created","milestone.deleted","milestone.edited","milestone.opened","org_block","org_block.blocked","org_block.unblocked","organization","organization.deleted","organization.member_added","organization.member_invited","organization.member_removed","organization.renamed","package","package.published","package.updated","page_build","personal_access_token_request","personal_access_token_request.approved","personal_access_token_request.cancelled","personal_access_token_request.created","personal_access_token_request.denied","ping","project","project.closed","project.created","project.deleted","project.edited","project.reopened","project_card","project_card.converted","project_card.created","project_card.deleted","project_card.edited","project_card.moved","project_column","project_column.created","project_column.deleted","project_column.edited","project_column.moved","projects_v2","projects_v2.closed","projects_v2.created","projects_v2.deleted","projects_v2.edited","projects_v2.reopened","projects_v2_item","projects_v2_item.archived","projects_v2_item.converted","projects_v2_item.created","projects_v2_item.deleted","projects_v2_item.edited","projects_v2_item.reordered","projects_v2_item.restored","projects_v2_status_update","projects_v2_status_update.created","projects_v2_status_update.deleted","projects_v2_status_update.edited","public","pull_request","pull_request.assigned","pull_request.auto_merge_disabled","pull_request.auto_merge_enabled","pull_request.closed","pull_request.converted_to_draft","pull_request.demilestoned","pull_request.dequeued","pull_request.edited","pull_request.enqueued","pull_request.labeled","pull_request.locked","pull_request.milestoned","pull_request.opened","pull_request.ready_for_review","pull_request.reopened","pull_request.review_request_removed","pull_request.review_requested","pull_request.synchronize","pull_request.unassigned","pull_request.unlabeled","pull_request.unlocked","pull_request_review","pull_request_review.dismissed","pull_request_review.edited","pull_request_review.submitted","pull_request_review_comment","pull_request_review_comment.created","pull_request_review_comment.deleted","pull_request_review_comment.edited","pull_request_review_thread","pull_request_review_thread.resolved","pull_request_review_thread.unresolved","push","registry_package","registry_package.published","registry_package.updated","release","release.created","release.deleted","release.edited","release.prereleased","release.published","release.released","release.unpublished","repository","repository.archived","repository.created","repository.deleted","repository.edited","repository.privatized","repository.publicized","repository.renamed","repository.transferred","repository.unarchived","repository_advisory","repository_advisory.published","repository_advisory.reported","repository_dispatch","repository_dispatch.sample.collected","repository_import","repository_ruleset","repository_ruleset.created","repository_ruleset.deleted","repository_ruleset.edited","repository_vulnerability_alert","repository_vulnerability_alert.create","repository_vulnerability_alert.dismiss","repository_vulnerability_alert.reopen","repository_vulnerability_alert.resolve","secret_scanning_alert","secret_scanning_alert.created","secret_scanning_alert.publicly_leaked","secret_scanning_alert.reopened","secret_scanning_alert.resolved","secret_scanning_alert.validated","secret_scanning_alert_location","secret_scanning_alert_location.created","secret_scanning_scan","secret_scanning_scan.completed","security_advisory","security_advisory.published","security_advisory.updated","security_advisory.withdrawn","security_and_analysis","sponsorship","sponsorship.cancelled","sponsorship.created","sponsorship.edited","sponsorship.pending_cancellation","sponsorship.pending_tier_change","sponsorship.tier_changed","star","star.created","star.deleted","status","sub_issues","sub_issues.parent_issue_added","sub_issues.parent_issue_removed","sub_issues.sub_issue_added","sub_issues.sub_issue_removed","team","team.added_to_repository","team.created","team.deleted","team.edited","team.removed_from_repository","team_add","watch","watch.started","workflow_dispatch","workflow_job","workflow_job.completed","workflow_job.in_progress","workflow_job.queued","workflow_job.waiting","workflow_run","workflow_run.completed","workflow_run.in_progress","workflow_run.requested"];function E(e,r,t){e.hooks[r]||(e.hooks[r]=[]),e.hooks[r].push(t)}function b(e,r){E(e,"*",r)}function f(e,r){E(e,"error",r)}function k(e,r){let t;try{t=e(r)}catch(e){console.log('FATAL: Error occurred in "error" event handler'),console.log(e)}t&&t.catch&&t.catch(e=>{console.log('FATAL: Error occurred in "error" event handler'),console.log(e)})}function w(e,r){let t=e.hooks.error||[];if(r instanceof Error){let e=Object.assign(AggregateError([r],r.message),{event:r});return t.forEach(r=>k(r,e)),Promise.reject(e)}if(!r||!r.name||!r.payload){let e=Error("Event name not passed");throw AggregateError([e],e.message)}let s=function(e,r,t){let s=[e.hooks[t],e.hooks["*"]];return r&&s.unshift(e.hooks[`${t}.${r}`]),[].concat(...s.filter(Boolean))}(e,"action"in r.payload?r.payload.action:null,r.name);if(0===s.length)return Promise.resolve();let o=[];return Promise.all(s.map(t=>{let s=Promise.resolve(r);return e.transform&&(s=s.then(e.transform)),s.then(e=>t(e)).catch(e=>o.push(Object.assign(e,{event:r})))})).then(()=>{if(0===o.length)return;let e=AggregateError(o,o.map(e=>e.message).join("\n"));throw Object.assign(e,{event:r}),t.forEach(r=>k(r,e)),e})}async function A(e,r){let t;if(!await h(e.secret,r.payload,r.signature,e.additionalSecrets).catch(()=>!1)){let t=Error("[@octokit/webhooks] signature does not match event payload and secret");return e.eventHandler.receive(Object.assign(t,{event:r,status:400}))}try{t=JSON.parse(r.payload)}catch(e){throw e.message="Invalid JSON",e.status=400,AggregateError([e],e.message)}return e.eventHandler.receive({id:r.id,name:r.name,payload:t})}let q=new class{sign;verify;on;onAny;onError;removeListener;receive;verifyAndReceive;constructor(e){if(!e||!e.secret)throw Error("[@octokit/webhooks] options.secret required");let r={eventHandler:function(e){let r={hooks:{},log:g(e&&e.log)};return e&&e.transform&&(r.transform=e.transform),{on:(function e(r,t,s){if(Array.isArray(t)){t.forEach(t=>e(r,t,s));return}if(["*","error"].includes(t)){let e="*"===t?"any":t;throw Error(`Using the "${t}" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.on${e.charAt(0).toUpperCase()+e.slice(1)}() method instead`)}y.includes(t)||r.log.warn(`"${t}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`),E(r,t,s)}).bind(null,r),onAny:b.bind(null,r),onError:f.bind(null,r),removeListener:(function e(r,t,s){if(Array.isArray(t)){t.forEach(t=>e(r,t,s));return}if(r.hooks[t]){for(let e=r.hooks[t].length-1;e>=0;e--)if(r.hooks[t][e]===s){r.hooks[t].splice(e,1);return}}}).bind(null,r),receive:w.bind(null,r)}}(e),secret:e.secret,additionalSecrets:e.additionalSecrets,hooks:{},log:g(e.log)};this.sign=m.bind(null,e.secret),this.verify=v.bind(null,e.secret),this.on=r.eventHandler.on,this.onAny=r.eventHandler.onAny,this.onError=r.eventHandler.onError,this.removeListener=r.eventHandler.removeListener,this.receive=r.eventHandler.receive,this.verifyAndReceive=A.bind(null,r)}}({secret:t(31562).O.DEPLOY_KEY}),S="nodejs",N=async e=>{let r=e.headers.get("X-Hub-Signature-256");if(!r)return console.log("No signature header"),new c.NextResponse(void 0,{status:401});let t=await e.text();if(!await q.verify(t,r))return console.log("Invalid signature"),new c.NextResponse(void 0,{status:401});try{let e=JSON.parse(t);if(console.log(e),"repository"in e&&"ref"in e){if("refs/heads/build"!==e.ref)return console.log("Not a build event"),new c.NextResponse(void 0,{status:202});if(console.log("Received build event. Redeploying..."),!await (0,d.statfs)((0,l.resolve)(process.cwd(),"redeploy.sh")))return console.log("No redeploy script found"),new c.NextResponse(void 0,{status:202});return(0,a.exec)("sh redeploy.sh"),new c.NextResponse(void 0,{status:200})}}catch(e){console.log("error parsing"),console.log(e)}return new c.NextResponse(void 0,{status:404})},I=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/redeploy/route",pathname:"/api/redeploy",filename:"route",bundlePath:"app/api/redeploy/route"},resolvedPagePath:"/home/runner/work/careers/careers/src/app/api/redeploy/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:j,workUnitAsyncStorage:R,serverHooks:T}=I;function U(){return(0,i.patchFetch)({workAsyncStorage:j,workUnitAsyncStorage:R})}},80064:()=>{},54560:()=>{},46715:(e,r,t)=>{"use strict";e.exports=t(91936)},31562:(e,r,t)=>{"use strict";t.d(r,{O:()=>n});var s=t(22153),o=t(61861);let n=(0,s.D)({server:{DATABASE_URL:o.z.string().url(),NODE_ENV:o.z.enum(["development","test","production"]).default("development"),NEXTAUTH_SECRET:o.z.string(),NEXTAUTH_URL:o.z.preprocess(e=>process.env.VERCEL_URL??e,process.env.VERCEL?o.z.string():o.z.string().url()),NUDGE_API_KEY:o.z.string(),NUDGE_OTP_ID:o.z.number(),NUDGE_SUBMIT_ID:o.z.number(),NUDGE_NOTIFY_ID:o.z.number(),HIRING_SUPER_EMAIL:o.z.string().email(),HIRING_SUPER_NAME:o.z.string(),AWS_REGION:o.z.string(),AWS_ACCESS_KEY_ID:o.z.string(),AWS_SECRET_ACCESS_KEY:o.z.string(),S3_BUCKET:o.z.string(),DEPLOY_KEY:o.z.string()},client:{},shared:{NEXT_PUBLIC_CAREERS_EMAIL:o.z.string().email()},runtimeEnv:{DATABASE_URL:process.env.DATABASE_URL,NODE_ENV:"production",NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,NEXTAUTH_URL:process.env.NEXTAUTH_URL,NUDGE_API_KEY:process.env.NUDGE_API_KEY,NUDGE_OTP_ID:parseInt(process.env.NUDGE_OTP_ID??"0000",10),NUDGE_SUBMIT_ID:parseInt(process.env.NUDGE_SUBMIT_ID??"0000",10),NUDGE_NOTIFY_ID:parseInt(process.env.NUDGE_NOTIFY_ID??"0000",10),HIRING_SUPER_EMAIL:process.env.HIRING_SUPER_EMAIL,HIRING_SUPER_NAME:process.env.HIRING_SUPER_NAME,AWS_REGION:process.env.AWS_REGION,AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,S3_BUCKET:process.env.S3_BUCKET,NEXT_PUBLIC_CAREERS_EMAIL:process.env.CAREERS_EMAIL,DEPLOY_KEY:process.env.DEPLOY_KEY},skipValidation:!!process.env.SKIP_ENV_VALIDATION,emptyStringAsUndefined:!0})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[771,52,539],()=>t(53149));module.exports=s})();