import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HabitCreateArgs>({
  habit: {
    one: {
      data: {
        name: 'String8835172',
        minimumCompletionRequirement: 'String',
        achieveCount: 3761164,
        user: { create: { name: 'String1050394' } },
      },
    },
    two: {
      data: {
        name: 'String5570254',
        minimumCompletionRequirement: 'String',
        achieveCount: 2627372,
        user: { create: { name: 'String7022913' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
