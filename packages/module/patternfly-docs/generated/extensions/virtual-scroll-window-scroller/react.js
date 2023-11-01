import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import '../../../content/examples/./VirtualGrid.example.css';
import '../../../content/examples/./WindowScroller.example.css';
const pageData = {
  "id": "Virtual scroll window scroller",
  "section": "extensions",
  "subsection": "",
  "deprecated": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "react",
  "tabName": null,
  "slug": "/extensions/virtual-scroll-window-scroller/react",
  "sourceLink": "https://github.com/patternfly/react-virtualized-extension",
  "relPath": "packages/module/patternfly-docs/content/examples/WindowScroller.md",
  "propComponents": [
    {
      "name": "VirtualTableBody",
      "description": "It is inefficient to create and manage a large list of DOM elements within a scrolling container\nif only a few of those elements are visible. The primary purpose of this component is to improve\nperformance by only rendering the DOM nodes that a user is able to see based on their current\nscroll position.\n\nThis component renders a virtualized list of elements with either fixed or dynamic heights.",
      "props": [
        {
          "name": "aria-label",
          "type": "string",
          "description": ""
        },
        {
          "name": "autoHeight",
          "type": "boolean",
          "description": "Removes fixed height from the scrollingContainer so that the total height\nof rows can stretch the window. Intended for use with WindowScroller",
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "description": "Optional CSS class name"
        },
        {
          "name": "columnCount",
          "type": "number",
          "description": ""
        },
        {
          "name": "columns",
          "type": "any[]",
          "description": ""
        },
        {
          "name": "estimatedRowSize",
          "type": "number",
          "description": "Used to estimate the total height of a List before all of its rows have actually been measured.\nThe estimated total height is adjusted as rows are rendered.",
          "defaultValue": "30"
        },
        {
          "name": "height",
          "type": "number",
          "description": "Height constraint for list (determines how many actual rows are rendered)",
          "required": true
        },
        {
          "name": "innerScrollContainerComponent",
          "type": "No type info",
          "defaultValue": "'tbody'"
        },
        {
          "name": "noRowsRenderer",
          "type": "NoContentRenderer",
          "description": "Optional renderer to be used in place of rows when rowCount is 0",
          "defaultValue": "() => null as any"
        },
        {
          "name": "onRowsRendered",
          "type": "(params: any) => void",
          "description": "Callback invoked with information about the slice of rows that were just rendered.",
          "defaultValue": "() => {}"
        },
        {
          "name": "onScroll",
          "type": "(params: Scroll) => void",
          "description": "Callback invoked whenever the scroll offset changes within the inner scrollable region.\nThis callback can be used to sync scrolling between lists, tables, or grids.",
          "defaultValue": "() => {}"
        },
        {
          "name": "overscanIndicesGetter",
          "type": "OverscanIndicesGetter",
          "description": "See VirtualGrid#overscanIndicesGetter",
          "defaultValue": "accessibilityOverscanIndicesGetter"
        },
        {
          "name": "overscanRowCount",
          "type": "number",
          "description": "Number of rows to render above/below the visible bounds of the list.\nThese rows can help for smoother scrolling on touch devices.",
          "defaultValue": "10"
        },
        {
          "name": "rowCount",
          "type": "number",
          "description": "Number of rows in list.",
          "required": true
        },
        {
          "name": "rowHeight",
          "type": "CellSize",
          "description": "Either a fixed row height (number) or a function that returns the height of a row given its index.",
          "required": true
        },
        {
          "name": "rowRenderer",
          "type": "any",
          "description": "Responsible for rendering a row given an index; ({ index: number }): node",
          "required": true
        },
        {
          "name": "rows",
          "type": "any[]",
          "description": "",
          "required": true
        },
        {
          "name": "scrollContainerComponent",
          "type": "No type info",
          "defaultValue": "'table'"
        },
        {
          "name": "scrollToAlignment",
          "type": "Alignment",
          "description": "See VirtualGrid#scrollToAlignment",
          "defaultValue": "'auto'"
        },
        {
          "name": "scrollToIndex",
          "type": "number",
          "description": "Row index to ensure visible (by forcefully scrolling if necessary)",
          "defaultValue": "-1"
        },
        {
          "name": "scrollTop",
          "type": "number",
          "description": "Vertical offset."
        },
        {
          "name": "style",
          "type": "Object",
          "description": "",
          "defaultValue": "{}"
        },
        {
          "name": "tabIndex",
          "type": "number",
          "description": "Tab index for focus"
        },
        {
          "name": "width",
          "type": "number",
          "description": "Width of list",
          "required": true
        }
      ]
    }
  ],
  "examples": [
    "Window scroller",
    "Using composable table components"
  ]
};
pageData.liveContext = {
  CellMeasurerCache,
  CellMeasurer,
  AutoSizer,
  VirtualTableBody,
  WindowScroller,
  TableDeprecated,
  TableHeaderDeprecated
};
pageData.relativeImports = {
  
};
pageData.examples = {
  'Window scroller': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { debounce } from '@patternfly/react-core';\nimport { TableGridBreakpoint } from '@patternfly/react-table';\nimport { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';\n\nexport class WindowScrollerExample extends React.Component {\n  constructor(props) {\n    super(props);\n    const rows = [];\n    for (let i = 0; i < 100000; i++) {\n      const cells = [];\n      const num = Math.floor(Math.random() * Math.floor(2)) + 1;\n      for (let j = 0; j < 5; j++) {\n        const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);\n        cells.push(cellValue);\n      }\n      rows.push({\n        id: `window-scroller-row-${i}`,\n        cells\n      });\n\n      this._cellMeasurementCache = new CellMeasurerCache({\n        fixedWidth: true,\n        minHeight: 44,\n        keyMapper: (rowIndex) => rowIndex\n      });\n    }\n\n    this.state = {\n      scrollToIndex: -1, // can be used to programmatically set current index\n      scrollableElement: null,\n      columns: [\n        {\n          title: 'Repositories',\n          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }\n        },\n        {\n          title: 'Branches',\n          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }\n        },\n        {\n          title: 'Pull requests',\n          props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }\n        },\n        {\n          title: 'Workspaces',\n          props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' }\n        },\n        { title: 'Last Commit', props: { className: 'pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-xl' } }\n      ],\n      rows\n    };\n\n    this._handleResize = debounce(this._handleResize.bind(this), 100);\n    this._bindBodyRef = this._bindBodyRef.bind(this);\n  }\n\n  componentDidMount() {\n    // re-render after resize\n    window.addEventListener('resize', this._handleResize);\n\n    this.setState({ scrollableElement: document.getElementById('content-scrollable-1') });\n  }\n\n  componentWillUnmount() {\n    window.removeEventListener('resize', this._handleResize);\n  }\n\n  _handleResize() {\n    // this._cellMeasurementCache.clearAll();\n    // this._bodyRef.recomputeVirtualGridSize();\n  }\n\n  _bindBodyRef(ref) {\n    this._bodyRef = ref;\n  }\n\n  render() {\n    const { scrollToIndex, columns, rows, scrollableElement } = this.state;\n\n    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {\n      const { rows, columns } = this.state;\n      const text = rows[index].cells[0];\n\n      return (\n        <CellMeasurer cache={this._cellMeasurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>\n          <tr style={style} role=\"row\">\n            <td className={columns[0].props.className} role=\"gridcell\">\n              {text}\n            </td>\n            <td className={columns[1].props.className} role=\"gridcell\">\n              {text}\n            </td>\n            <td className={columns[2].props.className} role=\"gridcell\">\n              {text}\n            </td>\n            <td className={columns[3].props.className} role=\"gridcell\">\n              {text}\n            </td>\n            <td className={columns[4].props.className} role=\"gridcell\">\n              {text}\n            </td>\n          </tr>\n        </CellMeasurer>\n      );\n    };\n\n    return (\n      <div\n        id=\"content-scrollable-1\"\n        aria-label=\"Scrollable Table\"\n        className=\"pf-v5-c-scrollablegrid\"\n        style={{\n          height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,\n          overflowX: 'auto',\n          overflowY: 'scroll',\n          scrollBehavior: 'smooth',\n          WebkitOverflowScrolling: 'touch',\n          position: 'relative'\n        }}\n      >\n        <div style={{ padding: 15 }}>\n          <TableDeprecated\n            caption=\"WindowScoller allows scrolling of a parent container or the window instead of tbody. It also can be used to dynamically size the table to the size of the scroll element.\"\n            cells={columns}\n            rows={rows}\n            gridBreakPoint={TableGridBreakpoint.none}\n            aria-rowcount={rows.length}\n          >\n            <TableHeaderDeprecated />\n          </TableDeprecated>\n          {scrollableElement && (\n            <WindowScroller scrollElement={scrollableElement}>\n              {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (\n                <AutoSizer disableHeight>\n                  {({ width }) => (\n                    <div ref={registerChild}>\n                      <VirtualTableBody\n                        ref={this._bindBodyRef}\n                        autoHeight\n                        className={'pf-v5-c-virtualized pf-v5-c-window-scroller'}\n                        deferredMeasurementCache={this._cellMeasurementCache}\n                        rowHeight={this._cellMeasurementCache.rowHeight}\n                        height={height || 0}\n                        isScrolling={isScrolling}\n                        isScrollingOptOut={true}\n                        onScroll={onChildScroll}\n                        overscanRowCount={2}\n                        columnCount={1}\n                        rows={rows}\n                        rowCount={rows.length}\n                        rowRenderer={rowRenderer}\n                        scrollToIndex={scrollToIndex}\n                        scrollTop={scrollTop}\n                        width={width}\n                        role=\"grid\"\n                      />\n                    </div>\n                  )}\n                </AutoSizer>\n              )}\n            </WindowScroller>\n          )}\n        </div>\n      </div>\n    );\n  }\n}\n","title":"Window scroller","lang":"js"}}>
      
    </Example>,
  'Using composable table components': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';\nimport { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';\n\nexport const ComposableTableWindowScroller = () => {\n  const [scrollableElement, setScrollableElement] = React.useState();\n  React.useEffect(() => {\n    const scrollableElement = document.getElementById('content-scrollable-2');\n    setScrollableElement(scrollableElement);\n  });\n  const rows = [];\n  for (let i = 0; i < 100000; i++) {\n    const cells = [];\n    const num = Math.floor(Math.random() * Math.floor(2)) + 1;\n    for (let j = 0; j < 5; j++) {\n      const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);\n      cells.push(cellValue);\n    }\n    rows.push(cells);\n  }\n  const [selected, setSelected] = React.useState(rows.map((_row) => false));\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n  const scrollToIndex = -1; // can be used to programmatically set current index\n\n  const onSelect = (event, isSelected, rowId) => {\n    setSelected(selected.map((sel, index) => (index === rowId ? isSelected : sel)));\n  };\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => {\n    const text = rows[rowIndex][0];\n\n    return (\n      <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n        <Tr style={style}>\n          <Td\n            key={`${rowIndex}_0`}\n            select={{\n              rowIndex,\n              onSelect,\n              isSelected: selected[rowIndex]\n            }}\n          />\n          {columns.map((col, index) => (\n            <Td key={`${rowIndex}-${++index}`}>{text}</Td>\n          ))}\n        </Tr>\n      </CellMeasurer>\n    );\n  };\n\n  const scrollableContainerStyle = {\n    height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,\n    overflowX: 'auto',\n    overflowY: 'scroll',\n    scrollBehavior: 'smooth',\n    WebkitOverflowScrolling: 'touch',\n    position: 'relative'\n  };\n\n  return (\n    <div\n      id=\"content-scrollable-2\"\n      aria-label=\"Scrollable Table\"\n      className=\"pf-v5-c-scrollablegrid\"\n      style={scrollableContainerStyle}\n    >\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Caption>Virtualized table with composable table components</Caption>\n        <Thead>\n          <Tr>\n            <Th className=\"pf-v5-c-table__check\" />\n            {columns.map((col, index) => (\n              <Th key={++index}>{col}</Th>\n            ))}\n          </Tr>\n        </Thead>\n      </Table>\n      <WindowScroller scrollElement={scrollableElement}>\n        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (\n          <AutoSizer disableHeight>\n            {({ width }) => (\n              <div ref={registerChild}>\n                <VirtualTableBody\n                  autoHeight\n                  className={'pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller'}\n                  deferredMeasurementCache={measurementCache}\n                  rowHeight={measurementCache.rowHeight}\n                  height={height || 0}\n                  isScrolling={isScrolling}\n                  isScrollingOptOut={true}\n                  onScroll={onChildScroll}\n                  overscanRowCount={2}\n                  columnCount={1}\n                  rows={rows}\n                  rowCount={rows.length}\n                  rowRenderer={rowRenderer}\n                  scrollToIndex={scrollToIndex}\n                  scrollTop={scrollTop}\n                  width={width}\n                  role=\"grid\"\n                />\n              </div>\n            )}\n          </AutoSizer>\n        )}\n      </WindowScroller>\n    </div>\n  );\n};\n","title":"Using composable table components","lang":"js"}}>
      
    </Example>
};

const Component = () => (
  <React.Fragment>
    <p {...{"className":"ws-p"}}>
      {`Note: React Virtualized Extension lives in its own package at `}
      <PatternflyThemeLink {...{"to":"https://www.npmjs.com/package/@patternfly/react-virtualized-extension"}}>
        <code {...{"className":"ws-code"}}>
          {`@patternfly/react-virtualized-extension`}
        </code>
      </PatternflyThemeLink>
      {`!
`}
            <br/>
      {`
This package is currently an extension. Extension components do not undergo the same rigorous design or coding review process as core PatternFly components. If enough members of the community find them useful, we will work to move them into our core PatternFly system by starting the design process for the idea.
`}
            <br/>
      {`
`}
            <br/>
    </p>
    <AutoLinkHeader {...{"id":"examples","size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    {React.createElement(pageData.examples["Window scroller"])}
    {React.createElement(pageData.examples["Using composable table components"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsVirtualScrollWindowScrollerReactDocs';
Component.pageData = pageData;

export default Component;
