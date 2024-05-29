import { fuzzySearch, getTenHighestRanks, searchByName } from "../../src/redux/thunks/leaderboardThunk"
import leaderboard from '../../src/data/leaderboard.json'

const expectedData = [
    {
      bananas: 36750,
      lastDayPlayed: '2018-07-21',
      longestStreak: 18,
      name: 'Chris Buckley',
      stars: 176,
      subscribed: true,
      uid: 'zJsI8m74uqOI3el3EM1u64kbUWd2',
      searched: false,
      rank: 1
    },
    {
      bananas: 27800,
      lastDayPlayed: '2018-12-30',
      longestStreak: 7,
      name: 'Patrick Kennedy',
      stars: 104,
      subscribed: true,
      uid: 'zOztg0xHJwN2GSHO9XSFAPvTl7E2',
      searched: false,
      rank: 2
    },
    {
      bananas: 19500,
      lastDayPlayed: '2019-02-02',
      longestStreak: 9,
      name: 'Wolfgang Wirtz',
      stars: 92,
      subscribed: true,
      uid: 'zQH10NTZfYaXACdiF3V6hd7Ahn93',
      searched: false,
      rank: 3
    },
    {
      bananas: 18250,
      lastDayPlayed: '2019-02-01',
      longestStreak: 13,
      name: 'Bryan Holleman',
      stars: 66,
      subscribed: true,
      uid: 'zBgGPzU0saQuZHL7EH3T8xX6zCm2',
      searched: false,
      rank: 4
    },
    {
      bananas: 17200,
      lastDayPlayed: '2018-12-14',
      longestStreak: 4,
      name: 'Kim Schytt-Nielsen ',
      stars: 35,
      subscribed: true,
      uid: 'zyqWz9Obwsfk9TIkDAoNshMGPtc2',
      searched: false,
      rank: 5
    },
    {
      bananas: 14300,
      lastDayPlayed: '2018-05-15',
      longestStreak: 3,
      name: 'Tobias Fager',
      stars: 64,
      subscribed: false,
      uid: 'znHBpuZTcVhC5DpMtSAYLGtWo023',
      searched: false,
      rank: 6
    },
    {
      bananas: 11250,
      lastDayPlayed: '2019-01-29',
      longestStreak: 4,
      name: 'Lawrence Chan',
      stars: 53,
      subscribed: true,
      uid: 'zOCMOcl3dKfgnJFvaS1Tk9Ifq3A3',
      searched: false,
      rank: 7
    },
    {
      bananas: 8300,
      lastDayPlayed: '2019-01-25',
      longestStreak: 4,
      name: 'Hannah Krzywicki',
      stars: 34,
      subscribed: true,
      uid: 'zRa6fy2hvtYWXkKI3jKoASOqmd32',
      searched: false,
      rank: 8
    },
    {
      bananas: 6550,
      lastDayPlayed: '2018-09-18',
      longestStreak: 6,
      name: 'Emma',
      stars: 24,
      subscribed: false,
      uid: 'zDHhDho9h5fTDntQhyEg66RMvqK2',
      searched: false,
      rank: 9
    },
    {
      bananas: 6200,
      lastDayPlayed: '2018-12-23',
      longestStreak: 2,
      name: 'Alexander Mochalski',
      stars: 26,
      subscribed: true,
      uid: 'zOKzuWGBUVWRrTxyEHgTKc4gin32',
      searched: false,
      rank: 10
    }
]

describe('get top ten highest ranks', () => {
    it('should return ten highest ranks', () => {
        const result = getTenHighestRanks(leaderboard, null)

        expect(result).toEqual(expectedData)
    })

    it('should return ten highest ranks with searched user included', () => {
        const user = searchByName(leaderboard, 'patrick kennedy')

        expect(user).toBeTruthy()

        const modExpectedData = [...expectedData]

        modExpectedData.map(val => {
            if (val.uid === user?.uid) {
                val.searched = true
            }
        })

        const result = getTenHighestRanks(leaderboard, user)

        expect(result).toEqual(modExpectedData)
    })

    it('should return ten highest ranks although searched user not in that but swap with last index in the ranks', () => {
        const user = searchByName(leaderboard, "anis adnan")

        expect(user).toBeTruthy()
        
        const result = getTenHighestRanks(leaderboard, user)

        const modExpectedData = [...expectedData]
        modExpectedData.map(val => {
            if ( val.name.toLowerCase() === 'patrick kennedy' ) {
                val.searched = false
            }
        })

        if ( user ) {
            modExpectedData.pop()
            modExpectedData.push({
                ...user,
                searched: true,
                rank: 268
            })
        }

        expect(result).toEqual(modExpectedData)
    })
})