import { Show, WatchlistItem, CastMember, FilmographyItem, RankingItem, UserProfile, NotificationItem } from '../types';

export const INITIAL_SHOWS: Show[] = [
  {
    id: 'the-boys',
    title: 'The Boys',
    shortTitle: 'The Boys',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 32,
    rating: 8.7,
    genres: ['Action', 'Sci-Fi', 'Dark Comedy', 'Drama'],
    year: '2019 - Present',
    status: 'Airing',
    description: 'A fun and irreverent take on what happens when superheroes—who are as popular as celebrities, as influential as politicians, and as revered as gods—abuse their superpowers rather than use them for good.',
    seasons: [
      { 
        id: 'tb-1', 
        seasonNumber: 1, 
        title: 'Season 1', 
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80', 
        totalEpisodes: 8,
        episodes: [
          { id: 'tb-1-1', episodeNumber: 1, title: 'The Name of the Game', duration: '60m', airDate: '2019-07-26' },
          { id: 'tb-1-2', episodeNumber: 2, title: 'Cherry', duration: '57m', airDate: '2019-07-26' },
          { id: 'tb-1-3', episodeNumber: 3, title: 'Get Some', duration: '55m', airDate: '2019-07-26' },
          { id: 'tb-1-4', episodeNumber: 4, title: 'The Female of the Species', duration: '56m', airDate: '2019-07-26' },
          { id: 'tb-1-5', episodeNumber: 5, title: 'Good for the Soul', duration: '62m', airDate: '2019-07-26' },
          { id: 'tb-1-6', episodeNumber: 6, title: 'The Innocents', duration: '58m', airDate: '2019-07-26' },
          { id: 'tb-1-7', episodeNumber: 7, title: 'The Self-Preservation Society', duration: '55m', airDate: '2019-07-26' },
          { id: 'tb-1-8', episodeNumber: 8, title: 'You Found Me', duration: '66m', airDate: '2019-07-26' },
        ]
      },
      { 
        id: 'tb-2', 
        seasonNumber: 2, 
        title: 'Season 2', 
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80', 
        totalEpisodes: 8,
        episodes: [
          { id: 'tb-2-1', episodeNumber: 1, title: 'The Big Ride', duration: '61m', airDate: '2020-09-04' },
          { id: 'tb-2-2', episodeNumber: 2, title: 'Proper Preparation and Planning', duration: '59m', airDate: '2020-09-04' },
          { id: 'tb-2-3', episodeNumber: 3, title: 'Over the Hill with the Swords of a Thousand Men', duration: '60m', airDate: '2020-09-04' },
          { id: 'tb-2-4', episodeNumber: 4, title: 'Nothing Like It in the World', duration: '63m', airDate: '2020-09-11' },
          { id: 'tb-2-5', episodeNumber: 5, title: 'We Gotta Go Now', duration: '58m', airDate: '2020-09-18' },
          { id: 'tb-2-6', episodeNumber: 6, title: 'The Bloody Doors Off', duration: '64m', airDate: '2020-09-25' },
          { id: 'tb-2-7', episodeNumber: 7, title: 'Butcher, Baker, Candlestick Maker', duration: '60m', airDate: '2020-10-02' },
          { id: 'tb-2-8', episodeNumber: 8, title: 'What I Know', duration: '67m', airDate: '2020-10-09' },
        ]
      },
      { 
        id: 'tb-3', 
        seasonNumber: 3, 
        title: 'Season 3', 
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80', 
        totalEpisodes: 8,
        episodes: [
          { id: 'tb-3-1', episodeNumber: 1, title: 'Payback', duration: '58m', airDate: '2022-06-03' },
          { id: 'tb-3-2', episodeNumber: 2, title: 'The Only Man In The Sky', duration: '63m', airDate: '2022-06-03' },
          { id: 'tb-3-3', episodeNumber: 3, title: 'Barbary Coast', duration: '62m', airDate: '2022-06-03' },
          { id: 'tb-3-4', episodeNumber: 4, title: 'Glorious Five Year Plan', duration: '64m', airDate: '2022-06-10' },
          { id: 'tb-3-5', episodeNumber: 5, title: 'The Last Time to Look on This World of Lies', duration: '59m', airDate: '2022-06-17' },
          { id: 'tb-3-6', episodeNumber: 6, title: 'Herogasm', duration: '60m', airDate: '2022-06-24' },
          { id: 'tb-3-7', episodeNumber: 7, title: 'Here Comes a Candle to Light You to Bed', duration: '65m', airDate: '2022-07-01' },
          { id: 'tb-3-8', episodeNumber: 8, title: 'The Instant White-Hot Wild', duration: '66m', airDate: '2022-07-08' },
        ]
      },
      { 
        id: 'tb-4', 
        seasonNumber: 4, 
        title: 'Season 4', 
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80', 
        totalEpisodes: 8,
        episodes: [
          { id: 'tb-4-1', episodeNumber: 1, title: 'Department of Dirty Tricks', duration: '60m', airDate: '2024-06-13' },
          { id: 'tb-4-2', episodeNumber: 2, title: 'Life Among the Septics', duration: '58m', airDate: '2024-06-13' },
          { id: 'tb-4-3', episodeNumber: 3, title: 'We\'ll Keep the Red Flag Flying Here', duration: '61m', airDate: '2024-06-13' },
          { id: 'tb-4-4', episodeNumber: 4, title: 'Wisdom of the Ages', duration: '65m', airDate: '2024-06-20' },
          { id: 'tb-4-5', episodeNumber: 5, title: 'Beware the Jabberwock, My Son', duration: '59m', airDate: '2024-06-27' },
          { id: 'tb-4-6', episodeNumber: 6, title: 'Dirty Business', duration: '62m', airDate: '2024-07-04' },
          { id: 'tb-4-7', episodeNumber: 7, title: 'The Insider', duration: '64m', airDate: '2024-07-11' },
          { id: 'tb-4-8', episodeNumber: 8, title: 'Assassination Run', duration: '68m', airDate: '2024-07-18' },
        ]
      },
    ],
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    shortTitle: 'One Piece',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: '∞',
    rating: 9.0,
    genres: ['Anime', 'Action', 'Adventure', 'Fantasy', 'Shonen'],
    year: '1999 - Present',
    status: 'Airing',
    description: 'Monkey D. Luffy sets off on an epic journey with his Straw Hat pirate crew in search of the legendary treasure known as "One Piece", aiming to become the King of the Pirates and achieve supreme freedom across the Grand Line.',
    episodes: [
      { id: 'op-1115', episodeNumber: 1115, title: 'The Navy Surprised! Former Fleet Admiral Kuzan', duration: '24m', airDate: '2024-08-11' },
      { id: 'op-1114', episodeNumber: 1114, title: 'For the Sake of the Beloved Pupil - The Fist of Vice Admiral Garp!', duration: '24m', airDate: '2024-08-04' },
      { id: 'op-1113', episodeNumber: 1113, title: 'Run, Koby! A Desperate Escape Strategy!', duration: '24m', airDate: '2024-07-28' },
      { id: 'op-1112', episodeNumber: 1112, title: 'Clash! Shanks vs. Eustass Kid', duration: '24m', airDate: '2024-07-14' },
      { id: 'op-1111', episodeNumber: 1111, title: 'The Second Ohara! The Inherited Will', duration: '24m', airDate: '2024-06-30' },
      { id: 'op-1110', episodeNumber: 1110, title: 'Survive! The Deadly Battle with the Seraphim!', duration: '24m', airDate: '2024-06-23' },
    ],
  },
  {
    id: 'peaky-blinders',
    title: 'Peaky Blinders',
    shortTitle: 'Peaky Blinders',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 36,
    rating: 8.8,
    genres: ['Crime', 'Drama', 'Historical'],
    year: '2013 - 2022',
    status: 'Completed',
    description: 'A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.',
    seasons: [
      { 
        id: 'pb-1', seasonNumber: 1, title: 'Season 1', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6,
        episodes: [
          { id: 'pb-1-1', episodeNumber: 1, title: 'Episode 1', duration: '57m', airDate: '2013-09-12' },
          { id: 'pb-1-2', episodeNumber: 2, title: 'Episode 2', duration: '58m', airDate: '2013-09-19' },
          { id: 'pb-1-3', episodeNumber: 3, title: 'Episode 3', duration: '55m', airDate: '2013-09-26' },
          { id: 'pb-1-4', episodeNumber: 4, title: 'Episode 4', duration: '58m', airDate: '2013-10-03' },
          { id: 'pb-1-5', episodeNumber: 5, title: 'Episode 5', duration: '57m', airDate: '2013-10-10' },
          { id: 'pb-1-6', episodeNumber: 6, title: 'Episode 6', duration: '55m', airDate: '2013-10-17' },
        ]
      },
      { 
        id: 'pb-2', seasonNumber: 2, title: 'Season 2', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6,
        episodes: [
          { id: 'pb-2-1', episodeNumber: 1, title: 'Episode 1', duration: '59m', airDate: '2014-10-02' },
          { id: 'pb-2-2', episodeNumber: 2, title: 'Episode 2', duration: '58m', airDate: '2014-10-09' },
          { id: 'pb-2-3', episodeNumber: 3, title: 'Episode 3', duration: '58m', airDate: '2014-10-16' },
          { id: 'pb-2-4', episodeNumber: 4, title: 'Episode 4', duration: '58m', airDate: '2014-10-23' },
          { id: 'pb-2-5', episodeNumber: 5, title: 'Episode 5', duration: '57m', airDate: '2014-10-30' },
          { id: 'pb-2-6', episodeNumber: 6, title: 'Episode 6', duration: '59m', airDate: '2014-11-06' },
        ]
      },
      { id: 'pb-3', seasonNumber: 3, title: 'Season 3', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6 },
      { id: 'pb-4', seasonNumber: 4, title: 'Season 4', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6 },
      { id: 'pb-5', seasonNumber: 5, title: 'Season 5', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6 },
      { id: 'pb-6', seasonNumber: 6, title: 'Season 6', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', totalEpisodes: 6 },
    ],
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    shortTitle: 'AOT',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 89,
    rating: 9.1,
    genres: ['Anime', 'Action', 'Dark Fantasy', 'Mystery'],
    year: '2013 - 2023',
    status: 'Completed',
    description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    episodes: [
      { id: 'aot-1', episodeNumber: 1, title: 'To You, in 2000 Years: The Fall of Shiganshina', duration: '24m', airDate: '2013-04-07' },
      { id: 'aot-2', episodeNumber: 2, title: 'That Day: The Fall of Shiganshina, Part 2', duration: '24m', airDate: '2013-04-14' },
      { id: 'aot-3', episodeNumber: 3, title: 'A Dim Light Amid Despair: Humanity\'s Comeback', duration: '24m', airDate: '2013-04-21' },
      { id: 'aot-4', episodeNumber: 4, title: 'The Night of the Graduation Ceremony', duration: '24m', airDate: '2013-04-28' },
      { id: 'aot-5', episodeNumber: 5, title: 'First Battle: The Struggle for Trost', duration: '24m', airDate: '2013-05-05' },
    ],
  },
  {
    id: 'chernobyl',
    title: 'Chernobyl',
    shortTitle: 'Chernobyl',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 5,
    rating: 9.4,
    genres: ['Historical', 'Drama', 'Thriller'],
    year: '2019',
    status: 'Completed',
    description: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world\'s worst man-made catastrophes.',
    episodes: [
      { id: 'ch-1', episodeNumber: 1, title: '1:23:45', duration: '59m', airDate: '2019-05-06' },
      { id: 'ch-2', episodeNumber: 2, title: 'Please Remain Calm', duration: '65m', airDate: '2019-05-13' },
      { id: 'ch-3', episodeNumber: 3, title: 'Open Wide, O Earth', duration: '62m', airDate: '2019-05-20' },
      { id: 'ch-4', episodeNumber: 4, title: 'The Happiness of All Mankind', duration: '65m', airDate: '2019-05-27' },
      { id: 'ch-5', episodeNumber: 5, title: 'Vichnaya Pamyat', duration: '72m', airDate: '2019-06-03' },
    ],
  },
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    shortTitle: 'Vinland Saga',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 48,
    rating: 8.8,
    genres: ['Anime', 'Action', 'Adventure', 'Historical'],
    year: '2019 - Present',
    status: 'Airing',
    description: 'Thorfinn pursues a journey with his father\'s killer in order to take revenge and end that life in a duel, as a true warrior.',
    episodes: [
      { id: 'vs-1', episodeNumber: 1, title: 'Somewhere Not Here', duration: '24m', airDate: '2019-07-07' },
      { id: 'vs-2', episodeNumber: 2, title: 'Sword', duration: '24m', airDate: '2019-07-07' },
      { id: 'vs-3', episodeNumber: 3, title: 'Troll', duration: '24m', airDate: '2019-07-07' },
      { id: 'vs-4', episodeNumber: 4, title: 'A True Warrior', duration: '24m', airDate: '2019-07-28' },
    ],
  },
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    shortTitle: 'Stranger Things',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 34,
    rating: 8.7,
    genres: ['Sci-Fi', 'Horror', 'Drama', 'Mystery'],
    year: '2016 - Present',
    status: 'Airing',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl with psychokinetic abilities.',
    episodes: [
      { id: 'st-1', episodeNumber: 1, title: 'Chapter One: The Vanishing of Will Byers', duration: '48m', airDate: '2016-07-15' },
      { id: 'st-2', episodeNumber: 2, title: 'Chapter Two: The Weirdo on Maple Street', duration: '55m', airDate: '2016-07-15' },
      { id: 'st-3', episodeNumber: 3, title: 'Chapter Three: Holly, Jolly', duration: '51m', airDate: '2016-07-15' },
      { id: 'st-4', episodeNumber: 4, title: 'Chapter Four: The Body', duration: '50m', airDate: '2016-07-15' },
    ],
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    shortTitle: 'Demon Slayer',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 55,
    rating: 8.7,
    genres: ['Anime', 'Action', 'Supernatural', 'Historical'],
    year: '2019 - Present',
    status: 'Airing',
    description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
    episodes: [
      { id: 'ds-1', episodeNumber: 1, title: 'Cruelty', duration: '24m', airDate: '2019-04-06' },
      { id: 'ds-2', episodeNumber: 2, title: 'Trainer Sakonji Urokodaki', duration: '24m', airDate: '2019-04-13' },
      { id: 'ds-3', episodeNumber: 3, title: 'Sabito and Makomo', duration: '24m', airDate: '2019-04-20' },
      { id: 'ds-4', episodeNumber: 4, title: 'Final Selection', duration: '24m', airDate: '2019-04-27' },
    ],
  },
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    shortTitle: 'Game of Thrones',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 73,
    rating: 9.2,
    genres: ['Fantasy', 'Drama', 'Action'],
    year: '2011 - 2019',
    status: 'Completed',
    description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
    episodes: [
      { id: 'got-1', episodeNumber: 1, title: 'Winter Is Coming', duration: '62m', airDate: '2011-04-17' },
      { id: 'got-2', episodeNumber: 2, title: 'The Kingsroad', duration: '56m', airDate: '2011-04-24' },
      { id: 'got-3', episodeNumber: 3, title: 'Lord Snow', duration: '58m', airDate: '2011-05-01' },
    ],
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    shortTitle: 'Jujutsu Kaisen',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    totalEpisodes: 47,
    rating: 8.6,
    genres: ['Anime', 'Action', 'Dark Fantasy', 'Supernatural'],
    year: '2020 - Present',
    status: 'Airing',
    description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    episodes: [
      { id: 'jjk-1', episodeNumber: 1, title: 'Ryomen Sukuna', duration: '24m', airDate: '2020-10-03' },
      { id: 'jjk-2', episodeNumber: 2, title: 'For Myself', duration: '24m', airDate: '2020-10-10' },
      { id: 'jjk-3', episodeNumber: 3, title: 'Girl of Steel', duration: '24m', airDate: '2020-10-17' },
    ],
  },
];

