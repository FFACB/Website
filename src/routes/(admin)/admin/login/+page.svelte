<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let errorMsg: string | null = null;
</script>

<div class="container flex items-center justify-center h-full mx-auto md:p-8 space-y-8 sm:p-0 sm:m-0">

		<form class="flex flex-col h-full items-center w-full justify-center space-y-8
        sm:w-3/4  md:w-2/3  lg:w-1/2 "
			method="POST"
			action="?/login"
			use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
            const { email, password } = Object.fromEntries(formData);

            if (email == null || typeof email !== 'string' || email.length < 1) {
                errorMsg = 'Email invalide';
                cancel();
            }

            if (password == null || typeof password !== 'string' || password.length < 1) {
                errorMsg = 'Mot de passe invalide';
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
        }}
		>


			<div class="form w-full">

                <h1 class="h1 text-8xl text-center text-secondary-500 m-8">Login</h1>

				<div class="form-group">
					<label for="email">Email</label>
					<input  placeholder="Email" id="email" name="email" type="text" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input placeholder="Pass" id="password" name="password" type="password" />
				</div>

				{#if errorMsg != null}
					<div class="msgError">{errorMsg}</div>
				{/if}

				<button type="submit" value="login" class="btn">Connexion</button>
			</div>
		</form>
</div>
