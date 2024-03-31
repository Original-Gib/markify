<script>
	import { goto } from "$app/navigation";
	import { markifyService } from "../../services/markify-service";

	markifyService.logout();
	goto("/login");
</script>