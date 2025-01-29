## projetos-web

compartilhamento de código, gerenciar dependências e automatizar processos

## Estrutura do repositório

```
projetos-web/
├── packages/
│   ├── website1/
│   │   ├── ... (arquivos do website1)
│   ├── api1/
│   │   ├── ... (arquivos da api1)
│   └── webappPWA1/
│       ├── ... (arquivos do webappPWA1)
├── lerna.json
├── package.json
├── .eslintrc.js
├── .prettierrc
├── commitlint.config.js
└── projetos-web.code-workspace
```

## Tecnologias utilizadas

*   **Lerna:** Gerenciamento de múltiplos pacotes no monorepo.
*   **npm workspaces:** Gerenciamento de dependências compartilhadas.
*   **Commitizen:** Criação de mensagens de commit padronizadas.
*   **Commitlint:** Linter para mensagens de commit.
*   **Husky:** Gerenciamento de hooks Git.
*   **lint-staged:** Execução de linters em arquivos staged.
*   **Prettier:** Formatador de código.
*   **ESLint:** Linter para JavaScript/TypeScript.

## Passo a passo da configuração inicial

1.  **Clonagem do repositório:**

```bash
gh repo clone AloisioMagalhaes/projetos-web
cd projetos-web
```

2.  **Inicialização do npm:**

```bash
npm init -y
```

3.  **Instalação do Lerna:**

```bash
npm install --save-dev lerna
```

4.  **Inicialização do Lerna:**

```bash
npx lerna init
```

5.  **Criação da pasta `packages`:**

```bash
mkdir packages
```

6.  **Movimentação dos projetos para a pasta `packages`:**

```bash
mv website1 packages/
mv api1 packages/
mv webappPWA1 packages/
```

7.  **Configuração do `lerna.json`:**

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "packages": [
    "packages/*"
  ],
  "version": "independent"
}
```

8.  **Instalação das dependências de desenvolvimento:**

```bash
npm install --save-dev @commitlint/{config-conventional,cli} commitizen cz-conventional-changelog husky lint-staged prettier eslint
```

9.  **Configuração do `package.json`:**

```json
{
  "name": "projetos-web",
  "version": "1.0.0",
  "description": "Monorepo contendo website1, api1 e webappPWA1, utilizado para desenvolvimento e deploy.",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "build": "lerna run build",
    "test": "lerna run test",
    "publish": "lerna publish",
    "commitlint": "commitlint --config commitlint.config.js"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint --config commitlint.config.js"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  },
  "keywords": [
    "react",
    "nodejs",
    "typescript",
    "monorepo",
    "webapp",
    "api"
  ],
  "author": "Seu Nome",
  "license": "ISC",
  "devDependencies": {
    "@commitlint/cli": "^19.6.1",
    "@commitlint/config-conventional": "^19.6.0",
    "commitizen": "^4.3.1",
    "cz-conventional-changelog": "^3.3.0",
    "husky": "^9.1.7",
    "lerna": "^8.1.9",
    "lint-staged": "^15.4.3",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0"
  }
}
```

10. **Criação dos arquivos de configuração:**

*   `.eslintrc.js`
*   `.prettierrc`
*   `commitlint.config.js`
*   `projetos-web.code-workspace`

11. **Commit inicial:**

```bash
git add .
git commit -m "chore(configuração inicial do monorepo com lerna): Configuração inicial do monorepo com Lerna"
```

## Próximos passos

*   **Desenvolvimento dos projetos:**
    *   Criar branches para cada funcionalidade ou correção de bug.
    *   Desenvolver o código dentro de cada pacote (website1, api1, webappPWA1).
    *   Executar os scripts de build, teste e linting.

*   **Gerenciamento de dependências:**
    *   Adicionar novas dependências conforme necessário.
    *   Atualizar as dependências periodicamente.

*   **Publicação dos pacotes (se aplicável):**
    *   Utilizar o comando `lerna publish` para publicar os pacotes no npm ou em outro registro.

Este README.md fornece um resumo do processo de configuração inicial do seu monorepo. Lembre-se de atualizá-lo conforme o projeto evolui, adicionando informações sobre as tecnologias utilizadas, a estrutura do código e os próximos passos para o desenvolvimento.