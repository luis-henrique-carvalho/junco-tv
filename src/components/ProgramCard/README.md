# Program Card Components

Esta pasta contém os componentes modulares para exibir cards de programas/podcasts.

## Componentes Disponíveis

### ProgramCard

Componente principal que orquestra todos os subcomponentes com suporte a duas variantes:

#### Variante Default (Múltiplos Programas)

```tsx
import { ProgramCard } from "@/components/ProgramCard";

<ProgramCard
  program={programItem}
  index={0}
  programType="PODCAST"
  buttonText="Ver Episódios"
  variant="default" // ou omitir (padrão)
/>;
```

#### Variante Single (Programa Único)

```tsx
import { ProgramCard } from "@/components/ProgramCard";

<ProgramCard
  program={programItem}
  index={0}
  programType="PODCAST"
  buttonText="Ver Episódios"
  variant="single"
/>;
```

## Variantes Disponíveis

### `variant="default"`

- Layout compacto para grid de múltiplos programas
- Altura mínima: 420px (lg: 480px)
- Imagem: 224px (lg: 256px)
- Título: text-2xl (lg: text-3xl)
- Descrição: text-base (lg: text-lg) com line-clamp-5/6
- Botão: py-6 com text-base

### `variant="single"`

- **Layout horizontal** com imagem à esquerda e conteúdo à direita
- Altura mínima: 500px (lg: 600px)
- **Imagem**: Ocupa 50% da largura, altura total do card
- **Título**: text-2xl (lg: text-3xl, xl: text-4xl)
- **Descrição**: text-base (lg: text-lg, xl: text-xl) com line-clamp-6/8
- **Botão**: py-4 (lg: py-6) com text-base (lg: text-lg)
- **Responsivo**: Layout vertical em mobile, horizontal em desktop

## Melhorias de UX na Variante Single

### 🎨 **Design Aprimorado**

- **Layout horizontal** que aproveita melhor o espaço da tela
- **Imagem em destaque** ocupando 50% da largura
- **Hierarquia visual clara** com espaçamento otimizado
- **Transições suaves** entre breakpoints responsivos

### 📱 **Responsividade Inteligente**

- **Mobile**: Layout vertical (imagem no topo)
- **Desktop**: Layout horizontal (imagem à esquerda)
- **Breakpoint**: lg (1024px) para mudança de layout

### 🎯 **Experiência do Usuário**

- **Leitura otimizada** com tipografia balanceada
- **Call-to-action destacado** na parte inferior
- **Efeitos hover** mantidos em ambos os layouts
- **Acessibilidade preservada** em todas as variantes

## Lógica Automática no ProgramsList

O componente `ProgramsList` automaticamente detecta a quantidade de programas e aplica a variante apropriada:

- **1 programa**: Usa `variant="single"` com layout centralizado
- **2+ programas**: Usa `variant="default"` com grid de 2 colunas

```tsx
// Automaticamente aplicado no ProgramsList
{
  primary.program.map((programItem, index) => (
    <ProgramCard
      key={index}
      program={programItem}
      index={index}
      programType="PODCAST"
      buttonText="Ver Episódios"
      variant={primary.program.length === 1 ? "single" : "default"}
    />
  ));
}
```

## Subcomponentes

### ProgramImage

Componente para exibir a imagem do programa com efeitos visuais.

```tsx
import { ProgramImage } from "@/components/ProgramCard";

<ProgramImage
  image={program.program_image}
  programType="PODCAST"
  variant="single" // ou "default"
/>;
```

### ProgramHeader

Componente para o título do programa.

```tsx
import { ProgramHeader } from "@/components/ProgramCard";

<ProgramHeader
  title={program.program_title}
  variant="single" // ou "default"
/>;
```

### ProgramDescription

Componente para a descrição rica do programa.

```tsx
import { ProgramDescription } from "@/components/ProgramCard";

<ProgramDescription
  description={program.program_description}
  variant="single" // ou "default"
/>;
```

### ProgramEpisodesButton

Componente para o botão de episódios.

```tsx
import { ProgramEpisodesButton } from "@/components/ProgramCard";

<ProgramEpisodesButton
  episodesLink={program.program_episodes_list}
  buttonText="Ver Episódios"
  variant="single" // ou "default"
/>;
```

## Uso Individual

Você pode usar os componentes individualmente para criar layouts customizados:

```tsx
import {
  ProgramImage,
  ProgramHeader,
  ProgramDescription,
  ProgramEpisodesButton,
} from "@/components/ProgramCard";

<Card className="custom-card">
  <ProgramImage image={program.program_image} variant="single" />
  <ProgramHeader title={program.program_title} variant="single" />
  <ProgramDescription
    description={program.program_description}
    variant="single"
  />
  <ProgramEpisodesButton
    episodesLink={program.program_episodes_list}
    variant="single"
  />
</Card>;
```

## Props

Todos os componentes seguem as boas práticas do projeto:

- Utilizam `next/image` para otimização de imagens
- Seguem o design system com shadcn/ui e Tailwind
- Incluem acessibilidade adequada
- Suportam tema escuro
- São Server Components quando possível
