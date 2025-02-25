# Full-stack
Pair programming exercise for full-stack developer.

You are part of a team of developers working for a parcel company.
For this challenge you will be making changes to a prototype for a truck and parcel management system.

This system manages: 
 - Trucks, which have a registration number.
 - Parcels, which have a destination and weight. Parcels may be assigned to a truck.

## Take Home Exercise

 - Clone the repository and open it in your preferred IDE.
 - Install dependencies and run locally by following the instructions below.
 - Familiarise yourself with the codebase.
 - Navigate to `http://localhost:5173/` to view the frontend.
   - We use an in-memory data store with pre-populated data.

1. You have been asked to implement a new feature, where a company employee can assign a parcel to a truck.
 - Modify the frontend to allow a company employee to assign a parcel to a truck. This can be done using either a dropdown selector or assign/unassign buttons.
 - This should make a request to the backend to update the parcel with the truck id via a PUT request.
 - Feel free to make any changes or improvements necessary to support this feature.

2. You have received a feature request to display the current total weight of the parcels on a truck.
 - Implement a this feature to display the total weight of the truck of parcels in each truck card.
 - Calculations for the total weight should be performed on the backend.
 - Feel free to adapt the current API to support this, or to introduce a new API as you see fit.

3. As part of the pair programming interview, we will implement a new feature together. 

## Dependencies

- Node.js (20.0.0 and above)
- npm 

## Setup
```bash
git clone https://github.com/sam-holder-zava/full-stack-exercise
```
### Starting the frontend
```bash
cd frontend
npm install
npm run dev
```
### Starting the backend
```bash
cd backend
npm install
npm run start
```
