import {IPhotographerDetails, IPhotographerListItem} from "./Models";

export const getListMockData = (): IPhotographerListItem[]  => {
    return [
        {
            _id: "5d0cdab7b099aa0ca9901f23",
            index: 0,
            guid: "ed0335f2-7acb-43a6-bb56-b1f3343ea4da",
            isActive: true,
            picture: "http://placehold.it/50x50",
            city: "Summerset",
            name: {
                first: "Yvette",
                last: "Sullivan"
            },
            range: 1
        },
        {
            _id: "5d0cdab705c86d4bfa3e3d40",
            index: 1,
            guid: "3ba1d55b-6df3-4b97-8a11-e3f17c3c86ba",
            isActive: true,
            picture: "http://placehold.it/50x50",
            city: "Rosburg",
            name: {
                first: "Blake",
                last: "Newman"
            },
            range: 3
        },
        {
            _id: "5d0cdab74aa6a581e3217333",
            index: 2,
            guid: "5e9f56ab-8acc-425b-a870-fc3da7e1dbad",
            isActive: false,
            picture: "http://placehold.it/50x50",
            city: "Siglerville",
            name: {
                first: "Mccarty",
                last: "Randall"
            },
            range: 4
        },
        {
            _id: "5d0cdab784d2d298f9fb358f",
            index: 3,
            guid: "ae23dfde-8361-4df5-8351-908e061559d3",
            isActive: false,
            picture: "http://placehold.it/50x50",
            city: "Kenvil",
            name: {
                first: "Clay",
                last: "Davis"
            },
            range: 5
        },
        {
            _id: "5d0cdab74e473d507c695afe",
            index: 4,
            guid: "1c179d0d-dd4d-4f59-adad-6e1ad4f6e74d",
            isActive: true,
            picture: "http://placehold.it/50x50",
            city: "Cassel",
            name: {
                first: "Cooley",
                last: "Hull"
            },
            range: 5
        },
        {
            _id: "5d0cdab71fcf471674974f33",
            index: 5,
            guid: "73cb4763-5873-41df-8c1d-5e3bc652405c",
            isActive: false,
            picture: "http://placehold.it/50x50",
            city: "Grayhawk",
            name: {
                first: "Melisa",
                last: "Jordan"
            },
            range: 4
        }
    ];
};

export const getMockDetailsData = (guid: string): IPhotographerDetails => {
    return {
        guid,
        pictures: [
            {
                url: "http://placehold.it/134x133",
                likes: 163
            },
            {
                url: "http://placehold.it/134x133",
                likes: 170
            },
            {
                url: "http://placehold.it/134x133",
                likes: 181
            },
            {
                url: "http://placehold.it/134x133",
                likes: 71
            },
            {
                url: "http://placehold.it/134x133",
                likes: 200
            }
        ],
        specialization: [
            "consequat",
            "quis",
            "labore",
            "est",
            "ut"
        ],
    };
};
