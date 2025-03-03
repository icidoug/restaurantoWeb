<template>
    <f7-popup :opened="isOpen" @popup:closed="resetSelection">
        <f7-page class="extras">
            <div class="extras-title">
                {{ $t('extras') }}
            </div>
            <f7-link popup-close class="popup-close-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                          fill="#898989"/>
                </svg>
            </f7-link>
            <f7-block v-if="item">
                <div class="extras-sections">
                    <div v-for="(section, sectionId) in item.extra_sections"
                         :key="sectionId"
                         class="extras-section">
                        <h3>{{ section.name }}</h3>

                        <f7-list no-hairlines>
                            <f7-list-item
                                class="item-radio"
                                v-if="section.single_choose"
                                v-for="extra in section.extras"
                                :key="extra.id"
                                checkbox
                                :title="extra.name"
                                :after="extra.price > 0 ? `+${extra.price_format}` : ''"
                                :checked="selectedExtras[sectionId] === extra.id"
                                :value="extra.id"
                                :disabled="extra.temporarily_unavailable"
                                @change="handleSingleSelection(sectionId, extra.id)"
                            />
                            <f7-list-item
                                v-else
                                v-for="extra in section.extras"
                                :key="extra.id"
                                checkbox
                                :title="extra.name"
                                :after="extra.price > 0 ? `+${extra.price_format}` : ''"
                                :checked="selectedExtras[sectionId]?.includes(extra.id)"
                                :value="extra.id"
                                :disabled="extra.temporarily_unavailable"
                                @change="handleMultiSelection(sectionId, extra.id, $event.target.checked)"
                            />
                        </f7-list>
                    </div>
                </div>
            </f7-block>

            <div class="order-form__fixed">
                <f7-button
                    class="btn btn--pink"
                    :disabled="!isSelectionValid"
                    @click="addToBasket"
                >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                         class="svg-fill"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M8.5 0.25C8.91421 0.25 9.25 0.585786 9.25 1V7.25H15.5C15.9142 7.25 16.25 7.58579 16.25 8C16.25 8.41421 15.9142 8.75 15.5 8.75H9.25V15C9.25 15.4142 8.91421 15.75 8.5 15.75C8.08579 15.75 7.75 15.4142 7.75 15V8.75H1.5C1.08579 8.75 0.75 8.41421 0.75 8C0.75 7.58579 1.08579 7.25 1.5 7.25H7.75V1C7.75 0.585786 8.08579 0.25 8.5 0.25Z"
                              fill="white"/>
                    </svg>
                    <span>
                        {{ $t('add_to_order') }}
                    </span>
                </f7-button>
            </div>
        </f7-page>
    </f7-popup>
</template>

<script>
    import { ref, computed, watch } from 'vue'
    import store from '@/store/store'

    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        },

        emits: ['update:isOpen', 'added'],

        setup(props, { emit }) {
            const selectedExtras = ref({})

            watch(() => props.isOpen, (newValue) => {
                if (newValue && Object.keys(selectedExtras.value).length === 0) {
                    initializeDefaultSelections()
                }
            })

            const initializeDefaultSelections = () => {
                Object.entries(props.item.extra_sections).forEach(([sectionId, section]) => {
                    if (section.single_choose && section.extras.length > 0) {
                        // Устанавливаем первый доступный элемент по умолчанию
                        const firstAvailableExtra = section.extras.find(extra => !extra.temporarily_unavailable)
                        if (firstAvailableExtra) {
                            selectedExtras.value[sectionId] = firstAvailableExtra.id
                        }
                    }
                })
            }

            const totalPrice = computed(() => {
                let price = parseFloat(props.item.price)

                Object.entries(props.item.extra_sections).forEach(([sectionId, section]) => {
                    const selected = selectedExtras.value[sectionId]

                    if (selected) {
                        if (section.single_choose) {
                            const extra = section.extras.find(e => e.id === selected)
                            price += extra?.price || 0
                        } else if (Array.isArray(selected)) {
                            selected.forEach(extraId => {
                                const extra = section.extras.find(e => e.id === extraId)
                                price += extra?.price || 0
                            })
                        }
                    }
                })

                return price
            })

            const totalPriceFormat = computed(() => {
                return `$${totalPrice.value.toFixed(2)}`
            })

            const isSelectionValid = computed(() => {
                return Object.entries(props.item.extra_sections).every(([_, section]) => {
                    if (section.single_choose) {
                        return !!selectedExtras.value[section.id]
                    }
                    return true
                })
            })

            const handleSingleSelection = (sectionId, extraId) => {
                if (selectedExtras.value[sectionId] === extraId) {
                    delete selectedExtras.value[sectionId]
                } else {
                    selectedExtras.value[sectionId] = extraId
                }
                selectedExtras.value = { ...selectedExtras.value }
            }

            const handleMultiSelection = (sectionId, extraId, checked) => {
                if (!selectedExtras.value[sectionId]) {
                    selectedExtras.value[sectionId] = []
                }

                if (checked) {
                    selectedExtras.value[sectionId].push(extraId)
                } else {
                    selectedExtras.value[sectionId] = selectedExtras.value[sectionId].filter(
                        id => id !== extraId
                    )
                }
            }

            const addToBasket = async () => {
                const basketItem = {
                    ...props.item,
                    selected_extras: { ...selectedExtras.value },
                    price: totalPrice.value
                }

                await store.dispatch('basket/updateBasket', {
                    item: basketItem,
                    quantity: 1
                })

                emit('added')
                emit('update:isOpen', false)
            }

            const resetSelection = () => {
                selectedExtras.value = {}
                emit('update:isOpen', false)
            }

            if (props.isOpen) {
                initializeDefaultSelections()
            }

            return {
                selectedExtras,
                totalPriceFormat,
                isSelectionValid,
                handleSingleSelection,
                handleMultiSelection,
                addToBasket,
                resetSelection
            }
        }
    }
</script>

<style scoped>
</style>