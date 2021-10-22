export type layoutProps = {
    children: React.ReactNode, 
    pageTitle?: string, 
    description?: string,
    previewImage?: string,
    siteName?: string,
    props?: string[],
}

export type linkProps = {
    path: string,
    name: string,
}