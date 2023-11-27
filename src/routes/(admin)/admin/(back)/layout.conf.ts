type LayoutAdmin = {
    slug: string
}

type LayoutSidebar = {
    items: LayoutSidebarItem[]
}

type LayoutSidebarItem = {
    bartitle: string,
    link: string,
    linkactive: string,
    item: LayoutSidebarItem[]
}

type LayoutConfig = {
    admin: LayoutAdmin,
    sidebar: LayoutSidebarItem,
}