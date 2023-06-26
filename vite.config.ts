import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Unocss from 'unocss/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// @ts-expect-error failed to resolve types
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  build: {
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: false,
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/],
        }),
      },
    }),

    Pages({
      extensions: ['vue'],
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
          importStyle: false,
          cjs: true,
        }),
      ],
    }),
    Unocss(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,png,svg,woff2,woff,ttf,wasm,zip}',
        ],
        maximumFileSizeToCacheInBytes: Number.MAX_SAFE_INTEGER,
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Challenge by Coodesh',
        short_name: 'Challenge by Coodesh',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo-coodesh.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-coodesh.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/logo-coodesh.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

  ],

  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },

  ssgOptions: {
    script: 'async',
    mock: false,
    formatting: 'minify',
    format: 'cjs',
    onFinished() { generateSitemap() },
  },

  ssr: {
    format: 'cjs',
    target: 'webworker',
    noExternal: ['workbox-window', 'ant-design-vue/lib'],
  },
})
