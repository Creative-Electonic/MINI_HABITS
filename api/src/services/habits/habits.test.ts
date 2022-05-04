import { habits, habit, createHabit, updateHabit, deleteHabit } from './habits'
import type { StandardScenario } from './habits.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('habits', () => {
  scenario('returns all habits', async (scenario: StandardScenario) => {
    const result = await habits()

    expect(result.length).toEqual(Object.keys(scenario.habit).length)
  })

  scenario('returns a single habit', async (scenario: StandardScenario) => {
    const result = await habit({ id: scenario.habit.one.id })

    expect(result).toEqual(scenario.habit.one)
  })

  scenario('creates a habit', async (scenario: StandardScenario) => {
    const result = await createHabit({
      input: {
        name: 'String3305907',
        minimumCompletionRequirement: 'String',
        achieveCount: 1351076,
        userId: scenario.habit.two.userId,
      },
    })

    expect(result.name).toEqual('String3305907')
    expect(result.minimumCompletionRequirement).toEqual('String')
    expect(result.achieveCount).toEqual(1351076)
    expect(result.userId).toEqual(scenario.habit.two.userId)
  })

  scenario('updates a habit', async (scenario: StandardScenario) => {
    const original = await habit({ id: scenario.habit.one.id })
    const result = await updateHabit({
      id: original.id,
      input: { name: 'String17362162' },
    })

    expect(result.name).toEqual('String17362162')
  })

  scenario('deletes a habit', async (scenario: StandardScenario) => {
    const original = await deleteHabit({ id: scenario.habit.one.id })
    const result = await habit({ id: original.id })

    expect(result).toEqual(null)
  })
})
