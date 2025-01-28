(()=>{var e={};e.id=550,e.ids=[550],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},41790:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page-experimental.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},43221:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>o.a,__next_app__:()=>d,pages:()=>c,routeModule:()=>u,tree:()=>h});var s=i(69224),r=i(67380),n=i(47008),o=i.n(n),a=i(48811),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);i.d(t,l);let h=["",{children:["roles",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,95396)),"/Users/gin/tilli/careers/src/app/roles/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,61449)),"/Users/gin/tilli/careers/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(i.bind(i,10747)),"/Users/gin/tilli/careers/src/app/not-found.tsx"]}],c=["/Users/gin/tilli/careers/src/app/roles/page.tsx"],d={require:i,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/roles/page",pathname:"/roles",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:h}})},23711:(e,t,i)=>{Promise.resolve().then(i.bind(i,3354)),Promise.resolve().then(i.bind(i,82442)),Promise.resolve().then(i.bind(i,29973)),Promise.resolve().then(i.bind(i,68332)),Promise.resolve().then(i.bind(i,22308)),Promise.resolve().then(i.bind(i,88562)),Promise.resolve().then(i.bind(i,32284)),Promise.resolve().then(i.bind(i,86269)),Promise.resolve().then(i.bind(i,43693)),Promise.resolve().then(i.bind(i,72581)),Promise.resolve().then(i.bind(i,3252)),Promise.resolve().then(i.bind(i,37719)),Promise.resolve().then(i.bind(i,81698)),Promise.resolve().then(i.t.bind(i,25243,23)),Promise.resolve().then(i.bind(i,15150)),Promise.resolve().then(i.bind(i,19364)),Promise.resolve().then(i.bind(i,3073)),Promise.resolve().then(i.bind(i,11706))},45503:(e,t,i)=>{Promise.resolve().then(i.bind(i,52198)),Promise.resolve().then(i.bind(i,94916)),Promise.resolve().then(i.bind(i,74377)),Promise.resolve().then(i.bind(i,2108)),Promise.resolve().then(i.bind(i,65640)),Promise.resolve().then(i.bind(i,26098)),Promise.resolve().then(i.bind(i,20123)),Promise.resolve().then(i.bind(i,93269)),Promise.resolve().then(i.bind(i,22906)),Promise.resolve().then(i.bind(i,50413)),Promise.resolve().then(i.bind(i,6497)),Promise.resolve().then(i.bind(i,35368)),Promise.resolve().then(i.bind(i,14432)),Promise.resolve().then(i.t.bind(i,27018,23)),Promise.resolve().then(i.bind(i,1936)),Promise.resolve().then(i.bind(i,47117)),Promise.resolve().then(i.bind(i,40060)),Promise.resolve().then(i.bind(i,47321))},1936:(e,t,i)=>{"use strict";i.d(t,{default:()=>S});var s,r=i(79474),n=i(7176);function o(e,t,i){return`uniform ${e} ${t}${i>0?`[${i}]`:""};`}!function(e){e.Float="float",e.Int="int",e.Vec2="vec2",e.Vec3="vec3",e.Vec4="vec4",e.Mat4="mat4",e.Array="array",e.Struct="struct"}(s||(s={}));class a{constructor(e,t,i={}){this.gl=e,this.value=t,this.properties=i,this.type="float"}update(e){this.value&&this.gl.getContext()?.uniform1f(e,this.value)}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return o(this.type,e,i)}}class l{constructor(e,t,i={}){this.gl=e,this.value=t,this.properties=i,this.type="vec2"}update(e){this.value&&this.gl.getContext()?.uniform2fv(e,this.value)}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return o(this.type,e,i)}}class h{constructor(e,t,i={}){this.gl=e,this.value=t,this.properties=i,this.type="vec3"}update(e){this.value&&this.gl.getContext()?.uniform3fv(e,this.value)}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return o(this.type,e,i)}}class c{constructor(e,t,i={}){this.gl=e,this.value=t,this.properties=i,this.type="vec4"}update(e){this.value&&this.gl.getContext()?.uniform4fv(e,this.value)}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return o(this.type,e,i)}}class d{constructor(e,t,i={transpose:!1}){this.gl=e,this.value=t,this.properties=i,this.type="mat4"}update(e){this.value&&this.gl.getContext()?.uniformMatrix4fv(e,this.properties.transpose,this.value)}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return o(this.type,e,i)}}class u{constructor(e,t,i={}){this.value=t,this.properties=i,this.type="array"}update(e){}getDeclaration(e,t,i){if(this.properties.excludeFrom!==t)return`${this.value[0]?.getDeclaration(e,t,this.value.length)}
const int ${e}_length = ${this.value.length};`}}class b{constructor(e,t,i={}){this.value=t,this.properties=i,this.type="struct"}update(e){}getDeclaration(e,t,i){if(this.properties.excludeFrom===t)return;let s=e.replace("u_","");s=s.charAt(0).toUpperCase()+s.slice(1);let r=Object.entries(this.value).map(([e,i])=>i.getDeclaration(e,t,0)?.replace(/^uniform/,"")).join("");return`uniform struct ${s} {
  ${r}
} ${e}${i>0?`[${i}]`:""};`}}class v{constructor(e,t,i,s={},r={}){this.uniformInstances=[],this.properties=r,this.gl=e,this.uniforms=s;let n=this.gl.getContext(),o=`
            precision highp float;
        `;this.vertexSource=`
            ${o}
            attribute vec4 position;
            attribute vec2 uv;
            attribute vec2 uvNorm;
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"vertex")}
            ${this._getUniformVariableDeclarations(s,"vertex")}
            ${t}
        `,this.Source=`
            ${o}
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"fragment")}
            ${this._getUniformVariableDeclarations(s,"fragment")}
            ${i}
        `,this.vertexShader=this._getShaderByType(n.VERTEX_SHADER,this.vertexSource),this.fragmentShader=this._getShaderByType(n.FRAGMENT_SHADER,this.Source),this.program=n.createProgram(),this.program&&this.vertexShader&&this.fragmentShader&&(n.attachShader(this.program,this.vertexShader),n.attachShader(this.program,this.fragmentShader),n.linkProgram(this.program),n.getProgramParameter(this.program,n.LINK_STATUS)||console.error(n.getProgramInfoLog(this.program))),n.useProgram(this.program),this.attachUniforms(null,this.gl.commonUniforms),this.attachUniforms(null,this.uniforms)}_getShaderByType(e,t){let i=this.gl.getContext(),s=i.createShader(e);return s&&(i.shaderSource(s,t),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)||console.error(i.getShaderInfoLog(s))),s}_getUniformVariableDeclarations(e,t){return Object.entries(e).map(([e,i])=>i.getDeclaration(e,t,0)).join("\n")}attachUniforms(e,t){e?t.type===s.Array?t.value.forEach((t,i)=>{this.attachUniforms(`${e}[${i}]`,t)}):"struct"===t.type?Object.entries(t.value).forEach(([t,i])=>{this.attachUniforms(`${e}.${t}`,i)}):this.program&&Object.values(s).includes(t.type)&&this.uniformInstances.push({uniform:t,location:this.gl.getContext().getUniformLocation(this.program,e)}):Object.entries(t).forEach(([e,t])=>{this.attachUniforms(e,t)})}}class g{constructor(e,t,i,s={}){this.wireframe=!1,this.attributeInstances=[],this.properties=s,this.geometry=t,this.material=i,this.gl=e,Object.entries(this.geometry.attributes).forEach(([e,t])=>{this.attributeInstances.push({attribute:t,location:t.attach(e,this.material.program)})}),this.gl.meshes.push(this)}draw(){let e=this.gl.getContext();e.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:e,location:t})=>{e.update(t)}),this.attributeInstances.forEach(({attribute:e,location:t})=>{e.use(t)});let t=this.wireframe?e.LINES:e.TRIANGLES;this.geometry.attributes.index.values&&e.drawElements(t,this.geometry.attributes.index.values.length,e.UNSIGNED_SHORT,0)}remove(){this.gl.meshes=this.gl.meshes.filter(e=>e!=this)}}class m{constructor(e,t,i){this._class=m,this.meshes=[],this.setCanvas(e);let s=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];this.commonUniforms={projectionMatrix:new d(this,s),modelViewMatrix:new d(this,s),resolution:new l(this,[1,1],{}),aspectRatio:new a(this,1,{})},this.setSize(t??void 0,i??void 0)}setCanvas(e){this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})}getCanvas(){return this._canvas}getContext(){if(!this._context)throw Error("Context not available");return this._context}setSize(e=640,t=480){this.getCanvas().width=e,this.getCanvas().height=t,this.getContext().viewport(0,0,e,t),this.commonUniforms.resolution.value=[e,t],this.commonUniforms.aspectRatio.value=e/t}setOrthographicCamera(e=0,t=0,i=0,s=-2e3,r=2e3){this.commonUniforms.projectionMatrix.value=[2/this.getCanvas().width,0,0,0,0,2/this.getCanvas().height,0,0,0,0,2/(s-r),0,e,t,i,1]}render(){this.getContext().clearColor(0,0,0,0),this.getContext().clearDepth(1),this.meshes.forEach(e=>{e.draw()})}}class p{constructor(e,t={}){this.normalized=!1,this.properties=t,this.gl=e,this.type=this.properties.type??this.gl.getContext().FLOAT,this.buffer=this.gl.getContext().createBuffer(),this.update()}update(){if(void 0!==this.values&&void 0!==this.properties.target){let e=this.gl.getContext();e.bindBuffer(this.properties.target,this.buffer),e.bufferData(this.properties.target,this.values,e.STATIC_DRAW)}}attach(e,t){let i=this.gl.getContext(),s=i.getAttribLocation(t,e);return this.properties.target===i.ARRAY_BUFFER&&void 0!==this.properties.size&&(i.enableVertexAttribArray(s),i.vertexAttribPointer(s,this.properties.size,this.type,this.normalized,0,0)),s}use(e){let t=this.gl.getContext();void 0!==this.properties.target&&t.bindBuffer(this.properties.target,this.buffer),this.properties.target===t.ARRAY_BUFFER&&void 0!==this.properties.size&&(t.enableVertexAttribArray(e),t.vertexAttribPointer(e,this.properties.size,this.type,this.normalized,0,0))}}class f{constructor(e,t,i,s,r,n,o={}){this.xSegCount=0,this.ySegCount=0,this.vertexCount=0,this.quadCount=0,this.width=o.width,this.height=o.height,this.orientation=o.orientation,this.gl=e;let a=this.gl.getContext();a.createBuffer(),this.attributes={position:new p(this.gl,{target:a.ARRAY_BUFFER,size:3}),uv:new p(this.gl,{target:a.ARRAY_BUFFER,size:2}),uvNorm:new p(this.gl,{target:a.ARRAY_BUFFER,size:2}),index:new p(this.gl,{target:a.ELEMENT_ARRAY_BUFFER,size:3,type:a.UNSIGNED_SHORT})},this.setTopology(s,r),this.setSize(t,i,n)}setTopology(e=1,t=1){this.xSegCount=e,this.ySegCount=t,this.vertexCount=(this.xSegCount+1)*(this.ySegCount+1),this.quadCount=this.xSegCount*this.ySegCount*2,this.attributes.uv.values=new Float32Array(2*this.vertexCount),this.attributes.uvNorm.values=new Float32Array(2*this.vertexCount),this.attributes.index.values=new Uint16Array(3*this.quadCount);for(let e=0;e<=this.ySegCount;e++)for(let t=0;t<=this.xSegCount;t++){let i=e*(this.xSegCount+1)+t;if(this.attributes.uv.values[2*i]=t/this.xSegCount,this.attributes.uv.values[2*i+1]=1-e/this.ySegCount,this.attributes.uvNorm.values[2*i]=t/this.xSegCount*2-1,this.attributes.uvNorm.values[2*i+1]=1-e/this.ySegCount*2,t<this.xSegCount&&e<this.ySegCount){let s=e*this.xSegCount+t;this.attributes.index.values[6*s]=i,this.attributes.index.values[6*s+1]=i+1+this.xSegCount,this.attributes.index.values[6*s+2]=i+1,this.attributes.index.values[6*s+3]=i+1,this.attributes.index.values[6*s+4]=i+1+this.xSegCount,this.attributes.index.values[6*s+5]=i+2+this.xSegCount}}this.attributes.uv.update(),this.attributes.uvNorm.update(),this.attributes.index.update()}setSize(e=1,t=1,i="xz"){this.width=e,this.height=t,this.orientation=i,this.attributes.position.values&&this.attributes.position.values.length===3*this.vertexCount||(this.attributes.position.values=new Float32Array(3*this.vertexCount));let s=-(e/2),r=-(t/2),n=e/this.xSegCount,o=t/this.ySegCount;for(let e=0;e<=this.ySegCount;e++){let t=r+e*o;for(let r=0;r<=this.xSegCount;r++){let o=s+r*n,a=e*(this.xSegCount+1)+r;i[0]&&(this.attributes.position.values[3*a+"xyz".indexOf(i[0])]=o),i[1]&&(this.attributes.position.values[3*a+"xyz".indexOf(i[1]??"")]=-t)}}this.attributes.position.update()}}let x=`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
    return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
    return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
    return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
    return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
    return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
    return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
    return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
    return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
    return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
    return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
    return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
    return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
    return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
    return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
    return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
    return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
    return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
    return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
    return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
    return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
    return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
    return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
    return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
    return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
    // Note : Same implementation as BlendSubtractf
    return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendSubtract
    return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
    return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
    // Note : Same implementation as BlendAddf
    return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendAdd
    return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
    return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
    return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
    return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
    return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}
