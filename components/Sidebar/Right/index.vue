<template>
  <div class="flex flex-col">
     <!-- Search bar -->
     <div class="relative m-2">
            <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                <div class="w-6 h-6">
                    <SearchIcon @click="handleSearch" />
                </div>
            </div>
            <input v-model="search"
                class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
                placeholder="Search tweet" type="text">
        </div>
    <div>
      <SidebarRightPreviewCard title="What's happening">
        <SidebarRightPreviewCardItem
          v-for="whatsHappening in whatsHappeningItems"
          :key="whatsHappening.title"
        >
          <div>
            <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
            <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
          </div>
        </SidebarRightPreviewCardItem>
      </SidebarRightPreviewCard>
    </div>
    <div>
      <SidebarRightPreviewCard title="Who to follow">
         <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems" :key="whoToFollow.handle">
            <div class="flex flex-row justify-between p-2 items-center">
                <div class="flex flex-row">
                    <img :src="whoToFollow.image" :alt="whoToFollow.name" class="w-10 h-10 rounded-full">
                    <div class="flex flex-col ml-2">
                        <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                        <p class="text-sm text-gray-400 dark:text-white">{{ whoToFollow.handle }}</p>
                    </div>
                </div>
                <div class="flex h-full">
                    <button class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">Follow</button>
                </div>
            </div>
         </SidebarRightPreviewCardItem>
      </SidebarRightPreviewCard>
    </div>


      <div>
            <ul class="mx-2 my-4 text-xs text-gray-500">
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Cookie Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Accessability</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Ads info</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">More</a>
                </li>
                <li class="inline-block mx-2">
                    © 2022 Twitter, Inc.
                </li>
            </ul>
          </div>

  </div>
</template>

<script setup>
import { SearchIcon } from '@heroicons/vue/outline';
const search = ref('')
const emitter = useEmitter()

function handleSearch() {
    useRouter().push({
        path: '/search',
        query: {
            q: search.value
        }
    })
}

const whatsHappeningItems = ref([
  {
    title: "#SpaceX",
    count: "18.8k Tweets",
  },
  {
    title: "#Coding is fun",
    count: "7.4k Tweets",
  },
  {
    title: "#art for all",
    count: "1.6k Tweets",
  },
]);

const whoToFollowItems = ref([
    {
        name: 'Rengoku',
        handle: '@firehashira',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Yugal',
        handle: '@king',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Phoenix',
        handle: '@flashhh',
        image: 'https://picsum.photos/200/200'
    }
])
function handleToggleDarkMode() {
    emitter.$emit('toggleDarkMode')
}

</script>
