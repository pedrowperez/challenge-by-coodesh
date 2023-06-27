# Challenge by Coodesh
[![Netlify Status](https://api.netlify.com/api/v1/badges/af047384-b763-47b8-a7ec-b4ed08dd203d/deploy-status)](https://app.netlify.com/sites/tourmaline-youtiao-a389e4/deploys)
### [Live Page](https://tourmaline-youtiao-a389e4.netlify.app/)

## Case
Sites e serviços online geralmente exigem um endereço de e-mail válido para registrar, acessar ou receber conteúdo protegido, etc. No entanto, o problema é que alguns desses sites podem usar nossos endereços de e-mail para enviar mensagens indesejadas. As pessoas não querem se preocupar mais com spam, propagandas no email, hackers e ataques de robôs.
Uma boa maneira de lidar com isso é usar um endereço de e-mail temporário se você não tiver certeza de que este site é absolutamente confiável e confiável. Dessa forma, você pode manter seus e-mails longe de spam e proteger sua privacidade. Sua tarefa para esse case será desenvolver uma aplicação que consuma uma API de email temporário para que os usuários possam utilizar serviços sem expor seu email real, seguindo os requisitos propostos neste desafio.

## Recursos

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild)

- 🗂 File based routing

- 📦 Components auto importing

- 🍍 State Management via Pinia

- 📑 Layout system

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [UnoCSS](https://github.com/antfu/unocss)

- 🔥 [New `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦾 TypeScript

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

## Modo de uso

### Desenvolvimento

Apenas acesse http://localhost:3333

```bash
pnpm dev
```

### Build

Para buildar o app, execute

```bash
pnpm build
```

## Checklist

Quando voce for instalar o projeto, precisa seguir alguns passos básicos para não ter problema de CORS.

- [ ] Gerar uma nova token para o arquivo .env, propriedade 'VITE_CORS' gerado pelo serviço [CORS.SH](https://proxy.cors.sh/);
- [ ] Trocar pela nova token para o arquivo .env, propriedade 'VITE_CORS';
