import{L as C,l as L,n as A,m as P,U as D,x as T,C as R}from"./index-7EQwwM6j.js";const k=new WeakMap;class U extends C{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,o,s,r){const n=new L(this.manager);n.setPath(this.path),n.setResponseType("arraybuffer"),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(e,t=>{this.parse(t,o,r)},s,r)}parse(e,o,s=()=>{}){this.decodeDracoFile(e,o,null,null,A).catch(s)}decodeDracoFile(e,o,s,r,n=P,t=()=>{}){const i={attributeIDs:s||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!s,vertexColorSpace:n};return this.decodeGeometry(e,i).then(o).catch(t)}decodeGeometry(e,o){const s=JSON.stringify(o);if(k.has(e)){const a=k.get(e);if(a.key===s)return a.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const n=this.workerNextTaskID++,t=e.byteLength,i=this._getWorker(n,t).then(a=>(r=a,new Promise((h,d)=>{r._callbacks[n]={resolve:h,reject:d},r.postMessage({type:"decode",id:n,taskConfig:o,buffer:e},[e])}))).then(a=>this._createGeometry(a.geometry));return i.catch(()=>!0).then(()=>{r&&n&&this._releaseTask(r,n)}),k.set(e,{key:s,promise:i}),i}_createGeometry(e){const o=new D;e.index&&o.setIndex(new T(e.index.array,1));for(let s=0;s<e.attributes.length;s++){const r=e.attributes[s],n=r.name,t=r.array,i=r.itemSize,a=new T(t,i);n==="color"&&(this._assignVertexColorSpace(a,r.vertexColorSpace),a.normalized=!(t instanceof Float32Array)),o.setAttribute(n,a)}return o}_assignVertexColorSpace(e,o){if(o!==A)return;const s=new R;for(let r=0,n=e.count;r<n;r++)s.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,s.r,s.g,s.b)}_loadLibrary(e,o){const s=new L(this.manager);return s.setPath(this.decoderPath),s.setResponseType(o),s.setWithCredentials(this.withCredentials),new Promise((r,n)=>{s.load(e,r,void 0,n)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",o=[];return e?o.push(this._loadLibrary("draco_decoder.js","text")):(o.push(this._loadLibrary("draco_wasm_wrapper.js","text")),o.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(o).then(s=>{const r=s[0];e||(this.decoderConfig.wasmBinary=s[1]);const n=I.toString(),t=["/* draco decoder */",r,"","/* worker */",n.substring(n.indexOf("{")+1,n.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([t]))}),this.decoderPending}_getWorker(e,o){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(n){const t=n.data;switch(t.type){case"decode":r._callbacks[t.id].resolve(t);break;case"error":r._callbacks[t.id].reject(t);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+t.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,n){return r._taskLoad>n._taskLoad?-1:1});const s=this.workerPool[this.workerPool.length-1];return s._taskCosts[e]=o,s._taskLoad+=o,s})}_releaseTask(e,o){e._taskLoad-=e._taskCosts[o],delete e._callbacks[o],delete e._taskCosts[o]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function I(){let _,e;onmessage=function(t){const i=t.data;switch(i.type){case"init":_=i.decoderConfig,e=new Promise(function(d){_.onModuleLoaded=function(u){d({draco:u})},DracoDecoderModule(_)});break;case"decode":const a=i.buffer,h=i.taskConfig;e.then(d=>{const u=d.draco,c=new u.Decoder;try{const l=o(u,c,new Int8Array(a),h),f=l.attributes.map(y=>y.array.buffer);l.index&&f.push(l.index.array.buffer),self.postMessage({type:"decode",id:i.id,geometry:l},f)}catch(l){console.error(l),self.postMessage({type:"error",id:i.id,error:l.message})}finally{u.destroy(c)}});break}};function o(t,i,a,h){const d=h.attributeIDs,u=h.attributeTypes;let c,l;const f=i.GetEncodedGeometryType(a);if(f===t.TRIANGULAR_MESH)c=new t.Mesh,l=i.DecodeArrayToMesh(a,a.byteLength,c);else if(f===t.POINT_CLOUD)c=new t.PointCloud,l=i.DecodeArrayToPointCloud(a,a.byteLength,c);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!l.ok()||c.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+l.error_msg());const y={index:null,attributes:[]};for(const m in d){const p=self[u[m]];let g,b;if(h.useUniqueIDs)b=d[m],g=i.GetAttributeByUniqueId(c,b);else{if(b=i.GetAttributeId(c,t[d[m]]),b===-1)continue;g=i.GetAttribute(c,b)}const w=r(t,i,c,m,p,g);m==="color"&&(w.vertexColorSpace=h.vertexColorSpace),y.attributes.push(w)}return f===t.TRIANGULAR_MESH&&(y.index=s(t,i,c)),t.destroy(c),y}function s(t,i,a){const d=a.num_faces()*3,u=d*4,c=t._malloc(u);i.GetTrianglesUInt32Array(a,u,c);const l=new Uint32Array(t.HEAPF32.buffer,c,d).slice();return t._free(c),{array:l,itemSize:1}}function r(t,i,a,h,d,u){const c=u.num_components(),f=a.num_points()*c,y=f*d.BYTES_PER_ELEMENT,m=n(t,d),p=t._malloc(y);i.GetAttributeDataArrayForAllPoints(a,u,m,y,p);const g=new d(t.HEAPF32.buffer,p,f).slice();return t._free(p),{name:h,array:g,itemSize:c}}function n(t,i){switch(i){case Float32Array:return t.DT_FLOAT32;case Int8Array:return t.DT_INT8;case Int16Array:return t.DT_INT16;case Int32Array:return t.DT_INT32;case Uint8Array:return t.DT_UINT8;case Uint16Array:return t.DT_UINT16;case Uint32Array:return t.DT_UINT32}}}export{U as DRACOLoader};
