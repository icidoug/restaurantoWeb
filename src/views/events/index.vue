<template>
    <f7-page>
        <div class="events">
            <navbar :title="$t('events_and_promotions')" back-url="/"/>
            <events-items :items="items"/>
            <events-card-popup/>
        </div>
    </f7-page>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import {computed, onMounted, ref} from "vue";
    import store from "@/store/store";
    import EventsItems from "@/components/events/EventsItems.vue";
    import EventsCardPopup from "@/components/events/EventsCardPopup.vue";

    export default {
        components: {
            EventsCardPopup,
            EventsItems,
            Navbar
        },
        setup() {
            const items = computed(() => {
                return store.getters['events/items']
            });

            return {
                items
            }
        }
    }
</script>
