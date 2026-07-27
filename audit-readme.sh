#!/usr/bin/env bash
set -e

OUT="audit-readme.txt"
: > "$OUT"

add () {
  printf "\n==================== %s ====================\n" "$1" >> "$OUT"
}

add "PWD"
pwd >> "$OUT" 2>&1

add "ROOT FILES"
ls -la >> "$OUT" 2>&1

add "TOP TREE"
find . -maxdepth 2 -type f | sed 's#^\./##' | sort | head -n 300 >> "$OUT" 2>&1

add "PACKAGE JSON"
[ -f package.json ] && cat package.json >> "$OUT" 2>&1

add "VITE CONFIG"
[ -f vite.config.js ] && cat vite.config.js >> "$OUT" 2>&1
[ -f vite.config.mjs ] && cat vite.config.mjs >> "$OUT" 2>&1
[ -f vite.config.ts ] && cat vite.config.ts >> "$OUT" 2>&1

add "SRC TREE"
[ -d src ] && find src -maxdepth 4 -type f | sort >> "$OUT" 2>&1

add "ROUTER USAGE"
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  | sort \
  | xargs grep -RIn "createBrowserRouter\|Routes\|Route\|react-router" 2>/dev/null \
  | head -n 300 >> "$OUT" 2>&1 || true

add "API USAGE"
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  | sort \
  | xargs grep -RIn "axios\|fetch(\|baseURL\|/api/\|import.meta.env\|VITE_" 2>/dev/null \
  | head -n 500 >> "$OUT" 2>&1 || true

add "COMPONENTS"
find src -type f \( -iname "*component*" -o -path "*/components/*" \) | sort >> "$OUT" 2>&1 || true

add "PAGES"
find src -type f \( -path "*/pages/*" -o -iname "*page*" \) | sort >> "$OUT" 2>&1 || true

add "HOOKS"
find src -type f \( -path "*/hooks/*" -o -iname "use*.js" -o -iname "use*.jsx" -o -iname "use*.ts" -o -iname "use*.tsx" \) | sort >> "$OUT" 2>&1 || true

add "SERVICES"
find src -type f \( -path "*/services/*" -o -iname "*service*.js" -o -iname "*service*.ts" \) | sort >> "$OUT" 2>&1 || true

add "ENV FILES"
find . -maxdepth 2 -type f \( -name ".env*" -o -name "*.example" \) | sed 's#^\./##' | sort >> "$OUT" 2>&1

add "ENV VARS MASKED"
[ -f .env.example ] && { echo "--- .env.example ---"; cat .env.example; } >> "$OUT" 2>&1
[ -f .env ] && { echo "--- .env masked ---"; grep -E '^[A-Z0-9_]+=.*' .env | sed 's#=.*#=***#'; } >> "$OUT" 2>&1 || true

add "README CURRENT"
[ -f README.md ] && cat README.md >> "$OUT" 2>&1

echo "Generado: $OUT"
