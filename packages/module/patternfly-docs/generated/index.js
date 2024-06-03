module.exports = {
  '/extensions/virtual-scroll-window-scroller/react': {
    id: "Virtual scroll window scroller",
    title: "Virtual scroll window scroller",
    toc: [{"text":"Examples"},[{"text":"Window scroller"}]],
    examples: ["Window scroller"],
    section: "extensions",
    subsection: "",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/virtual-scroll-window-scroller/react/index" */ './extensions/virtual-scroll-window-scroller/react')
  },
  '/extensions/virtual-scroll-table/react': {
    id: "Virtual scroll table",
    title: "Virtual scroll table",
    toc: [{"text":"Examples"},[{"text":"Basic"},{"text":"Sortable"},{"text":"Selectable"},{"text":"Actions"},{"text":"Filterable with WindowScroller"}]],
    examples: ["Basic","Sortable","Selectable","Actions","Filterable with WindowScroller"],
    section: "extensions",
    subsection: "",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/virtual-scroll-table/react/index" */ './extensions/virtual-scroll-table/react')
  }
};