<img src="https://cuisine-clash.vercel.app/banner.png" alt="Banner image">

A food fighting card game built for [Solidabis](https://www.solidabis.com/) coding challenge. The task was to build a food themed "fighting simulator" revolving around nutritional values.

Energy value represents hit points, carbohydrates is attack power (x5 to make the fights faster), protein is defence (chance to block) and the more carbs + protein + fat the card has, the slower it acts.

### <a href="https://cuisine-clash.vercel.app/">Open the project</a>

## Tech

Full-stack [TypeScript](https://typescriptlang.org)/[Next.js](https://nextjs.org) project with typesafe [tRPC](https://trpc.io) APIs for drawing cards from a [PostgreSQL](https://www.postgresql.org) DB (w/ [Prisma](https://prisma.io)) and solving battles between cards. State management with [Zustand](https://github.com/pmndrs/zustand), styling with [Tailwind CSS](https://tailwindcss.com) and animations with [GSAP](https://greensock.com/gsap).

## Running locally

### Client

```bash
cp .env-example .env
yarn install
yarn dev
```

### DB

```bash
docker-compose up
npx prisma db push
npx prisma db seed
```

## Acknowledgements

- Food nutrition data from [Fineli](https://fineli.fi/fineli/en/ohje/19?)
- Project bootstrapped with [create-t3-app](https://github.com/t3-oss/create-t3-app)
- Legendary/epic card styling inspired by [Linear.app](https://linear.app/customers)
- Card loading animation inspired by [Jacob Harris](http://jacobharris.codes/)
- Hit message variations from [BatMUD](https://www.bat.org/) hit message helpfiles
