# dynamic-table

Small Angular standalone component demonstrating a dynamic table driven by Signals.

## Summary
- Component: `app-dynamic-table`
- Uses Angular Signals for inputs/outputs.
- Exposes `data` (Signal<YearData[]>) and `ranksList` (Signal<string[]>) as inputs and emits `dataChange` when model updates.

## Files
- src/app/shared/dynamic-table/dynamic-table.ts — component logic (inputs, outputs, getItem, onModelChange).
- src/app/shared/dynamic-table/dynamic-table.html — template (use `data()` / `ranksList()` in *ngFor).
- src/app/shared/dynamic-table/dynamic-table.scss — styles.
- src/app/signals.ts — optional project-level shared signals (see below).

## Quick start (macOS)
1. Install deps
   npm install

2. Dev server
   ng serve
   or
   npm run start

3. Build
   ng build

4. Tests
   ng test

## Usage (parent → child)
Pass a Signal from the parent to the component and listen for `dataChange`:

```typescript
// parent.component.ts
tableData = signal<YearData[]>(initialData);
ranks = signal<string[]>(['A','B','C']);

onChildDataChange(newData: YearData[]) {
  this.tableData.set(newData);
}
```
