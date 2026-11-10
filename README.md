# HardFit Mogi Moderno

Site da HardFit com animações Motion, FAQ, mapa, WhatsApp, rodapé React Doodle Crew e fundo SVG DotPattern.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Verificação e publicação

```sh
npm run check
npm run build
```

Publique a pasta `dist/` em uma hospedagem estática. O repositório não sincroniza automaticamente com Sites.

## Estrutura

- `index.html`, `app.js`, `style.css`: página e animações existentes.
- `src/main.tsx`: montagem dos componentes React, com dados da HardFit.
- `components/ui/doodle-crew-footer.tsx`: componente fornecido, personalizado via props.
- `components/ui/dot-pattern.tsx`: SVG responsivo de pontos com IDs exclusivos por instância.
- `components/ui/dot-pattern-demo.tsx`: demonstração isolada do padrão.
- `styles/globals.css`: Tailwind e estilos dos componentes React.
- `lib/utils.ts`: utilitário `cn` com clsx e tailwind-merge.
- `public/assets/`: imagem ilustrativa e símbolo da marca.
- `components.json`: configuração compatível com a estrutura shadcn.

A pasta `components/ui` foi criada para manter os componentes reutilizáveis no caminho esperado pelo alias `@/components/ui` e pelo shadcn. O alias `@` aponta para a raiz no Vite e no TypeScript. Não há providers adicionais.

React, React DOM, TypeScript, Vite e Tailwind estão instalados e configurados. Para adicionar componentes shadcn no futuro, use `npx shadcn@latest add <componente>`; não é necessário reinicializar o projeto. Tailwind é carregado sem preflight global para preservar o layout anterior.

O rodapé recebe links reais, cores, textos em português e personagens por props; não precisa de imagens externas ou lucide-react. O DotPattern é decorativo, usa SVG inline, não intercepta cliques e está aplicado ao fundo da seção Experiência. A biblioteca Motion controla os efeitos da página. As animações respeitam redução de movimento.

Imagem de academia ilustrativa do Unsplash. Google Fonts e Maps precisam de internet. Horários e avaliações refletem os dados fornecidos e devem ser mantidos atualizados pela academia.
