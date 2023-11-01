/* eslint-disable no-console */
import React from 'react';
import { ActionsColumn, IActions, TableGridBreakpoint } from '@patternfly/react-table';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { CellMeasurerCache, CellMeasurer, TableProps } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export const ActionsExample: React.FunctionComponent = () => {
  interface RowType {
    disableActions: boolean;
    id: string;
    cells: string[];
  }

  const rows: RowType[] = [];
  for (let i = 0; i < 100; i++) {
    rows.push({
      disableActions: i % 3 === 2,
      id: `actions-row-${i}`,
      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
    });
  }

  const columns: TableProps['cells'] = [
    { title: 'Name', props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' } },
    {
      title: 'Namespace',
      props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
    },
    {
      title: 'Labels',
      props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }
    },
    { title: 'Status', props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' } },
    { title: 'Pod Selector', props: { className: 'pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-xl' } },
    { title: '', props: { className: 'pf-v5-c-table__action' } }
  ];

  const actions: IActions = [
    {
      title: 'Some action',
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)
    },
    {
      title: <div>Another action</div>,
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)
    },
    {
      isSeparator: true
    },
    {
      title: 'Third action',
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)
    }
  ];

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
      <tr data-id={index} style={style} role="row">
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
        <td className={columns[5].props.className} role="gridcell">
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

  return (
    <div aria-label="Scrollable Table" className="pf-v5-c-scrollablegrid">
      <TableDeprecated
        caption="Actions Virtualized Table"
        cells={columns}
        rows={rows}
        gridBreakPoint={TableGridBreakpoint.none}
        aria-rowcount={rows.length}
      >
        <TableHeaderDeprecated />
      </TableDeprecated>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualTableBody
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
          />
        )}
      </AutoSizer>
    </div>
  );
};
