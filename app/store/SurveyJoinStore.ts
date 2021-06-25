import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'

export type MotivationRaw = {
  name: string
  id: string
}

export type SurveyJoin = HydraMemberObject & {
  id: number
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
    return {
      name: 'admin-survey-join-id',
      params: {
        id: encodeURIComponent(item.id)
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-survey-join' }
  }

  deleteRole = 'USER_CAN_DELETE_SURVEY_JOIN'
  editRole = 'USER_CAN_EDIT_SURVEY_JOIN'
  listRole = 'USER_CAN_VIEW_SURVEY_JOIN'
}

export const surveyJoinStore = new SurveyJoinStore('survey_joins')
