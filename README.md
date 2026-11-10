# HardFit Mogi Moderno

Site responsivo da academia, com FAQ, mapa, WhatsApp, faixa animada, efeitos de rolagem e títulos com efeito de digitação.

## Executar

A versão pronta para publicação inclui Motion 14.12.0 em `assets/vendor/`. Não exige compilação. Para instalar a dependência de desenvolvimento, execute `npm install`. Com Python 3:

```sh
python -m http.server 8000
```

Abra http://localhost:8000.

## Arquivos

- `index.html`: conteúdo e estrutura.
- `style.css`: visual, responsividade e animações.
- `app.js`: navegação e interações.
- `assets/`: símbolo gráfico e foto ilustrativa.

## Conteúdo

Foto ilustrativa do Unsplash. Google Fonts e Google Maps precisam de internet. Horários e avaliações refletem os dados fornecidos na criação do site e devem ser atualizados pela academia. Consulte planos pelo WhatsApp.

As animações respeitam a preferência de redução de movimento do dispositivo.

## Hospedagem

Publique os arquivos em um serviço de hospedagem estática. Este repositório não sincroniza automaticamente com a hospedagem original no Sites.

## Motion AI Kit

Skill instalada em `.agents/skills/motion/` e configurações MCP em `.codex/config.toml`. As animações usam a biblioteca gratuita Motion para entradas, rolagem, faixa contínua e gestos.
