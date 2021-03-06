import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Router } from '@angular/router';

import { Action } from '../../models/action';
import { ActionsConfig } from '../../models/actions-config';
import { Filter } from '../../filters/filter';
import { FilterConfig } from '../../filters/filter-config';
import { FilterField } from '../../filters/filter-field';
import { FilterEvent } from '../../filters/filter-event';
import { SortConfig } from '../../sort/sort-config';
import { SortField } from '../../sort/sort-field';
import { SortEvent } from '../../sort/sort-event';
import { ToolbarConfig } from '../toolbar-config';
import { View } from '../../models/view';
import { ViewsConfig } from '../../models/views-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toolbar-example',
  templateUrl: './toolbar-example.component.html'
})
export class ToolbarExampleComponent implements OnInit {
  @ViewChild('actions') actionsTemplate: TemplateRef<any>;

  actionsConfig: ActionsConfig;
  actionsText: string = '';
  allItems: any[];
  filterConfig: FilterConfig;
  filtersText: string = '';
  items: any[];
  isAscendingSort: boolean = true;
  separator: Object;
  sortConfig: SortConfig;
  currentSortField: SortField;
  toolbarConfig: ToolbarConfig;
  viewsConfig: ViewsConfig;
  view: View;
  weekDayQueries: any[];

