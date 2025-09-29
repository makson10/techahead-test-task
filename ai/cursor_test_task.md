# test task
_Exported on 9/29/2025 at 22:24:46 GMT+3 from Cursor (1.7.12)_

---

**User**

create base form with react-hook-form with several fields and with import, save and clear button. Style it minimalistic, make delicate border around form, make buttons different color

---

**Cursor**

I'll scan the current files to see how the app is structured and where to add the form component, then create the form with react-hook-form and minimal styles, and integrate it into `App.tsx`.

I'll set up tasks, install the needed dependency, create the new `Form.tsx` with react-hook-form and minimal Tailwind styling, and wire it into `App.tsx`.

I'm going to create the `Form` component with react-hook-form, minimal Tailwind styles, and import/save/clear actions, then integrate it into `App.tsx`.

```typescriptreact
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
	fullName: string;
	email: string;
	age: number | '';
	country: string;
	acceptTerms: boolean;
};

const STORAGE_KEY = 'base_form_values';

const defaultValues: FormValues = {
	fullName: '',
	email: '',
	age: '' as unknown as number | '',
	country: '',
	acceptTerms: false,
};

const Form = () => {
	const {
		register,
		reset,
		setValue,
		watch,
		formState: { errors, isDirty },
	} = useForm<FormValues>({ defaultValues });

	// Load from localStorage on mount
	useEffect(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			try {
				const data = JSON.parse(raw) as Partial<FormValues>;
				reset({ ...defaultValues, ...data });
			} catch {
				/* ignore */
			}
		}
	}, [reset]);

	const handleSave = () => {
		const values = watch();
		localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
		// Simple feedback
		alert('Saved');
	};

	const handleClear = () => {
		localStorage.removeItem(STORAGE_KEY);
		reset(defaultValues);
	};

	const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		try {
			const text = await file.text();
			const data = JSON.parse(text) as Partial<FormValues>;
			if (typeof data.fullName === 'string') setValue('fullName', data.fullName);
			if (typeof data.email === 'string') setValue('email', data.email);
			if (typeof (data as any).age !== 'undefined') setValue('age', (data as any).age as number);
			if (typeof data.country === 'string') setValue('country', data.country);
			if (typeof data.acceptTerms === 'boolean') setValue('acceptTerms', data.acceptTerms);
		} catch {
			alert('Invalid JSON file');
		}
		// reset the input so the same file can be chosen again
		event.currentTarget.value = '';
	};

	return (
		<div className="max-w-xl mx-auto p-4">
			<form className="rounded-md border border-gray-200 p-4 shadow-sm bg-white/50">
				<div className="space-y-4">
					<div>
						<label className="block text-sm text-gray-700 mb-1">Full name</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
							placeholder="John Doe"
							{...register('fullName', { required: 'Full name is required' })}
						/>
						{errors.fullName && (
							<p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
						)}
					</div>

					<div>
						<label className="block text-sm text-gray-700 mb-1">Email</label>
						<input
							type="email"
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
							placeholder="john@example.com"
							{...register('email', {
								required: 'Email is required',
								pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Invalid email' },
							})}
						/>
						{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm text-gray-700 mb-1">Age</label>
							<input
								type="number"
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
								placeholder="30"
								{...register('age', {
									valueAsNumber: true,
									min: { value: 0, message: 'Must be positive' },
								})}
							/>
							{errors.age && <p className="mt-1 text-xs text-red-600">{errors.age.message}</p>}
						</div>
						<div>
							<label className="block text-sm text-gray-700 mb-1">Country</label>
							<select
								className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
								{...register('country', { required: 'Country is required' })}
							>
								<option value="">Select...</option>
								<option>United States</option>
								<option>India</option>
								<option>United Kingdom</option>
								<option>Germany</option>
								<option>Other</option>
							</select>
							{errors.country && (
								<p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
							)}
						</div>
					</div>

					<div className="flex items-center gap-2">
						<input id="terms" type="checkbox" className="h-4 w-4" {...register('acceptTerms')} />
						<label htmlFor="terms" className="text-sm text-gray-700">I accept terms</label>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<button
						type="button"
						onClick={handleSave}
						className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black disabled:opacity-50"
						disabled={!isDirty}
					>
						Save
					</button>
					<label className="rounded-md bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700 cursor-pointer">
						Import
						<input type="file" accept="application/json" onChange={handleImport} className="hidden" />
					</label>
					<button
						type="button"
						onClick={handleClear}
						className="rounded-md bg-rose-600 text-white px-4 py-2 text-sm hover:bg-rose-700"
					>
						Clear
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;


```

