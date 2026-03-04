# dynamic-table

Small Angular standalone component demonstrating a dynamic table driven by Signals.

## Summary
- Component: `app-dynamic-table`
- Uses Angular Signals for reactive state management
- Exposes `data`, `ranksList`, and `dataChange` as writable Signals
- Parent-child communication via Signals and `effect()` instead of input/output decorators

## Files
- src/app/shared/dynamic-table/dynamic-table.ts — component logic (signal properties, getItem, onModelChange)
- src/app/shared/dynamic-table/dynamic-table.html — template (use `data()` / `ranksList()` to read signals)
- src/app/shared/dynamic-table/dynamic-table.scss — styles
- src/app/app.ts — parent component demonstrating signal-based integration with ViewChild and effect()
- src/app/app.html — parent template

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

## Signal-Based Architecture

### DynamicTable Component Signals

The `DynamicTable` component exposes three writable signals:

```typescript
export class DynamicTable {
  data = signal<YearData[]>([]);           // Table data for all years
  ranksList = signal<string[]>([]);        // List of job ranks
  dataChange = signal<YearData[]>([]);     // Emits when table data changes
  
  onModelChange() {
    this.dataChange.set(this.data());      // Update dataChange signal
  }
}
```

### Parent Component Integration (App)

The parent component uses `@ViewChild` and `effect()` to manage signal communication:

```typescript
export class App implements AfterViewInit {
  @ViewChild('table') tableComponent!: DynamicTable;
  
  tableData = signal<YearData[]>([]);
  
  ngAfterViewInit() {
    // Initialize child signals
    this.tableComponent.data.set(this.tableData());
    this.tableComponent.ranksList.set(this.ranks);
    
    // Watch for child signal changes
    effect(() => {
      const changedData = this.tableComponent.dataChange();
      this.tableData.set(changedData);
      console.log('Updated Table Data:', JSON.stringify(this.tableData(), null, 2));
    });
  }
  
  onDurationChange() {
    if (this.contractDurationYears > 0) {
      this.generateTableData();
      // Update child component signal
      if (this.tableComponent) {
        this.tableComponent.data.set(this.tableData());
      }
    }
  }
}
```

### Template
In `app.html`, reference the child component with a template variable:

```html
<app-dynamic-table #table></app-dynamic-table>
```

## Key Features

1. **Signals Instead of Decorators**: Uses `signal()` instead of `@Input()` and `@Output()`
2. **Direct Signal Access**: Parent accesses child signals directly via ViewChild
3. **Reactive Updates**: Uses `effect()` to automatically respond to signal changes
4. **Manual Signal Updates**: Call `.set()` method to update signals
5. **Two-Way Reactivity**: Parent and child can both read/write to signals

## Migration Notes

Changed from the traditional input/output pattern:
- ❌ `@Input() data`: Input decorator  
- ✅ `data = signal<YearData[]>([])`: Writable signal

- ❌ `@Output() dataChange = new EventEmitter()`: Output decorator
- ✅ `dataChange = signal<YearData[]>([])`: Writable signal

- ❌ `(dataChange)="handler($event)"`: Event binding
- ✅ `effect(() => { this.child.dataChange() })`: Effect subscription
