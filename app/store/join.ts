import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { HydraMemberObject } from '~/types/hydra'

export interface MotivationRaw {
  name: string
  id: string
}

export interface FamilyMember {
  firstName: string
  age: string
}

export interface Join extends HydraMemberObject {
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


interface JoinState extends CrudState<Join> {
  resource: string
}

export const useJoinStore = defineStore('survey_joins', {
  state: (): JoinState => {
    return {
      resource: '/survey_joins',
      ...crudState
    }
  }
})