export const INITIAL_WATCHLIST: WatchlistItem[] = [
  // Watching
  {
    id: 'wl-1',
    showId: 'one-piece',
    title: 'One Piece',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 780,
    totalEpisodes: '∞',
    status: 'Watching',
    lastUpdated: '2026-08-28',
  },
  {
    id: 'wl-2',
    showId: 'the-boys',
    title: 'The Boys S3',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 3,
    totalEpisodes: 8,
    status: 'Watching',
    lastUpdated: '2026-08-27',
  },
  {
    id: 'wl-3',
    showId: 'arcane',
    title: 'Arcane',
    type: 'ONA',
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 9,
    totalEpisodes: 10,
    status: 'Watching',
    lastUpdated: '2026-08-26',
  },
  // Planning
  {
    id: 'wl-4',
    showId: 'better-call-saul',
    title: 'Better Call Saul S4',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 0,
    totalEpisodes: 10,
    status: 'Planning',
    lastUpdated: '2026-08-20',
  },
  {
    id: 'wl-5',
    showId: 'fma',
    title: 'Full Metal Alchemist',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 0,
    totalEpisodes: 64,
    status: 'Planning',
    lastUpdated: '2026-08-15',
  },
  {
    id: 'wl-6',
    showId: 'the-witcher',
    title: 'The Witcher S1',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 0,
    totalEpisodes: 8,
    status: 'Planning',
    lastUpdated: '2026-08-10',
  },
  // Completed
  {
    id: 'wl-7',
    showId: 'breaking-bad',
    title: 'Breaking Bad S5',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 16,
    totalEpisodes: 16,
    status: 'Completed',
    lastUpdated: '2026-08-01',
  },
  {
    id: 'wl-8',
    showId: 'vinland-saga',
    title: 'Vinland Saga S2',
    type: 'Anime',
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 24,
    totalEpisodes: 24,
    status: 'Completed',
    lastUpdated: '2026-07-20',
  },
  {
    id: 'wl-9',
    showId: 'chernobyl',
    title: 'Chernobyl',
    type: 'TV',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    watchedEpisodes: 5,
    totalEpisodes: 5,
    status: 'Completed',
    lastUpdated: '2026-07-05',
  },
];

