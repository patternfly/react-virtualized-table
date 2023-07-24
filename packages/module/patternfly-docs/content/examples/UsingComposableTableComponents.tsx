import React from 'react';

import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';

export const ComposableTableVirtualized = () => {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);
  }
  const [selected, setSelected] = React.useState(rows.map((row) => false));
  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];

  const onSelect = (event, isSelected, rowId) => {
    setSelected(selected.map((sel, index) => (index === rowId ? isSelected : sel)));
  };

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        <Td
          key={`${rowIndex}_0`}
          select={{
            rowIndex,
            onSelect: onSelect,
            isSelected: selected[rowIndex]
          }}
        />
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>
        ))}
      </Tr>
    </CellMeasurer>
  );

  return (
    <div aria-label="Scrollable Table" className="pf-v5-c-scrollablegrid">
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Caption>Virtualized table with composable table components</Caption>
        <Thead>
          <Tr>
            <Th className="pf-v5-c-table__check" />
            {columns.map((col, index) => (
              <Th key={++index}>{col}</Th>
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
