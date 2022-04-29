<template>
  <div class="flex flex-auto flex-col">
    <header class="h-36">
      <div class="absolute top-0 left-0 w-full">
        <div class="h-36 bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat"></div>
      </div>
      <div class="h-36 flex items-start ">
        <div class="items-start">Les transalpins</div>
      </div>
    </header>
    <div class="flex flex-row flex-auto">
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton>More</MenuButton>
        <MenuItems class="flex flex-col flex-auto">
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Documentation
            </a>
          </MenuItem>
          <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton>More</MenuButton>
        <MenuItems>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Documentation
            </a>
          </MenuItem>
          <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

</script>
