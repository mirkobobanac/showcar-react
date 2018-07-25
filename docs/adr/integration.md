# Integrating Showcar React

There are 2 possible approaches to integrating the library in your codebase in terms of bundling:

- Internal: This is the default approach that most libraries use, where `showcar-react` code will be included inside your application. It's isolated from outside scripts and you can manage the versioning by targeting specific npm versions

- External: In this mode, the library is used as usual, however it is flagged as `external` on the bundling step.

## Internal Bundling

**Advantages**:

- Locked down versions: All upgrades occurr manually, no risk of breaking due to new breaking changes introduced in the `showcar-react`
- only include what's needed: We will include only the components that we need, the rest will be dropped via tree-shaking. So if one `showcar-react` component needs a heavy dependency (immutableJS, RxJS) this is only "paid" if we include that component

**Disadvantages**:

- Larger overall bundle size: If the page includes several "apps" each including library components, the bundle size will be larger due to them not reusing the library
- Inconsistent styling/usage: Since different versions of the library can be running on the same page, if they have different behaviour/looks, the user experience could be less than ideal.

## External Bundling

**Advantages**:

- Caching: The library can be cached by the browser on first page
- Lower bundle size: Each "app" is not re-including the library so overall page size is smaller
- latest version always: All "apps" in the page use the same (latest) version of the app, leading to a consistent experience across page elements

**Disadvantages**:

- forced latest version: Since apps don't bundle the code at runtime but use a shared library, the library must always remain backwards compatible. A possible strategy could be to include a standard & "next"
- Expensive specialized components: If a particular component that's not heavily requires a large dependency, this component will have to be served regardless of whether anyone is using it or not. A possible solution is to split out those heavy components into a separate package

In the AutoScout24 context (or elsewhere if you're reusing the library across multiple separate components in your codebase), however, it should be flagged as an external dependency in `webpack` so it's not included in the bundle

## Preferred Approach

- Use external bundling
- Break out library into `core` and `addons`.
  - `core`: would include all functionality that's light in terms of bundle size (no external dependencies).
  - `addons`: this would include components such as `as24-autocomplete` or `SSI` that need heavy external dependencies such as `immutableJS` or `RxJS`