```typescriptreact
import Form from './components/form/Form';

const App = () => {
	return (
		<div className="min-h-dvh bg-gray-50">
			<div className="mx-auto max-w-2xl px-4 py-8">
				<h1 className="mb-6 text-2xl font-semibold text-gray-900">Base Form</h1>
				<Form />
			</div>
		</div>
	);
};

export default App;

```

- I installed `react-hook-form`, created `src/components/form/Form.tsx` with minimal Tailwind styling and added Save, Import, and Clear actions (Save persists to localStorage; Import reads a JSON file; Clear resets and removes storage). Then I wired it into `App.tsx`.

- Key edits:
  - `src/components/form/Form.tsx` added a basic form with fields: `fullName`, `email`, `age`, `country`, and `acceptTerms`, plus buttons styled in different colors with a delicate border around the form.
  - `src/App.tsx` now imports and renders `Form`, and adds simple page styling.

Usage:
- Save: stores current values to localStorage.
- Import: choose a `.json` file with matching keys.
- Clear: resets form and clears storage.

If you want different fields, validation, or colors, tell me and I’ll adjust.

---

**User**

which folder structure should I choose if I want to devide my form by units? I wanna make /units folder, and there folder for each unit, and within this folder will be .tsx file with validation.ts file. Is it good idea?

---

**Cursor**

### Short answer
Yes—that’s a solid approach. Collocate each unit’s UI and validation, keep shared types/constants at the form level, and expose units via small barrel files. Use `FormProvider` + `useFormContext` so units stay isolated and reusable.

### Suggested structure
```
src/
  components/
    form/
      Form.tsx
      types.ts           // full form types
      constants.ts       // shared options, labels
      utils.ts           // shared helpers (optional)
      validators/        // cross-unit schemas, if any (optional)
        index.ts
      units/
        Name/
          NameField.tsx
          validation.ts
          index.ts
        Email/
          EmailField.tsx
          validation.ts
          index.ts
        Age/
          AgeField.tsx
          validation.ts
          index.ts
        Country/
          CountryField.tsx
          validation.ts
          index.ts
```

- **Per unit folder**: one component file + one `validation.ts`.  
- **Barrels (`index.ts`)**: re-export the component and validations for clean imports.
- **Shared**: put common types and options at the form root (`types.ts`, `constants.ts`).  
- If you later adopt a schema lib (zod/yup), you can keep unit schemas in their `validation.ts` files and merge them in `validators/index.ts`.

### Example unit
```tsx
// src/components/form/units/Email/EmailField.tsx
import { useFormContext } from 'react-hook-form';

const EmailField = () => {
	const { register, formState: { errors } } = useFormContext();

	return (
		<div>
			<label className="block text-sm text-gray-700 mb-1">Email</label>
			<input
				type="email"
				className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
				placeholder="john@example.com"
				{...register('email')}
			/>
			{errors.email && <p className="mt-1 text-xs text-red-600">{String(errors.email.message)}</p>}
		</div>
	);
};

export default EmailField;
```

```ts
// src/components/form/units/Email/validation.ts
export const emailRules = {
	required: 'Email is required',
	pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Invalid email' },
};

// If using zod later:
// import { z } from 'zod';
// export const emailSchema = z.string().email('Invalid email');
```

```ts
// src/components/form/units/Email/index.ts
export { default as EmailField } from './EmailField';
export * from './validation';
```

### Using units in the form
```tsx
// src/components/form/Form.tsx (excerpt)
import { FormProvider, useForm } from 'react-hook-form';
import { EmailField } from './units/Email';
import { emailRules } from './units/Email';

const methods = useForm({ defaultValues: { email: '' } });

<form>
	<FormProvider {...methods}>
		{/* apply rules locally */}
		<EmailField />
	</FormProvider>
</form>
```

