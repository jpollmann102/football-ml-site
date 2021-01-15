import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.scss'],
})
export class SortableTableComponent implements OnInit, OnChanges {
  @Input() dateFields:string[] = [];
  @Input() numFields:string[] = [];
  @Input() rows:any[] = [];
  @Input() dataMap:any = {};
  @Input() presort:any = -1;
  @Output() onRowClick:EventEmitter<[any, number]> = new EventEmitter();
  @Output() onColSorted:EventEmitter<boolean> = new EventEmitter();
  colNames:string[] = Object.keys(this.dataMap);
  loading:boolean = false;
  sortedCol:number = -1;
  columns:any[] = [];
  sortedRows:any[] = [];
  rowsToShow:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setupData();
  }

  ngOnChanges(changes:SimpleChanges):void {
    if('rows' in changes) this.setupData();
  }

  setupData() {

    this.sortedRows = [...this.rows];
    this.rowsToShow = [...this.rows];
    this.colNames = Object.keys(this.dataMap);
    this.columns = this.colNames.map(x => {
      let newObj = { sorted: false, asc: false };
      newObj['name'] = x;
      return newObj;
    });

    // sort by presort, if it's there
    if(this.presort != -1) this.presortRows();
  }

  presortRows() {
    const index = this.columns.map(function(e) { return e.name; }).indexOf(this.presort.name);
    this.columns[index].asc = this.presort.asc;
    this.columns[index].sorted = true;
    this.sortedCol = index;
    this.sortColumn(index, this.presort.asc);
    this.rowsToShow = [...this.sortedRows];
  }

  colClick(col) {
    const index = this.columns.map(function(e) { return e.name; }).indexOf(col);

    if(this.sortedCol === index)
    {
      // flip sort
      if(this.columns[index].asc)
      {
        this.columns[index].asc = false;
        this.sortColumn(index, false);
        this.rowsToShow = [...this.sortedRows];
        this.onColSorted.emit(true);
      }else this.undoSort();
    }else
    {
      // new sort
      if(this.sortedCol != -1) this.undoSort();
      this.columns[index].sorted = true;
      this.columns[index].asc = true;
      this.sortedCol = index;
      this.sortColumn(index, true);
      this.rowsToShow = [...this.sortedRows];
      this.onColSorted.emit(true);
    }
  }

  getColumnSorted(col) {
    const index = this.columns.map(function(e) { return e.name; }).indexOf(col);
    if(this.columns[index].asc) return 'di di-arrow-up';
    else return 'di di-arrow-down';
  }

  undoSort() {
    if(this.sortedCol > -1) this.columns[this.sortedCol].sorted = false;
    if(this.sortedCol > -1) this.columns[this.sortedCol].asc = false;
    this.sortedCol = -1;
    this.sortedRows = [...this.rows];
    this.onColSorted.emit(false);
  }

  sortColumn(index:number, asc:boolean) {
    const colName = this.columns[index].name;
    const mapName = this.dataMap[colName];

    if(this.dateFields.includes(mapName)) this.sortByDate(mapName, asc);
    else
    {
      if(asc) this.sortedRows.sort((a, b) => (a[mapName] > b[mapName]) ? 1 : -1);
      else this.sortedRows.sort((a, b) => (a[mapName] < b[mapName]) ? 1 : -1);
    }
  }

  sortByDate(propName:string, asc:boolean) {
    let asDates;
    asDates = this.sortedRows.map(x => {
      x[propName] = new Date(x[propName]);
      return x;
    });
    if(asc) asDates.sort((a,b) => b[propName] - a[propName]);
    else asDates.sort((a,b) => a[propName] - b[propName]);

    this.sortedRows = asDates;
  }

  handleRowClicked(row:any, index:number) {
    this.onRowClick.emit([row, index]);
  }
}
