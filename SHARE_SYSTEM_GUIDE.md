# Sistema de Compartilhamento - ShareButton

## Visão Geral

Implementei um sistema completo de compartilhamento que permite aos usuários compartilhar artigos através de redes sociais, copiar links e usar o compartilhamento nativo do dispositivo.

## Componentes Criados

### 1. ShareButton (`/src/components/ui/share-button.tsx`)

Componente principal que oferece múltiplas opções de compartilhamento:

#### **Funcionalidades:**

- **Compartilhamento Nativo**: Usa a API `navigator.share` quando disponível
- **Copiar Link**: Copia o URL para a área de transferência
- **Redes Sociais**: Facebook, Twitter, LinkedIn, WhatsApp
- **Toasts**: Feedback visual para ações do usuário
- **Responsivo**: Funciona em desktop e mobile

#### **Props:**

```typescript
interface ShareButtonProps {
  url: string; // URL do artigo
  title: string; // Título do artigo
  description?: string; // Descrição/excerpt (opcional)
  className?: string; // Classes CSS customizadas
  size?: "sm" | "default" | "lg"; // Tamanho do botão
  variant?: "default" | "ghost" | "outline"; // Variante do botão
}
```

### 2. DropdownMenu (`/src/components/ui/dropdown-menu.tsx`)

Componente base do shadcn/ui para o menu dropdown de compartilhamento.

### 3. Toaster (`/src/components/ui/toaster.tsx`)

Sistema de notificações toast integrado com o tema do projeto.

## Implementações

### 1. Página do Artigo (`/src/app/junco-news/[uid]/page.tsx`)

```typescript
<ShareButton
    url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${page.uid}`}
    title={page.data.title?.[0]?.text || 'Artigo'}
    description={page.data.excerpt?.[0]?.text || ''}
/>
```

### 2. Cards de Artigos (ArticlesGrid e FeaturedArticles)

```typescript
<ShareButton
    url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${article.uid}`}
    title={article.data.title?.[0]?.text || 'Artigo'}
    description={article.data.excerpt?.[0]?.text || ''}
    size="sm"
    variant="ghost"
/>
```

## Opções de Compartilhamento

### 1. **Compartilhamento Nativo**

- Usa `navigator.share()` quando disponível (principalmente mobile)
- Fallback para copiar link em navegadores sem suporte

### 2. **Copiar Link**

- Copia o URL para a área de transferência
- Toast de confirmação
- Fallback para `document.execCommand` em navegadores antigos

### 3. **Redes Sociais**

#### **Facebook**

```
https://www.facebook.com/sharer/sharer.php?u={URL}
```

#### **Twitter**

```
https://twitter.com/intent/tweet?url={URL}&text={TITLE}
```

#### **LinkedIn**

```
https://www.linkedin.com/sharing/share-offsite/?url={URL}
```

#### **WhatsApp**

```
https://wa.me/?text={TITLE}%20{URL}
```

## Configuração

### 1. **Variáveis de Ambiente**

Adicione ao seu `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://seudominio.com
```

### 2. **Dependências Instaladas**

```json
{
  "sonner": "^1.x.x",
  "@radix-ui/react-dropdown-menu": "^2.x.x"
}
```

### 3. **Layout Principal**

O `Toaster` foi adicionado ao layout principal (`/src/app/layout.tsx`) para exibir notificações.

## Uso em Outros Componentes

### Exemplo Básico:

```typescript
import { ShareButton } from "@/components/ui/share-button";

<ShareButton
    url="https://exemplo.com/artigo"
    title="Título do Artigo"
    description="Descrição do artigo"
/>
```

### Exemplo com Customizações:

```typescript
<ShareButton
    url="https://exemplo.com/artigo"
    title="Título do Artigo"
    description="Descrição do artigo"
    size="lg"
    variant="outline"
    className="custom-class"
/>
```

## Funcionalidades Técnicas

### 1. **Detecção de Suporte**

- Verifica se `navigator.share` está disponível
- Fallback automático para copiar link

### 2. **Encoding de URLs**

- URLs e textos são automaticamente codificados
- Suporte a caracteres especiais e emojis

### 3. **Acessibilidade**

- Suporte a navegação por teclado
- ARIA labels apropriados
- Foco gerenciado corretamente

### 4. **Responsividade**

- Funciona em desktop e mobile
- Menu dropdown responsivo
- Toasts adaptáveis ao tema

## Personalização

### 1. **Estilos**

O componente usa as classes do Tailwind e pode ser customizado via `className`:

```typescript
<ShareButton
    className="bg-custom-color text-white hover:bg-custom-hover"
    // ... outras props
/>
```

### 2. **Redes Sociais Adicionais**

Para adicionar novas redes sociais, modifique o `handleShare` no `ShareButton`:

```typescript
case "instagram":
    shareUrl = `https://www.instagram.com/`;
    break;
```

### 3. **Texto dos Toasts**

Os textos dos toasts podem ser customizados no componente:

```typescript
toast.success("Link copiado com sucesso!");
```

## Vantagens

1. **UX Melhorada**: Múltiplas opções de compartilhamento
2. **Acessibilidade**: Suporte completo a leitores de tela
3. **Responsivo**: Funciona em todos os dispositivos
4. **Reutilizável**: Componente genérico para qualquer conteúdo
5. **Feedback Visual**: Toasts informativos para o usuário
6. **Fallbacks**: Funciona mesmo em navegadores antigos

## Troubleshooting

### **Toast não aparece**

- Verifique se o `Toaster` está no layout principal
- Confirme se o `sonner` está instalado

### **Compartilhamento nativo não funciona**

- Normal em desktop (não suportado)
- Deve funcionar em mobile com HTTPS

### **Links quebrados**

- Verifique se `NEXT_PUBLIC_BASE_URL` está configurado
- Confirme se as URLs dos artigos estão corretas
