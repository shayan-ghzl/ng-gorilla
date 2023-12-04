`<mat-file-input>` is a form control for uploading files, similar to the native
`<input type="file">` element. It is designed to work
inside of a [`<mat-form-field>`](https://material.angular.io/components/form-field/overview)
element. See [the documentation for
form-field](https://material.angular.io/components/form-field) for more information.

<!-- example(file-input-overview) -->

### `<mat-file-input>` attributes

All of the attributes that can be used with `<input type="file">` element can be used
on `<mat-file-input>` as well. This includes Angular directives such as `ngModel`
and `formControl`.

### Form field features

There are a number of `<mat-form-field>` features that can be used with any `<mat-file-input>`. These include error messages, hint text, prefix & suffix, and theming. For
additional information about these features, see the
[form field documentation](https://material.angular.io/components/form-field/overview).

### Placeholder

The placeholder is text shown when the `<mat-form-field>` label is floating but the input is empty.
It is used to give the user an additional hint about what they should type in the input. The
placeholder can be specified by setting the `placeholder` attribute on the `<mat-file-input>`
element. In some cases that `<mat-form-field>` may use the placeholder as the label (see the
[form field label documentation](https://material.angular.io/components/form-field/overview#floating-label)).

### Changing when error messages are shown

The `<mat-form-field>` allows you to
[associate error messages](https://material.angular.io/components/form-field/overview#error-messages)
with your `MatFileInput`. By default, these error messages are shown when the control is invalid and
the user has interacted with (touched) the element or the parent form has been submitted. If
you wish to override this behavior (e.g. to show the error as soon as the invalid control is dirty
or when a parent form group is invalid), you can use the `errorStateMatcher` property of the
`MatFileInput`. The property takes an instance of an `ErrorStateMatcher` object. An `ErrorStateMatcher`
must implement a single method `isErrorState` which takes the `FormControl` for this `MatFileInput` as
well as the parent form and returns a boolean indicating whether errors should be shown. (`true`
indicating that they should be shown, and `false` indicating that they should not.)

<!-- example(file-input-error-state-matcher) -->

A global error state matcher can be specified by setting the `ErrorStateMatcher` provider. This
applies to all inputs. For convenience, `ShowOnDirtyErrorStateMatcher` is available in order to
globally cause input errors to show when the input is dirty and invalid.

```ts
@NgModule({
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
```

#### Aria attributes

If the containing `<mat-form-field>` has a label it will automatically be used as the `aria-label`
for the `<mat-file-input>`. However, if there's no label specified in the form field, `aria-label`,
`aria-labelledby` or `<label for=...>` should be added.

#### Errors and hints

Any `mat-error` and `mat-hint` are automatically added to the input's `aria-describedby` list, and
`aria-invalid` is automatically updated based on the input's validity state.

When conveying an error, be sure to not rely solely on color. In the message itself, you can use an
icon or text such as "Error:" to indicate the message is an error message.
