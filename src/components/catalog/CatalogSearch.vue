<template>
    <label class="catalog-search catalog-section__item active">
        <span class="catalog-search__open" @click="openSearch(true)">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41669 9.16666C2.41669 5.43873 5.43876 2.41666 9.16669 2.41666C12.8946 2.41666 15.9167 5.43873 15.9167 9.16666C15.9167 12.8946 12.8946 15.9167 9.16669 15.9167C5.43876 15.9167 2.41669 12.8946 2.41669 9.16666ZM9.16669 0.916656C4.61034 0.916656 0.916687 4.61031 0.916687 9.16666C0.916687 13.723 4.61034 17.4167 9.16669 17.4167C11.1748 17.4167 13.0154 16.6992 14.446 15.5066L16.9697 18.0303C17.2626 18.3232 17.7375 18.3232 18.0304 18.0303C18.3232 17.7374 18.3232 17.2626 18.0304 16.9697L15.5066 14.4459C16.6992 13.0153 17.4167 11.1748 17.4167 9.16666C17.4167 4.61031 13.723 0.916656 9.16669 0.916656Z" fill="#111111"/>
            </svg>
        </span>
        <span v-if="isSearchOpen" class="catalog-search__input">
            <input type="text"
                   :placeholder="$t('search')"
                   @input="search"
                   v-model="query"
            >
            <span class="catalog-search__close" @click="openSearch(false)">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.46967 13.5303C0.176777 13.2374 0.176777 12.7626 0.46967 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="#7D7D7D"/>
                </svg>
            </span>
        </span>
    </label>
</template>

<script>
    import store from '@/store/store'
    import {computed, ref} from "vue";
    import debounce from "lodash/debounce"

    export default {
        components: {},
        props: {
        },
        setup() {
            const query = ref('');

            const isSearchOpen = computed(() => {
                return store.getters['catalog/isSearchOpen']
            });
            
            const openSearch = (isOpen) => {
                /*if(isOpen && !document.querySelectorAll('.catalog-section')[0].classList.contains('fixed')) {
                    setTimeout(() => {
                        document.querySelectorAll('.catalog-items')[0].scrollIntoView({behavior: 'smooth', block: 'start'});
                    }, 300)
                }*/
                if(isOpen && !isSearchOpen.value) {
                    document.querySelectorAll('.page-content')[0].scrollBy(0,-380);
                }
                if(!isOpen) {
                    store.commit('catalog/setItems', store.getters['catalog/allItems']);
                    query.value = '';
                    const pageContent = document.querySelectorAll('.page-content')[0];
                    if(pageContent.scrollTop > 380) {
                        pageContent.scrollBy(0,+380);
                    }
                }
                store.commit('catalog/setIsSearchOpen', isOpen);
            }

            const search = debounce(() => {
                const items = store.getters['catalog/allItems'].filter(obj => {
                    let name = obj.name.toLowerCase();

                    return name.includes(query.value.toLowerCase());
                });

                store.commit('catalog/setItems', items);
            }, 500)

            return {
                openSearch,
                isSearchOpen,
                query,
                search
            }
        }
    }
</script>

<style lang="scss">

</style>
