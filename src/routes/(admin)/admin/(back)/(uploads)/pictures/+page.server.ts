import { action_create, action_findall } from './action';
import type { Actions } from './$types';
export const actions: Actions = {
	create: action_create,
	findall: action_findall
};
