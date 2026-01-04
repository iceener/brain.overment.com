<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const firstName = ref('')
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
        email: email.value.trim().toLowerCase(),
        ...(firstName.value.trim() && { firstName: firstName.value.trim() })
      })
    })
    
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid response')
    }
    
    const data = await response.json()
    status.value = data.status || (response.ok ? 'success' : 'error')
    message.value = data.message || (response.ok ? 'Subscribed!' : 'Something went wrong')
    
    if (status.value === 'success') {
      email.value = ''
      firstName.value = ''
    }
  } catch (err) {
    status.value = 'error'
    message.value = 'Connection failed. Please try again.'
  }
}
</script>

<template>
  <div class="newsletter-form">
    <form @submit.prevent="subscribe" class="form-container">
      <div class="input-group">
        <input
          v-model="firstName"
          type="text"
          placeholder="Your name"
          class="input-field"
          :disabled="status === 'loading'"
          maxlength="100"
        />
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          class="input-field"
          :disabled="status === 'loading'"
          required
        />
      </div>
      
      <button 
        type="submit" 
        class="submit-btn"
        :class="{ 
          'btn-disabled': !canSubmit,
          'btn-loading': status === 'loading'
        }"
        :disabled="!canSubmit"
      >
        <span v-if="status === 'loading'" class="spinner"></span>
        <span v-else>Count me in</span>
      </button>
    </form>
    
    <Transition name="fade">
      <p v-if="message" class="message" :class="`message-${status}`">
        {{ message }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.newsletter-form {
  max-width: 420px;
  margin: 2rem 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-field {
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1-rgb), 0.1);
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-field::placeholder {
  color: var(--vp-c-text-3);
}

.submit-btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 50px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-loading {
  cursor: wait;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.message {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 0.9375rem;
}

.message-success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.message-exists {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.message-error,
.message-invalid {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 480px) {
  .input-group {
    flex-direction: row;
  }
  
  .input-field:first-child {
    flex: 0 0 140px;
  }
  
  .input-field:last-child {
    flex: 1;
  }
}
</style>

