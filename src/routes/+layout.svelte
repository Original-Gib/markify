<script>
	import { beforeUpdate } from "svelte";
	import { markifyService } from "../services/markify-service";

	beforeUpdate(() => {
		markifyService.reload();
	});
</script>

<div class="bg-dark bg-gradient">
	<slot />
</div>