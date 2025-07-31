import axios from 'axios'

export async function getTrucks() {
  const response = await axios.get('/truck')
  return response.data
}

export async function getParcels() {
  const response = await axios.get('/parcel')
  return response.data
} 

export async function loadParcelToTruck(parcelId, truckId) {
  try {
    console.log('Loading parcel to truck:', { parcelId, truckId })
    const response = await axios.put(`/parcel/${parcelId}/truck-load/${truckId}`)
    return response.data
  } catch (error) {
    console.error('Error loading parcel to truck:', error)
    throw error
  }
}

export async function unLoadParcelFromTruck(parcelId) {
  try {
    console.log('Loading parcel to truck:', { parcelId })
    const response = await axios.put(`/parcel/${parcelId}/truck-unload`)
    return response.data
  } catch (error) {
    console.error('Error loading parcel to truck:', error)
    throw error
  }
}