<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const status = ref('idle') // idle | loading | success | exists | error
const message = ref('')

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

const canSubmit = computed(() => {
  return isValidEmail.value && status.value !== 'loading'
})

const subscribe = async () => {
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
    
    // Human messages, not system messages
    if (status.value === 'success') {
      message.value = "Got it. Talk soon."
      email.value = ''
    } else if (status.value === 'exists') {
      message.value = "You're already on the list!"
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
  <div class="connect-form">
    <!-- Success state: clean and warm -->
    <Transition name="fade" mode="out-in">
      <div v-if="status === 'success'" class="success-state">
        <span class="success-text">{{ message }}</span>
      </div>
      
      <!-- Form state -->
      <form v-else @submit.prevent="subscribe" class="form-row">
        <div class="input-wrapper">
          <input
            v-model="email"
            type="email"
            placeholder="your email"
            class="email-input"
            :class="{ 'has-value': email.length > 0 }"
            :disabled="status === 'loading'"
            autocomplete="email"
          />
          <div class="input-line"></div>
        </div>
        
        <button 
          type="submit" 
          class="send-btn"
          :class="{ 'is-loading': status === 'loading', 'is-ready': canSubmit }"
          :disabled="!canSubmit"
        >
          <span v-if="status === 'loading'" class="loading-dots">
            <span></span><span></span><span></span>
          </span>
          <span v-else>→</span>
        </button>
      </form>
    </Transition>
    
    <!-- Error/exists message -->
    <Transition name="slide">
      <p v-if="message && status !== 'success'" class="feedback" :class="status">
        {{ message }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.connect-form {
  max-width: 340px;
  margin: 2.5rem 0;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.email-input {
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1.1rem;
  font-family: inherit;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  outline: none;
  transition: all 0.3s ease;
}

.email-input::placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
  opacity: 0.7;
}

.email-input:focus {
  border-color: var(--vp-c-text-2);
}

.email-input.has-value {
  border-color: var(--vp-c-text-2);
}

.email-input:disabled {
  opacity: 0.5;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.email-input:focus ~ .input-line,
.email-input.has-value ~ .input-line {
  width: 100%;
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.send-btn.is-ready {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

.send-btn.is-ready:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.send-btn.is-loading {
  border-color: var(--vp-c-text-3);
}

.loading-dots {
  display: flex;
  gap: 3px;
}

.loading-dots span {
  width: 4px;
  height: 4px;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }
.loading-dots span:nth-child(3) { animation-delay: 0s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.success-state {
  padding: 1rem 0;
}

.success-text {
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  font-style: italic;
}

.feedback {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.feedback.error {
  color: var(--vp-c-text-2);
}

.feedback.exists {
  color: var(--vp-c-text-2);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-leave-to {
  opacity: 0;
}
</style>
