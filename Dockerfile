# ==========================================
# Étape 1 : Installation des dépendances
# ==========================================
FROM node:22-alpine AS deps

# Activation de corepack + version stable de pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# ==========================================
# Étape 2 : Build de l'application
# ==========================================
FROM node:22-alpine AS builder

# Activation de pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copie des dépendances installées
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copie du code source
COPY . .

# Désactivation télémétrie Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build de l'application
RUN pnpm build

# ==========================================
# Étape 3 : Image de production
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Création utilisateur sécurisé
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des assets publics
COPY --from=builder /app/public ./public

# Copie du build standalone Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Utilisateur non-root
USER nextjs

# Exposition du port
EXPOSE 3000

# Démarrage de l'application
CMD ["node", "server.js"]