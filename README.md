# Vue Global Translator

![NPM Version](https://img.shields.io/npm/v/vue-global-translator)
![License](https://img.shields.io/npm/l/vue-global-translator)
![Downloads](https://img.shields.io/npm/dw/vue-global-translator)

A lightweight and dynamic **Vue 3** library that provides seamless integration with a **Global Language and Currency Management System**.  
Built using **Pinia** for reactivity and **Axios** for API calls, it automatically handles fetching, caching, and syncing translations from your backend.

---

## 🚀 Features

- 🌐 **Dynamic Translations:** Fetch all UI text directly from your centralized backend.
- 🔁 **Auto Syncing:** Checks for new translation versions and syncs on app startup.
- 💾 **Persistent Caching:** Keeps translations in local storage for instant loading.
- ⚡ **Powered by Pinia:** Simple and modern reactive state management.
- 🧠 **Single API Source:** Update app languages and currencies without new builds.
- 🧩 **Simple Hook & Store API:** Use anywhere with one easy composable.

---

## ⚙️ Prerequisites

> **Important:**  
> This library is the **client-side component**.  
> You must have a backend or an account on the **Globalize Management Platform** to use it.

Your backend provides:
1. **API URL** (e.g., `https://api.globalize.karimapps.com/api/v1`)
2. **API Key** (unique per app)

---

## 📦 Installation

```bash
# Using npm
npm install vue-global-translator pinia axios

# Or Yarn
yarn add vue-global-translator pinia axios
```

---

## 🧩 Usage

### Step 1: Initialize in `main.js`

At app startup, initialize the service **once**.

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initLocalization } from 'vue-global-translator'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())

// Initialize localization service
initLocalization({
  apiUrl: 'https://api.globalize.karimapps.com/api/v1', // <-- Your backend URL
  apiKey: 'YOUR_API_KEY_HERE', // <-- Secure API key
  defaultLanguage: 'en', // Optional fallback language
  fetchCurrencies: true, // Optional: enable currency fetching
})

app.mount('#app')
```

---

### Step 2: Use in Components

Use the `useLocalization()` composable in any component.

```vue
<script setup>
import { useLocalization } from 'vue-global-translator'

const { t, currentLang, setLanguage, status } = useLocalization()
</script>

<template>
  <div class="container">
    <div v-if="status !== 'ready'">Loading translations...</div>
    <div v-else>
      <h1>{{ t('auth.welcome_message') }}</h1>

      <p>Current Language: {{ currentLang }}</p>

      <button @click="setLanguage('en')">English</button>
      <button @click="setLanguage('es')">Spanish</button>
      <button @click="setLanguage('ar')">Arabic</button>
    </div>
  </div>
</template>

<style>
.container {
  padding: 20px;
  text-align: center;
}
button {
  margin: 5px;
  padding: 10px 15px;
}
</style>
```

---

## 🌍 Handling RTL Layouts

Languages like Arabic (`ar`), Urdu (`ur`), or Hebrew (`he`) read **Right-to-Left (RTL)**.  
You can dynamically apply direction classes in Vue using the `isRTL` flag.

```vue
<script setup>
import { useLocalization } from 'vue-global-translator'

const { isRTL } = useLocalization()
</script>

<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <h2>Dynamic Layout Direction</h2>
    <p>This content flips automatically for RTL languages.</p>
  </div>
</template>
```

---

## 🧠 API Reference

| **Property**      | **Type**   | **Description**                                                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `t`               | `function` | Translate a key (e.g., `t('buttons.save')`).                                                                    |
| `status`          | `string`   | `'idle'`, `'loading'`, `'ready'`, or `'error'`.                                                                  |
| `currentLang`     | `string`   | Current language code.                                                                                           |
| `setLanguage()`   | `function` | Switch to another language (e.g., `setLanguage('es')`).                                                          |
| `currencies`      | `object`   | Object containing available currencies (if enabled).                                                             |
| `isRTL`           | `boolean`  | Indicates if the current language is right-to-left (useful for layout direction).                               |

---

## 💰 Example: Currency Usage

```vue
<script setup>
import { useLocalization } from 'vue-global-translator'

const { currencies } = useLocalization()
</script>

<template>
  <div>
    <h3>Available Currencies</h3>
    <ul>
      <li v-for="(currency, code) in currencies" :key="code">
        {{ currency.symbol }} - {{ currency.name }} ({{ code }})
      </li>
    </ul>
  </div>
</template>
```

---

## 🌐 Managing Translations

Translations and currencies are managed through the **Globalize Management Platform**:

- **Platform:** [https://globalize.karimapps.com](https://globalize.karimapps.com)
- **Admin Login:** [https://globalize.karimapps.com/admin](https://globalize.karimapps.com/admin)

> Contact the administrator to create your app and obtain your API credentials.

---

## 🪪 License

This project is licensed under the **MIT License**.

**Author:** [Mussab Hanif](https://github.com/mussabhanif)  
**Repository:** [karimApps142/vue-global-translator](https://github.com/karimApps142/vue-global-translator)

---

> Simple, dynamic, and ready for multilingual global apps 🌍
