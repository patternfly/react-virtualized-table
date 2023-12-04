import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { CellMeasurerCache, CellMeasurer} from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';
import {
  Dropdown as DropdownDeprecated,
  DropdownItem as DropdownItemDeprecated,
  DropdownPosition as DropdownPositionDeprecated,
  DropdownToggle as DropdownToggleDeprecated,
  Select as SelectDeprecated,
  SelectOption as SelectOptionDeprecated,
  SelectVariant as SelectVariantDeprecated
} from '@patternfly/react-core/deprecated';
import '../../../content/examples/./VirtualGrid.example.css';
const pageData = {
  "id": "Virtual scroll table",
  "section": "extensions",
  "subsection": "",
  "deprecated": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "react",
  "tabName": null,
  "slug": "/extensions/virtual-scroll-table/react",
  "sourceLink": "https://github.com/patternfly/react-virtualized-extension",
  "relPath": "packages/module/patternfly-docs/content/examples/VirtualizedTable.md",
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
    "Basic",
    "Using composable table components",
    "Sortable",
    "Selectable",
    "Actions",
    "Filterable with WindowScroller"
  ]
};
pageData.liveContext = {
  SearchIcon,
  FilterIcon,
  CellMeasurerCache,
  CellMeasurer,
  AutoSizer,
  VirtualTableBody,
  WindowScroller,
  TableDeprecated,
  TableHeaderDeprecated,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Caption,
  TableGridBreakpoint,
  DropdownDeprecated,
  DropdownItemDeprecated,
  DropdownPositionDeprecated,
  DropdownToggleDeprecated,
  SelectDeprecated,
  SelectOptionDeprecated,
  SelectVariantDeprecated
};
pageData.relativeImports = {
  
};
pageData.examples = {
  'Basic': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { debounce } from '@patternfly/react-core';\nimport { TableGridBreakpoint } from '@patternfly/react-table';\nimport { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport class VirtualizedExample extends React.Component {\n  constructor(props) {\n    super(props);\n    const rows = [];\n    for (let i = 0; i < 100; i++) {\n      rows.push({\n        id: `basic-row-${i}`,\n        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]\n      });\n    }\n\n    this.state = {\n      columns: [\n        {\n          title: 'Repositories',\n          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }\n        },\n        {\n          title: 'Branches',\n          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }\n        },\n        {\n          title: 'Pull requests',\n          props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }\n        },\n        {\n          title: 'Workspaces',\n          props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' }\n        },\n        { title: 'Last Commit', props: { className: 'pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-xl' } }\n      ],\n      rows\n    };\n    this._handleResize = debounce(this._handleResize.bind(this), 100);\n  }\n\n  componentDidMount() {\n    // re-render after resize\n    window.addEventListener('resize', this._handleResize);\n  }\n\n  componentWillUnmount() {\n    window.removeEventListener('resize', this._handleResize);\n  }\n\n  _handleResize() {\n    this.forceUpdate();\n  }\n\n  render() {\n    const { columns, rows } = this.state;\n\n    const measurementCache = new CellMeasurerCache({\n      fixedWidth: true,\n      minHeight: 44,\n      keyMapper: (rowIndex) => rowIndex\n    });\n\n    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {\n      const { rows, columns } = this.state;\n\n      return (\n        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>\n          <tr style={style} role=\"row\">\n            <td className={columns[0].props.className} role=\"gridcell\">\n              {rows[index].cells[0]}\n            </td>\n            <td className={columns[1].props.className} role=\"gridcell\">\n              {rows[index].cells[1]}\n            </td>\n            <td className={columns[2].props.className} role=\"gridcell\">\n              {rows[index].cells[2]}\n            </td>\n            <td className={columns[3].props.className} role=\"gridcell\">\n              {rows[index].cells[3]}\n            </td>\n            <td className={columns[4].props.className} role=\"gridcell\">\n              {rows[index].cells[4]}\n            </td>\n          </tr>\n        </CellMeasurer>\n      );\n    };\n\n    return (\n      <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n        <TableDeprecated\n          caption=\"Simple Table\"\n          cells={columns}\n          rows={rows}\n          gridBreakPoint={TableGridBreakpoint.none}\n          aria-rowcount={rows.length}\n        >\n          <TableHeaderDeprecated />\n        </TableDeprecated>\n        <AutoSizer disableHeight>\n          {({ width }) => (\n            <VirtualTableBody\n              className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n              deferredMeasurementCache={measurementCache}\n              rowHeight={measurementCache.rowHeight}\n              height={400}\n              overscanRowCount={2}\n              columnCount={1}\n              rows={rows}\n              rowCount={rows.length}\n              rowRenderer={rowRenderer}\n              width={width}\n              role=\"grid\"\n            />\n          )}\n        </AutoSizer>\n      </div>\n    );\n  }\n}\n","title":"Basic","lang":"js"}}>
      
    </Example>,
  'Using composable table components': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\n\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\nimport { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';\n\nexport const ComposableTableVirtualized = () => {\n  const rows = [];\n  for (let i = 0; i < 100; i++) {\n    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);\n  }\n  const [selected, setSelected] = React.useState(rows.map((_row) => false));\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const onSelect = (event, isSelected, rowId) => {\n    setSelected(selected.map((sel, index) => (index === rowId ? isSelected : sel)));\n  };\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        <Td\n          key={`${rowIndex}_0`}\n          select={{\n            rowIndex,\n            onSelect,\n            isSelected: selected[rowIndex]\n          }}\n        />\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Caption>Virtualized table with composable table components</Caption>\n        <Thead>\n          <Tr>\n            <Th className=\"pf-v5-c-table__check\" />\n            {columns.map((col, index) => (\n              <Th key={++index}>{col}</Th>\n            ))}\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Using composable table components","lang":"js"}}>
      
    </Example>,
  'Sortable': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { Caption, Table, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport const SortableExample: React.FunctionComponent = () => {\n  const rows: { id: string; cells: string[] }[] = [];\n  for (let i = 0; i < 100; i++) {\n    rows.push({\n      id: `sortable-row-${i}`,\n      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]\n    });\n  }\n\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const [activeSortIndex, setActiveSortIndex] = React.useState<number>(-1);\n\n  // Sort direction of the currently sorted column\n  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | undefined>();\n\n  const getRowIndex = (str: string) => Number(str?.split('-')[1]);\n\n  const getSortParams = (columnIndex: number): ThProps['sort'] => ({\n    sortBy: {\n      index: activeSortIndex,\n      direction: activeSortDirection\n    },\n    onSort: (_event, index, direction) => {\n      setActiveSortIndex(index);\n      setActiveSortDirection(direction as 'desc' | 'asc');\n    },\n    columnIndex\n  });\n\n  if (activeSortIndex !== null) {\n    rows.sort((a, b) => {\n      const aValue = a.cells[activeSortIndex];\n      const bValue = b.cells[activeSortIndex];\n\n      const aValueIndex = getRowIndex(aValue);\n      const bValueIndex = getRowIndex(bValue);\n\n      if (activeSortDirection === 'asc') {\n        return aValueIndex - bValueIndex;\n      }\n\n      return bValueIndex - aValueIndex;\n    });\n  }\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex].cells[index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n      <Table aria-label=\"Sortable table\" ouiaId=\"SortableTable\">\n        <Caption>Sortable Virtualized Table</Caption>\n        <Thead>\n          <Tr>\n            <Th sort={getSortParams(0)}>{columns[0]}</Th>\n            <Th>{columns[1]}</Th>\n            <Th sort={getSortParams(2)}>{columns[2]}</Th>\n            <Th>{columns[3]}</Th>\n            <Th>{columns[4]}</Th>\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            ref={(ref) => ref}\n            className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Sortable","lang":"js"}}>
      
    </Example>,
  'Selectable': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\n\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\nimport { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';\n\nexport const SelectableTableVirtualized: React.FunctionComponent = () => {\n  // this StringArray type is just needed because something in our documentation framework crashes when it encounters\n  // a string[][] type\n  type StringArray = string[];\n  const rows: StringArray[] = [];\n\n  for (let i = 0; i < 100; i++) {\n    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);\n  }\n\n  const selectableRepos = rows;\n\n  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>([]);\n\n  const setRepoSelected = (repo: string, isSelecting = true) =>\n    setSelectedRepoNames((prevSelected) => {\n      const otherSelectedRepoNames = prevSelected.filter((r) => r !== repo);\n      return isSelecting ? [...otherSelectedRepoNames, repo] : otherSelectedRepoNames;\n    });\n\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const selectAllRepos = (isSelecting = true) => setSelectedRepoNames(isSelecting ? rows.map((item) => item[0]) : []);\n\n  const areAllReposSelected = selectedRepoNames.length === selectableRepos.length;\n  const isRepoSelected = (repo: string) => selectedRepoNames.includes(repo);\n\n  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = React.useState<number | null>(null);\n\n  const onSelectRepo = (repo: string, rowIndex: number, isSelecting: boolean) => {\n    if (recentSelectedRowIndex !== null) {\n      const numberSelected = rowIndex - recentSelectedRowIndex;\n      const intermediateIndexes =\n        numberSelected > 0\n          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)\n          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);\n      intermediateIndexes.forEach(() => setRepoSelected(repo, isSelecting));\n    } else {\n      setRepoSelected(repo, isSelecting);\n    }\n    setRecentSelectedRowIndex(rowIndex);\n  };\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        <Td\n          key={`${rowIndex}_0`}\n          select={{\n            rowIndex,\n            onSelect: (_event, isSelecting) => onSelectRepo(rows[rowIndex][0], rowIndex, isSelecting),\n            isSelected: isRepoSelected(rows[rowIndex][0])\n          }}\n        />\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Caption>Selectable Virtualized Table</Caption>\n        <Thead>\n          <Tr>\n            <Th\n              select={{\n                onSelect: (_event, isSelecting) => selectAllRepos(isSelecting),\n                isSelected: areAllReposSelected\n              }}\n            />\n            {columns.map((col, index) => (\n              <Th key={++index}>{col}</Th>\n            ))}\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Selectable","lang":"js"}}>
      
    </Example>,
  'Actions': props => 
    <Example {...pageData} {...props} {...{"code":"/* eslint-disable no-console */\nimport React from 'react';\nimport { debounce } from '@patternfly/react-core';\nimport { ActionsColumn, TableGridBreakpoint } from '@patternfly/react-table';\nimport { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport class ActionsExample extends React.Component {\n  constructor(props) {\n    super(props);\n    const rows = [];\n    for (let i = 0; i < 100; i++) {\n      rows.push({\n        disableActions: i % 3 === 2,\n        id: `actions-row-${i}`,\n        cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]\n      });\n    }\n\n    this.actionsVirtualBody = null;\n\n    this.state = {\n      columns: [\n        { title: 'Name', props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' } },\n        {\n          title: 'Namespace',\n          props: { className: 'pf-m-6-col-on-sm pf-m-4-col-on-md pf-m-3-col-on-lg pf-m-2-col-on-xl' }\n        },\n        {\n          title: 'Labels',\n          props: { className: 'pf-m-4-col-on-md pf-m-4-col-on-lg pf-m-3-col-on-xl pf-m-hidden pf-m-visible-on-md' }\n        },\n        { title: 'Status', props: { className: 'pf-m-2-col-on-lg pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-lg' } },\n        { title: 'Pod Selector', props: { className: 'pf-m-2-col-on-xl pf-m-hidden pf-m-visible-on-xl' } },\n        { title: '', props: { className: 'pf-v5-c-table__action' } }\n      ],\n      rows,\n      actions: [\n        {\n          title: 'Some action',\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)\n        },\n        {\n          title: <div>Another action</div>,\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)\n        },\n        {\n          isSeparator: true\n        },\n        {\n          title: 'Third action',\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)\n        }\n      ]\n    };\n\n    this._handleResize = debounce(this._handleResize.bind(this), 100);\n  }\n\n  componentDidMount() {\n    // re-render after resize\n    window.addEventListener('resize', this._handleResize);\n  }\n\n  componentWillUnmount() {\n    window.removeEventListener('resize', this._handleResize);\n  }\n\n  _handleResize() {\n    this.forceUpdate();\n  }\n\n  render() {\n    const { columns, rows } = this.state;\n\n    const measurementCache = new CellMeasurerCache({\n      fixedWidth: true,\n      minHeight: 44,\n      keyMapper: (rowIndex) => rowIndex\n    });\n\n    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {\n      const { rows, columns, actions } = this.state;\n\n      return (\n        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>\n          <tr data-id={index} style={style} role=\"row\">\n            <td className={columns[0].props.className} role=\"gridcell\">\n              {rows[index].cells[0]}\n            </td>\n            <td className={columns[1].props.className} role=\"gridcell\">\n              {rows[index].cells[1]}\n            </td>\n            <td className={columns[2].props.className} role=\"gridcell\">\n              {rows[index].cells[2]}\n            </td>\n            <td className={columns[3].props.className} role=\"gridcell\">\n              {rows[index].cells[3]}\n            </td>\n            <td className={columns[4].props.className} role=\"gridcell\">\n              {rows[index].cells[4]}\n            </td>\n            <td className={columns[5].props.className} role=\"gridcell\">\n              <ActionsColumn\n                items={actions}\n                rowData={rows[index]}\n                extraData={{ rowIndex: index }}\n                isDisabled={rows[index].disableActions}\n              />\n            </td>\n          </tr>\n        </CellMeasurer>\n      );\n    };\n\n    return (\n      <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n        <TableDeprecated\n          caption=\"Actions Virtualized Table\"\n          cells={columns}\n          rows={rows}\n          gridBreakPoint={TableGridBreakpoint.none}\n          aria-rowcount={rows.length}\n        >\n          <TableHeaderDeprecated />\n        </TableDeprecated>\n        <AutoSizer disableHeight>\n          {({ width }) => (\n            <VirtualTableBody\n              ref={(ref) => (this.actionsVirtualBody = ref)}\n              className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n              deferredMeasurementCache={measurementCache}\n              rowHeight={measurementCache.rowHeight}\n              height={400}\n              overscanRowCount={2}\n              columnCount={1}\n              rows={rows}\n              rowCount={rows.length}\n              rowRenderer={rowRenderer}\n              width={width}\n              role=\"grid\"\n            />\n          )}\n        </AutoSizer>\n      </div>\n    );\n  }\n}\n","title":"Actions","lang":"js"}}>
      
    </Example>,
  'Filterable with WindowScroller': props => 
    <Example {...pageData} {...props} {...{"code":"/* eslint-disable no-console */\nimport React from 'react';\nimport {\n  Button,\n  ButtonVariant,\n  Toolbar,\n  ToolbarItem,\n  ToolbarContent,\n  ToolbarFilter,\n  ToolbarToggleGroup,\n  ToolbarGroup,\n  InputGroup,\n  InputGroupItem,\n  TextInput\n} from '@patternfly/react-core';\nimport { debounce } from '@patternfly/react-core';\nimport SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';\nimport FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';\nimport { ActionsColumn } from '@patternfly/react-table';\nimport { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';\nimport {\n  Dropdown as DropdownDeprecated,\n  DropdownItem as DropdownItemDeprecated,\n  DropdownPosition as DropdownPositionDeprecated,\n  DropdownToggle as DropdownToggleDeprecated,\n  Select as SelectDeprecated,\n  SelectOption as SelectOptionDeprecated,\n  SelectVariant as SelectVariantDeprecated\n} from '@patternfly/react-core/deprecated';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';\n\nexport class FilterExample extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.actionsVirtualBody = null;\n\n    const rows = [];\n    for (let i = 0; i < 100; i++) {\n      const data = {};\n      if (i % 2 === 0) {\n        data.cells = [`US-Node ${i}`, i, i, 'Down', 'Brno'];\n      } else if (i % 3 === 0) {\n        data.cells = [`CN-Node ${i}`, i, i, 'Running', 'Westford'];\n      } else {\n        data.cells = [`US-Node ${i}`, i, i, 'Stopped', 'Raleigh'];\n      }\n      rows.push(data);\n    }\n    this.scrollableElement = React.createRef();\n\n    this.state = {\n      scrollableElement: null,\n\n      filters: {\n        location: [],\n        name: [],\n        status: []\n      },\n      currentCategory: 'Name',\n      isFilterDropdownOpen: false,\n      isCategoryDropdownOpen: false,\n      nameInput: '',\n      columns: [\n        { title: 'Servers' },\n        { title: 'Threads' },\n        { title: 'Applications' },\n        { title: 'Status' },\n        { title: 'Location' }\n      ],\n      rows,\n      inputValue: '',\n      actions: [\n        {\n          title: 'Some action',\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)\n        },\n        {\n          title: <div>Another action</div>,\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)\n        },\n        {\n          isSeparator: true\n        },\n        {\n          title: 'Third action',\n          onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)\n        }\n      ]\n    };\n\n    this._handleResize = debounce(this._handleResize.bind(this), 100);\n\n    this.onDelete = (type = '', id = '') => {\n      if (type) {\n        this.setState((prevState) => {\n          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter((s) => s !== id);\n          return {\n            filters: prevState.filters\n          };\n        });\n      } else {\n        this.setState({\n          filters: {\n            location: [],\n            name: [],\n            status: []\n          },\n          inputValue: ''\n        });\n      }\n    };\n\n    this.onCategoryToggle = (_event, isOpen) => {\n      this.setState({\n        isCategoryDropdownOpen: isOpen\n      });\n    };\n\n    this.onCategorySelect = (event) => {\n      this.setState({\n        currentCategory: event.target.innerText,\n        isCategoryDropdownOpen: !this.state.isCategoryDropdownOpen\n      });\n    };\n\n    this.onFilterToggle = (_event, isOpen) => {\n      this.setState({\n        isFilterDropdownOpen: isOpen\n      });\n    };\n\n    this.onFilterSelect = (_event) => {\n      this.setState({\n        isFilterDropdownOpen: !this.state.isFilterDropdownOpen\n      });\n    };\n\n    this.onInputChange = (_event, newValue) => {\n      // this.setState({ inputValue: newValue });\n      if (newValue === '') {\n        this.onDelete();\n        this.setState({\n          inputValue: newValue\n        });\n      } else {\n        this.setState((prevState) => ({\n            filters: {\n              ...prevState.filters,\n              ['name']: [newValue]\n            },\n            inputValue: newValue\n          }));\n      }\n    };\n\n    this.onRowSelect = (event, isSelected, rowId) => {\n      let rows;\n      if (rowId === -1) {\n        rows = this.state.rows.map((oneRow) => {\n          oneRow.selected = isSelected;\n          return oneRow;\n        });\n      } else {\n        rows = [...this.state.rows];\n        rows[rowId].selected = isSelected;\n      }\n      this.setState({\n        rows\n      });\n    };\n\n    this.onStatusSelect = (event, selection) => {\n      const checked = event.target.checked;\n      this.setState((prevState) => {\n        const prevSelections = prevState.filters.status;\n        return {\n          filters: {\n            ...prevState.filters,\n            status: checked ? [...prevSelections, selection] : prevSelections.filter((value) => value !== selection)\n          }\n        };\n      });\n    };\n\n    this.onNameInput = (event) => {\n      if (event.key && event.key !== 'Enter') {\n        return;\n      }\n\n      const { inputValue } = this.state;\n      this.setState((prevState) => {\n        const prevFilters = prevState.filters.name;\n        return {\n          filters: {\n            ...prevState.filters,\n            ['name']: prevFilters.includes(inputValue) ? prevFilters : [...prevFilters, inputValue]\n          },\n          inputValue: ''\n        };\n      });\n    };\n\n    this.onLocationSelect = (event, selection) => {\n      this.setState((prevState) => ({\n          filters: {\n            ...prevState.filters,\n            ['location']: [selection]\n          }\n        }));\n      this.onFilterSelect();\n    };\n\n    this._handleResize = debounce(this._handleResize.bind(this), 100);\n    this._bindBodyRef = this._bindBodyRef.bind(this);\n  }\n\n  componentDidMount() {\n    // re-render after resize\n    window.addEventListener('resize', this._handleResize);\n\n    setTimeout(() => {\n      const scollableElement = document.getElementById('content-scrollable-1');\n      this.setState({ scollableElement });\n    });\n\n    // re-render after resize\n    window.addEventListener('resize', this._handleResize);\n  }\n\n  componentWillUnmount() {\n    window.removeEventListener('resize', this._handleResize);\n  }\n\n  _handleResize() {\n    this._cellMeasurementCache.clearAll();\n    this._bodyRef.recomputeVirtualGridSize();\n  }\n\n  _bindBodyRef(ref) {\n    this._bodyRef = ref;\n  }\n\n  buildCategoryDropdown() {\n    const { isCategoryDropdownOpen, currentCategory } = this.state;\n\n    return (\n      <ToolbarItem>\n        <DropdownDeprecated\n          onSelect={this.onCategorySelect}\n          position={DropdownPositionDeprecated.left}\n          toggle={\n            <DropdownToggleDeprecated onToggle={this.onCategoryToggle} style={{ width: '100%' }}>\n              <FilterIcon /> {currentCategory}\n            </DropdownToggleDeprecated>\n          }\n          isOpen={isCategoryDropdownOpen}\n          dropdownItems={[\n            <DropdownItemDeprecated key=\"cat1\">Location</DropdownItemDeprecated>,\n            <DropdownItemDeprecated key=\"cat2\">Name</DropdownItemDeprecated>,\n            <DropdownItemDeprecated key=\"cat3\">Status</DropdownItemDeprecated>\n          ]}\n          style={{ width: '100%' }}\n        ></DropdownDeprecated>\n      </ToolbarItem>\n    );\n  }\n\n  buildFilterDropdown() {\n    const { currentCategory, isFilterDropdownOpen, inputValue, filters } = this.state;\n\n    const locationMenuItems = [\n      <SelectOptionDeprecated key=\"raleigh\" value=\"Raleigh\" />,\n      <SelectOptionDeprecated key=\"westford\" value=\"Westford\" />,\n      <SelectOptionDeprecated key=\"boston\" value=\"Boston\" />,\n      <SelectOptionDeprecated key=\"brno\" value=\"Brno\" />,\n      <SelectOptionDeprecated key=\"bangalore\" value=\"Bangalore\" />\n    ];\n\n    const statusMenuItems = [\n      <SelectOptionDeprecated key=\"statusRunning\" value=\"Running\" />,\n      <SelectOptionDeprecated key=\"statusStopped\" value=\"Stopped\" />,\n      <SelectOptionDeprecated key=\"statusDown\" value=\"Down\" />,\n      <SelectOptionDeprecated key=\"statusDegraded\" value=\"Degraded\" />,\n      <SelectOptionDeprecated key=\"statusMaint\" value=\"Needs Maintainence\" />\n    ];\n\n    return (\n      <React.Fragment>\n        <ToolbarFilter\n          chips={filters.location}\n          deleteChip={this.onDelete}\n          categoryName=\"Location\"\n          showToolbarItem={currentCategory === 'Location'}\n        >\n          <SelectDeprecated\n            aria-label=\"Location\"\n            onToggle={this.onFilterToggle}\n            onSelect={this.onLocationSelect}\n            selections={filters.location[0]}\n            isOpen={isFilterDropdownOpen}\n            placeholderText=\"Any\"\n          >\n            {locationMenuItems}\n          </SelectDeprecated>\n        </ToolbarFilter>\n        <ToolbarFilter\n          chips={filters.name}\n          deleteChip={this.onDelete}\n          categoryName=\"Name\"\n          showToolbarItem={currentCategory === 'Name'}\n        >\n          <InputGroup>\n            <InputGroupItem isFill>\n              <TextInput\n                name=\"nameInput\"\n                id=\"nameInput1\"\n                type=\"search\"\n                aria-label=\"name filter\"\n                onChange={this.onInputChange}\n                value={inputValue}\n                placeholder=\"Filter by name...\"\n                // onKeyDown={this.onNameInput}\n              />\n            </InputGroupItem>\n            <InputGroupItem>\n              <Button\n                variant={ButtonVariant.control}\n                aria-label=\"search button for search input\"\n                // onClick={this.onNameInput}\n              >\n                <SearchIcon />\n              </Button>\n            </InputGroupItem>\n          </InputGroup>\n        </ToolbarFilter>\n        <ToolbarFilter\n          chips={filters.status}\n          deleteChip={this.onDelete}\n          categoryName=\"Status\"\n          showToolbarItem={currentCategory === 'Status'}\n        >\n          <SelectDeprecated\n            variant={SelectVariantDeprecated.checkbox}\n            aria-label=\"Status\"\n            onToggle={this.onFilterToggle}\n            onSelect={this.onStatusSelect}\n            selections={filters.status}\n            isOpen={isFilterDropdownOpen}\n            placeholderText=\"Filter by status\"\n          >\n            {statusMenuItems}\n          </SelectDeprecated>\n        </ToolbarFilter>\n      </React.Fragment>\n    );\n  }\n\n  renderToolbar() {\n    return (\n      <Toolbar id=\"toolbar-with-chip-groups\" clearAllFilters={this.onDelete} collapseListedFiltersBreakpoint=\"xl\">\n        <ToolbarContent>\n          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint=\"xl\">\n            <ToolbarGroup variant=\"filter-group\">\n              {this.buildCategoryDropdown()}\n              {this.buildFilterDropdown()}\n            </ToolbarGroup>\n          </ToolbarToggleGroup>\n        </ToolbarContent>\n      </Toolbar>\n    );\n  }\n\n  render() {\n    const { loading, rows, columns, actions, filters, scollableElement } = this.state;\n\n    const filteredRows =\n      filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0\n        ? rows.filter((row) => (\n              (filters.name.length === 0 ||\n                filters.name.some((name) => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&\n              (filters.location.length === 0 || filters.location.includes(row.cells[4])) &&\n              (filters.status.length === 0 || filters.status.includes(row.cells[3]))\n            ))\n        : rows;\n    const measurementCache = new CellMeasurerCache({\n      fixedWidth: true,\n      minHeight: 44,\n      keyMapper: (rowIndex) => rowIndex\n    });\n\n    const rowRenderer = ({ index, _isScrolling, key, style, parent }) => {\n      const { actions } = this.state;\n\n      return (\n        <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>\n          <tr data-id={index} style={style} role=\"row\">\n            <td role=\"gridcell\">{filteredRows[index].cells[0]}</td>\n            <td role=\"gridcell\">{filteredRows[index].cells[1]}</td>\n            <td role=\"gridcell\">{filteredRows[index].cells[2]}</td>\n            <td role=\"gridcell\">{filteredRows[index].cells[3]}</td>\n            <td role=\"gridcell\">{filteredRows[index].cells[4]}</td>\n            <td role=\"gridcell\">\n              <ActionsColumn\n                items={actions}\n                rowData={rows[index]}\n                extraData={{ rowIndex: index }}\n                isDisabled={rows[index].disableActions}\n              />\n            </td>\n          </tr>\n        </CellMeasurer>\n      );\n    };\n\n    return (\n      <React.Fragment>\n        {this.renderToolbar()}\n\n        <div\n          id=\"content-scrollable-1\"\n          aria-label=\"Scrollable Table\"\n          className=\"pf-v5-c-scrollablegrid\"\n          style={{\n            height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,\n            overflowX: 'auto',\n            overflowY: 'scroll',\n            scrollBehavior: 'smooth',\n            WebkitOverflowScrolling: 'touch',\n            position: 'relative'\n          }}\n        >\n          <div style={{ padding: 15 }}>\n            {!loading && filteredRows.length > 0 && (\n              <div aria-label=\"Scrollable Table\" className=\"pf-v5-c-scrollablegrid\">\n                <TableDeprecated\n                  cells={columns}\n                  rows={filteredRows}\n                  actions={actions}\n                  aria-label=\"Filterable Table Demo\"\n                  aria-rowcount={rows.length}\n                >\n                  <TableHeaderDeprecated />\n                </TableDeprecated>\n                <WindowScroller scrollElement={scollableElement}>\n                  {({ height, _isScrolling, registerChild, _onChildScroll, scrollTop }) => (\n                    <AutoSizer disableHeight>\n                      {({ width }) => (\n                        <div ref={registerChild}>\n                          <VirtualTableBody\n                            ref={(ref) => (this.actionsVirtualBody = ref)}\n                            autoHeight\n                            className=\"pf-v5-c-table pf-v5-c-virtualized pf-v5-c-window-scroller\"\n                            deferredMeasurementCache={measurementCache}\n                            rowHeight={measurementCache.rowHeight}\n                            height={height || 0}\n                            overscanRowCount={10}\n                            columnCount={6}\n                            rows={filteredRows}\n                            rowCount={filteredRows.length}\n                            rowRenderer={rowRenderer}\n                            scrollTop={scrollTop}\n                            width={width}\n                            role=\"grid\"\n                          />\n                        </div>\n                      )}\n                    </AutoSizer>\n                  )}\n                </WindowScroller>\n              </div>\n            )}\n          </div>\n        </div>\n      </React.Fragment>\n    );\n  }\n}\n","title":"Filterable with WindowScroller","lang":"js"}}>
      
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
      {`!`}
    </p>
    <AutoLinkHeader {...{"id":"examples","size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    {React.createElement(pageData.examples["Basic"])}
    {React.createElement(pageData.examples["Using composable table components"])}
    {React.createElement(pageData.examples["Sortable"])}
    {React.createElement(pageData.examples["Selectable"])}
    {React.createElement(pageData.examples["Actions"])}
    {React.createElement(pageData.examples["Filterable with WindowScroller"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsVirtualScrollTableReactDocs';
Component.pageData = pageData;

export default Component;