Apply rules when registering:
```tsx
// inside EmailField
{...register('email', emailRules)}
```

### Notes
- Keep unit names PascalCase (e.g., `Email`, `Name`).
- If multiple fields belong together (e.g., address), group them in one unit folder.
- Add `index.ts` barrels for clean imports and easier refactors.
- If you move to schema-level validation, keep per-unit schemas in each `validation.ts` and compose them at form level.

```plaintext
src/
  components/
    form/
      Form.tsx
      types.ts           // full form types
      constants.ts       // shared options, labels
      utils.ts           // shared helpers (optional)
      validators/        // cross-unit schemas, if any (optional)
        index.ts
      units/
        Name/
          NameField.tsx
          validation.ts
          index.ts
        Email/
          EmailField.tsx
          validation.ts
          index.ts
        Age/
          AgeField.tsx
          validation.ts
          index.ts
        Country/
          CountryField.tsx
          validation.ts
          index.ts
```

```typescriptreact
// src/components/form/units/Email/EmailField.tsx
import { useFormContext } from 'react-hook-form';

const EmailField = () => {
	const { register, formState: { errors } } = useFormContext();

	return (
		<div>
			<label className="block text-sm text-gray-700 mb-1">Email</label>
			<input
				type="email"
				className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
				placeholder="john@example.com"
				{...register('email')}
			/>
			{errors.email && <p className="mt-1 text-xs text-red-600">{String(errors.email.message)}</p>}
		</div>
	);
};

export default EmailField;
```

```typescript
// src/components/form/units/Email/validation.ts
export const emailRules = {
	required: 'Email is required',
	pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Invalid email' },
};

// If using zod later:
// import { z } from 'zod';
// export const emailSchema = z.string().email('Invalid email');
```

```typescript
// src/components/form/units/Email/index.ts
export { default as EmailField } from './EmailField';
export * from './validation';
```

```typescriptreact
// src/components/form/Form.tsx (excerpt)
import { FormProvider, useForm } from 'react-hook-form';
import { EmailField } from './units/Email';
import { emailRules } from './units/Email';

const methods = useForm({ defaultValues: { email: '' } });

<form>
	<FormProvider {...methods}>
		{/* apply rules locally */}
		<EmailField />
	</FormProvider>
</form>
```

```typescriptreact
// inside EmailField
{...register('email', emailRules)}
```

---

**User**

how to use my zod validation in react-hook-form? 

---

**Cursor**

### TL;DR
- Install: `zod` and `@hookform/resolvers`.
- Create a Zod schema for your form (or per unit).
- Pass `resolver: zodResolver(schema)` to `useForm`.
- Infer types from the schema to keep everything in sync.

### Install
```bash
npm i zod @hookform/resolvers
```

### Single schema + react-hook-form
```tsx
// src/components/form/validators/schema.ts
import { z } from 'zod';

export const formSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	email: z.string().email('Invalid email'),
	age: z.coerce.number().min(0, 'Must be positive').optional(), // coerce from input string
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});

export type FormValues = z.infer<typeof formSchema>;
```

```tsx
// src/components/form/Form.tsx (essentials)
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from './validators/schema';

const defaultValues: FormValues = {
	fullName: '',
	email: '',
	age: undefined,
	country: '',
	acceptTerms: false,
};

const Form = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
		mode: 'onSubmit', // or 'onBlur' / 'onChange'
	});

	const onSubmit = methods.handleSubmit((data) => {
		console.log('valid data', data);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit}>
				{/* your fields registered as usual */}
				<button type="submit">Submit</button>
			</form>
		</FormProvider>
	);
};

export default Form;
```

- You no longer need inline `register('email', { pattern: ... })` rules—Zod handles validation.
- Use `errors.fieldName?.message` for error output as before.

### Using per-unit schemas (fits your /units structure)
```ts
// src/components/form/units/Email/validation.ts
import { z } from 'zod';
export const emailSchema = z.object({
	email: z.string().email('Invalid email'),
});
export type EmailValues = z.infer<typeof emailSchema>;
```

