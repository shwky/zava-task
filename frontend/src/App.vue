<script setup>
import TruckList from '@/components/TruckList.vue'
import ParcelList from '@/components/ParcelList.vue'
import { Button } from '@/components/ui/button'
import { onMounted, ref } from "vue"
import { getTrucks, getParcels } from "@/lib/api.js"

const trucks = ref([])
const parcels = ref([])

const fetchData = async () => {
  trucks.value = await getTrucks()
  parcels.value = await getParcels()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="m-5">
    <Button class="mr-2" @click="fetchData" data-qa="refresh-button">Refresh</Button>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      <TruckList :trucks="trucks" />
      <ParcelList :parcels="parcels" />
    </div>
  </div>
</template>
