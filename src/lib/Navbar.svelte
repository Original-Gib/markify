<script>
	import { user } from "../stores.js";

</script>

<nav class="navbar navbar-expand-lg navbar-dark text-black">
	<a class="navbar-brand" href="/">
		<img src='/markify-logo.png' alt="Markifylogo" width="70" height="70">
	</a>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link text-black" href="/score">Score</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/staff">Staff</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/scorecards">Scorecards</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/scorelog">Score Log</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/reports">Reports</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/admin">Admin</a>
				</li>
			</ul>
		</div>
	<div>
	{#if $user.email}
		<div class="nav-link text-white" style="margin-right: 20px;">Logged in as: {$user.email}</div>
		{/if}
	</div>
	<div>
	<a href="/logout" class="column is04" style="margin-right: 20px;">
		<i class="fas fa-sign-out-alt fa-3x" style="color:rgb(127, 199, 217)" />
	</a>

	</div>
</nav>