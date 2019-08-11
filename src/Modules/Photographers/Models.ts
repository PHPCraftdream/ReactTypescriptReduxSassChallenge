import {IAsyncData, IDictionary} from "../../Core/Types";

export interface IPhotographerListItem {
    _id: string;
    guid: string;
    city: string;
    picture: string;
    range: number;
    index: number;
    isActive: boolean;
    name: {
        first: string,
        last: string,
    };
}

export interface IPhotographerPicture {
    url: string;
    likes: number;
}

export interface IPhotographerDetails {
    guid: string;
    pictures?: IPhotographerPicture[];
    specialization?: string[];
}

export interface IPhotographersState extends IAsyncData<IPhotographerListItem[]> {
    currentDetailsData?: IAsyncData<IPhotographerDetails>;
}
