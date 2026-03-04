import { Component, signal, ViewChild, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTable, YearData } from './shared/dynamic-table/dynamic-table';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, DynamicTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  @ViewChild('table') tableComponent!: DynamicTable;

  contractDurationYears: number = 2;
  ranks: string[] = [
    'PPEED',
    'AD',
    'SM',
    'Manager',
    'Senior 3',
    'Senior 1/2',
    'Staff 2/3',
    'Staff 1',
  ];

  tableData = signal<YearData[]>([]);

  constructor() {
    this.generateTableData();
  }

  ngAfterViewInit() {
    // Initialize child component's signals
    this.tableComponent.data.set(this.tableData());
    this.tableComponent.ranksList.set(this.ranks);

    // Watch for changes in child component's dataChange signal
    effect(() => {
      const changedData = this.tableComponent.dataChange();
      this.tableData.set(changedData);
      console.log('Updated Table Data:', JSON.stringify(this.tableData(), null, 2));
    });
  }

  generateTableData() {
    const newData: YearData[] = [];
    for (let i = 1; i <= this.contractDurationYears; i++) {
      newData.push({
        yearIndex: i,
        label: `Year ${i}`,
        items: this.ranks.map((rank) => ({
          rank,
          hrsPerMonth: null,
          ftes: null,
        })),
      });
    }
    this.tableData.set(newData);
  }

  onDurationChange() {
    if (this.contractDurationYears > 0) {
      this.generateTableData();
      // Update child component's signal
      if (this.tableComponent) {
        this.tableComponent.data.set(this.tableData());
      }
    }
  }
}
