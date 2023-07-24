---
id: Virtual scroll table
section: extensions
source: react
sourceLink: https://github.com/patternfly/react-virtualized-extension
propComponents: ['VirtualTableBody']
---

Note: React Virtualized Extension lives in its own package at [`@patternfly/react-virtualized-extension`](https://www.npmjs.com/package/@patternfly/react-virtualized-extension)!

import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { CellMeasurerCache, CellMeasurer} from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  Select,
  SelectOption,
  SelectVariant
} from '@patternfly/react-core/deprecated';
import './VirtualGrid.example.css';

## Examples

### Basic

```js file="./Basic.tsx"
```

### Using composable table components

```js file="./UsingComposableTableComponents.tsx"
```

### Sortable

```js file="./Sortable.tsx"
```

### Selectable

```js file="./Selectable.tsx"
```

### Actions

```js file="./Actions.tsx"
```

### Filterable with WindowScroller

```js file="./FilterableWithWindowScroller.tsx"
```
