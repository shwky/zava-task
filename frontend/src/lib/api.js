import axios from 'axios'

export async function getTrucks() {
  const response = await axios.get('/truck')
  return response.data
}

export async function getParcels() {
  const response = await axios.get('/parcel')
  return response.data
} 