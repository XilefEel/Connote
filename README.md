# Connote

Connote adalah platform kolaborasi catatan akademik berbasis web untuk mahasiswa Indonesia.
Terinspirasi dari filosofi open source GitHub dan komunitas diskusi Reddit, Connote memungkinkan
mahasiswa untuk membuat, mengembangkan, dan berkolaborasi dalam membangun catatan akademik
terbaik secara bersama-sama.

## Requirements
- [Node.js](https://nodejs.org/) v22.17.0+
- [Bun](https://bun.sh/) v1.3.9+

## Run Locally

Clone the repo
```bash
git clone https://github.com/XilefEel/Connote.git
cd Connote
```

Start frontend server
```bash
cd frontend
npm install
npm run dev
```

Start backend server
```bash
cd ../backend
bun install
bunx drizzle-kit generate
bunx drizzle-kit migrate
bun run dev
```