```ts
// src/components/form/units/Name/validation.ts
import { z } from 'zod';
export const nameSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
});
export type NameValues = z.infer<typeof nameSchema>;
```

```ts
// src/components/form/units/Age/validation.ts
import { z } from 'zod';
export const ageSchema = z.object({
	age: z.coerce.number().min(0, 'Must be positive').optional(),
});
export type AgeValues = z.infer<typeof ageSchema>;
```

```ts
// src/components/form/validators/schema.ts
import { z } from 'zod';
import { emailSchema } from '../units/Email/validation';
import { nameSchema } from '../units/Name/validation';
import { ageSchema } from '../units/Age/validation';

export const formSchema = nameSchema.merge(emailSchema).merge(ageSchema).extend({
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});

export type FormValues = z.infer<typeof formSchema>;
```

### In unit components
```tsx
// src/components/form/units/Email/EmailField.tsx
import { useFormContext } from 'react-hook-form';

const EmailField = () => {
	const { register, formState: { errors } } = useFormContext();
	return (
		<div>
			<label className="block text-sm mb-1">Email</label>
			<input className="w-full border px-3 py-2 text-sm" type="email" {...register('email')} />
			{errors.email && <p className="mt-1 text-xs text-red-600">{String(errors.email.message)}</p>}
		</div>
	);
};

export default EmailField;
```

### Tips
- Prefer `z.coerce.number()` for numeric inputs so you don’t need `valueAsNumber`.
- For checkboxes, Zod `z.boolean()` works with RHF; if you import JSON, ensure it’s boolean.
- Keep unit-specific schemas in each `validation.ts`; merge them into the final `formSchema`.
- Infer `FormValues` from the schema to avoid type drift: `type FormValues = z.infer<typeof formSchema>`.

Want me to convert your current form to Zod now (central or per-unit)?

```shellscript
npm i zod @hookform/resolvers
```

```typescriptreact
// src/components/form/validators/schema.ts
import { z } from 'zod';

export const formSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	email: z.string().email('Invalid email'),
	age: z.coerce.number().min(0, 'Must be positive').optional(), // coerce from input string
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});

export type FormValues = z.infer<typeof formSchema>;
```

```typescriptreact
// src/components/form/Form.tsx (essentials)
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from './validators/schema';

const defaultValues: FormValues = {
	fullName: '',
	email: '',
	age: undefined,
	country: '',
	acceptTerms: false,
};

const Form = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
		mode: 'onSubmit', // or 'onBlur' / 'onChange'
	});

	const onSubmit = methods.handleSubmit((data) => {
		console.log('valid data', data);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit}>
				{/* your fields registered as usual */}
				<button type="submit">Submit</button>
			</form>
		</FormProvider>
	);
};

export default Form;
```

```typescript
// src/components/form/units/Email/validation.ts
import { z } from 'zod';
export const emailSchema = z.object({
	email: z.string().email('Invalid email'),
});
export type EmailValues = z.infer<typeof emailSchema>;
```

```typescript
// src/components/form/units/Name/validation.ts
import { z } from 'zod';
export const nameSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
});
export type NameValues = z.infer<typeof nameSchema>;
```

```typescript
// src/components/form/units/Age/validation.ts
import { z } from 'zod';
export const ageSchema = z.object({
	age: z.coerce.number().min(0, 'Must be positive').optional(),
});
export type AgeValues = z.infer<typeof ageSchema>;
```

```typescript
// src/components/form/validators/schema.ts
import { z } from 'zod';
import { emailSchema } from '../units/Email/validation';
import { nameSchema } from '../units/Name/validation';
import { ageSchema } from '../units/Age/validation';

export const formSchema = nameSchema.merge(emailSchema).merge(ageSchema).extend({
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});

export type FormValues = z.infer<typeof formSchema>;
```

