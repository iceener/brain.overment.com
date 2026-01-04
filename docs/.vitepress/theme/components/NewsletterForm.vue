<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const status = ref('idle') // idle | loading | success | exists | error
const message = ref('')
const touched = ref(false)

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim().toLowerCase())
})

const canSubmit = computed(() => {
  return isValidEmail.value && status.value !== 'loading'
})

const showValidationError = computed(() => {
  return touched.value && email.value.length > 0 && !isValidEmail.value
})

const subscribe = async () => {
  touched.value = true
  if (!canSubmit.value) return
  
  status.value = 'loading'
  message.value = ''
  
  try {
    const response = await fetch('https://alice.overment.com/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim().toLowerCase()
      })
    })
    
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid response')
    }
    
    const data = await response.json()
    status.value = data.status || (response.ok ? 'success' : 'error')
    
    if (status.value === 'success') {
      message.value = data.message || 'Got it. Talk soon.'
      email.value = ''
      touched.value = false
    } else if (status.value === 'exists') {
      message.value = data.message || "You're already on the list."
    } else {
      message.value = data.message || "Hmm, that didn't work. Try again?"
    }
  } catch (err) {
    status.value = 'error'
    message.value = "Hmm, something's off. Mind trying again?"
  }
}
</script>

<template>
  <div class="connectForm">
    <form class="connectForm__form" @submit.prevent="subscribe">
      <input
        v-model="email"
        class="connectForm__input"
        :class="{ 'is-invalid': showValidationError }"
        type="email"
        inputmode="email"
        autocomplete="email"
        placeholder="your@email.com"
        :disabled="status === 'loading'"
        :aria-invalid="showValidationError ? 'true' : 'false'"
        @blur="touched = true"
      />

      <button
        class="connectForm__button"
        type="submit"
        :disabled="!canSubmit"
      >
        <span v-if="status === 'loading'">Sending…</span>
        <span v-else>I'm in</span>
      </button>
    </form>

    <Transition name="fade">
      <p v-if="showValidationError" class="connectForm__hint connectForm__hint--error">
        That email doesn’t look right.
      </p>
    </Transition>

    <Transition name="fade">
      <div
        v-if="message && !showValidationError"
        class="connectForm__notice"
        :class="`is-${status}`"
        role="status"
        aria-live="polite"
      >
        <span class="connectForm__noticeIcon" aria-hidden="true">
          <svg v-if="status === 'success' || status === 'exists'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
        </span>
        <span class="connectForm__noticeText">{{ message }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.connectForm {
  max-width: 420px;
  margin: 2rem 0;
}

.connectForm__form {
  display: flex;
  gap: 10px;
  align-items: center;
}

.connectForm__input {
  flex: 1;
  height: 40px;
  border-radius: 8px;
  padding: 0 12px;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-bg-color);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
}

.connectForm__input::placeholder {
  color: var(--vp-c-text-2);
  opacity: 0.75;
}

.connectForm__input:hover {
  border-color: var(--vp-c-border);
}

.connectForm__input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.connectForm__input:disabled {
  opacity: 0.6;
}

.connectForm__input.is-invalid {
  border-color: var(--vp-c-danger-1);
  box-shadow: 0 0 0 3px var(--vp-c-danger-soft);
}

.connectForm__button {
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  white-space: nowrap;
}

.connectForm__button:hover:enabled {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-button-alt-hover-bg);
}

.connectForm__button:active:enabled {
  background-color: var(--vp-button-alt-active-bg);
}

.connectForm__button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.connectForm__hint {
  margin-top: 8px;
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}

.connectForm__hint--error {
  color: var(--vp-c-danger-1);
}

.connectForm__notice {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px solid transparent;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.connectForm__noticeIcon {
  margin-top: 1px;
  color: var(--vp-c-text-2);
}

.connectForm__noticeText {
  font-size: 14px;
  line-height: 20px;
}

.connectForm__notice.is-success,
.connectForm__notice.is-exists {
  border-color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
  background-color: var(--vp-c-brand-soft);
}

.connectForm__notice.is-success .connectForm__noticeIcon,
.connectForm__notice.is-exists .connectForm__noticeIcon {
  color: var(--vp-c-brand-1);
}

.connectForm__notice.is-error {
  border-color: var(--vp-c-danger-1);
  border-color: color-mix(in srgb, var(--vp-c-danger-1) 35%, transparent);
  background-color: var(--vp-c-danger-soft);
}

.connectForm__notice.is-error .connectForm__noticeIcon {
  color: var(--vp-c-danger-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 520px) {
  .connectForm__form {
    flex-direction: column;
    align-items: stretch;
  }

  .connectForm__button {
    width: 100%;
  }
}
</style>
