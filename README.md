# Household helper

This is a [Nextjs] app with [prisma] and [Notus JS], setup to work with a [Supabase] backend.
[Material-UI] is also included, but is mainly used by the calendar library [dx-react-scheduler] and for some skeleton components.

## Setup

First you must install all dependencies with `yarn install` and additionally execute `yarn add global dotenv`. Dotenv is necessary to tell prisma to use the `DATABASE_URL` variable from your `.env.local` file. If you do not publish this, you can skip the installation of `dotenv` and set the `DATABASE_URL` in the `.env`.

Setup your supabase project and add the variables `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`. A guide by supabase can be found [here].

## Prisma Migration

To change the db schema, edit the schema.prisma file and then run `yarn migrate`.

[nextjs]: https://nextjs.org/
[supabase]: https://supabase.com/
[prisma]: https://www.prisma.io/
[tailwindcss]: https://tailwindcss.com/
[material-ui]: https://mui.com/
[notus js]: https://www.creative-tim.com/product/notus-js
[dx-react-scheduler]: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/
[here]: https://supabase.com/docs/guides/with-nextjs
