import type { TripInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TripInterface[] = [];

const tripSlice = createSlice({
  name: "trips",
  initialState: initialState,
  reducers: {
    setTrips: (_, action) =>
      action.payload && action.payload.length > 0 ? action.payload : [],
    deleteTrips: () => [],
    addTrip: (state, action) => {
      const { id, title, members, perPersonBudget } = action.payload;
      state.push({
        id: id ? id : Date.now(),
        title: title ? title : "",
        members: members && members.length > 0 ? members : [],
        perPersonBudget: perPersonBudget ? perPersonBudget : 0,
      });
    },
    deleteTrip: (state, action) => {
      return state.filter((trip) => trip.id !== action.payload);
    },
    editTripField: (state, action) => {
      return state.map((trip) =>
        trip.id === action.payload.id
          ? { ...trip, [action.payload.field]: action.payload.value }
          : trip,
      );
    },
    addTripMember: (state, action) => {
      return state.map((trip) =>
        trip.id === action.payload.id
          ? {
              ...trip,
              members: [
                ...trip.members,
                {
                  id: Date.now(),
                  name: action.payload.name,
                },
              ],
            }
          : trip,
      );
    },

    editTripMember: (state, action) => {
      return state.map((trip) =>
        trip.id === action.payload.id
          ? {
              ...trip,
              members: trip.members.map((member) =>
                member.id === action.payload.memberId
                  ? { ...member, name: action.payload.name }
                  : member,
              ),
            }
          : trip,
      );
    },

    deleteTripMember: (state, action) => {
      return state.map((trip) =>
        trip.id === action.payload.id
          ? {
              ...trip,
              members: trip.members.filter(
                (member) => member.id !== action.payload.memberId,
              ),
            }
          : trip,
      );
    },
  },
});

export const tripActions = tripSlice.actions;
export default tripSlice;
