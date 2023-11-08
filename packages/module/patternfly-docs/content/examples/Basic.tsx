import React from 'react';
import { Caption, Table, TableGridBreakpoint, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export const VirtualizedExample: React.FunctionComponent = () => {
  const rows: string[] = [];
  for (let i = 0; i < 100; i++) {
    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);
  }

  const columns = [
    {
      title: 'Repositories',
      props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
    },
    {
      title: 'Branches',
      props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }
    },
    {
      title: 'Pull requests',
      props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }
    },
    {
      title: 'Workspaces',
      props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' }
    },
    { title: 'Last Commit', props: { className: 'pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-xl' } }
  ];

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>
        ))}
      </Tr>
    </CellMeasurer>
  );

  return (
    <div aria-label="Scrollable Table" className="pf-v5-c-scrollablegrid">
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Caption>Simple Table</Caption>
        <Thead>
          <Tr>
            {columns.map((col, index) => (
              <Th key={++index}>{col.title}</Th>
            ))}
          </Tr>
        </Thead>
      </Table>
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
            role="grid"
          />
        )}
      </AutoSizer>
    </div>
  );
};
