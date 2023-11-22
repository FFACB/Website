
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const backoffice: CustomThemeConfig = {
    name: 'backoffice',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "var(--color-tertiary-600)",
		"--theme-font-color-dark": "var(--color-secondary-400)",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-tertiary-900)",
		"--on-secondary": "var(--color-tertiary-900)",
		"--on-tertiary": "var(--color-primary-400)",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "var(--color-secondary-500)",
		// =~= Theme Colors  =~=
		// primary | #f2db63 
		"--color-primary-50": "253 250 232", // #fdfae8
		"--color-primary-100": "252 248 224", // #fcf8e0
		"--color-primary-200": "252 246 216", // #fcf6d8
		"--color-primary-300": "250 241 193", // #faf1c1
		"--color-primary-400": "246 230 146", // #f6e692
		"--color-primary-500": "242 219 99", // #f2db63
		"--color-primary-600": "218 197 89", // #dac559
		"--color-primary-700": "182 164 74", // #b6a44a
		"--color-primary-800": "145 131 59", // #91833b
		"--color-primary-900": "119 107 49", // #776b31
		// secondary | #f2f2f2 
		"--color-secondary-50": "253 253 253", // #fdfdfd
		"--color-secondary-100": "252 252 252", // #fcfcfc
		"--color-secondary-200": "252 252 252", // #fcfcfc
		"--color-secondary-300": "250 250 250", // #fafafa
		"--color-secondary-400": "246 246 246", // #f6f6f6
		"--color-secondary-500": "242 242 242", // #f2f2f2
		"--color-secondary-600": "218 218 218", // #dadada
		"--color-secondary-700": "182 182 182", // #b6b6b6
		"--color-secondary-800": "145 145 145", // #919191
		"--color-secondary-900": "119 119 119", // #777777
		// tertiary | #494947 
		"--color-tertiary-50": "228 228 227", // #e4e4e3
		"--color-tertiary-100": "219 219 218", // #dbdbda
		"--color-tertiary-200": "210 210 209", // #d2d2d1
		"--color-tertiary-300": "182 182 181", // #b6b6b5
		"--color-tertiary-400": "128 128 126", // #80807e
		"--color-tertiary-500": "73 73 71", // #494947
		"--color-tertiary-600": "66 66 64", // #424240
		"--color-tertiary-700": "55 55 53", // #373735
		"--color-tertiary-800": "44 44 43", // #2c2c2b
		"--color-tertiary-900": "36 36 35", // #242423
		// success | #63ab6f 
		"--color-success-50": "232 242 233", // #e8f2e9
		"--color-success-100": "224 238 226", // #e0eee2
		"--color-success-200": "216 234 219", // #d8eadb
		"--color-success-300": "193 221 197", // #c1ddc5
		"--color-success-400": "146 196 154", // #92c49a
		"--color-success-500": "99 171 111", // #63ab6f
		"--color-success-600": "89 154 100", // #599a64
		"--color-success-700": "74 128 83", // #4a8053
		"--color-success-800": "59 103 67", // #3b6743
		"--color-success-900": "49 84 54", // #315436
		// warning | #e3954a 
		"--color-warning-50": "251 239 228", // #fbefe4
		"--color-warning-100": "249 234 219", // #f9eadb
		"--color-warning-200": "248 229 210", // #f8e5d2
		"--color-warning-300": "244 213 183", // #f4d5b7
		"--color-warning-400": "235 181 128", // #ebb580
		"--color-warning-500": "227 149 74", // #e3954a
		"--color-warning-600": "204 134 67", // #cc8643
		"--color-warning-700": "170 112 56", // #aa7038
		"--color-warning-800": "136 89 44", // #88592c
		"--color-warning-900": "111 73 36", // #6f4924
		// error | #ee5717 
		"--color-error-50": "252 230 220", // #fce6dc
		"--color-error-100": "252 221 209", // #fcddd1
		"--color-error-200": "251 213 197", // #fbd5c5
		"--color-error-300": "248 188 162", // #f8bca2
		"--color-error-400": "243 137 93", // #f3895d
		"--color-error-500": "238 87 23", // #ee5717
		"--color-error-600": "214 78 21", // #d64e15
		"--color-error-700": "179 65 17", // #b34111
		"--color-error-800": "143 52 14", // #8f340e
		"--color-error-900": "117 43 11", // #752b0b
		// surface | #404040 
		"--color-surface-50": "226 226 226", // #e2e2e2
		"--color-surface-100": "217 217 217", // #d9d9d9
		"--color-surface-200": "207 207 207", // #cfcfcf
		"--color-surface-300": "179 179 179", // #b3b3b3
		"--color-surface-400": "121 121 121", // #797979
		"--color-surface-500": "64 64 64", // #404040
		"--color-surface-600": "58 58 58", // #3a3a3a
		"--color-surface-700": "48 48 48", // #303030
		"--color-surface-800": "38 38 38", // #262626
		"--color-surface-900": "31 31 31", // #1f1f1f
		
	}
}