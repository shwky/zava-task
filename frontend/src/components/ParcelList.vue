<script setup>
import {
  Card,
  CardContent,
} from '@/components/ui/card'

const props = defineProps({
  parcels: {
    type: Array,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
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
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template> 