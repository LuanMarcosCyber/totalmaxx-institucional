# Minimal Footer

## Categoria

Footer minimalista para encerramento da página institucional.

## Link

https://21st.dev/community/bookmarks?preview=%2F%40sshahaider%2Fcomponents%2Fminimal-footer

## Screenshot

Arquivo de referência:

`../screenshots/minimal-footer.png`

## O que gostei

- aparência limpa e premium;
- poucas informações visuais;
- linhas finas criando organização;
- boa distribuição entre marca, texto, links e redes sociais;
- uso inteligente de espaço negativo;
- visual moderno sem exagero;
- combina com uma página institucional mais sofisticada;
- não depende de animações chamativas para parecer bem produzido.

## Onde pretendo usar

No final da página inicial da Total Maxx, como footer principal do site.

A ideia é manter a estrutura minimalista, mas adaptar completamente o conteúdo para a empresa.

## Direção visual para a Total Maxx

- fundo branco, off-white ou vinho muito escuro;
- linhas divisórias discretas;
- logo oficial da Total Maxx no lugar do ícone genérico;
- tipografia moderna e limpa;
- vinho como cor de destaque;
- links com hover sutil;
- visual sóbrio e institucional;
- sem excesso de ícones sociais;
- sem aparência de startup financeira.

## Adaptação de conteúdo

### Bloco principal

Substituir:

“A comprehensive financial technology platform.”

Por algo como:

“Materiais, insumos e soluções para moldurarias e revendedores em todo o Brasil.”

### Coluna Produtos

Possíveis links:

- Foam
- Paspatur
- Molduras
- Acrílicos
- MDF
- Insumos

### Coluna Empresa

Possíveis links:

- Sobre a Total Maxx
- Catálogo
- Área do Revendedor
- Contato
- Política de Privacidade
- Termos de Uso

### Redes sociais

Manter apenas as redes realmente utilizadas pela Total Maxx.

Provavelmente:

- Instagram
- WhatsApp

Não incluir GitHub, X, Facebook, LinkedIn ou YouTube sem necessidade real.

## Rodapé inferior

Substituir a autoria original por:

`© Total Maxx Import & Export. Todos os direitos reservados.`

O ano deve continuar sendo gerado automaticamente.

## Comportamento responsivo esperado

### Desktop

- marca e descrição à esquerda;
- colunas de links à direita;
- alinhamento horizontal;
- linhas divisórias preservadas;
- largura máxima centralizada.

### Tablet

- manter a estrutura em grade;
- reduzir espaçamentos;
- evitar que os links fiquem apertados.

### Mobile

- empilhar os blocos;
- logo e descrição primeiro;
- links depois;
- redes sociais em uma linha;
- copyright centralizado;
- sem overflow horizontal;
- espaçamento confortável para toque.

## Animações e interações

Este componente não precisa de uma animação principal.

Pode receber apenas:

- fade-in suave ao entrar na viewport;
- hover discreto nos links;
- hover leve nos ícones;
- transição de cor entre 150ms e 250ms.

Evitar:

- parallax;
- movimentos contínuos;
- glow forte;
- efeitos de cursor;
- animações chamativas.

## Pontos técnicos importantes

- o componente original usa TypeScript;
- depende de Tailwind CSS;
- usa `lucide-react`;
- foi pensado para uma estrutura shadcn;
- o projeto novo deve ter aliases configurados para `@/components`;
- o caminho sugerido é `src/components/ui/minimal-footer.tsx`;
- o componente deve receber conteúdo por props ou constantes adaptáveis;
- links devem ser reais antes da publicação;
- ícones sociais devem ter `aria-label`;
- links externos devem usar `rel="noopener noreferrer"`;
- o footer deve usar o elemento semântico `<footer>`.

## Dependências

```bash
bun add lucide-react