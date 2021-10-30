/** 
 * Type of component's props
*/
export type LayoutProps = {
    children: React.ReactNode, 
    pageTitle?: string, 
    description?: string,
    previewImage?: string,
    siteName?: string,
    show: boolean,
}

// Todo: replace any type with event
export type LinkProps = {
    path: string,
    name: string,
    color?: string,
}

export type InputProps = {
    type: string,
    name: string,
    required: boolean,
    onChange: any,
    classname?: string,
    placeholder?: string,
    props?: string[],
}

export type ButtonProps = {
    title?:string;
    type?: string,
    imagePath?: any,
    imageAlt?: string,
    imageSize?: ImageSize,
    backgroundColor?: string,
    ariaLabel?: string,
    onClick: any,
}

export type DropDownProps = {
    data: DataType;
    onClick: any;
    type?: string;
}

export type CardProps = {
    type: string;
    name: string;
    imagePath:  string;
    onClick: any;
    description?: string;
    location?: string;
    imageAlt?: string;
}

export type SliderProps = {
    data: HotCitiesType[]
}

export type ModalProps = {
    show: boolean;
    index: number;
    imagePath: string;
    imageAlt: string;
    title: string; 
    description: string; 
    time: string; 
    ticket: string;
    location: string; 
    phoneNumber: string;
    onClick: any;
    onCancel: any;
}
/** 
 * Type for single param in the props
*/
export type ImageSize = {
    width: number;
    height: number;
}

export type DataType = {
    defaultValue: DataItemType;
    listing: DataItemType[];
}

export type DataItemType = {
    value: string;
    label: string;
}

export type HotCitiesType = {
    value: string;
    label: string;
    image: string;
}