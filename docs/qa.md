  <script setup>
    import { computed, ref, onMounted } from 'vue'
    const form = ref(null);
	const button = ref(null);
	const input = ref(null);

	onMounted(() => {
		console.log('ook');
		form.value.addEventListener('submit', (event) => {
		  event.preventDefault();

		  const data = new FormData(form.value);
		  if (!data.get('question')) {
		    return;
		  }
		  button.value.textContent = 'Poczekaj chwilę...';
		  button.value.setAttribute('disabled', 'disabled');


		  fetch('https://hook.eu1.make.com/wcqeb5enk19x9a993efkhw9fyb3e5e8a', {
		    method: 'POST',
		    body: data,
		  })
		    .then((response) => response.json())
		    .then((data) => {
		      button.value.textContent = 'Thanks';
		      input.value.value = '';
		    })
		    .catch((error) => console.error(error))
		    .finally(() => button.value.removeAttribute('disabled'));
		});	
	})
	</script>


<form ref="form" id="form" class="mx-auto p-4 w-3/4  max-w-md bg-white shadow-md rounded-lg text-black">
  <div class="text-center">
    <img class="rounded-full w-20 m-auto mb-2" src="https://cloud.overment.com/IMG_5774-1671279930.JPG" alt="">
      <label for="question" class="block font-bold text-xl mb-4">Pytaj o cokolwiek (anonimowo)</label>
  </div>

  <input type="text" ref="input" id="question" placeholder="Tajemnicze pytanie..." name="question" class="border border-gray-300 border-solid p-2 w-full rounded-lg">
  
  <div class="flex justify-end">
    <button ref="button" type="submit" class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-full mt-4">
      Zadaj pytanie
    </button>
  </div>
</form>
  
