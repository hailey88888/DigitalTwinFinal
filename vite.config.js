import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

//
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default defineConfig({

  // plugins: [react()],
  plugins: [
    react()
    // new NodePolyfillPlugin()
    ,
    viteStaticCopy({
      targets: [
        {
          src: 'public/*',
          dest: 'public'
        }
      ]
    })
  ],
  build: {
    // chunkSizeWarningLimit: 1000, // 경고 한도를 1000 kB로 설정
    emptyOutDir: false, // 빌드 전에 outDir을 비우지 않도록 설정
    // 기타 설정
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vendor: ['react', 'react-dom'], // 예시: react와 react-dom을 vendor 청크로 분리
    //     },
    //   },
    // },


  },
  define: {
    global: 'window'  // 이 부분을 추가하여 global을 window로 정의합니다.
  },
  server :{
    port: 80, // 개발 서버 포트를 80으로 설정
    watch: {
      usePolling: true
    },
    // proxy :{
    //    '/api' : 'http://10.24.1.1:9901',
    //    '/ws': {
    //       target: 'ws://10.24.1.1:9901/ws',  
    //       ws: true,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/ws/, '') 
    //    }
    proxy :{
      '/api' : 'digitaltwin.ddns.net:9901',
      '/ws': {
         target: 'digitaltwin.ddns.net/:9901/ws',  
         ws: true,
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/ws/, '') 
      }

      // '/api' : 'http://10.8.0.14:9901',
      //  '/ws': {
      //     target: 'ws://10.8.0.14:9901/ws',  // 정확한 URL 설정
      //     ws: true,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/ws/, '') // 필요에 따라 경로 재작성
      //  }
    }
  },
  
  
})