  monthVals: any = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
  };

  weekDayVals: any = {
    'Sunday': 1,
    'Monday': 2,
    'Tuesday': 3,
    'Wednesday': 4,
    'Thursday': 5,
    'Friday': 6,
    'Saturday': 7
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.allItems = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way, Bedrock, Washingstone',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Sunday',
      weekdayId: 'day1'
    }, {
      name: 'John Smith', address: '415 East Main Street, Norfolk, Virginia',
      birthMonth: 'October',
      birthMonthId: '10',
      weekDay: 'Monday',
      weekdayId: 'day2'
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street, Pittsburgh, Pennsylvania',
      birthMonth: 'March',
      birthMonthId: 'month3',
      weekDay: 'Tuesday',
      weekdayId: 'day3'
    }, {
      name: 'Judy Green',
      address: '2 Apple Boulevard, Cincinatti, Ohio',
      birthMonth: 'December',
      birthMonthId: 'month12',
      weekDay: 'Wednesday',
      weekdayId: 'day4'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street, New York, New York',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Thursday',
      weekdayId: 'day5'
    }];
    this.items = this.allItems;

    this.weekDayQueries = [{
      id: 'day1',
      value: 'Sunday'
    }, {
      id: 'day2',
      value: 'Monday'
    }, {
      id: 'day3',
      value: 'Tuesday'
    }, {
      id: 'day4',
      value: 'Wednesday'
    }, {
      id: 'day5',
      value: 'Thursday'
    }, {
      id: 'day6',
      value: 'Friday'
    }, {
      id: 'day7',
      value: 'Saturday'
    }];

    this.filterConfig = {
      fields: [{
        id: 'name',
        title:  'Name',
        placeholder: 'Filter by Name...',
        type: 'text'
      }, {
        id: 'address',
        title:  'Address',
        placeholder: 'Filter by Address...',
        type: 'text'
      }, {
        id: 'birthMonth',
        title:  'Birth Month',
        placeholder: 'Filter by Birth Month...',
        type: 'select',
        queries: [{
          id: 'month1',
          value: 'January'
        }, {
          id: 'month2',
          value: 'February'
        }, {
          id: 'month3',
          value: 'March'
        }, {
          id: 'month4',
          value: 'April'
        }, {
          id: 'month5',
          value: 'May'
        }, {
          id: 'month6',
          value: 'June'
        }, {
          id: 'month7',
          value: 'July'
        }, {
          id: 'month8',
          value: 'August'
        }, {
          id: 'month9',
          value: 'September'
        }, {
          id: 'month10',
          value: 'October'
        }, {
          id: 'month11',
          value: 'November'
        }, {
          id: 'month12',
          value: 'December'
        }]
      }, {
        id: 'weekDay',
        title: 'Week Day',
        placeholder: 'Filter by Week Day...',
        type: 'typeahead',
        queries: [
          ...this.weekDayQueries
        ]
      }] as FilterField[],
      resultsCount: this.items.length,
      appliedFilters: []
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title:  'Name',
        sortType: 'alpha'
      }, {
        id: 'address',
        title:  'Address',
        sortType: 'alpha'
      }, {
        id: 'birthMonth',
        title:  'Birth Month',
        sortType: 'alpha'
      }, {
        id: 'weekDay',
        title:  'Week Day',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.actionsConfig = {
      primaryActions: [{
        id: 'action1',
        name: 'Action 1',
        title: 'Do the first thing'
      }, {
        id: 'action2',
        name: 'Action 2',
        title: 'Do something else'
      }],
      moreActions: [{
        id: 'moreActions1',
        name: 'Action',
        title: 'Perform an action'
      }, {
        id: 'moreActions2',
        name: 'Another Action',
        title: 'Do something else'
      }, {
        disabled: true,
        id: 'moreActions3',
        name: 'Disabled Action',
        title: 'Unavailable action',
      }, {
        id: 'moreActions4',
        name: 'Something Else',
        title: ''
      }, {
        id: 'moreActions5',
        name: '',
        separator: true
      }, {
        id: 'moreActions6',
        name: 'Grouped Action 1',
        title: 'Do something'
      }, {
        id: 'moreActions7',
        name: 'Grouped Action 2',
        title: 'Do something similar'
      }]
    } as ActionsConfig;

    this.viewsConfig = {
      views: [{
        id: 'listView',
        title: 'List View',
        iconClass: 'fa fa-th-list'
      }, {
        id: 'tableView',
        title: 'Table View',
        iconClass: 'fa fa-table'
      }],
    } as ViewsConfig;

    this.viewsConfig.currentView = this.viewsConfig.views[0];
    this.view = this.viewsConfig.currentView;

    this.toolbarConfig = {
      actionsConfig: this.actionsConfig,
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig,
      viewsConfig: this.viewsConfig
    } as ToolbarConfig;
  }

  // Action functions

  doAdd(): void {
    this.actionsText = 'Add Action\n' + this.actionsText;
  }

  handleAction(action: Action): void {
    this.actionsText = action.name + '\n' + this.actionsText;
    let test = '';
  }

  optionSelected(option: number): void {
    this.actionsText = 'Option ' + option + ' selected\n' + this.actionsText;
  }

  // Filter functions

  applyFilters(filters: Filter[]): void {
    this.items = [];
    if (filters && filters.length > 0) {
      this.allItems.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.items.push(item);
        }
      });
    } else {
      this.items = this.allItems;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.items.length;
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
    this.filterFieldSelected($event);
  }

  // Reset filtered queries
  filterFieldSelected($event: FilterEvent): void {
    this.filterConfig.fields.forEach((field) => {
      if (field.id === 'weekDay') {
        field.queries = [
          ...this.weekDayQueries
        ];
      }
    });
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    if (filter.field.id === 'name') {
      match = item.name.match(filter.value) !== null;
    } else if (filter.field.id === 'address') {
      match = item.address.match(filter.value) !== null;
    } else if (filter.field.id === 'birthMonth') {
      match = item.birthMonth === filter.value;
    } else if (filter.field.id === 'weekDay') {
      match = item.weekDay === filter.value;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Filter queries for type ahead
  filterQueries($event: FilterEvent) {
    const index = this.filterConfig.fields.findIndex(i => i.id === $event.field.id);
    let val = $event.value.trim();

    if (this.filterConfig.fields[index].id === 'weekDay') {
      this.filterConfig.fields[index].queries = [
        ...this.weekDayQueries.filter((item: any) => {
          if (item.value) {
            return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
          } else {
            return true;
          }
        })
      ];
    }
  }

  // Sort functions

  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.name.localeCompare(item2.name);
    } else if (this.currentSortField.id === 'address') {
      compValue = item1.address.localeCompare(item2.address);
    } else if (this.currentSortField.id === 'birthMonth') {
      compValue = this.monthVals[item1.birthMonth] - this.monthVals[item2.birthMonth];
    } else if (this.currentSortField.id === 'weekDay') {
      compValue = this.weekDayVals[item1.weekDay] - this.weekDayVals[item2.weekDay];
    }

    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  sortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2));
  }

  // View functions

  viewSelected(view: View): void {
    this.view = view;
    this.sortConfig.show = (this.view.id === 'tableView' ? false : true);
  }
}
