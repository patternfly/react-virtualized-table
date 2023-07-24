import React from 'react';
import {
  Button,
  ButtonVariant,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup,
  InputGroup,
  InputGroupItem,
  TextInput
} from '@patternfly/react-core';
import { debounce } from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { ActionsColumn } from '@patternfly/react-table';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { 
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  Select,
  SelectOption,
  SelectVariant
} from '@patternfly/react-core/deprecated';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';

export class FilterExample extends React.Component {
  constructor(props) {
    super(props);

    this.actionsVirtualBody = null;

    const rows = [];
    for (let i = 0; i < 100; i++) {
      const data = {};
      if (i % 2 === 0) {
        data.cells = [`US-Node ${i}`, i, i, 'Down', 'Brno'];
      } else if (i % 3 === 0) {
        data.cells = [`CN-Node ${i}`, i, i, 'Running', 'Westford'];
      } else {
        data.cells = [`US-Node ${i}`, i, i, 'Stopped', 'Raleigh'];
      }
      rows.push(data);
    }
    this.scrollableElement = React.createRef();

    this.state = {
      scrollableElement: null,

      filters: {
        location: [],
        name: [],
        status: []
      },
      currentCategory: 'Name',
      isFilterDropdownOpen: false,
      isCategoryDropdownOpen: false,
      nameInput: '',
      columns: [
        { title: 'Servers' },
        { title: 'Threads' },
        { title: 'Applications' },
        { title: 'Status' },
        { title: 'Location' }
      ],
      rows,
      inputValue: '',
      actions: [
        {
          title: 'Some action',
          onClick: (event, rowId, rowData, extra) => console.log('clicked on Some action, on row: ', rowId)
        },
        {
          title: <div>Another action</div>,
          onClick: (event, rowId, rowData, extra) => console.log('clicked on Another action, on row: ', rowId)
        },
        {
          isSeparator: true
        },
        {
          title: 'Third action',
          onClick: (event, rowId, rowData, extra) => console.log('clicked on Third action, on row: ', rowId)
        }
      ]
    };

    this._handleResize = debounce(this._handleResize.bind(this), 100);

    this.onDelete = (type = '', id = '') => {
      if (type) {
        this.setState(prevState => {
          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);
          return {
            filters: prevState.filters
          };
        });
      } else {
        this.setState({
          filters: {
            location: [],
            name: [],
            status: []
          },
          inputValue: ''
        });
      }
    };

    this.onCategoryToggle = isOpen => {
      this.setState({
        isCategoryDropdownOpen: isOpen
      });
    };

    this.onCategorySelect = event => {
      this.setState({
        currentCategory: event.target.innerText,
        isCategoryDropdownOpen: !this.state.isCategoryDropdownOpen
      });
    };

    this.onFilterToggle = isOpen => {
      this.setState({
        isFilterDropdownOpen: isOpen
      });
    };

    this.onFilterSelect = event => {
      this.setState({
        isFilterDropdownOpen: !this.state.isFilterDropdownOpen
      });
    };

    this.onInputChange = newValue => {
      // this.setState({ inputValue: newValue });
      if (newValue === '') {
        this.onDelete();
        this.setState({
          inputValue: newValue
        });
      } else {
        this.setState(prevState => {
          return {
            filters: {
              ...prevState.filters,
              ['name']: [newValue]
            },
            inputValue: newValue
          };
        });
      }
    };

    this.onRowSelect = (event, isSelected, rowId) => {
      let rows;
      if (rowId === -1) {
        rows = this.state.rows.map(oneRow => {
          oneRow.selected = isSelected;
          return oneRow;
        });
      } else {
        rows = [...this.state.rows];
        rows[rowId].selected = isSelected;
      }
      this.setState({
        rows
      });
    };

