import React from 'react';
import { debounce } from '@patternfly/react-core';
import { TableGridBreakpoint } from '@patternfly/react-table';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';

export class WindowScrollerExample extends React.Component {
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100000; i++) {
      const cells = [];
      const num = Math.floor(Math.random() * Math.floor(2)) + 1;
      for (let j = 0; j < 5; j++) {
        const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);
        cells.push(cellValue);
      }
      rows.push({
        id: `window-scroller-row-${i}`,
        cells
      });

      this._cellMeasurementCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 44,
        keyMapper: (rowIndex) => rowIndex
      });
    }

    this.state = {
      scrollToIndex: -1, // can be used to programmatically set current index
      scrollableElement: null,
      columns: [
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
      ],
      rows
    };

    this._handleResize = debounce(this._handleResize.bind(this), 100);
    this._bindBodyRef = this._bindBodyRef.bind(this);
  }

  componentDidMount() {
    // re-render after resize
    window.addEventListener('resize', this._handleResize);

    this.setState({ scrollableElement: document.getElementById('content-scrollable-1') });
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

  render() {
    const { scrollToIndex, columns, rows, scrollableElement } = this.state;

    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {
      const { rows, columns } = this.state;
      const text = rows[index].cells[0];

      return (
        <CellMeasurer cache={this._cellMeasurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          <tr style={style} role="row">
            <td className={columns[0].props.className} role="gridcell">
              {text}
            </td>
            <td className={columns[1].props.className} role="gridcell">
              {text}
            </td>
            <td className={columns[2].props.className} role="gridcell">
              {text}
            </td>
            <td className={columns[3].props.className} role="gridcell">
              {text}
            </td>
            <td className={columns[4].props.className} role="gridcell">
              {text}
            </td>
          </tr>
        </CellMeasurer>
      );
    };

    return (
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
          <TableDeprecated
            caption="WindowScoller allows scrolling of a parent container or the window instead of tbody. It also can be used to dynamically size the table to the size of the scroll element."
            cells={columns}
            rows={rows}
            gridBreakPoint={TableGridBreakpoint.none}
            aria-rowcount={rows.length}
          >
            <TableHeaderDeprecated />
          </TableDeprecated>
          {scrollableElement && (
            <WindowScroller scrollElement={scrollableElement}>
              {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <div ref={registerChild}>
                      <VirtualTableBody
                        ref={this._bindBodyRef}
                        autoHeight
                        className={'pf-v5-c-virtualized pf-v5-c-window-scroller'}
                        deferredMeasurementCache={this._cellMeasurementCache}
                        rowHeight={this._cellMeasurementCache.rowHeight}
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
          )}
        </div>
      </div>
    );
  }
}
