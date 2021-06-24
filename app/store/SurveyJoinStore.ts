import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'
import { MotivationRaw } from '~/store/survey_join'

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

interface SurveyJoinState extends CrudState<SurveyJoin> {
}

class SurveyJoinStore extends PersistentApiStore<SurveyJoinState, SurveyJoin> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: SurveyJoin): RawLocation | null {
    return null
  }

  getListLocation (): RawLocation | null {
    return null
  }

  getIdentifierFromUrlParam (param: string): string {
    return ''
  }
}

export const surveyJoinStore = new SurveyJoinStore('survey_joins')
