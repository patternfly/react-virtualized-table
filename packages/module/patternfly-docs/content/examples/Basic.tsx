import React from 'react';
import { Divider, Panel, PanelHeader, PanelMain, PanelMainBody, debounce } from '@patternfly/react-core';
import { Caption, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export class VirtualizedExample extends React.Component {
  constructor(props) {
    super(props);
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        id: `basic-row-${i}`,
        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
      });
    }

    this.state = {
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
      <Panel isScrollable>
        <PanelHeader>Simple Table</PanelHeader>
        <PanelMain tabIndex={0}>
            <Table isStickyHeader aria-label="Simple Table" aria-rowcount={rows.length} variant="compact">
              <Thead>
                <Tr>
                  <Th>{columns[0].title}</Th>
                  <Th>{columns[1].title}</Th>
                  <Th>{columns[2].title}</Th>
                  <Th>{columns[3].title}</Th>
                  <Th>{columns[4].title}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row) => (
                  <Tr key={row.name}>
                    <Td dataLabel={columns[0].title}>{row.cells[0]}</Td>
                    <Td dataLabel={columns[1].title}>{row.cells[1]}</Td>
                    <Td dataLabel={columns[2].title}>{row.cells[2]}</Td>
                    <Td dataLabel={columns[3].title}>{row.cells[3]}</Td>
                    <Td dataLabel={columns[4].title}>{row.cells[4]}</Td>
                  </Tr>
                ))}
              </Tbody>
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
        </PanelMain>
      </Panel>
    );
  }
}
