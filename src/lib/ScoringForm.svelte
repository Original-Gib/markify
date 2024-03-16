<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const teamId = $page.params.teamId;
	const employeeId = $page.params.employeeId;
	const scorecardId = $page.params.scorecardId;

	let employee = {};
	let team = {};
	let scorecard = { questions: [] };
	let userAnswers = [];
	let totalScore = 0;
	let sumScore = 0;
	let percentScore = 0;
	let reference = '';
	let errorMessage = '';

	onMount(async () => {
		scorecard = await markifyService.getScorecard(scorecardId);
		employee = await markifyService.getEmployee(employeeId);
		console.log(employee)
		team = await markifyService.getTeam(teamId)
		console.log(team)
		userAnswers = scorecard.questions.map(() => '');
	});

	async function submitScore() {
		errorMessage = '';
		totalScore = 0;

		//check that all questions in the scorecard are answered
		const allAnswered = userAnswers.every(answer => answer !== '');
		if (!allAnswered) {
			errorMessage = 'Please answer all questions before submitting.';
			return;
		}

		//check reference field is not blank
		if(!reference) {
			errorMessage = 'Please provide a reference for this score'
			return;
		}

		//work out the total marks available in the scorecard, the total score achieved and the percentage score
		userAnswers.forEach((answer, index) => {
			const question = scorecard.questions[index];
			sumScore += question.score;
			if (answer === "Yes") {
				totalScore += question.score;
			}
			percentScore = Math.round(totalScore/sumScore * 100)
		});

		console.log('Employee:', employee._id);
		console.log('Team:', team._id);
		console.log('Scorecard:', scorecard._id);
		console.log('User Answers:', userAnswers);
		console.log('Total Score:', totalScore);
		console.log('sum Score:', sumScore);
		console.log('% Score:', percentScore);

		let success = await markifyService.createResult(employee._id, team._id, scorecard._id, userAnswers,
			totalScore, sumScore, percentScore, reference)
		if (success) {
			goto("/score")
		} else {
			errorMessage = "Something went wrong saving the result";
		}
	}
</script>

<div class="scorecard rounded bg-info p-5">
	<h3 class="text-center mb-4">Scorecard: {scorecard.title}</h3>

	<form on:submit|preventDefault={submitScore}>

	<div class="row mb-4">
		<div class="col">
			<label for="teamName" class="form-label">Team Name</label>
			<input type="text" class="form-control" id="teamName" bind:value={team.teamName} readonly>
		</div>
		<div class="col">
			<label for="employeeName" class="form-label">Employee Name</label>
			<input type="text" class="form-control" id="employeeName" value={employee.firstName + ' ' + employee.lastName} readonly>
		</div>
		<div class="col">
			<label for="referenceInput" class="form-label">Reference</label>
			<input type="text" class="form-control" id="referenceInput" bind:value={reference} placeholder="Enter reference">
		</div>
	</div>

		<hr>

		{#each scorecard.questions as question, index (index)}
			<div class="question mb-4">
				<h5>{index + 1}. {question.text}</h5>
				<div class="answers">
					{#each question.answers as answer, answerIndex}
						<div class="form-check">
							<input type="radio" class="form-check-input" bind:group={userAnswers[index]} id={`question-${index}-answer-${answerIndex}`} value={answer}>
							<label class="form-check-label" for={`question-${index}-answer-${answerIndex}`}>
								{answer}
							</label>
						</div>
					{/each}
				</div>
				<hr>
			</div>
		{/each}

		{#if errorMessage}
			<div class="alert alert-danger" role="alert">
				{errorMessage}
			</div>
		{/if}

		<div class="submit mt-4 d-flex justify-content-end">
			<button type="submit" class="btn btn-success">Submit Score</button>
		</div>
	</form>
</div>