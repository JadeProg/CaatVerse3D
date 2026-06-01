# 🌵 CaatVerse3D — Experiência 3D Interativa sobre a Caatinga

O **CaatVerse3D** é uma experiência 3D interativa desenvolvida com **React Three Fiber (R3F)** e **Three.js**, onde o usuário explora um vilarejo inspirado na Caatinga e interage com pontos informativos sobre espécies, memória ambiental e preservação.

O projeto une **Web3, educação ambiental, experiência 3D e interatividade**, criando uma forma mais intuitiva e visual de apresentar o CaatVerse para pessoas que ainda não conhecem blockchain, ativos digitais ou preservação simbólica de espécies.

---

## 🖼️ Preview

> O usuário controla um personagem em terceira pessoa e explora o ambiente usando teclado **W, A, S, D** ou joystick virtual no mobile.

Durante a exploração, o usuário encontra círculos interativos próximos às placas do cenário. Ao se aproximar, cards informativos aparecem na tela com imagens e textos sobre a Caatinga.

---

## 🌱 Sobre o CaatVerse

O **CaatVerse** é uma proposta de experiência Web3 voltada à valorização da Caatinga. A ideia é permitir que espécies, plantas e símbolos do bioma sejam representados por ativos digitais, funcionando como registros simbólicos de memória, educação e conscientização.

A proposta não afirma que um ativo digital salva diretamente uma espécie, mas usa a tecnologia como ferramenta para:

- divulgar informações sobre a Caatinga;
- preservar simbolicamente a memória de espécies;
- tornar o aprendizado mais acessível;
- incentivar interesse por preservação ambiental;
- aproximar pessoas de conceitos de Web3 de forma simples.

---

## ✨ Funcionalidades

- Exploração de ambiente 3D inspirado na Caatinga.
- Controle de personagem em terceira pessoa.
- Suporte a teclado e joystick virtual.
- Cards informativos interativos.
- Círculos de interação próximos às placas do cenário.
- Imagens ilustrativas para cada card.
- Música ambiente.
- Detecção de desempenho gráfico para ajustar a qualidade da experiência.
- Colisões e física com Rapier.
- Interface responsiva para desktop e mobile.

---

## 🧭 Cards Interativos

A experiência possui pontos de curiosidade sobre temas como:

- **Santuário das Espécies**
- **Umbuzeiro**
- **Ararinha-azul**
- **Cactos da Caatinga**

Cada card apresenta uma imagem e um texto explicativo, conectando a espécie ou elemento da Caatinga com a proposta do CaatVerse.

---

## 🚀 Tecnologias Utilizadas

### Core

- **React**
- **Vite**
- **Three.js**
- **React Three Fiber**

### Ecossistema 3D

- **@react-three/drei**
- **@react-three/fiber**
- **@react-three/rapier**

### Física

- **@react-three/rapier**
- **@dimforge/rapier3d-compat**

Utilizado para colisões, gravidade e movimentação física do personagem dentro do ambiente 3D.

### Extras

- **detect-gpu** — detecção de capacidade gráfica
- **react-joystick-component** — joystick virtual para mobile
- **Three.js** — manipulação e renderização do ambiente 3D

---

## 📦 Dependências

```json
{
  "@dimforge/rapier3d-compat": "^0.19.3",
  "@react-three/drei": "^10.7.7",
  "@react-three/fiber": "^9.5.0",
  "@react-three/rapier": "^2.2.0",
  "@types/three": "^0.182.0",
  "detect-gpu": "^5.0.70",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-joystick-component": "^6.2.1",
  "three": "^0.180.0",
  "vite": "^7.0.0"
}