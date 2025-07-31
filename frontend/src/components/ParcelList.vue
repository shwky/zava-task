<script setup>
import { ref } from 'vue'
import {Card,CardContent} from '@/components/ui/card'
import {loadParcelToTruck, unLoadParcelFromTruck } from "@/lib/api.js"

const showPopup = ref(false)
const selectedParcelId = ref(null)
const selectedTruckId = ref(null)
const props = defineProps({
  parcels: {
    type: Array,
    required: true
  },
  trucks: {
    type: Array,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

function assignParcelToTruck(parcelId) {
  selectedParcelId.value = parcelId
  selectedTruckId.value = null
  showPopup.value = true
}

function unassignParcelFromTruck(parcel) {
  unLoadParcelFromTruck(parcel.id)
    .then(() => {
      console.log('Parcel un assigned successfully')
      window.location.reload();
    })
    .catch(error => {
      console.error('Error assigning parcel:', error)
    })
}

function confirmAssignment() {
  console.log(`Assigning Parcel ${selectedParcelId.value} to Truck ${selectedTruckId.value}`)
  loadParcelToTruck(selectedParcelId.value, selectedTruckId.value)
    .then(() => {
      console.log('Parcel assigned successfully')
      window.location.reload();
    })
    .catch(error => {
      console.error('Error assigning parcel:', error)
    })

  showPopup.value = false
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Parcels</h2>
    <div class="space-y-4">
      <Card 
        v-for="parcel in parcels" 
        :key="parcel.id"
        data-qa="parcel-card"
      >
        <CardContent class="py-4">
          <div class="space-y-2">
            <div data-qa="parcel-id" class="font-medium">
              Parcel {{ parcel.id }}
            </div>
            
            <div data-qa="parcel-truck-id">
              Assigned to Truck: {{ parcel.truckId || 'Unassigned' }}
            </div>
            
            <div data-qa="parcel-weight">
              Weight: {{ parcel.weight }}kg
            </div>
            
            <div data-qa="parcel-destination">
              Destination: {{ parcel.destination }}
            </div>
            
            <div class="text-sm text-muted-foreground">
              <span data-qa="parcel-created-date">
                Created: {{ formatDate(parcel.createdAt) }}
              </span>
              <span v-if="parcel.updatedAt" data-qa="parcel-updated-date" class="ml-4">
                Updated: {{ formatDate(parcel.updatedAt) }}
              </span>
            </div>
            
            <div class="mt-2">
                <button v-if="parcel.truckId == null"
                  class="bg-sky-500/75 text-white px-4 py-2 rounded hover:bg-sky-600"
                  @click="assignParcelToTruck(parcel.id)"
                >Assign to Truck</button>
                <button v-else
                  class="bg-sky-500/75 text-white px-4 py-2 rounded hover:bg-sky-600"
                  @click="unassignParcelFromTruck(parcel)"
                >Unassign from Truck</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <h3 class="text-lg font-semibold mb-4">Assign Parcel to Truck</h3>
      <p class="mb-2">Parcel ID: {{ selectedParcelId }}</p>

      <label for="truck" class="block mb-1">Select Truck:</label>
      <select
        id="truck"
        v-model="selectedTruckId"
        class="border border-gray-300 p-2 rounded w-full mb-4"
      >
        <option disabled value="">-- Choose a truck --</option>
        <option v-for="truck in trucks" :key="truck.id" :value="truck.id">
          Truck {{ truck.id }} - {{ truck.registration }}
        </option>
      </select>

      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          @click="showPopup = false"
        >
          Cancel
        </button>
        <button
          :disabled="!selectedTruckId"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          @click="confirmAssignment"
        >
          Confirm Assignment
        </button>
      </div>
    </div>
  </div>

</template> 

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>