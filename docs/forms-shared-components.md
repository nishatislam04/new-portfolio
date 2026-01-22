# Admin Form Components Overview

## Shared Components

All components live in `src/components/form`.

### 1. `FormInput`

**File:** `src/components/form/form-input.tsx`

- Wraps:
  - `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Input`.
- Usage pattern inside a `Controller`:

```tsx
<Controller
  name="firstName"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormInput
      field={field}
      fieldState={fieldState}
      label="First Name"
      description="Optional helper text."
      className="mb-8"
      labelClassName="text-lg text-gray-300/90 -mb-1"
      descriptionClassName="text-sm text-gray-400"
      inputProps={{
        placeholder: "Enter your first name",
        autoComplete: "first-name",
      }}
      errorClassName="text-red-500 -mt-1"
    />
  )}
/>
```

- Internally it:
  - Applies the label, description, and error styling from the admin forms.
  - Connects `value`, `onChange`, `onBlur`, and `name` from RHF.

Use this for **all single-line text inputs** in admin forms.

---

### 2. `FormTextArea`

**File:** `src/components/form/form-textarea.tsx`

- Wraps:
  - `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Textarea`.
- Usage:

```tsx
<Controller
  name="bio"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormTextArea
      field={field}
      fieldState={fieldState}
      label="Bio"
      className="mb-8"
      labelClassName="text-lg text-gray-300/90 -mb-1"
      textareaProps={{
        placeholder: "Enter your bio",
        rows: 4,
        autoComplete: "off",
      }}
      errorClassName="text-red-500 -mt-1"
    />
  )}
/>
```

Use this for **multi-line text** fields.

---

### 3. `FormSelect`

**File:** `src/components/form/form-select.tsx`

- Wraps:
  - `Field`, `FieldLabel`, `FieldError`, and shadcn `Select` parts.
- Usage (example: employment type in Work Experience):

```tsx
<Controller
  name="type"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormSelect
      field={field}
      fieldState={fieldState}
      label="Employment Type"
      options={EMPLOYMENT_TYPES}
      selectPlaceholder="Select employment type"
      className="mb-4"
      errorClassName="text-red-500 -mt-1"
    />
  )}
/>
```

Where `EMPLOYMENT_TYPES` is:

```ts
const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  // ...
];
```

Use this for **single-select dropdowns** backed by a string field.

---

### 4. `FormCheckbox`

**File:** `src/components/form/form-checkbox.tsx`

- Wraps:
  - `Field`, `FieldLabel`, `FieldError`, `Checkbox`.
- Usage (example: `isCurrent` in Work Experience):

```tsx
<Controller
  name="isCurrent"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormCheckbox
      field={field}
      fieldState={fieldState}
      label="Current role"
      checkboxLabel="Mark as current position"
      className="mb-4"
      errorClassName="text-red-500 -mt-1"
    />
  )}
/>
```

Use this for **boolean fields** rendered as checkboxes.

---

### 5. `FormFileInput`

**File:** `src/components/form/form-file-input.tsx`

- Wraps:
  - `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Input` (`type="file"`).
- Usage (example: technology or social-link icon upload):

```tsx
<Controller
  name="icon"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormFileInput
      field={field}
      fieldState={fieldState}
      label="Icon (optional)"
      description="Upload an SVG or PNG icon."
      className="mb-8"
      inputProps={{ accept: "image/*,image/svg+xml" }}
      errorClassName="text-red-500 -mt-1"
    />
  )}
/>
```

The component converts `event.target.files?.[0]` into the value passed to RHF.

---

## How To Add a New Field

1. **Define the field** in your Zod schema and TS type.
2. **Add it to the form's RHF `useForm` default values**.
3. **Render it with `Controller` + a shared component**:

```tsx
<Controller
  name="newFieldName"
  control={form.control}
  render={({ field, fieldState }) => (
    <FormInput
      field={field} 
      fieldState={fieldState}
      label="New Field Label"
      inputProps={{ placeholder: "Enter something" }}
      description //  optional | fieldDescription (helper texts- when needed)
      className //  optional | fieldClassName
      errorClassName // optional
    />
  )}
/>
```

This keeps validation, errors, and styling aligned with the rest of the admin UI.

---

## Types

Location: `src/types/form.ts`

Key types:

- **`RHFFieldProps`**
  - Matches the `field` object from `Controller`:
    - `name: string`
    - `value: unknown`
    - `onChange: (...event: unknown[]) => void`
    - `onBlur: () => void`

- **`RHFFieldState`**
  - Subset of `fieldState` from `Controller`:
    - `invalid: boolean`
    - `error?: { message?: string }`

- **`BaseFormFieldProps`**
  - Shared props used by all form components:
    - `field: RHFFieldProps`
    - `fieldState: RHFFieldState`
    - `label: string`
    - `description?: React.ReactNode`
    - `className?: string`
    - `errorClassName?: string`
    - `labelClassName?: string`
    - `descriptionClassName?: string`

- **Component-specific props**:
  - `FormInputProps` – adds `inputProps` for `Input`.
  - `FormTextareaProps` – adds `textareaProps` for `Textarea`.
  - `FormSelectProps` – adds `options` and `selectPlaceholder`.
  - `FormCheckboxProps` – adds `checkboxLabel`.
  - `FormFileInputProps` – adds `inputProps` (file input specific).
