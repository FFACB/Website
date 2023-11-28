
export type LayoutAdmin = {
    slug: string
}

export type LayoutSidebarItem = {
    bartitle: string,
    slug: string,
    linkactive: string,
    items: LayoutSidebarItem[]
}

export type LayoutConfig = {
    admin: LayoutAdmin,
    sidebar: LayoutSidebarItem[],
}