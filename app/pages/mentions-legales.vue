<template>
  <div class="bg-white flex-auto p-3">
    <Title>Mentions légales</Title>
    <div class="text-xl text-primary-dark font-marker py-3">Mentions légales</div>
    <div>
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
          en l’économie numérique, il est précisé aux utilisateurs du site lestransalpins.org
          l’identité des différents intervenants dans le cadre de sa réalisation et de son
          suivi.
        </p>
        <h3 class="py-3">Hébergeur</h3>

        <div>
          <p>Le site transalpins.org est hébergé par la société O2switch</p>
          <ul>
            <li>Siret : 510 909 807 00024</li>
            <li>RCS Clermont Ferrand</li>
            <li>SARL au capital de 100 000€</li>
          </ul>
        </div>
        <p>
          Le stockage des données personnelles des Utilisateurs est exclusivement réalisé sur
          les centre de données (« clusters ») localisés en France de la société O2switch
        </p>

        <h3 class="py-3">Cookie</h3>
        <p>
          Le seul cookie utilisé par ce site est généré lors de l'identification au
          site, il est réservé pour un usage d'administration du site web
        </p>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  title: 'Mentions légales'
})
</script>
