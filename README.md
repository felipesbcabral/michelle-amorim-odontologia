# 🌟 Dra. Michelle Amorim - Odontopediatria Mágica

Landing page premium para clínica de odontopediatria com experiência imersiva de "Parque Temático".

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4.svg)

## ✨ Características

- **🎨 Design Premium**: Glassmorphism, glows, e efeitos visuais futuristas
- **🎭 Salas Temáticas**: Star Wars, Disney, Gamer e Safari
- **✨ Animações Fluidas**: Framer Motion com parallax e micro-interações
- **📱 Responsivo**: Layout adaptável para todos os dispositivos
- **⚡ Performance**: Vite para build rápido e otimizado
- **🎮 HUD Futurista**: Seção de tecnologia com visual de painel de controle

## 🚀 Tecnologias

- React 18.x
- TypeScript 5.x
- Vite 5.x
- Tailwind CSS 3.x
- Framer Motion
- Lucide React (ícones)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Navigation.tsx           # Navegação fixa com glassmorphism
│   ├── HeroSection.tsx          # Seção principal com impacto visual
│   ├── WorldsSection.tsx        # Grid de salas temáticas
│   ├── CommanderSection.tsx     # Sobre a Dra. Michelle ("Quem é a Comandante?")
│   ├── TechArsenal.tsx          # Equipamentos com HUD futurista
│   ├── Testimonials.tsx         # Depoimentos em carrossel ("Relatórios da Frota")
│   ├── Footer.tsx               # Rodapé ("Base de Operações")
│   ├── WhatsAppFAB.tsx          # Botão flutuante do WhatsApp com pulse
│   ├── FloatingParticles.tsx    # Efeito de partículas no fundo
│   ├── MagicButton.tsx          # Botão com efeitos especiais
│   ├── GlassCard.tsx            # Card com tilt 3D e glassmorphism
│   └── index.ts                 # Exportações
├── App.tsx                      # Componente principal
├── main.tsx                     # Entry point
└── index.css                    # Estilos globais e design system
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🗺️ Fluxo da Landing Page

1. **Hero Section** - Impacto visual com título animado e foto da Dra.
2. **Worlds Section** - Apresentação das 4 salas temáticas
3. **Commander Section** - Sobre a Dra. Michelle com efeito holográfico
4. **Tech Arsenal** - Equipamentos com visual de HUD futurista
5. **Testimonials** - Depoimentos dos pais em carrossel
6. **Footer** - Contato, links e CTA final
7. **WhatsApp FAB** - Botão flutuante fixo no canto inferior direito

## 🖼️ Onde Colocar as Imagens

### Hero Section - `HeroSection.tsx`

**Foto da Dra. Michelle** (linha ~143):
```tsx
<img 
  src="/images/dra-michelle.png" 
  alt="Dra. Michelle Amorim"
  className="absolute inset-0 w-full h-full object-cover object-top"
/>
```

**Elemento decorativo flutuante** (linha ~175):
```tsx
<img 
  src="/images/mascote.png" 
  alt="Mascote"
  className="w-full h-full object-contain"
/>
```

### Commander Section - `CommanderSection.tsx`

**Foto da Dra. no frame holográfico** (linha ~85):
```tsx
<img 
  src="/images/dra-michelle-profissional.png" 
  alt="Dra. Michelle Amorim"
  className="w-full h-full object-cover"
/>
```

### Worlds Section - `WorldsSection.tsx`

**Preview das salas** (linha ~115):
```tsx
<img 
  src={`/images/sala-${world.id}.jpg`}
  alt={world.title}
  className="w-full h-full object-cover"
/>
```

### Estrutura de Pastas para Imagens

```
public/
└── images/
    ├── dra-michelle.png          # Hero (círculo)
    ├── dra-michelle-profissional.png  # Sobre (holograma)
    ├── mascote.png               # Elemento flutuante
    ├── sala-starwars.jpg         # Sala Galáxia
    ├── sala-disney.jpg           # Sala Reino Disney
    ├── sala-gamer.jpg            # Sala Arena Gamer
    └── sala-safari.jpg           # Sala Savana
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Celeste | `#38bdf8` | Destaques, links |
| Azul Royal | `#1e40af` | Fundo, botões |
| Roxo Neon | `#a855f7` | Glows, acentos |
| Ciano Tech | `#06b6d4` | HUD, tecnologia |
| Dourado | `#fbbf24` | Estrelas, destaque |
| Verde WhatsApp | `#22c55e` | FAB button |

## 🎭 Seções e Conceitos

### 1. Hero - "Parque Temático de Sorrisos"
Título grande com gradiente, partículas flutuantes, foto da Dra. em círculo glassmorphism.

### 2. Worlds - "Escolha Seu Mundo"
4 salas temáticas em cards com tilt 3D:
- 🚀 **Galáxia** (Star Wars)
- 🏰 **Reino** (Disney)
- 🎮 **Arena** (Gamer)
- 🦁 **Savana** (Safari)

### 3. Commander - "Quem é a Comandante?"
Sobre a Dra. Michelle com frame holográfico, skills animadas, formação Psicologia + Odonto.

### 4. Tech Arsenal - "Arsenal Tecnológico"
HUD futurista com grid animado, equipamentos médicos com efeito de scan:
- Raio-X Digital
- Anestesia Computadorizada
- Scanner Intraoral
- Monitores Interativos
- Laser de Baixa Potência
- Autoclave

### 5. Testimonials - "Relatórios da Frota"
Carrossel de depoimentos dos pais com estrelas douradas animadas e estatísticas.

### 6. Footer - "Base de Operações"
Rodapé com glow, links rápidos, informações de contato e CTA final.

## 📱 Responsividade

- **Desktop**: Layout completo com todas as animações
- **Tablet**: Grid adaptativo, navegação simplificada
- **Mobile**: Menu hamburguer, empilhamento vertical, FAB WhatsApp

## 🔧 Customização

### Adicionar nova sala temática

Em `WorldsSection.tsx`, adicione ao array `worlds`:

```typescript
{
  id: 'nova-sala',
  title: 'Nome',
  subtitle: 'Tema',
  description: 'Descrição...',
  icon: <IconComponent />,
  emoji: '🎯',
  color: 'purple',
  bgGradient: 'from-...',
  features: ['Feature 1', 'Feature 2'],
}
```

### Adicionar novo equipamento

Em `TechArsenal.tsx`, adicione ao array `techItems`:

```typescript
{
  id: 'equipamento',
  icon: <IconComponent className="w-6 h-6" />,
  title: 'Nome do Equipamento',
  description: 'Descrição...',
  specs: ['Spec 1', 'Spec 2', 'Spec 3'],
}
```

### Configurar WhatsApp

Em `WhatsAppFAB.tsx`, altere:
```typescript
const phoneNumber = '5561999999999'; // Seu número com código do país
const message = 'Sua mensagem personalizada';
```

## 📄 Licença

Projeto desenvolvido para Dra. Michelle Amorim - Odontopediatria.

---

**Nota**: Este projeto utiliza Framer Motion para animações. Para melhor performance em dispositivos móveis, considere usar `useReducedMotion`.

**Desenvolvido com 💜 e muita magia!**
