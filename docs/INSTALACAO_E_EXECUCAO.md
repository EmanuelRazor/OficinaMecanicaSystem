# Instalação e Execução

## 1. Pré-requisitos

Para executar o projeto são necessários:

- Node.js com suporte nativo a `fetch`;
- npm;
- Android Studio com Android Emulator, para testes no emulador;
- Expo Go ou ambiente Expo compatível com o projeto.

## 2. Backend

Acesse:

```text
System/Backend
```

Instale as dependências:

```bash
npm install
```

Inicie a API:

```bash
npm start
```

Resultado esperado:

```text
API rodando na porta 3000 🚀
```

No navegador do computador, teste:

```text
http://localhost:3000/clientes
```

Sem registros cadastrados, a resposta esperada é:

```json
[]
```

## 3. Frontend

Acesse:

```text
System/Frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

No PowerShell, se a política de execução bloquear o `npx`, utilize:

```powershell
npx.cmd expo start
```

## 4. Android Emulator

Com o Android Emulator aberto, no terminal do Expo pressione:

```text
a
```

O frontend usa, por padrão, o endereço:

```text
http://10.0.2.2:3000
```

No Android Emulator, `10.0.2.2` representa o computador que executa o emulador.

Para testar diretamente no navegador do emulador:

```text
http://10.0.2.2:3000/clientes
```

## 5. Celular físico

Um celular físico precisa alcançar o computador pela rede local.

Crie:

```text
System/Frontend/.env.local
```

Com:

```env
EXPO_PUBLIC_API_URL=http://IP_DO_COMPUTADOR:3000
```

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.50:3000
```

Depois reinicie o Expo com o cache limpo:

```powershell
npx.cmd expo start --clear
```

O arquivo `.env.local` é local e não deve ser enviado ao Git.

## 6. Rede institucional ou restrita

Se um celular físico não conseguir acessar o computador por causa de isolamento da rede, utilize o Android Emulator no mesmo computador.

Caso seja necessário encaminhar a porta via ADB, pode-se utilizar:

```powershell
adb reverse tcp:3000 tcp:3000
```

Nesse caso configure temporariamente:

```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:3000
```

Essa configuração altera apenas o caminho de rede. As requisições do aplicativo continuam sendo realizadas com `fetch`.