```typescriptreact
// src/components/form/units/Email/EmailField.tsx
import { useFormContext } from 'react-hook-form';

const EmailField = () => {
	const { register, formState: { errors } } = useFormContext();
	return (
		<div>
			<label className="block text-sm mb-1">Email</label>
			<input className="w-full border px-3 py-2 text-sm" type="email" {...register('email')} />
			{errors.email && <p className="mt-1 text-xs text-red-600">{String(errors.email.message)}</p>}
		</div>
	);
};

export default EmailField;
```

---

**User**

so where do I need to import my zod schema if I wanna use per-unit structure?

---

**Cursor**

- Import unit schemas only in one place: the form-level schema aggregator. Each unit keeps its own `validation.ts`, but unit components don’t import schemas.
- In `Form.tsx`, import only the merged form schema and pass it to `useForm` via `zodResolver`.

Suggested layout and imports:
```ts
// src/components/form/units/Name/validation.ts
import { z } from 'zod';
export const nameSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
});
```

```ts
// src/components/form/units/Email/validation.ts
import { z } from 'zod';
export const emailSchema = z.object({
	email: z.string().email('Invalid email'),
});
```

```ts
// src/components/form/validators/schema.ts
import { z } from 'zod';
import { nameSchema } from '../units/Name/validation';
import { emailSchema } from '../units/Email/validation';
// import other unit schemas...

export const formSchema = nameSchema.merge(emailSchema).extend({
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});
export type FormValues = z.infer<typeof formSchema>;
```

```ts
// src/components/form/Form.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from './validators/schema';
import { defaultValues } from '../../assets/defaultValues'; // if you keep them separately

const methods = useForm<FormValues>({
	resolver: zodResolver(formSchema),
	defaultValues,
});

<FormProvider {...methods}>
	{/* unit components here; they DON'T import schemas */}
</FormProvider>
```

- Unit components (`units/Name/index.tsx`, `units/Property/index.tsx`, etc.) only use `useFormContext`/`register`; they don’t import Zod.
- Keep merging logic centralized in `components/form/validators/schema.ts`. This keeps units reusable and the form’s validation consistent.

```typescript
// src/components/form/units/Name/validation.ts
import { z } from 'zod';
export const nameSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
});
```

```typescript
// src/components/form/units/Email/validation.ts
import { z } from 'zod';
export const emailSchema = z.object({
	email: z.string().email('Invalid email'),
});
```

```typescript
// src/components/form/validators/schema.ts
import { z } from 'zod';
import { nameSchema } from '../units/Name/validation';
import { emailSchema } from '../units/Email/validation';
// import other unit schemas...

export const formSchema = nameSchema.merge(emailSchema).extend({
	country: z.string().min(1, 'Country is required'),
	acceptTerms: z.boolean().refine(Boolean, 'You must accept terms'),
});
export type FormValues = z.infer<typeof formSchema>;
```

```typescript
// src/components/form/Form.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from './validators/schema';
import { defaultValues } from '../../assets/defaultValues'; // if you keep them separately

const methods = useForm<FormValues>({
	resolver: zodResolver(formSchema),
	defaultValues,
});

<FormProvider {...methods}>
	{/* unit components here; they DON'T import schemas */}
</FormProvider>
```

---

**User**

make this divider full width and bg-white/50 bg, with gap around it

---

**Cursor**

I'll open `src/components/Divider.tsx` to adjust its styles for full width, semi-transparent white background, and outer spacing.

```typescriptreact
const Divider = () => (
	<div className="w-full h-px bg-white/50 my-6" />
);

export default Divider;

```

Updated `src/components/Divider.tsx` to be full width with semi-transparent white background and spacing.

- Uses Tailwind classes: `w-full h-px bg-white/50 my-6`.

If you want thicker or with inner gap (padding), I can switch it to a container with `py` and a nested line.

---

**User**

can I registed key of nested object? e.g. if I want my form value to be complex nested object?

---

**Cursor**

### Yes — use dot/bracket notation
React Hook Form supports nested paths out of the box.

- Register nested objects: `register('user.address.city')`
- Arrays: `register('items.0.name')` or template strings with index
- Brackets for special keys: `register('meta["x-custom-key"]')`
- Make sure `defaultValues` mirrors the nested shape

### Minimal examples

