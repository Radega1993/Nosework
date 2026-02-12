# Custom OpenSpec Schemas

This directory contains custom OpenSpec workflow schemas for the project.

## Available Schemas

### spec-driven-with-testing

Extended version of the default `spec-driven` schema that includes automated testing as a final step.

**Artifact Sequence:**
1. proposal
2. specs
3. design
4. tasks
5. testing

**Usage:**
```bash
openspec new change "change-name" --schema spec-driven-with-testing
```

## Adding Testing to Existing Changes

For changes created with the default `spec-driven` schema, you can manually add testing:

1. Create `testing.md` artifact in the change directory
2. Document automated test setup and coverage
3. Reference test files and execution commands

## Future Changes

To use the testing-enabled schema for new changes:

```bash
openspec new change "my-change" --schema spec-driven-with-testing
```

This will automatically include testing as the final artifact in the workflow.
