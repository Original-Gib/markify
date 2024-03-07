<script>
	let scorecardName = '';
	let questions = [];

	function addQuestion() {
		questions = [...questions, { text: '', answer: '', score: 1 }];
	}

	function deleteQuestion(index) {
		questions = questions.filter((_, i) => i !== index);
	}

	function saveScorecard() {
		// TODO: create API function to handle scorecard creation
		console.log({ scorecardName, questions });
	}
</script>

<div class="rounded bg-info bg-gradient p-5">
	<form on:submit|preventDefault={saveScorecard} class="container">
		<h3 class="text-center mb-4">Scorecard Name</h3>
		<div class="mb-4">
			<input type="text" bind:value={scorecardName} placeholder="Enter scorecard name" class="form-control">
		</div>

		<h4 class="text-center mb-4">Add Questions</h4>
		{#each questions as question, index (index)}
			<div class="row mb-3 align-items-center">
				<div class="col">
					<input type="text" bind:value={questions[index].text} placeholder="Enter your question here" class="form-control">
				</div>

				<div class="col-auto">
					<button type="button" on:click={() => deleteQuestion(index)} class="btn btn-danger btn-sm">Delete</button>
				</div>
			</div>

			<div class="mb-3">
				<div class="form-check form-check-inline">
					<input type="radio" bind:group={questions[index].answer} value="Yes" id={`yes-${index}`} class="form-check-input">
					<label class="form-check-label" for={`yes-${index}`}>Yes</label>
				</div>
				<div class="form-check form-check-inline">
					<input type="radio" bind:group={questions[index].answer} value="No" id={`no-${index}`} class="form-check-input">
					<label class="form-check-label" for={`no-${index}`}>No</label>
				</div>
			</div>

			<div class="mb-3">
				Marks:
				<input type="number" min="0" bind:value={questions[index].score} placeholder="Score" class="form-control">
			</div>

			<hr>
		{/each}

		<div class="mb-3 d-flex justify-content-between">
			<button type="button" on:click={addQuestion} class="btn btn-primary">Add Question</button>
			<button type="submit" class="btn btn-success">Save Scorecard</button>
		</div>
	</form>
</div>