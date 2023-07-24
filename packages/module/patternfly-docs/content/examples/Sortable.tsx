import React from 'react';
import { debounce } from '@patternfly/react-core';
import { sortable, SortByDirection, TableGridBreakpoint } from '@patternfly/react-table';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export class SortableExample extends React.Component {
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: `sortable-row-${i}`,
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }

    this.sortableVirtualBody = null;

    this.state = {
      columns: [
        {
          title: 'Repositories',
          transforms: [sortable],
          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
        },
        {
          title: 'Branches',
          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
        },
        {
          title: 'Pull requests',
          transforms: [sortable],
          props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }
        },
        {
          title: 'Workspaces',
          props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' }
        },
        { title: 'Last Commit', props: { className: 'pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-xl' } }
      ],
      rows,
      sortBy: {}
    };

    this.onSort = this.onSort.bind(this);
    this._handleResize = debounce(this._handleResize.bind(this), 100);
  }

  componentDidMount() {
    // re-render after resize
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize() {
    this.forceUpdate();
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) =>
      a.cells[index] < b.cells[index] ? -1 : a.cells[index] > b.cells[index] ? 1 : 0
    );
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });

    this.sortableVirtualBody.forceUpdateVirtualGrid();
  }

  render() {
    const { sortBy, columns, rows } = this.state;

    const measurementCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 44,
      keyMapper: (rowIndex) => rowIndex
    });

    const rowRenderer = ({ index, isScrolling, key, style, parent }) => {
      const { rows, columns } = this.state;

      return (
        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          <tr style={style} role="row">
            <td className={columns[0].props.className} role="gridcell">
              {rows[index].cells[0]}
            </td>
            <td className={columns[1].props.className} role="gridcell">
              {rows[index].cells[1]}
            </td>
            <td className={columns[2].props.className} role="gridcell">
              {rows[index].cells[2]}
            </td>
            <td className={columns[3].props.className} role="gridcell">
              {rows[index].cells[3]}
            </td>
            <td className={columns[4].props.className} role="gridcell">
              {rows[index].cells[4]}
            </td>
          </tr>
        </CellMeasurer>
      );
    };

    return (
      <div aria-label="Scrollable Table" className="pf-v5-c-scrollablegrid">
        <TableDeprecated
          caption="Sortable Virtualized Table"
          cells={columns}
          rows={rows}
          gridBreakPoint={TableGridBreakpoint.none}
          sortBy={sortBy}
          onSort={this.onSort}
          role="grid"
          aria-rowcount={rows.length}
        >
          <TableHeaderDeprecated />
        </TableDeprecated>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualTableBody
              ref={(ref) => (this.sortableVirtualBody = ref)}
              className="pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller"
              deferredMeasurementCache={measurementCache}
              rowHeight={measurementCache.rowHeight}
              height={400}
              overscanRowCount={2}
              columnCount={1}
              rows={rows}
              rowCount={rows.length}
              rowRenderer={rowRenderer}
              width={width}
              role="grid"
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