    this.onStatusSelect = (event, selection) => {
      const checked = event.target.checked;
      this.setState(prevState => {
        const prevSelections = prevState.filters['status'];
        return {
          filters: {
            ...prevState.filters,
            status: checked ? [...prevSelections, selection] : prevSelections.filter(value => value !== selection)
          }
        };
      });
    };

    this.onNameInput = event => {
      if (event.key && event.key !== 'Enter') {
        return;
      }

      const { inputValue } = this.state;
      this.setState(prevState => {
        const prevFilters = prevState.filters['name'];
        return {
          filters: {
            ...prevState.filters,
            ['name']: prevFilters.includes(inputValue) ? prevFilters : [...prevFilters, inputValue]
          },
          inputValue: ''
        };
      });
    };

    this.onLocationSelect = (event, selection) => {
      this.setState(prevState => {
        return {
          filters: {
            ...prevState.filters,
            ['location']: [selection]
          }
        };
      });
      this.onFilterSelect();
    };

    this._handleResize = debounce(this._handleResize.bind(this), 100);
    this._bindBodyRef = this._bindBodyRef.bind(this);
  }

  componentDidMount() {
    // re-render after resize
    window.addEventListener('resize', this._handleResize);

    setTimeout(() => {
      const scollableElement = document.getElementById('content-scrollable-1');
      this.setState({ scollableElement });
    });

    // re-render after resize
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize() {
    this._cellMeasurementCache.clearAll();
    this._bodyRef.recomputeVirtualGridSize();
  }

  _bindBodyRef(ref) {
    this._bodyRef = ref;
  }

  buildCategoryDropdown() {
    const { isCategoryDropdownOpen, currentCategory } = this.state;

    return (
      <ToolbarItem>
        <Dropdown
          onSelect={this.onCategorySelect}
          position={DropdownPosition.left}
          toggle={
            <DropdownToggle onToggle={this.onCategoryToggle} style={{ width: '100%' }}>
              <FilterIcon /> {currentCategory}
            </DropdownToggle>
          }
          isOpen={isCategoryDropdownOpen}
          dropdownItems={[
            <DropdownItem key="cat1">Location</DropdownItem>,
            <DropdownItem key="cat2">Name</DropdownItem>,
            <DropdownItem key="cat3">Status</DropdownItem>
          ]}
          style={{ width: '100%' }}
        ></Dropdown>
      </ToolbarItem>
    );
  }

  buildFilterDropdown() {
    const { currentCategory, isFilterDropdownOpen, inputValue, filters } = this.state;

    const locationMenuItems = [
      <SelectOption key="raleigh" value="Raleigh" />,
      <SelectOption key="westford" value="Westford" />,
      <SelectOption key="boston" value="Boston" />,
      <SelectOption key="brno" value="Brno" />,
      <SelectOption key="bangalore" value="Bangalore" />
    ];

    const statusMenuItems = [
      <SelectOption key="statusRunning" value="Running" />,
      <SelectOption key="statusStopped" value="Stopped" />,
      <SelectOption key="statusDown" value="Down" />,
      <SelectOption key="statusDegraded" value="Degraded" />,
      <SelectOption key="statusMaint" value="Needs Maintainence" />
    ];

    return (
      <React.Fragment>
        <ToolbarFilter
          chips={filters.location}
          deleteChip={this.onDelete}
          categoryName="Location"
          showToolbarItem={currentCategory === 'Location'}
        >
          <Select
            aria-label="Location"
            onToggle={this.onFilterToggle}
            onSelect={this.onLocationSelect}
            selections={filters.location[0]}
            isOpen={isFilterDropdownOpen}
            placeholderText="Any"
          >
            {locationMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.name}
          deleteChip={this.onDelete}
          categoryName="Name"
          showToolbarItem={currentCategory === 'Name'}
        >
          <InputGroup>
            <InputGroupItem isFill ><TextInput
              name="nameInput"
              id="nameInput1"
              type="search"
              aria-label="name filter"
              onChange={this.onInputChange}
              value={inputValue}
              placeholder="Filter by name..."
              // onKeyDown={this.onNameInput}
            /></InputGroupItem>
            <InputGroupItem><Button
              variant={ButtonVariant.control}
              aria-label="search button for search input"
              // onClick={this.onNameInput}
            >
              <SearchIcon />
            </Button></InputGroupItem>
          </InputGroup>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.status}
          deleteChip={this.onDelete}
          categoryName="Status"
          showToolbarItem={currentCategory === 'Status'}
        >
          <Select
            variant={SelectVariant.checkbox}
            aria-label="Status"
            onToggle={this.onFilterToggle}
            onSelect={this.onStatusSelect}
            selections={filters.status}
            isOpen={isFilterDropdownOpen}
            placeholderText="Filter by status"
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
      </React.Fragment>
    );
  }

  renderToolbar() {
    const { filters } = this.state;
    return (
      <Toolbar id="toolbar-with-chip-groups" clearAllFilters={this.onDelete} collapseListedFiltersBreakpoint="xl">
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup variant="filter-group">
              {this.buildCategoryDropdown()}
              {this.buildFilterDropdown()}
            </ToolbarGroup>
          </ToolbarToggleGroup>
        </ToolbarContent>
      </Toolbar>
    );
  }

  render() {
    const { loading, rows, columns, actions, filters, scollableElement } = this.state;

    const filteredRows =
      filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0
        ? rows.filter(row => {
          return (
            (filters.name.length === 0 ||
              filters.name.some(name => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&
            (filters.location.length === 0 || filters.location.includes(row.cells[4])) &&
            (filters.status.length === 0 || filters.status.includes(row.cells[3]))
          );
        })
        : rows;
    const measurementCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 44,
      keyMapper: rowIndex => rowIndex
    });

    const rowRenderer = ({ index, isScrolling, key, style, parent }) => {
      const { columns, actions } = this.state;

      return (
        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          <tr data-id={index} style={style} role="row">
            <td role="gridcell">{filteredRows[index].cells[0]}</td>
            <td role="gridcell">{filteredRows[index].cells[1]}</td>
            <td role="gridcell">{filteredRows[index].cells[2]}</td>
            <td role="gridcell">{filteredRows[index].cells[3]}</td>
            <td role="gridcell">{filteredRows[index].cells[4]}</td>
            <td role="gridcell">
              <ActionsColumn
                items={actions}
                rowData={rows[index]}
                extraData={{ rowIndex: index }}
                isDisabled={rows[index].disableActions}
              />
            </td>
          </tr>
        </CellMeasurer>
      );
    };

    return (
      <React.Fragment>
        {this.renderToolbar()}

        <div
          id="content-scrollable-1"
          aria-label="Scrollable Table"
          className="pf-v5-c-scrollablegrid"
          style={{
            height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,
            overflowX: 'auto',
            overflowY: 'scroll',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            position: 'relative'
          }}
        >
          <div style={{ padding: 15 }}>
            {!loading && filteredRows.length > 0 && (
              <div
                aria-label="Scrollable Table"
                className="pf-v5-c-scrollablegrid"
              >
                <TableDeprecated cells={columns} rows={filteredRows} actions={actions} aria-label="Filterable Table Demo"
                       aria-rowcount={rows.length}>
                  <TableHeaderDeprecated />
                </TableDeprecated>
                <WindowScroller scrollElement={scollableElement}>
                  {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <div ref={registerChild}>
                          <VirtualTableBody
                            ref={ref => (this.actionsVirtualBody = ref)}
                            autoHeight
                            className="pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller"
                            deferredMeasurementCache={measurementCache}
                            rowHeight={measurementCache.rowHeight}
                            height={height || 0}
                            overscanRowCount={10}
                            columnCount={6}
                            rows={filteredRows}
                            rowCount={filteredRows.length}
                            rowRenderer={rowRenderer}
                            scrollTop={scrollTop}
                            width={width}
                            role="grid"
                          />
                        </div>
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
