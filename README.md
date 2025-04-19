## Estrutura do Projeto

```
.
├── client     → Frontend em React (Vite)
├── server     → Backend em Node.js (Express)
├── worker     → Worker para envio de e-mails (Nodemailer)
├── queue.json → Simulação de fila (JSON local)
└── render.yaml → Configuração dos serviços Render
```

---

## 🛠️ Tecnologias Utilizadas

- React (Vite)
- Node.js + Express
- Nodemailer
- Render (deploy IaaS)
- JSON como fila simulada

---

## 📦 Instalação e Execução Local

### 1. Clone o repositório
```bash
git clone https://github.com/matheusduartedevs/iaas-sample/
cd seu-repo
```

### 2. Inicie o Backend
```bash
cd server
npm install
npm start
```

### 3. Inicie o Frontend
```bash
cd ../client
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### 4. Configure o Worker
1. Crie um arquivo `.env` dentro da pasta `/worker` com:

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
```

> ⚠️ **Use uma senha de app do Gmail**, não a senha normal.

2. Instale e execute:
```bash
cd ../worker
npm install
npm start
```

---

## 🌐 Subindo para o Render

### 1. Suba o projeto para o GitHub

```bash
git init
git add .
git commit -m "Projeto de email com worker"
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

### 2. No painel do [Render](https://dashboard.render.com):
- Vá em **Blueprints > New Blueprint**
- Conecte seu repositório
- Render vai detectar automaticamente o `render.yaml`
- Configure as variáveis de ambiente do **worker**:

| Nome         | Valor                        |
|--------------|------------------------------|
| EMAIL_USER   | seu-email@gmail.com          |
| EMAIL_PASS   | sua-senha-de-app-do-gmail    |

---

## 🥪 Fluxo de funcionamento

1. Usuário preenche e envia o e-mail via formulário no frontend
2. O backend recebe e salva o e-mail na `queue.json`
3. O worker lê periodicamente a fila e envia o e-mail real usando o Gmail

---

## 📬 Resultado

O usuário receberá um e-mail com o conteúdo pré-definido diretamente do sistema, demonstrando o uso de serviços em background (IaaS).

