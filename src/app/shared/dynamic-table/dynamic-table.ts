import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableItem {
  rank: string;
  hrsPerMonth: number | null;
  ftes: number | null;
}

export interface YearData {
  yearIndex: number;
  label: string;
  items: TableItem[];
}

@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss'
})
export class DynamicTable {
  data = signal<YearData[]>([]);
  ranksList = signal<string[]>([]);
  dataChange = signal<YearData[]>([]);

  onModelChange() {
    this.dataChange.set(this.data());
  }

  getItem(yearIndex: number, rank: string): TableItem {
    const yearData = this.data().find(y => y.yearIndex === yearIndex);
    if (yearData) {
      const item = yearData.items.find(i => i.rank === rank);
      if (item) return item;
    }
    // Fallback if not found (shouldn't happen with proper initialization)
    return { rank, hrsPerMonth: null, ftes: null };
  }
}
