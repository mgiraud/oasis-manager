import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/custom-store/AbstractStore'
import { Contact } from '~/custom-store/ContactStore'

export interface MotivationRaw {
  name: string
  id: string
}

export interface FamilyMember {
  firstName: string
  age: string
}

export interface SurveyJoin extends HydraMemberObject {
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
  family: FamilyMember[],
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

  getCreateMessage (_: SurveyJoin) {
    return 'Le questionnaire a correctement été enregistré, nous prendrons contact avec toi le plus rapidement possible'
  }
}

export const surveyJoinStore = new SurveyJoinStore('survey_joins')
