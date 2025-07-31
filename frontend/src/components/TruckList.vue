<script setup>
import {
  Card,
  CardContent,
} from '@/components/ui/card'

defineProps({
  trucks: {
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
    <h2 class="text-2xl font-bold mb-4">Trucks</h2>
    
    <div class="space-y-4">
      <Card 
        v-for="truck in trucks" 
        :key="truck.id"
        data-qa="truck-card"
      >
        <CardContent class="py-4">
          <div class="space-y-2">
            <div data-qa="truck-id" class="font-medium">
              Truck {{ truck.id }}
            </div>
            
            <div data-qa="truck-registration">
              Registration: {{ truck.registration }}
            </div>
            
            <div v-if="truck.totalWeight !== null" data-qa="truck-registration">
              Total Weight: {{ truck.totalWeight }}
            </div>
            
            <div class="text-sm text-muted-foreground">
              <span data-qa="truck-created-date">
                Created: {{ formatDate(truck.createdAt) }}
              </span>
              <span v-if="truck.updatedAt" data-qa="truck-updated-date" class="ml-4">
                Updated: {{ formatDate(truck.updatedAt) }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template> 