import React from 'react';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';

export const ComposableTableWindowScroller = () => {
  const [scrollableElement, setScrollableElement] = React.useState();
  React.useEffect(() => {
    const scrollableElement = document.getElementById('content-scrollable-2');
    setScrollableElement(scrollableElement);
  });
  const rows = [];
  for (let i = 0; i < 100000; i++) {
    const cells = [];
    const num = Math.floor(Math.random() * Math.floor(2)) + 1;
    for (let j = 0; j < 5; j++) {
      const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);
      cells.push(cellValue);
    }
    rows.push(cells);
  }
  const [selected, setSelected] = React.useState(rows.map(row => false));
  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];
  const scrollToIndex = -1; // can be used to programmatically set current index

  const onSelect = (event, isSelected, rowId) => {
    setSelected(selected.map((sel, index) => (index === rowId ? isSelected : sel)));
  };

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: rowIndex => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, isScrolling, key, style, parent }) => {
    const text = rows[rowIndex][0];

    return (
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
            <Td key={`${rowIndex}-${++index}`}>{text}</Td>
          ))}
        </Tr>
      </CellMeasurer>
    );
  };

  const scrollableContainerStyle = {
    height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,
    overflowX: 'auto',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    position: 'relative'
  };

  return (
    <div
      id="content-scrollable-2"
      aria-label="Scrollable Table"
      className="pf-v5-c-scrollablegrid"
      style={scrollableContainerStyle}
    >
      <Table gridBreakPoint={TableGridBreakpoint.none}
                       aria-rowcount={rows.length}>
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
      <WindowScroller scrollElement={scrollableElement}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild}>
                <VirtualTableBody
                  autoHeight
                  className={'pf-v5-c-virtualized pf-v5-c-window-scroller'}
                  deferredMeasurementCache={measurementCache}
                  rowHeight={measurementCache.rowHeight}
                  height={height || 0}
                  isScrolling={isScrolling}
                  isScrollingOptOut={true}
                  onScroll={onChildScroll}
                  overscanRowCount={2}
                  columnCount={1}
                  rows={rows}
                  rowCount={rows.length}
                  rowRenderer={rowRenderer}
                  scrollToIndex={scrollToIndex}
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
  );
};
