export interface SidebarElement {
  label: string
  route: string
  icon: string
}

export interface SidebarData {
  category: string
  elements: SidebarElement[]
}

const sidebarData = [
  {
    category: 'categories.household',
    elements: [
      { label: 'elements.chores', route: '/chores', icon: 'fas fa-tasks' },
      {
        label: 'elements.calendar',
        route: '/calendar',
        icon: 'fas fa-calendar',
      },
    ],
  },
]

export default sidebarData
