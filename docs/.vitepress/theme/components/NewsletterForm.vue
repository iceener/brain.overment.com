<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const firstName = ref('')
const status = ref('idle') // idle | loading | success | exists | error | invalid
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
    
    <Transition name="slide-fade">
      <div v-if="message" class="status-message" :class="status">
        <div class="status-icon">
          <svg v-if="status === 'success' || status === 'exists'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <span>{{ message }}</span>
      </div>
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
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
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
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 50px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--vp-c-gray-3);
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

.status-message {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-message.success,
.status-message.exists {
  color: var(--vp-c-brand-1);
}

.status-message.error,
.status-message.invalid {
  color: var(--vp-c-danger-1);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
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
