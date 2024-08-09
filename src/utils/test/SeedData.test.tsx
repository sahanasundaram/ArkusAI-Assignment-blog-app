// localStorageUtils.test.ts

import { seedData } from '../SeedData';

describe('seedData', () => {
    const initialData = [
        {
            id: 1,
            title: 'Hospital skill play finish pay!',
            content: 'Realize administration plan level cut say dinner. Bit theory push none pass others.\n\nNational role price very but allow until remain. Special scientist ago subject two family.\n\nStandard sound realize hand. Economic song investment movement black condition very blood. Last she address include edge unit.\n\nTraining herself TV week phone religious maybe. Outside able garden agent everybody receive language.\n\nFight every five final several concern discover. Not community exactly. Business factor everyone increase better.\n\nEnvironmental evidence fund piece again line arrive. Water soon media door camera doctor. Magazine happen degree already listen base center.\n\nBe article value statement particular cell democratic. With when happy identify thing. Bill measure individual PM might audience.\n\nTrade clearly you situation. Throughout significant those explain some ball any.\n\nBack account short for all event prove. Begin different ground physical image ago. Support heart both fine bank explain onto policy.\n\nFederal control meeting admit music certainly worker. Seat loss control candidate current employee.',
            createdAt: '2021-06-12T14:07:05.834236',
            imgUrl: null,
        },
    ];

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    it('should seed initial data if no posts exist in localStorage', () => {
        seedData();

        // Retrieve posts from localStorage to check if seedData function worked correctly
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');

        expect(posts).toHaveLength(200);
    });

    it('should not overwrite existing posts in localStorage', () => {
        const existingPosts = [
            {
                id: 2,
                title: 'Existing Post',
                content: 'Content of the existing post',
                createdAt: '2022-01-01T10:00:00.000Z',
                imgUrl: 'https://example.com/existing.jpg',
            },
        ];

        // Seed localStorage with existing posts
        localStorage.setItem('posts', JSON.stringify(existingPosts));

        // Call seedData (it should not overwrite existing data)
        seedData();

        // Retrieve posts from localStorage to check that existing data is not overwritten
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');

        expect(posts).toEqual(existingPosts);
        expect(posts).toHaveLength(1);
    });

    it('should not call localStorage.setItem if posts already exist', () => {
        const existingPosts = [
            {
                id: 2,
                title: 'Existing Post',
                content: 'Content of the existing post',
                createdAt: '2022-01-01T10:00:00.000Z',
                imgUrl: 'https://example.com/existing.jpg',
            },
        ];

        // Seed localStorage with existing posts
        localStorage.setItem('posts', JSON.stringify(existingPosts));

        // Spy on localStorage.setItem to check if it is called
        const setItemSpy = jest.spyOn(localStorage, 'setItem');

        // Call seedData (it should not overwrite existing data)
        seedData();

        
    });
});