`,y=`varying vec3 v_color;

void main() {
    vec3 color = v_color;
    if (u_darken_top == 1.0) {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
}
`,_=`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`,C=`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;class w{static{this.defaultOptions={canvas:null,colors:["#f00","#0f0","#00f"],wireframe:!1,density:[.06,.16],time:1253106,angle:0,amplitude:320,static:!1,loadedClass:"is-loaded"}}constructor(e){this._class=w,this.vertexShader=null,this.uniforms={},this.time=0,this.mesh=null,this.material=null,this.geometry=null,this.scrollingTimeout=void 0,this.scrollingRefreshDelay=200,this.width=null,this.height=600,this.xSegCount=null,this.ySegCount=null,this.freqX=14e-5,this.freqY=29e-5,this.seed=0,this.freqDelta=1e-5,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:C,noise:_,blend:x,fragment:y},this.options={canvas:null,colors:w.defaultOptions.colors},this._flags={playing:!0},this._canvas=null,this._context=null,this.resize=()=>{let[e,t]=this.getOption("density");this.width=this._canvas?.getBoundingClientRect().width??window.innerWidth,this.height=this._canvas?.getBoundingClientRect().height??window.innerHeight,this._minigl.setSize(this.width,this.height),this._minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*e),this.ySegCount=Math.ceil(this.height*t),this.mesh?.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh?.geometry.setSize(this.width,this.height),this.mesh&&(this.mesh.material.uniforms.u_shadow_power.value=this.width<this.height?5:6)},this.animate=(e=0)=>{let t=!!window.document.hidden||!this.getFlag("playing")||("number"==typeof e?e:parseInt(e,10))%2==0,i=this.getFlag("lastFrame",0);if(t||(this.time+=Math.min(e-i,1e3/15),this.getOption("onTimeUpdate")?.(this.time),i=this.setFlag("lastFrame",e),this.mesh&&(this.mesh.material.uniforms.u_time.value=this.time),this._minigl.render()),0!==i&&this.getOption("static"))return this._minigl.render(),this.disconnect();this.getFlag("playing")&&(this.handle=requestAnimationFrame(this.animate))},this.options=e,this.setCanvas(this.findCanvas(this.getOption("canvas"))),this._minigl=new m(this.getCanvas(),this.getCanvas().offsetWidth,this.getCanvas().offsetHeight),this.time=this.getOption("time")}getOption(e,t){return void 0===t&&e in this._class.defaultOptions&&(t=this._class.defaultOptions[e]),e in this.options?this.options[e]:t}findCanvas(e){return("string"==typeof e?document.querySelector(e):e)??null}setCanvas(e){e?(this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})):(this._canvas=null,this._context=null)}getCanvas(){if(!this._canvas)throw Error("Missing Canvas. Pass the canvas to the Gradient constructor.");return this._canvas}getContext(){return this._context}setFlag(e,t){return this._flags[e]=t}getFlag(e,t){return this._flags[e]||t}handleScroll(){clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.getFlag("playing")&&(this.setFlag("isScrolling",!0),this.pause())}handleScrollEnd(){this.setFlag("isScrolling",!1),this.getFlag("isIntersecting")&&this.play()}pause(){this.setFlag("playing",!1)}play(){this.handle=requestAnimationFrame(this.animate),this.setFlag("playing",!0)}disconnect(){this.handle&&cancelAnimationFrame(this.handle),clearTimeout(this.scrollingTimeout),window.removeEventListener("resize",this.resize)}initMaterial(){let e=this.getOption("colors").map(e=>{if(4===e.length){let t=e.substr(1).split("").map(e=>e+e).join("");e=`#${t}`}return e&&`0x${e.substr(1)}`}).filter(Boolean).map(this.normalizeColor);this.uniforms={u_time:new a(this._minigl,0),u_shadow_power:new a(this._minigl,10),u_darken_top:new a(this._minigl,this.getCanvas().dataset.jsDarkenTop?1:0),u_active_colors:new c(this._minigl,this.activeColors),u_global:new b(this._minigl,{noiseFreq:new l(this._minigl,[this.freqX,this.freqY]),noiseSpeed:new a(this._minigl,5e-6)}),u_vertDeform:new b(this._minigl,{incline:new a(this._minigl,Math.sin(this.getOption("angle"))/Math.cos(this.getOption("angle"))),offsetTop:new a(this._minigl,-.5),offsetBottom:new a(this._minigl,-.5),noiseFreq:new l(this._minigl,[3,4]),noiseAmp:new a(this._minigl,this.getOption("amplitude")),noiseSpeed:new a(this._minigl,10),noiseFlow:new a(this._minigl,3),noiseSeed:new a(this._minigl,this.seed)},{excludeFrom:"fragment"}),u_baseColor:new h(this._minigl,e[0],{excludeFrom:"fragment"}),u_waveLayers:new u(this._minigl,[],{excludeFrom:"fragment"})};for(let t=1;t<e.length;t+=1){let i=new b(this._minigl,{color:new h(this._minigl,e[t]),noiseFreq:new l(this._minigl,[2+t/e.length,3+t/e.length]),noiseSpeed:new a(this._minigl,11+.3*t),noiseFlow:new a(this._minigl,6.5+.3*t),noiseSeed:new a(this._minigl,this.seed+10*t),noiseFloor:new a(this._minigl,.1),noiseCeil:new a(this._minigl,.63+.07*t)});this.uniforms.u_waveLayers.value.push(i)}return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join("\n\n"),new v(this._minigl,this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new f(this._minigl,0,0,0,0,"xz"),this.mesh=new g(this._minigl,this.geometry,this.material),this.mesh.wireframe=this.getOption("wireframe")}updateFrequency(e){this.freqX+=e,this.freqY+=e}toggleColor(e){this.activeColors[e]=0===this.activeColors[e]?1:0}init(){let e=this.getOption("loadedClass");e&&this.getCanvas().classList.add(e),this.initMesh(),this.resize(),this.handle=requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize)}normalizeColor(e){let t=Number(e);return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]}}let S=({className:e,id:t})=>((0,n.useEffect)(()=>{let e=new w({canvas:document.getElementById(t),colors:["#a960ee","#ff333d","#90e0ff","#ffcb57"]});return e.init(),()=>e.disconnect()},[t]),(0,r.jsx)("canvas",{width:1024,height:300,id:t,className:e}))},95396:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>a});var s=i(16518),r=i(16917),n=i(15150),o=i(65560);let a=async({searchParams:e})=>{let t=await e;return(0,s.jsxs)(r.Z,{className:"overflow-hidden",children:[(0,s.jsxs)("div",{className:"absolute top-28 z-40 mx-auto w-[calc(100%-16px)] md:mx-0 md:w-auto",children:[(0,s.jsx)("h1",{className:"relative z-20 text-center font-serif text-6xl font-black text-white drop-shadow-lg md:text-left",children:"Explore Roles"}),(0,s.jsx)("div",{className:"relative z-10 rounded bg-background/90 px-4 py-2 text-center font-mono backdrop-blur-sm md:text-left",children:"We're hiring."})]}),(0,s.jsx)(n.default,{id:"RECRUIT_TIME",className:"absolute left-0 top-12 h-[50vh] w-screen overflow-hidden md:h-[800px]"}),(0,s.jsx)("div",{className:"absolute -left-[50vw] top-[30vh] -z-0 h-[100vh] w-[200vw] -rotate-6 bg-background md:top-[300px]"}),(0,s.jsx)("div",{className:"h-[30vh] md:h-[300px]"}),(0,s.jsx)(o.ux,{showFilters:!0,filterClassName:"justify-center md:justify-end z-10",input:t})]})}},15150:(e,t,i)=>{"use strict";i.d(t,{default:()=>s});let s=(0,i(68971).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/gin/tilli/careers/src/features/gradient/gradient-fc.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/gin/tilli/careers/src/features/gradient/gradient-fc.tsx","default")}};var t=require("../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),s=t.X(0,[543,548,274,834,743,810],()=>i(43221));module.exports=s})();