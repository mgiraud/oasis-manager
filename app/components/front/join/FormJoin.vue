<template>
  <Form
    v-slot="{ values, errors }"
    @submit="onSubmit"
    class="flex flex-row flex-wrap p-3"
    :validation-schema="schema"
    :initial-values="{acceptance: false}"
  >
    <h2 class="w-full py-3">J'en dis un peu sur moi :</h2>
    <TextField icon="ri-mail-line" type="email" name="email" :error="errors.email" :value="values.email" label="Email" class="w-full md:w-1/2" />
    <TextField icon="ri-phone-line" name="phoneNumber" :error="errors.phoneNumber" :value="values.phoneNumber" label="Numéro de téléphone" class="w-full md:w-1/2" />
    <TextField name="firstName" :error="errors.firstName" :value="values.firstName" label="Prénom" class="w-full md:w-1/2" />
    <TextField name="lastName" :error="errors.lastName" :value="values.lastName" label="Nom" class="w-full md:w-1/2" />
    <TextField name="city" :error="errors.city" :value="values.city" label="Ville actuelle" class="w-full md:w-1/2" />
    <TextField name="origin" :error="errors.origin" :value="values.origin" label="Comment j'ai connu les transalpins ?" class="w-full md:w-1/2" />
    <div>
      <p>De combien de personnes est composé mon foyer, prénom et leur âge ?</p>
    </div>
    <div class="w-full flex flex-col">
      <div v-for="(member, i) in family" class="flex w-full md:w-1/2 py-2">
        <input type="text" v-model="family[i].firstName" class="w-1/2 border h-8" placeholder="Prénom">
        <input type="number" min="0" max="99" v-model="family[i].age" class="w-1/2 border h-8" placeholder="Age">
      </div>
      <div class="flex flex-row">
        <div class="py-1 px-2 bg-primary text-white shadow-md uppercase hover:bg-primary-dark w-fit cursor-pointer" @click="addMember">
          <Icon icon="ri-add-line" class="fill-white h-8 w-8"/>
        </div>
        <div v-if="family.length > 1" class="py-1 px-2 bg-secondary text-white shadow-md uppercase hover:bg-accent w-fit cursor-pointer" @click="removeMember">
          <Icon icon="ri-subtract-line" class="fill-white h-8 w-8"/>
        </div>
      </div>
    </div>
    <CheckboxField name="acceptance" :error="errors.acceptance" label="En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association « les Transalpins » ne faisant pas partie du bureau" class="w-full md:w-1/2" />

    <h2 class="w-full py-3">Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet ?</h2>
    <TextField as="textarea" type="textarea" name="motivationsFreeThinking" :error="errors.motivationsFreeThinking" :value="values.motivationsFreeThinking" label="Qu'est-ce qui me motive à créer ou à m'engager dans un projet d'Oasis ?" class="w-full" />
    <div class="w-full">
      <p>
        Quelles sont les valeurs essentielles que j'aimerais vivre : les valeurs non
        négociables, c-a-d dont l'absence me ferait perdre son sens au projet et ma
        motivation à y participer ?
      </p>
    </div>
    <TextField as="textarea" type="textarea" name="coreValuesHuman" :error="errors.coreValuesHuman" :value="values.coreValuesHuman" label="Valeurs humaines" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="coreValuesOther" :error="errors.coreValuesOther" :value="values.coreValuesOther" label="Valeurs autres" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="affinity" :error="errors.affinity" :value="values.affinity" label="Qu’est-ce qui m'attire dans le projet des transalpins ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="questioning" :error="errors.questioning" :value="values.questioning" label="Qu’est-ce qui me questionne dans ce projet ?" class="w-full md:w-1/2" />

    <h2 class="w-full py-3">Suis-je prêt.e à m'investir dans ce projet ?</h2>
    <TextField as="textarea" type="textarea" name="bring" :error="errors.bring" :value="values.bring" label="Que suis-je prêt.e à lui apporter ?" class="w-full" />
    <TextField as="textarea" type="textarea" name="investment" :error="errors.investment" :value="values.investment" label="En tant qu’habitant.e, suis-je prêt.e à investir financièrement ? Et combien ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="rent" :error="errors.rent" :value="values.rent" label="Suis-je prêt.e à payer un loyer ? À quelle hauteur ?" class="w-full md:w-1/2" />

    <h2 class="w-full py-3">Ma vie au quotidien</h2>
    <div class="w-full">
      <p>
        Des questions encore plus concrètes : A quoi ressemblera ma vie quand je vivrai là ?
      </p>
    </div>
    <TextField as="textarea" type="textarea" name="typicalDay" :error="errors.typicalDay" :value="values.typicalDay" label="Je décris ma journée type" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="dwelling" :error="errors.dwelling" :value="values.dwelling" label="Je décris mon habitation" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="commonAreas" :error="errors.commonAreas" :value="values.commonAreas" label="Je décris les espaces communs" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="relationship" :error="errors.relationship" :value="values.relationship" label="Je décris les relations au sein de l'oasis" class="w-full md:w-1/2" />

    <h2 class="w-full py-3">Mes savoir-faire et savoir-être</h2>
    <TextField as="textarea" type="textarea" name="cnvExperience" :error="errors.cnvExperience" :value="values.cnvExperience" label="Est-ce que je connais la CNV ? Si oui quelle est mon expérience ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="sharedGovernance" :error="errors.sharedGovernance" :value="values.sharedGovernance" label="Est-ce que je connais la gouvernance partagée ? Si oui, quelle est mon expérience ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="skills" :error="errors.skills" :value="values.skills" label="Quels sont les savoir-faire/être que je peux amener au projet" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="limits" :error="errors.limits" :value="values.limits" label="Quelles sont mes limites ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="availability" :error="errors.availability" :value="values.availability" label="Quelles sont mes disponibilités durant la période de montage du projet ? Et mes disponibilités en semaine ?" class="w-full" />
    <TextField as="textarea" type="textarea" name="meet" :error="errors.meet" :value="values.meet" label="Serais-je disposé.e à rencontrer des élus locaux, des banquiers, architectes… ?" class="w-full md:w-1/2" />
    <TextField as="textarea" type="textarea" name="skillUp" :error="errors.skillUp" :value="values.skillUp" label="Dans quel domaine utile au projet suis-je prêt.e à me former ?" class="w-full md:w-1/2" />

    <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Envoyer</button>
  </Form>
</template>

<script setup lang="ts">
import CheckboxField from '~/components/form/CheckboxField.vue'
import TextField from '~/components/form/TextField.vue'
import { Form, useField } from 'vee-validate'
import Icon from '~/components/util/Icon.vue'

const props = defineProps<{
  onSubmit: Function,
}>()

const family = ref([
  {firstName: null, age: null}
])

const { value: familyInputValue } = useField('family', undefined);

const addMember = () => {
  family.value.push({firstName: null, age: null})
}

const removeMember = () => {
  if (family.value.length > 1) {
    family.value.splice(family.value.length - 1, 1);
  }
}

const schema = {
  email: 'required|email',
  phoneNumber:'required|regex:^0\\d{9}$',
  firstName: 'required|min:3|max:60',
  lastName: 'required|min:3|max:60',
  city: 'required|min:1',
};

watch(family, (newFamily) => {
  familyInputValue.value = newFamily
}, { deep: true })

</script>
