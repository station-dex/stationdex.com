import { getHashFromTitle } from '@/util/link';


export interface StarAllocationData {
  pool: string;
  action: string;
  stars: string;
  boost: string;
}

const starAllocationTableData: StarAllocationData[] = [
  {
    pool: "USDT/WOKB",
    action: "Swapping",
    stars: "15 stars per dollar swapped",
    boost: "x1.0"
  },
  {
    pool: "USDT/WOKB",
    action: "Adding Liquidity",
    stars: "1 star per dollar per day",
    boost: "x1.0"
  },
  {
    pool: "WETH/USDT",
    action: "Swapping",
    stars: "15 stars per dollar swapped",
    boost: "x1.0"
  },
  {
    pool: "WETH/USDT",
    action: "Adding Liquidity",
    stars: "1 star per dollar per day",
    boost: "x1.0"
  },
]

interface ContentItem {
  title: string;
  content?: (string | string[])[];
  sections?: {
    title: string;
    content: (string | string[] | { title: string, text: string })[]
  }[]
  table?: StarAllocationData[]
}

const contentItems: ContentItem[] = [
  {
    title: "Overview",
    content: [
      "StationDEX blasted off into the DeFi frontier when X Layer mainnet ignited its engines on April 16th, 2024! The protocol is a stellar fusion of Uniswap's battle-tested codebase with a constellation of innovative integrations exclusive to StationDEX, combined with a sleek and intuitive UI ensuring a smooth trading experience for all Stationers aboard."
    ]
  },
  {
    title: "Stars",
    content: [
      "StationDEX has designed a stellar point system program to incentivize activity and reward its loyal community, the Stationers. In the StationDEX constellation, points are called Stars where: 1 star = 1 point. Stars can be fractional, meaning you can earn part of a star. Stationers, you have been called to join the mission of the Starfinders Program: Collect as many stars as you can, advance through the leaderboard, and move up in rankings to steer StationDEX and earn rewards.",
      "Stationers earn stars by one of the following means:"
    ],
    sections: [
      {
        title: "Swapping",
        content: [
          "Swapping a token earns a default amount of <b>15 stars per dollar swapped</b>. Additional stars may be allocated if there is a boost. Stars are allocated only for token pairs listed in the <b><a href='#star_allocation_table'>Star Allocation Table</a></b>.",
          "Transactions should be made using StationDEX contracts directly."
        ]
      },
      {
        title: "Adding Liquidity",
        content: [
          "Adding pool liquidy earns a default amount of <b>1 star per dollar per day</b>. Stars are allocated only for pools listed in the <b><a href='#star_allocation_table'>Star Allocation Table</a></b>. Additional stars may be allocated if there is a boost.",
          "The calculation of stars in a liquidity pool does not consider changes in the market price of the token pair over time. For instance, if you invest $1000 worth of WETH and $1000 worth of USDT in a WETH/USDT pool, you will earn 2000 stars per day. Even if the price of WETH doubles, you will still earn 2000 stars per day because the price change is not factored into the star calculation.",
          "However, if you remove your $2000 worth of WETH and $2000 worth of USDT from the pool and then re-add them, you will now accumulate stars at a rate of 4000 stars per day.",
          "Conversely, if the price of WETH halves, you will still earn stars based on the original price of WETH when you invested, meaning you will continue to accumulate stars at a rate of 2000 stars per day."
        ]
      },
      {
        title: "Star Rewards for Mission # 1",
        content: [
          [
            "20% of the token supply shall be used for rewarding users with stars.",
            "An additional 5% of the token supply shall be used for rewarding the top 10 of our Star Leaderboard → The top 10 positions of the Leaderboard will get a reserved allocation equivalent to 5% of the total supply, <u>in addition</u> to the allocation of 20% made for rewarding users with stars."
          ]
        ]
      },
      {
        title: "Stage 2: In-App Referral Bonus",
        content: [
          "Referral feature will be launched soon. Additional points will be provided to the users once the referral program is announced."
        ]
      },
    ]
  },
  {
    title: "Boost",
    content: [
      "Certain pools boost the amount of Stars Stationers receive. The amount of boost depends on the pool and on the activity of the user i.e. boost can vary depending on whether a user is swapping in a boosted pool or providing liquidity to a boosted pool. The boost multipliers are listed in the <b><a href='#star_allocation_table'>Star Allocation Table</a></b>."
    ]
  },
  {
    title: "Distribution",
    content: [
      "StationDEX distributes StationDEX Stars to Externally Owned Accounts (EOAs) or contracts, provided they are configured correctly, and hold OKB."
    ]
  },
  {
    title: "FAQ",
    sections: [
      {
        title: "1. How do I earn stars (points)?",
        content: [
          "You can earn stars by swapping tokens or providing liquidity to pools. Stars are allocated only for token pairs listed in the <a href='#star_allocation_table'>Star Allocation Table</a>.",
          {
            title: "Trading",
            text: "Trading a token earns a default amount of 15 stars per dollar traded. Additional stars may be allocated if there is a boost."
          },
          {
            title: "Adding Liquidity",
            text: "Adding pool liquidy earns a default amount of 1 star per dollar. Additional stars may be allocated if there is a boost."
          }
        ]
      },
      {
        title: "2. How is boost calculated?",
        content: [
          "For certain pools a multiplier is used to boost your stars. For each pool the boost is identified for the trade (swap) action, or the provide pool liquidity action. Boosted stars apply specifically to your activity within these specific pools."
        ]
      },
      {
        title: "3. What can I do with my stars?",
        content: [
          "Your stars will be used to move up in rankings in the Starfinders Program to determine your allocation of StationDEX tokens when they are airdropped. To see the amount of StationDEX tokens allocated for Mission #1 refer to “Star Rewards for Mission #1”.",
          "StationDEX has not yet launched its token either on a DEX or CEX and so for the time being no tokens are available to be airdropped to Stationers who have accumulated Stars. As soon as the StationDEX token is launched Stationers can expect to receive token rewards based on their holdings of Stars."
        ]
      },
      {
        title: "4. How do I see my stars?",
        content: [
          "You can look at your collection of Stars in <a href='https://leaderboard.stationdex.com' target='_blank'>https://leaderboard.stationdex.com</a>. The Leader board will list the entire community of Stationers and their respective Stars."
        ]
      },
      {
        title: "5. Will any of my stars carry forward from one season to another?",
        content: [
          "The stars accumulated throughout one season will not carry forward to the next season."
        ]
      }
    ]
  },
  {
    title: 'Star Allocation Table',
    table: starAllocationTableData
  }
]


export interface Link {
  title: string;
  hash: string;
  links?: Link[];
}

const tocTitles: Link[] = contentItems.map(item => {
  const link: Link = {
    title: item.title,
    hash: getHashFromTitle(item.title),
  }

  if (item.sections) {
    link.links = item.sections.map(section => ({
      title: section.title,
      hash: getHashFromTitle(section.title)
    }))
  }

  return link;
});

export { contentItems, tocTitles };