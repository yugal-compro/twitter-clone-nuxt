<template>
    <div>
        <MainSection title="Tweet" :loading="loading">

            <Head>
                <Title></Title>
            </Head>


            <TweetDetails :user="user" :tweet="tweet" />

        </MainSection>
    </div>
</template>
<script setup>
definePageMeta({
  middleware: ["set-params"]
})

const loading = ref(false)
const tweet = useState('selectedTweet')
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()

const paramId = useState('routeParamId')


watch(() => useRoute().fullPath, () => getTweet(useRoute().params.id))


async function getTweet(id) {
    loading.value = true
    try {
        const response = await getTweetById(id)

        tweet.value = response.tweet
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}

onBeforeMount(() => {
    getTweet(paramId.value)
})

</script>