# 🧠 AI Agentic Development Protocol
## Stack: Next.js + Supabase + Vercel + Solidity (Hardhat) + Celo

---

## 0. Propósito del Documento

Este documento define el **flujo obligatorio de desarrollo** para este proyecto.
Funciona como:

- Marco de trabajo agentico para IA (Antigravity)
- Sistema de control de calidad humano-IA
- Mecanismo anti-alucinación
- Fuente única de verdad del progreso del proyecto

⚠️ **Toda contribución generada por IA debe seguir este protocolo.**
⚠️ **Ningún código se considera válido hasta ser verificable.**

---

## 1. Principios Fundamentales

### 1.1 Desarrollo Agentico Responsable
- La IA **propone**, el humano **verifica**
- La IA **no asume configuraciones**
- Todo lo que no esté explícito se marca como `UNKNOWN`

### 1.2 Ingestión de Contexto y Anti-Alucinación
La IA debe:
- Declarar qué sabe
- Declarar qué asume
- Declarar qué no sabe
- Sugerir cómo verificar cada paso

### 1.3 Mejora Cuantitativa por Iteración
Cada iteración debe:
- Reducir ambigüedad
- Aumentar precisión técnica
- Reutilizar contexto previo
- Dejar rastros verificables (commits, tests, logs)

---

## 2. Stack Oficial (No Negociable)

- **Frontend:** Next.js (App Router)
- **Backend:** Supabase (Postgres + Auth + Edge Functions si aplica)
- **Database ORM:** Prisma
- **Infra:** Vercel
- **Smart Contracts:** Solidity
- **Tooling:** Hardhat
- **Network:** Celo
- **IDE Agentico:** Antigravity

⚠️ No se introducen nuevas tecnologías sin una sección explícita de justificación.

---

## 3. Gestión de Variables de Entorno

- Todos los valores de `.env` serán proporcionados por el equipo humano
- La IA **nunca inventa valores**
- La IA solo puede:
  - Referenciar nombres de variables
  - Indicar cuándo son necesarias
  - Explicar su propósito

Ejemplo válido:
```txt
NEXT_PUBLIC_SUPABASE_URL=PROVIDED_BY_TEAM
```
