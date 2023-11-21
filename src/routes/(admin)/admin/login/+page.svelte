<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let errorMsg: string | null = null;
</script>



<div class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Login</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<section>
		

                
        <form method="POST" action="?/login" use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
            const { email, password } = Object.fromEntries(formData);

            if (email == null || typeof email !== 'string' || email.length < 1) {
                cancel();
            }

            if (password == null || typeof password !== 'string' || password.length < 1) {
                cancel();
            }

            return async ({ result, update }) => {
                switch (result.type) {
                    case 'success':
                        goto('/admin/home', { invalidateAll: true });
                        break;
                    case 'failure':
                        errorMsg = 'Erreur inconnue';
                        if (result.data && typeof result.data.errorMsg === 'string') {
                            errorMsg = result.data.errorMsg;
                        }
                        break;
                    case 'error':
                        errorMsg = 'Erreur inconnue';
                        break;
                    default:
                        break;
                }

                await update();
            };
        }}>
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="text" />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="password" type="text" />
        </div>

        {#if errorMsg != null}
            <div class="error">{errorMsg}</div>
        {/if}

        <button type="submit" value="login" class="submit-button">Connexion</button>
        </form>
	</section>
</div>

