<script>
	import { goto } from '$app/navigation';
	import { markifyService } from '../services/markify-service.js';
	import { page } from '$app/stores';

	let title = '';
	let questions = [{ text: '', answers: ['Yes', 'No'], score: 1 }];
	const teamId = $page.params.teamId;
	let errorMessage = '';

	function addQuestion() {
		questions = [...questions, { text: '', answers: ['Yes', 'No'], score: 1 }];
	}

	function deleteQuestion(index) {
		questions = questions.filter((_, i) => i !== index);
	}

		async function saveScorecard() {
			console.log('Attempting to save scorecard: ' + { title, questions });
			let success = await markifyService.createScorecard(
				title,
				teamId,
				questions
			);
			if (success) {
				goto(`/scorecards`);
			} else {
				errorMessage = 'Error Trying to create scorecard';
			}
		}
</script>

<div class="rounded bg-info bg-gradient p-5">
	<form on:submit|preventDefault={saveScorecard} class="container">
		<h3 class="text-center mb-4">Scorecard Design</h3>
		<div class="mb-4">
			<input type="text" bind:value={title} placeholder="Enter scorecard title" class="form-control">
		</div>

		<h4 class="text-center mb-4">Questions</h4>
		{#each questions as question, index (index)}
			<div class="mb-3">
				<input type="text" bind:value={question.text} placeholder="Enter your question here" class="form-control">
			</div>

			<div class="mb-3">
				Possible Answers: {question.answers.join(', ')}
			</div>

			<div class="mb-3">
				Marks:
				<input type="number" min="0" bind:value={question.score} placeholder="Score" class="form-control">
			</div>

			<div class="col-auto">
				<button type="button" on:click={() => deleteQuestion(index)} class="btn btn-danger btn-sm">Delete Question</button>
			</div>

			<hr>
		{/each}

		<div class="mb-3 d-flex justify-content-between">
			<button type="button" on:click={addQuestion} class="btn btn-primary">Add Question</button>
			<button type="submit" class="btn btn-success">Save Scorecard Design</button>
		</div>
	</form>
</div>

{#if errorMessage}
	<div class="alert alert-danger" role="alert">
		{errorMessage}
	</div>
{/if}