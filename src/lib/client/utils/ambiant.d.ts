
export type LayoutAdmin = {
    slug: string
}

export type LayoutSidebarItem = {
    bartitle: string,
    link: string,
    linkactive: string,
    item: LayoutSidebarItem[]
}

export type LayoutConfig = {
    admin: LayoutAdmin,
    sidebar: LayoutSidebarItem[],
}