export const INITIAL_CAST_MEMBERS: CastMember[] = [
  {
    "id": "cast-ds-1",
    "characterName": "Tanjiro Kamado",
    "actorName": "Zack Aguilar",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Main Protagonist Voice",
    "nationality": "American",
    "birthDate": "Feb 21, 1998",
    "characterBio": "A kind-hearted and determined young boy who joins the Demon Slayer Corps after his family is slaughtered and his sister Nezuko is transformed into a demon. Wielder of Water Breathing and Hinokami Kagura.",
    "actorBio": "Zack Aguilar is an American voice actor known for voicing major anime protagonists, including Tanjiro Kamado in Demon Slayer, David Martinez in Cyberpunk: Edgerunners, and Genos in One Punch Man.",
    "filmography": [
      {
        "id": "f-za-1",
        "showTitle": "Cyberpunk: Edgerunners",
        "characterName": "David Martinez",
        "roleType": "Lead",
        "year": "2022",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-za-2",
        "showTitle": "One Punch Man",
        "characterName": "Genos",
        "roleType": "Main Cast",
        "year": "2015",
        "posterUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-za-3",
        "showTitle": "Genshin Impact",
        "characterName": "Aether",
        "roleType": "Protagonist",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-2",
    "characterName": "Nezuko Kamado",
    "actorName": "Abby Trott",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Supporting Lead Voice",
    "nationality": "American",
    "birthDate": "May 8, 1986",
    "characterBio": "Tanjiro's younger sister who retained her human emotions and compassion despite being turned into a demon. She fights alongside her brother using explosive Blood Demon Art.",
    "actorBio": "Abby Trott is an American voice actress and musician known for voicing Nezuko Kamado in Demon Slayer and Annette in Fire Emblem: Three Houses, as well as singing the theme \"Lifelight\" for Super Smash Bros. Ultimate.",
    "filmography": [
      {
        "id": "f-at-1",
        "showTitle": "Fire Emblem: Three Houses",
        "characterName": "Annette",
        "roleType": "Main Cast",
        "year": "2019",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-at-2",
        "showTitle": "Persona 5",
        "characterName": "Tae Takemi",
        "roleType": "Supporting",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-3",
    "characterName": "Zenitsu Agatsuma",
    "actorName": "Aleks Le",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Main Cast Voice",
    "nationality": "American",
    "birthDate": "Mar 12, 1988",
    "characterBio": "A cowardly yet exceptionally talented Demon Slayer who unleashes blinding Thunder Breathing speed and precision whenever he falls unconscious.",
    "actorBio": "Aleks Le is an American voice actor who voices Zenitsu in Demon Slayer, Makoto Yuki in Persona 3 Reload, and Luke in Street Fighter 6.",
    "filmography": [
      {
        "id": "f-al-1",
        "showTitle": "Persona 3 Reload",
        "characterName": "Makoto Yuki",
        "roleType": "Protagonist",
        "year": "2024",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-al-2",
        "showTitle": "Solo Leveling",
        "characterName": "Sung Jinwoo",
        "roleType": "Lead",
        "year": "2024",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-4",
    "characterName": "Inosuke Hashibira",
    "actorName": "B. Papenbrook",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Main Cast Voice",
    "nationality": "American",
    "birthDate": "Feb 24, 1986",
    "characterBio": "A fierce and wild Demon Slayer raised by boars who created Beast Breathing and charges headfirst into any confrontation with twin serrated Nichirin blades.",
    "actorBio": "Bryce Papenbrook is a prolific voice actor known for Eren Yeager in Attack on Titan (Dub), Kirito in Sword Art Online, and Inosuke in Demon Slayer.",
    "filmography": [
      {
        "id": "f-bp-1",
        "showTitle": "Attack on Titan",
        "characterName": "Eren Yeager (Dub)",
        "roleType": "Lead",
        "year": "2013",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-bp-2",
        "showTitle": "Sword Art Online",
        "characterName": "Kirito",
        "roleType": "Lead",
        "year": "2012",
        "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-5",
    "characterName": "Giyu Tomioka",
    "actorName": "J. Y. Bosch",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Water Hashira Voice",
    "nationality": "American",
    "birthDate": "Jan 6, 1976",
    "characterBio": "The stoic Water Hashira of the Demon Slayer Corps whose calm demeanor hides profound remorse and loyalty. He spared Nezuko and guided Tanjiro to Urokodaki.",
    "actorBio": "Johnny Yong Bosch is a legendary voice actor celebrated for voicing Ichigo Kurosaki in Bleach, Lelouch Lamperouge in Code Geass, and Giyu Tomioka in Demon Slayer.",
    "filmography": [
      {
        "id": "f-jyb-1",
        "showTitle": "Bleach",
        "characterName": "Ichigo Kurosaki",
        "roleType": "Lead",
        "year": "2004",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-jyb-2",
        "showTitle": "Code Geass",
        "characterName": "Lelouch Lamperouge",
        "roleType": "Lead",
        "year": "2006",
        "posterUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-6",
    "characterName": "Kyojuro Rengoku",
    "actorName": "M. Whitten",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Flame Hashira Voice",
    "nationality": "American",
    "birthDate": "Jun 21, 1985",
    "characterBio": "The boisterous and honorable Flame Hashira whose indomitable spirit and devotion to duty inspired Tanjiro during the Mugen Train mission.",
    "actorBio": "Mark Whitten is an American voice actor recognized for voicing Kyojuro Rengoku in Demon Slayer: Mugen Train, Seteth in Fire Emblem: Three Houses, and Kaedehara Kazuha in Genshin Impact.",
    "filmography": [
      {
        "id": "f-mw-1",
        "showTitle": "Genshin Impact",
        "characterName": "Kaedehara Kazuha",
        "roleType": "Main Cast",
        "year": "2021",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-7",
    "characterName": "Gyomei Himejima",
    "actorName": "C. Freeman",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Stone Hashira Voice",
    "nationality": "American",
    "birthDate": "Feb 9, 1972",
    "characterBio": "The blind Stone Hashira universally acknowledged as the strongest among the Demon Slayer Corps, deeply pious and wielding an immense spiked flail and axe.",
    "actorBio": "Crispin Freeman is an American voice actor acclaimed for voicing Alucard in Hellsing, Itachi Uchiha in Naruto, and Gyomei Himejima in Demon Slayer.",
    "filmography": [
      {
        "id": "f-cf-1",
        "showTitle": "Naruto",
        "characterName": "Itachi Uchiha",
        "roleType": "Main Cast",
        "year": "2002",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-ds-8",
    "characterName": "Muzan Kibutsuji",
    "actorName": "Greg Chun",
    "showTitle": "Demon Slayer",
    "characterImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Demon King Voice",
    "nationality": "American",
    "birthDate": "Dec 11, 1971",
    "characterBio": "The progenitor and king of all demons, cold and ruthless, who created the Twelve Kizuki and seeks the Blue Spider Lily to conquer the sun.",
    "actorBio": "Greg Chun is an American voice actor and music composer known for voicing Muzan Kibutsuji in Demon Slayer, Takayuki Yagami in Judgment, and Ike in Super Smash Bros. Ultimate.",
    "filmography": [
      {
        "id": "f-gc-1",
        "showTitle": "Judgment",
        "characterName": "Takayuki Yagami",
        "roleType": "Lead",
        "year": "2018",
        "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-tb-1",
    "characterName": "Billy Butcher",
    "actorName": "Karl Urban",
    "showTitle": "The Boys",
    "characterImageUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Actor",
    "nationality": "New Zealander",
    "birthDate": "Jun 7, 1972",
    "characterBio": "The charismatic, ruthless, and brutally witty leader of The Boys, consumed by an unyielding personal vendetta against Homelander and all corrupted Supes.",
    "actorBio": "Karl-Heinz Urban is a prominent New Zealand actor who has starred as Billy Butcher in The Boys, Éomer in The Lord of the Rings trilogy, Leonard McCoy in Star Trek, and Judge Dredd in Dredd.",
    "filmography": [
      {
        "id": "f-ku-1",
        "showTitle": "The Lord of the Rings",
        "characterName": "Éomer",
        "roleType": "Lead Cast",
        "year": "2002",
        "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-ku-2",
        "showTitle": "Dredd",
        "characterName": "Judge Dredd",
        "roleType": "Title Role",
        "year": "2012",
        "posterUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-ku-3",
        "showTitle": "Star Trek",
        "characterName": "Dr. Leonard McCoy",
        "roleType": "Main Cast",
        "year": "2009",
        "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-tb-2",
    "characterName": "Homelander",
    "actorName": "Antony Starr",
    "showTitle": "The Boys",
    "characterImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Antagonist Lead",
    "nationality": "New Zealander",
    "birthDate": "Oct 25, 1975",
    "characterBio": "The terrifying, god-like leader of The Seven whose smiling all-American public persona conceals a sociopathic, narcissistic, and deeply volatile monster.",
    "actorBio": "Antony Starr is a critically acclaimed New Zealand actor renowned for his chilling, multi-award-nominated performance as Homelander in The Boys and Lucas Hood in Cinemax’s Banshee.",
    "filmography": [
      {
        "id": "f-as-1",
        "showTitle": "Banshee",
        "characterName": "Lucas Hood",
        "roleType": "Lead",
        "year": "2013",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-as-2",
        "showTitle": "Outrageous Fortune",
        "characterName": "Jethro / Van West",
        "roleType": "Dual Lead",
        "year": "2005",
        "posterUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-tb-3",
    "characterName": "Hughie Campbell",
    "actorName": "Jack Quaid",
    "showTitle": "The Boys",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Protagonist",
    "nationality": "American",
    "birthDate": "Apr 24, 1992",
    "characterBio": "A mild-mannered electronics salesman drawn into the underground resistance against Vought after his girlfriend is obliterated by A-Train.",
    "actorBio": "Jack Quaid is an American actor known for starring as Hughie Campbell in The Boys, Brad Boimler in Star Trek: Lower Decks, and Richard Feynman in Oppenheimer.",
    "filmography": [
      {
        "id": "f-jq-1",
        "showTitle": "Oppenheimer",
        "characterName": "Richard Feynman",
        "roleType": "Supporting",
        "year": "2023",
        "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-jq-2",
        "showTitle": "Scream",
        "characterName": "Richie Kirsch",
        "roleType": "Main Cast",
        "year": "2022",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-tb-4",
    "characterName": "Starlight",
    "actorName": "Erin Moriarty",
    "showTitle": "The Boys",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Co-Lead Actress",
    "nationality": "American",
    "birthDate": "Jun 24, 1994",
    "characterBio": "An earnest, light-emitting heroine who joins The Seven dreaming of saving people, only to realize the systemic corruption and team up with The Boys.",
    "actorBio": "Erin Moriarty is an American actress known for her role as Annie January / Starlight in The Boys, Jessica Jones, and Captain Fantastic.",
    "filmography": [
      {
        "id": "f-em-1",
        "showTitle": "Jessica Jones",
        "characterName": "Hope Shlottman",
        "roleType": "Main Cast",
        "year": "2015",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-op-1",
    "characterName": "Monkey D. Luffy",
    "actorName": "Mayumi Tanaka",
    "showTitle": "One Piece",
    "characterImageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Voice Actress",
    "nationality": "Japanese",
    "birthDate": "Jan 15, 1955",
    "characterBio": "Captain of the Straw Hat Pirates with rubber abilities from eating the Gum-Gum Fruit, on a grand quest across the Grand Line to find the One Piece and become King of the Pirates.",
    "actorBio": "Mayumi Tanaka is a legendary Japanese voice actress who has voiced Monkey D. Luffy in One Piece for over 25 years, as well as Krillin and Yajirobe in Dragon Ball.",
    "filmography": [
      {
        "id": "f-mt-1",
        "showTitle": "Dragon Ball Z",
        "characterName": "Krillin",
        "roleType": "Main Cast",
        "year": "1989",
        "posterUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-mt-2",
        "showTitle": "Castle in the Sky",
        "characterName": "Pazu",
        "roleType": "Lead",
        "year": "1986",
        "posterUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-op-2",
    "characterName": "Roronoa Zoro",
    "actorName": "Kazuya Nakai",
    "showTitle": "One Piece",
    "characterImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "First Mate & Swordsman",
    "nationality": "Japanese",
    "birthDate": "Nov 25, 1967",
    "characterBio": "Master of Three-Sword Style and former pirate hunter who aims to become the greatest swordsman in the world as the first mate of the Straw Hat crew.",
    "actorBio": "Kazuya Nakai is an iconic Japanese voice actor known for voicing Roronoa Zoro in One Piece, Mugen in Samurai Champloo, and Toshiro Hijikata in Gintama.",
    "filmography": [
      {
        "id": "f-kn-1",
        "showTitle": "Samurai Champloo",
        "characterName": "Mugen",
        "roleType": "Lead",
        "year": "2004",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-kn-2",
        "showTitle": "Gintama",
        "characterName": "Toshiro Hijikata",
        "roleType": "Main Cast",
        "year": "2006",
        "posterUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-op-3",
    "characterName": "Nami",
    "actorName": "Akemi Okamura",
    "showTitle": "One Piece",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Navigator",
    "nationality": "Japanese",
    "birthDate": "Mar 12, 1969",
    "characterBio": "The brilliant cat burglar and navigator of the Straw Hats whose climate baton weapon and sea navigation chart the crew through the Grand Line.",
    "actorBio": "Akemi Okamura is a celebrated Japanese voice actress renowned for voicing Nami in One Piece, Sayaka in Porco Rosso, and Paninya in Fullmetal Alchemist.",
    "filmography": [
      {
        "id": "f-ao-1",
        "showTitle": "Porco Rosso",
        "characterName": "Fio Piccolo",
        "roleType": "Main Cast",
        "year": "1992",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-op-4",
    "characterName": "Sanji",
    "actorName": "Hiroaki Hirata",
    "showTitle": "One Piece",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Cook & Martial Artist",
    "nationality": "Japanese",
    "birthDate": "Aug 7, 1963",
    "characterBio": "The chivalrous cook of the Straw Hat Pirates who fights exclusively with his blazing Black Leg style to preserve his hands for culinary masterworks.",
    "actorBio": "Hiroaki Hirata is a renowned Japanese voice actor and dub artist known for voicing Sanji in One Piece, Kotetsu T. Kaburagi in Tiger & Bunny, and dubbing Johnny Depp.",
    "filmography": [
      {
        "id": "f-hh-1",
        "showTitle": "Tiger & Bunny",
        "characterName": "Kotetsu T. Kaburagi",
        "roleType": "Lead",
        "year": "2011",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-aot-1",
    "characterName": "Eren Yeager",
    "actorName": "Yuki Kaji",
    "showTitle": "Attack on Titan",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Voice Actor",
    "nationality": "Japanese",
    "birthDate": "Sep 3, 1985",
    "characterBio": "A passionate, relentless soldier whose vow to eradicate all Titans transforms into an agonizing journey exploring freedom, fate, and the true cost of liberation.",
    "actorBio": "Yuki Kaji is one of Japan’s most celebrated voice actors, winning multiple Seiyu Awards for his emotionally intense portrayal of Eren Yeager in Attack on Titan, Shoto Todoroki in My Hero Academia, and Meliodas in The Seven Deadly Sins.",
    "filmography": [
      {
        "id": "f-yk-1",
        "showTitle": "My Hero Academia",
        "characterName": "Shoto Todoroki",
        "roleType": "Main Cast",
        "year": "2016",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-yk-2",
        "showTitle": "The Seven Deadly Sins",
        "characterName": "Meliodas",
        "roleType": "Lead",
        "year": "2014",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-aot-2",
    "characterName": "Mikasa Ackerman",
    "actorName": "Yui Ishikawa",
    "showTitle": "Attack on Titan",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Co-Lead Voice Actress",
    "nationality": "Japanese",
    "birthDate": "May 30, 1989",
    "characterBio": "The top graduate of the 104th Training Corps and elite Scout possessing lethal Ackerman combat instincts, dedicated to safeguarding Eren at all costs.",
    "actorBio": "Yui Ishikawa is an award-winning Japanese voice actress who voices Mikasa Ackerman in Attack on Titan, Violet Evergarden in Violet Evergarden, and 2B in NieR:Automata.",
    "filmography": [
      {
        "id": "f-yi-1",
        "showTitle": "Violet Evergarden",
        "characterName": "Violet Evergarden",
        "roleType": "Title Role",
        "year": "2018",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-yi-2",
        "showTitle": "NieR:Automata",
        "characterName": "2B",
        "roleType": "Lead",
        "year": "2017",
        "posterUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-aot-3",
    "characterName": "Levi Ackerman",
    "actorName": "Hiroshi Kamiya",
    "showTitle": "Attack on Titan",
    "characterImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Captain Voice",
    "nationality": "Japanese",
    "birthDate": "Jan 28, 1975",
    "characterBio": "Humanity’s strongest soldier, captain of the Special Operations Squad in the Scout Regiment, renowned for his ruthless aerial blade maneuvers and clean freak tendencies.",
    "actorBio": "Hiroshi Kamiya is one of Japan’s premier voice actors, famous for voicing Levi in Attack on Titan, Trafalgar Law in One Piece, and Yato in Noragami.",
    "filmography": [
      {
        "id": "f-hk-1",
        "showTitle": "One Piece",
        "characterName": "Trafalgar Law",
        "roleType": "Main Cast",
        "year": "2012",
        "posterUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-hk-2",
        "showTitle": "Noragami",
        "characterName": "Yato",
        "roleType": "Lead",
        "year": "2014",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-pb-1",
    "characterName": "Thomas Shelby",
    "actorName": "Cillian Murphy",
    "showTitle": "Peaky Blinders",
    "characterImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Actor",
    "nationality": "Irish",
    "birthDate": "May 25, 1976",
    "characterBio": "The calculating, cold-eyed patriarch of the Peaky Blinders gang and Birmingham MP, haunted by the horrors of World War I as he expands his family empire.",
    "actorBio": "Cillian Murphy is an Academy Award-winning Irish actor renowned for his towering performance as Thomas Shelby in Peaky Blinders and J. Robert Oppenheimer in Christopher Nolan’s Oppenheimer.",
    "filmography": [
      {
        "id": "f-cm-1",
        "showTitle": "Oppenheimer",
        "characterName": "J. Robert Oppenheimer",
        "roleType": "Lead",
        "year": "2023",
        "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-cm-2",
        "showTitle": "Inception",
        "characterName": "Robert Fischer",
        "roleType": "Main Cast",
        "year": "2010",
        "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-pb-2",
    "characterName": "Arthur Shelby",
    "actorName": "Paul Anderson",
    "showTitle": "Peaky Blinders",
    "characterImageUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Enforcer & Brother",
    "nationality": "British",
    "birthDate": "Nov 19, 1978",
    "characterBio": "The volatile, battle-scarred eldest brother of the Shelby family, serving as the brutal enforcer of the Peaky Blinders with fierce loyalty to Tommy.",
    "actorBio": "Paul Anderson is an English actor widely acclaimed for his intense depiction of Arthur Shelby in Peaky Blinders and Sebastian Moran in Sherlock Holmes: A Game of Shadows.",
    "filmography": [
      {
        "id": "f-pa-1",
        "showTitle": "The Revenant",
        "characterName": "Anderson",
        "roleType": "Supporting",
        "year": "2015",
        "posterUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-pb-3",
    "characterName": "Polly Gray",
    "actorName": "Helen McCrory",
    "showTitle": "Peaky Blinders",
    "characterImageUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Matriarch",
    "nationality": "British",
    "birthDate": "Aug 17, 1968",
    "characterBio": "The formidable matriarch and treasurer of the Shelby family who kept the business alive during the war, guiding Tommy with sharp intuition and spiritual insight.",
    "actorBio": "Helen McCrory was an extraordinary British stage and screen actress, adored for portraying Polly Gray in Peaky Blinders and Narcissa Malfoy in Harry Potter.",
    "filmography": [
      {
        "id": "f-hm-1",
        "showTitle": "Harry Potter",
        "characterName": "Narcissa Malfoy",
        "roleType": "Main Cast",
        "year": "2009",
        "posterUrl": "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-st-1",
    "characterName": "Eleven",
    "actorName": "Millie Bobby Brown",
    "showTitle": "Stranger Things",
    "characterImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Actress",
    "nationality": "British",
    "birthDate": "Feb 19, 2004",
    "characterBio": "A telekinetic girl raised in Hawkins National Laboratory who escapes to find friends, love, and the strength to protect the town from the Upside Down.",
    "actorBio": "Millie Bobby Brown is an Emmy-nominated British actress who gained global acclaim as Eleven in Stranger Things and starred as the titular detective in Enola Holmes.",
    "filmography": [
      {
        "id": "f-mbb-1",
        "showTitle": "Enola Holmes",
        "characterName": "Enola Holmes",
        "roleType": "Lead",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-mbb-2",
        "showTitle": "Godzilla: King of the Monsters",
        "characterName": "Madison Russell",
        "roleType": "Main Cast",
        "year": "2019",
        "posterUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-st-2",
    "characterName": "Mike Wheeler",
    "actorName": "Finn Wolfhard",
    "showTitle": "Stranger Things",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Co-Lead Actor",
    "nationality": "Canadian",
    "birthDate": "Dec 23, 2002",
    "characterBio": "The courageous, loyal leader of the Hawkins party who welcomes Eleven into his home and never stops believing in her.",
    "actorBio": "Finn Wolfhard is a Canadian actor and musician known for playing Mike Wheeler in Stranger Things, Richie Tozier in IT, and Trevor Spengler in Ghostbusters: Afterlife.",
    "filmography": [
      {
        "id": "f-fw-1",
        "showTitle": "IT",
        "characterName": "Richie Tozier",
        "roleType": "Main Cast",
        "year": "2017",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-st-3",
    "characterName": "Jim Hopper",
    "actorName": "David Harbour",
    "showTitle": "Stranger Things",
    "characterImageUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Chief of Police",
    "nationality": "American",
    "birthDate": "Apr 10, 1975",
    "characterBio": "Hawkins’ grizzled, kind-hearted Chief of Police who adopts Eleven as his daughter and risks everything to keep the supernatural dangers contained.",
    "actorBio": "David Harbour is an Emmy and Golden Globe-nominated American actor known for Stranger Things, Red Guardian in Black Widow / Thunderbolts, and Hellboy.",
    "filmography": [
      {
        "id": "f-dh-1",
        "showTitle": "Black Widow",
        "characterName": "Alexei / Red Guardian",
        "roleType": "Main Cast",
        "year": "2021",
        "posterUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-cb-1",
    "characterName": "Valery Legasov",
    "actorName": "Jared Harris",
    "showTitle": "Chernobyl",
    "characterImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Actor",
    "nationality": "British",
    "birthDate": "Aug 24, 1961",
    "characterBio": "The chief of the commission investigating the Chernobyl disaster, who fought against state denial and bureaucracy to uncover the truth and avert further tragedy.",
    "actorBio": "Jared Harris is a BAFTA-winning and Emmy-nominated British actor known for Chernobyl, Mad Men (Lane Pryce), The Crown (King George VI), and Foundation (Hari Seldon).",
    "filmography": [
      {
        "id": "f-jh-1",
        "showTitle": "Foundation",
        "characterName": "Hari Seldon",
        "roleType": "Lead",
        "year": "2021",
        "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-jh-2",
        "showTitle": "The Crown",
        "characterName": "King George VI",
        "roleType": "Main Cast",
        "year": "2016",
        "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-cb-2",
    "characterName": "Boris Shcherbina",
    "actorName": "Stellan Skarsgård",
    "showTitle": "Chernobyl",
    "characterImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Deputy Prime Minister",
    "nationality": "Swedish",
    "birthDate": "Jun 13, 1951",
    "characterBio": "The pragmatic Soviet Deputy Chairman sent to manage the Chernobyl crisis, who grows to respect Legasov’s scientific honesty and sacrifices his health for the mission.",
    "actorBio": "Stellan Skarsgård is an internationally acclaimed Swedish actor whose roles include Chernobyl, Baron Harkonnen in Dune, and Professor Erik Selvig in Thor.",
    "filmography": [
      {
        "id": "f-ss-1",
        "showTitle": "Dune",
        "characterName": "Baron Vladimir Harkonnen",
        "roleType": "Main Cast",
        "year": "2021",
        "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-jjk-1",
    "characterName": "Yuji Itadori",
    "actorName": "Junya Enoki",
    "showTitle": "Jujutsu Kaisen",
    "characterImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Voice Actor",
    "nationality": "Japanese",
    "birthDate": "Oct 19, 1988",
    "characterBio": "A prodigiously athletic high schooler who becomes the vessel of Sukuna, the King of Curses, choosing to fight curses so people can experience a proper death.",
    "actorBio": "Junya Enoki is a popular Japanese voice actor who voices Yuji Itadori in Jujutsu Kaisen, Pannacotta Fugo in JoJo’s Bizarre Adventure, and Naoya in Girlfriend, Girlfriend.",
    "filmography": [
      {
        "id": "f-je-1",
        "showTitle": "JoJo’s Bizarre Adventure",
        "characterName": "Pannacotta Fugo",
        "roleType": "Main Cast",
        "year": "2018",
        "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-jjk-2",
    "characterName": "Satoru Gojo",
    "actorName": "Yuichi Nakamura",
    "showTitle": "Jujutsu Kaisen",
    "characterImageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Special Grade Sorcerer",
    "nationality": "Japanese",
    "birthDate": "Feb 20, 1980",
    "characterBio": "The strongest jujutsu sorcerer alive, possessing the Limitless cursed technique and Six Eyes. Teacher to Yuji, Megumi, and Nobara with supreme confidence.",
    "actorBio": "Yuichi Nakamura is a renowned Japanese voice actor who voices Satoru Gojo in Jujutsu Kaisen, Gray Fullbuster in Fairy Tail, and Hawks in My Hero Academia.",
    "filmography": [
      {
        "id": "f-yn-1",
        "showTitle": "Fairy Tail",
        "characterName": "Gray Fullbuster",
        "roleType": "Main Cast",
        "year": "2009",
        "posterUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-yn-2",
        "showTitle": "My Hero Academia",
        "characterName": "Hawks",
        "roleType": "Main Cast",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-bb-1",
    "characterName": "Walter White",
    "actorName": "Bryan Cranston",
    "showTitle": "Breaking Bad",
    "characterImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Lead Actor",
    "nationality": "American",
    "birthDate": "Mar 7, 1956",
    "characterBio": "A brilliant, mild-mannered high school chemistry teacher diagnosed with terminal lung cancer who descends into the ruthless drug lord \"Heisenberg\".",
    "actorBio": "Bryan Cranston is a multi-Emmy and Golden Globe-winning American actor, world-famous for playing Walter White in Breaking Bad, Hal in Malcolm in the Middle, and Michael Desiato in Your Honor.",
    "filmography": [
      {
        "id": "f-bc-1",
        "showTitle": "Your Honor",
        "characterName": "Michael Desiato",
        "roleType": "Lead",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80"
      },
      {
        "id": "f-bc-2",
        "showTitle": "Malcolm in the Middle",
        "characterName": "Hal Wilkerson",
        "roleType": "Main Cast",
        "year": "2000",
        "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-bb-2",
    "characterName": "Jesse Pinkman",
    "actorName": "Aaron Paul",
    "showTitle": "Breaking Bad",
    "characterImageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Co-Lead Actor",
    "nationality": "American",
    "birthDate": "Aug 27, 1979",
    "characterBio": "Walter’s former slacker student and business partner whose innate morality and sensitivity conflict with the terrifying criminal empire they build.",
    "actorBio": "Aaron Paul is a triple Emmy-winning American actor best known for playing Jesse Pinkman in Breaking Bad and El Camino, as well as Caleb Nichols in Westworld.",
    "filmography": [
      {
        "id": "f-ap-1",
        "showTitle": "Westworld",
        "characterName": "Caleb Nichols",
        "roleType": "Lead",
        "year": "2020",
        "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-vs-1",
    "characterName": "Thorfinn",
    "actorName": "Yuto Uemura",
    "showTitle": "Vinland Saga",
    "characterImageUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Protagonist",
    "nationality": "Japanese",
    "birthDate": "Oct 23, 1993",
    "characterBio": "A fierce young Viking warrior consumed by revenge against Askeladd for his father’s murder, who gradually seeks redemption and a land of peace.",
    "actorBio": "Yuto Uemura is an acclaimed Japanese voice actor known for voicing Thorfinn in Vinland Saga, Atsushi Nakajima in Bungo Stray Dogs, and Sunghoon in Solo Leveling.",
    "filmography": [
      {
        "id": "f-yu-1",
        "showTitle": "Bungo Stray Dogs",
        "characterName": "Atsushi Nakajima",
        "roleType": "Lead",
        "year": "2016",
        "posterUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    "id": "cast-vs-2",
    "characterName": "Askeladd",
    "actorName": "Naoya Uchida",
    "showTitle": "Vinland Saga",
    "characterImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80",
    "actorImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    "isVerified": true,
    "role": "Commander & Mentor",
    "nationality": "Japanese",
    "birthDate": "May 1, 1953",
    "characterBio": "A shrewd, enigmatic Welsh-Viking mercenary captain whose calculating intellect and hidden royal lineage shape the fate of England and young Thorfinn.",
    "actorBio": "Naoya Uchida is an esteemed Japanese voice actor and stage actor who voiced Askeladd in Vinland Saga, Madara Uchiha in Naruto Shippuden, and Soichiro Yagami in Death Note.",
    "filmography": [
      {
        "id": "f-nu-1",
        "showTitle": "Naruto",
        "characterName": "Madara Uchiha",
        "roleType": "Main Antagonist",
        "year": "2012",
        "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80"
      }
    ]
  }
];

export const INITIAL_RANKINGS: RankingItem[] = [
  { id: 'rank-1', rank: 1, title: 'One Piece', shortTitle: 'One Piece', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-2', rank: 2, title: 'Attack on Titan', shortTitle: 'AOT', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-3', rank: 3, title: 'Naruto', shortTitle: 'Naruto', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-4', rank: 4, title: 'Death Note', shortTitle: 'Death Note', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-5', rank: 5, title: 'Fullmetal Alchemist: Brotherhood', shortTitle: 'FMAB', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-6', rank: 6, title: 'One Punch Man', shortTitle: 'OnePunch Man', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-7', rank: 7, title: 'Jujutsu Kaisen', shortTitle: 'Jujutsu Kaisen', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-8', rank: 8, title: 'My Hero Academia', shortTitle: 'MHA', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&auto=format&fit=crop&q=80' },
  { id: 'rank-9', rank: 9, title: 'Demon Slayer', shortTitle: 'Demon Slayer', type: 'Anime', posterUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&auto=format&fit=crop&q=80' },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'John Doe',
  birthday: '01 Jan 2001',
  gender: 'Male',
  email: 'johndoe789@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  stats: {
    animeCount: 21,
    animeHours: 523,
    animeEpisodes: 112,
    tvCount: 8,
    tvHours: 372,
    tvEpisodes: 43,
    totalCount: 29,
    totalHours: 895,
    totalEpisodes: 155,
  },
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', episodeNumber: 1115, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '7h ago', timestamp: '2026-08-29T01:30:00Z', isRead: false },
  { id: 'notif-2', episodeNumber: 1114, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '1w ago', timestamp: '2026-08-22T01:30:00Z', isRead: false },
  { id: 'notif-3', episodeNumber: 1113, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '2w ago', timestamp: '2026-08-15T01:30:00Z', isRead: true },
  { id: 'notif-4', episodeNumber: 1112, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '3w ago', timestamp: '2026-08-08T01:30:00Z', isRead: true },
  { id: 'notif-5', episodeNumber: 1111, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '4w ago', timestamp: '2026-08-01T01:30:00Z', isRead: true },
  { id: 'notif-6', episodeNumber: 1110, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '5w ago', timestamp: '2026-07-25T01:30:00Z', isRead: true },
  { id: 'notif-7', episodeNumber: 1109, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '6w ago', timestamp: '2026-07-18T01:30:00Z', isRead: true },
  { id: 'notif-8', episodeNumber: 1108, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '7w ago', timestamp: '2026-07-11T01:30:00Z', isRead: true },
  { id: 'notif-9', episodeNumber: 1107, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '8w ago', timestamp: '2026-07-04T01:30:00Z', isRead: true },
  { id: 'notif-10', episodeNumber: 1106, showTitle: 'One Piece', posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80', timeAgo: '9w ago', timestamp: '2026-06-27T01:30:00Z', isRead: true },
];
