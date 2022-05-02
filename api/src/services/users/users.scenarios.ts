import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String8504241' } },
    two: { data: { email: 'String5005135' } },
  },
})

export type StandardScenario = typeof standard
