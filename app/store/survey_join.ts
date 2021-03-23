import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type MotivationRaw = {
  name: string
  id: string
}

export type SurveyJoin = HydraMemberObject & {
  firstName: string
  lastName: string
  city: string
  phoneNumber: string
  email: string
  acceptance: true
  origin: string
  motivations: string[] | null
  motivationsFreeThinking: string
  coreValuesHuman: string
  coreValuesOther: string
  affinity: string
  questioning: string
  investment: string
  rent: string
  bring: string
  typicalDay: string
  dwelling: string
  commonAreas: string
  relationship: string
  cnvExperience: string
  sharedGovernance: string
  skills: string
  limits: string
  availability: string
  meet: string
  skillUp: string
  family: string[],
  motivationsRaw: MotivationRaw[]
}

export default makeCrudModule({
  resource: 'survey_joins'
})
