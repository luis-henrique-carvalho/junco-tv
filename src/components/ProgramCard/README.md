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

- **Layout horizontal premium** com design moderno e atrativo
- Altura mínima: 500px (lg: 600px)
- **Seção da Imagem (2/5 da largura)**:
  - Background com gradientes radiais e padrões artísticos
  - Imagem grande: w-48 h-48 (lg: w-56 h-56, xl: w-64 h-64)
  - Efeitos de glow, blur e elementos flutuantes animados
  - Ring com sombra e badge de tipo de programa
- **Seção do Conteúdo (3/5 da largura)**:
  - Título: text-2xl (lg: text-3xl, xl: text-4xl) com gradiente
  - Descrição: text-base (lg: text-lg, xl: text-xl) com line-clamp-4/6
  - Botão: h-12 (lg: h-14) com efeitos shimmer e gradientes
- **Responsivo**: Layout vertical em mobile, horizontal em desktop

## Melhorias de UX na Variante Single

### 🎨 **Design Premium Aprimorado**

- **Layout horizontal premium** com seções bem definidas
- **Seção da imagem** com background artístico e efeitos visuais
- **Imagem em destaque** com glow effects e animações
- **Hierarquia visual clara** com tipografia gradiente
- **Elementos flutuantes** com animações sutis
- **Transições suaves** entre breakpoints responsivos

### 📱 **Responsividade Inteligente**

- **Mobile**: Layout vertical (imagem no topo)
- **Desktop**: Layout horizontal (imagem à esquerda)
- **Breakpoint**: lg (1024px) para mudança de layout

### 🎯 **Experiência do Usuário Premium**

- **Leitura otimizada** com tipografia gradiente e hierarquia clara
- **Imagem impactante** com efeitos visuais e animações
- **Botão moderno** com efeitos shimmer e gradientes
- **Background artístico** com gradientes radiais
- **Elementos interativos** com feedback visual avançado
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
