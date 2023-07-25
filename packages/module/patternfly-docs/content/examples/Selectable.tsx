import React from 'react';
import { debounce } from '@patternfly/react-core';
import { headerCol, TableGridBreakpoint } from '@patternfly/react-table';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export class SelectableExample extends React.Component {
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        selected: false,
        id: `selectable-row-${i}`,
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }

    this.selectableVirtualBody = null;

    this.state = {
      columns: [
        // headerCol transform adds checkbox column with pf-m-2-sm, pf-m-1-md+ column space
        {
          title: 'Repositories',
          cellTransforms: [headerCol()],
          props: { className: 'pf-m-5-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
        },
        {
          title: 'Pull requests',
          props: { className: 'pf-m-5-col-on-sm pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl' }
        },
        {
          title: 'Workspaces',
          props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' }
        },
        { title: 'Last Commit', props: { className: 'pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-xl' } }
      ],
      rows
    };

    this.onSelect = this.onSelect.bind(this);
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

  onSelect(event, isSelected, virtualRowIndex, rowData) {
    let rows;
    if (virtualRowIndex === -1) {
      rows = this.state.rows.map((oneRow) => {
        oneRow.selected = isSelected;
        return oneRow;
      });
    } else {
      rows = [...this.state.rows];
      const rowIndex = rows.findIndex((r) => r.id === rowData.id);
      rows[rowIndex] = { ...rows[rowIndex], selected: isSelected };
    }
    this.setState({
      rows
    });
    this.selectableVirtualBody.forceUpdateVirtualGrid();
  }

  render() {
    const { columns, rows } = this.state;

    const measurementCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 44,
      keyMapper: (rowIndex) => rowIndex
    });

    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {
      const { rows, columns } = this.state;

      return (
        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          <tr data-id={index} style={style} role="row">
            <td data-key="0" className="pf-v5-c-table__check" role="gridcell">
              <input
                type="checkbox"
                aria-label={`Select row ${index}`}
                checked={rows[index].selected}
                onChange={(e) => {
                  this.onSelect(e, e.target.checked, 0, { id: rows[index].id });
                }}
              />
            </td>
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
          </tr>
        </CellMeasurer>
      );
    };

    return (
      <div aria-label="Scrollable Table" className="pf-v5-c-scrollablegrid">
        <TableDeprecated
          caption="Selectable Virtualized Table"
          cells={columns}
          rows={rows}
          gridBreakPoint={TableGridBreakpoint.none}
          onSelect={this.onSelect}
          aria-rowcount={rows.length}
        >
          <TableHeaderDeprecated />
        </TableDeprecated>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualTableBody
              ref={(ref) => (this.selectableVirtualBody = ref)}
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