```tsx
// types
type FormValues = {
	user: {
		name: string;
		address: {
			city: string;
			zip: string;
		};
	};
	items: { name: string; qty: number }[];
};

// form
const methods = useForm<FormValues>({
	defaultValues: {
		user: { name: '', address: { city: '', zip: '' } },
		items: [{ name: '', qty: 1 }],
	},
});

<input {...register('user.name')} />
<input {...register('user.address.city')} />
<input {...register('user.address.zip')} />

{/* arrays */}
{methods.watch('items').map((_, i) => (
	<div key={i}>
		<input {...register(`items.${i}.name`)} />
		<input type="number" {...register(`items.${i}.qty`, { valueAsNumber: true })} />
	</div>
))}
```

### With Zod
Infer types from your Zod schema; paths stay the same.

```ts
const schema = z.object({
	user: z.object({
		name: z.string().min(1),
		address: z.object({
			city: z.string().min(1),
			zip: z.string().min(1),
		}),
	}),
	items: z.array(z.object({ name: z.string(), qty: z.coerce.number().min(1) })),
});
type FormValues = z.infer<typeof schema>;
```

```tsx
const methods = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues });
```

### Useful APIs for nested data
- Set programmatically: `setValue('user.address.city', 'NYC', { shouldDirty: true })`
- Read: `getValues('user.address.city')`
- Remove: `unregister('user.address')`
- Arrays: prefer `useFieldArray({ name: 'items' })` for append/remove/move

If you share a specific nested shape you want, I can sketch the exact `register` paths and defaults.

```typescriptreact
// types
type FormValues = {
	user: {
		name: string;
		address: {
			city: string;
			zip: string;
		};
	};
	items: { name: string; qty: number }[];
};

// form
const methods = useForm<FormValues>({
	defaultValues: {
		user: { name: '', address: { city: '', zip: '' } },
		items: [{ name: '', qty: 1 }],
	},
});

<input {...register('user.name')} />
<input {...register('user.address.city')} />
<input {...register('user.address.zip')} />

{/* arrays */}
{methods.watch('items').map((_, i) => (
	<div key={i}>
		<input {...register(`items.${i}.name`)} />
		<input type="number" {...register(`items.${i}.qty`, { valueAsNumber: true })} />
	</div>
))}
```

```typescript
const schema = z.object({
	user: z.object({
		name: z.string().min(1),
		address: z.object({
			city: z.string().min(1),
			zip: z.string().min(1),
		}),
	}),
	items: z.array(z.object({ name: z.string(), qty: z.coerce.number().min(1) })),
});
type FormValues = z.infer<typeof schema>;
```

```typescriptreact
const methods = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues });
```

---

**User**

which formState should I use to check did user fill all field or not? I want to know it in order to disable button, until all fields aren't fill and valid

---

**Cursor**

- Use formState.isValid. It’s true only when all registered fields pass validation. Pair it with required rules (or Zod schema) so “filled” implies “valid.”
- Enable real-time validity by initializing the form with mode: 'onChange' (or 'onBlur').

Example:
```tsx
// Form.tsx
const methods = useForm<FormValues>({
  resolver: zodResolver(formSchema), // or inline RHF rules
  mode: 'onChange',                  // update isValid as user types
});

const { formState: { isValid, isValidating } } = methods;

<button type="submit" disabled={!isValid || isValidating}>Submit</button>
```

In unit components (e.g., `Property/index.tsx`), read state via `useFormContext()`:
```tsx
const { register, formState: { isValid } } = useFormContext();
```

Notes:
- Make fields required (RHF rules or Zod `.min(1)`/`.nonempty()`/`.email()`). Then `isValid` directly answers “are all required fields filled and valid?”
- Optional fields won’t block isValid; if you want “every field must be filled,” mark them required in the schema/rules.

```typescriptreact
// Form.tsx
const methods = useForm<FormValues>({
  resolver: zodResolver(formSchema), // or inline RHF rules
  mode: 'onChange',                  // update isValid as user types
});

const { formState: { isValid, isValidating } } = methods;

<button type="submit" disabled={!isValid || isValidating}>Submit</button>
```

```typescriptreact
const { register, formState: { isValid } } = useFormContext();
```

