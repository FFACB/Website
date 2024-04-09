const actions = {
    DEFAULT: 'DEFAULT',
    PICKED_PICTURE: 'PICKED_PICTURE',
    DELETE_PICTURE: 'DELETE_PICTURE',
}

export {actions}

export type PicturePickerAction = {
    open: boolean;
    picturePickerId : string;
}

export type PictureAction = {
    type: string;
    picture: Picture | null;
    picturePickerId : string;
} 