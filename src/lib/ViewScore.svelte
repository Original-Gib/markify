<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';

	const resultId = $page.params.resultId;

	let employee = {};
	let team = {};
	let scorecard = { questions: [] };
	let userAnswers = [];
	let totalScore = 0;
	let sumScore = 0;
	let percentScore = 0;
	let reference = '';

	onMount(async () => {
		let result = await markifyService.getResult(resultId)
		scorecard = await markifyService.getScorecard(result.scorecardId);
		employee = await markifyService.getEmployee(result.employeeId);
		team = await markifyService.getTeam(result.teamId)
		reference = result.reference;
		userAnswers = result.answers.map(answer => answer.text);
		totalScore = result.totalScore;
		sumScore = result.sumScore;
		percentScore = result.percentScore;
	});

</script>

<div class="scorecard rounded bg-info p-5">
	<h3 class="text-center mb-4">Scorecard: {scorecard.title}</h3>

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
				<input type="text" class="form-control" id="referenceInput" bind:value={reference} readonly>
			</div>
		</div>

		<hr>

	{#each scorecard.questions as question, index (index)}
		<div class="question mb-4">
			<h5>{index + 1}. {question.text}</h5>
			<div class="answers">
				{#each question.answers as answer, answerIndex}
					<div class="form-check">
						<input type="radio" class="form-check-input"
									 bind:group={userAnswers[index]}
									 id={`question-${index}-answer-${answerIndex}`}
									 value={answer}
									 checked={userAnswers[index] === answer}
						       disabled>
						<label class="form-check-label" for={`question-${index}-answer-${answerIndex}`}>
							{answer}
						</label>
					</div>
				{/each}
			</div>
			<hr>
		</div>
	{/each}
	<div class="row mb-4">
	<div class="col">
		<label for="totalScore" class="form-label">Marks:</label>
		<input type="text" id="totalScore" class="form-control" value="{totalScore}/{sumScore}" readonly>
	</div>
	<div class="col">
		<label for="percentScore" class="form-label">Score:</label>
		<input type="text" id="percentScore" class="form-control" value="{percentScore}%" readonly>
	</div>
</div>
</div>